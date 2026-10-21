import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";
import { herkomstUit, meldAanvraag, type Herkomst } from "@/lib/hub";

// Verstuurt de offerteaanvraag via SMTP van het eigen Google Workspace-account.
// De mail gaat dus vanaf en naar info@madernglazenwassers.nl; geen externe
// mailprovider en geen DNS-verificatie nodig.
//
// Vereiste env-vars (in Vercel instellen):
//   SMTP_USER  – het volledige adres, bijv. info@madernglazenwassers.nl
//   SMTP_PASS  – Google app-wachtwoord (16 tekens, spaties mogen weg)
// Optioneel:
//   SMTP_HOST  – standaard smtp.gmail.com
//   SMTP_PORT  – standaard 465 (SSL)
//   OFFERTE_TO – ontvangers, komma-gescheiden; standaard info@ + Roy

export const runtime = "nodejs";

type Bijlage = { filename: string; content: Buffer; contentType: string };

// Het formulier verkleint de foto's al in de browser (zie lib/fotos.ts). Deze
// grenzen zijn de vangrail voor wat er langs het formulier om binnenkomt.
// Vercel kapt een verzoek boven de 4,5 MB zelf al af, dus hier hoeft niets
// hoger te staan dan dat.
const MAX_FOTOS = 5;
const MAX_PER_FOTO = 4 * 1024 * 1024;
const MAX_BIJLAGEN = 4 * 1024 * 1024;

/** Geen pad, geen rare tekens, en altijd een extensie in de mailbox van Roy. */
function veiligeNaam(naam: string, nummer: number): string {
  const kaal = (naam || "")
    .split(/[\\/]/)
    .pop()!
    .replace(/[^\w.\- ]+/g, "_")
    .slice(-80);
  return /\.[a-z0-9]{2,5}$/i.test(kaal) ? kaal : `foto-${nummer}.jpg`;
}

/**
 * Leest de aanvraag. Zonder foto's komt hij als JSON binnen, met foto's als
 * formuliergegevens, want bijlagen passen niet in JSON.
 */
async function leesAanvraag(
  req: Request,
): Promise<{ velden: Record<string, string>; ruweHerkomst: unknown; bijlagen: Bijlage[] }> {
  if (!(req.headers.get("content-type") || "").includes("multipart/form-data")) {
    // De herkomst is het enige veld dat geen tekst is; die gaat apart naar
    // de hub en hoort niet tussen de formuliervelden.
    const { herkomst, ...velden } = await req.json();
    return { velden, ruweHerkomst: herkomst, bijlagen: [] };
  }

  const formulier = await req.formData();
  const velden: Record<string, string> = {};
  const bijlagen: Bijlage[] = [];
  let totaal = 0;

  for (const [sleutel, waarde] of formulier.entries()) {
    if (typeof waarde === "string") {
      if (sleutel !== "herkomst") velden[sleutel] = waarde;
      continue;
    }
    // Stilzwijgend overslaan wat niet past: de aanvraag zelf is belangrijker
    // dan de bijlage, en de bezoeker heeft het formulier al verstuurd.
    if (bijlagen.length >= MAX_FOTOS) continue;
    if (!waarde.type.startsWith("image/") || waarde.size > MAX_PER_FOTO) continue;
    if (totaal + waarde.size > MAX_BIJLAGEN) continue;
    totaal += waarde.size;
    bijlagen.push({
      filename: veiligeNaam(waarde.name, bijlagen.length + 1),
      content: Buffer.from(await waarde.arrayBuffer()),
      contentType: waarde.type,
    });
  }

  const ruw = formulier.get("herkomst");
  let ruweHerkomst: unknown;
  if (typeof ruw === "string") {
    try {
      ruweHerkomst = JSON.parse(ruw);
    } catch {
      // Herkomst is bijzaak; een kapotte waarde mag de aanvraag niet kosten.
    }
  }

  return { velden, ruweHerkomst, bijlagen };
}

export async function POST(req: Request) {
  let body: Record<string, string>;
  let herkomst: Herkomst;
  let bijlagen: Bijlage[];
  try {
    const aanvraag = await leesAanvraag(req);
    body = aanvraag.velden;
    herkomst = herkomstUit(aanvraag.ruweHerkomst);
    bijlagen = aanvraag.bijlagen;
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  // Honeypot: bots vullen dit verborgen veld in.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const naam = (body.naam || "").trim();
  const telefoon = (body.telefoon || "").trim();
  if (!naam || !telefoon) {
    return NextResponse.json({ error: "Naam en telefoon zijn verplicht" }, { status: 400 });
  }

  const user = process.env.SMTP_USER;
  // Het app-wachtwoord wordt door Google met spaties getoond; die zijn niet significant.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  const toEnv = process.env.OFFERTE_TO;
  const to = toEnv
    ? toEnv.split(",").map((s) => s.trim()).filter(Boolean)
    : [siteConfig.email, "royneven97@gmail.com"];

  if (!user || !pass) {
    // Niet geconfigureerd: log zodat de aanvraag niet verloren gaat en geef nette fout.
    console.error("[offerte] SMTP_USER of SMTP_PASS ontbreekt. Aanvraag:", body);
    return NextResponse.json({ error: "E-mail nog niet geconfigureerd" }, { status: 500 });
  }

  const text = [
    `Nieuwe offerteaanvraag via ${siteConfig.url}`,
    "",
    `Naam: ${naam}`,
    `Telefoon: ${telefoon}`,
    `E-mail: ${body.email || "-"}`,
    `Adres: ${body.adres || "-"}`,
    `Plaats: ${body.plaats || "-"}`,
    `Gewenste planning: ${body.wanneer || "-"}`,
    `Dienst: ${body.dienst || "-"}`,
    `Foto's: ${bijlagen.length ? `${bijlagen.length} meegestuurd als bijlage` : "-"}`,
    `Aangevraagd via: ${body.pagina || body.bron || "-"}`,
    "",
    "Bericht:",
    body.bericht || "-",
  ].join("\n");

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  // De mail naar Madern en de melding aan de hub gaan tegelijk. De hub bewaart
  // de aanvraag, zodat een storing bij de mail hem niet laat verdwijnen.
  const [mail] = await Promise.allSettled([
    transporter.sendMail({
      // Google staat alleen het eigen account als afzender toe; de naam mag vrij.
      from: `Madern Offerte <${user}>`,
      to,
      replyTo: body.email || undefined,
      subject: `Offerteaanvraag - ${naam} (${body.plaats || "Apeldoorn"})`,
      text,
      attachments: bijlagen.length ? bijlagen : undefined,
    }),
    meldAanvraag(
      {
        ...body,
        naam,
        telefoon,
        bronPagina: body.pagina || body.bron,
        // De foto's zelf blijven in de mail; de hub hoort alleen dat ze er zijn.
        fotos: bijlagen.length || undefined,
      },
      herkomst,
    ),
  ]);

  if (mail.status === "rejected") {
    console.error("[offerte] SMTP-fout:", mail.reason);
    return NextResponse.json({ error: "Verzenden mislukt" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
