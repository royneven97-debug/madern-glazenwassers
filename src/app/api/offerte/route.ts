import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";

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

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
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

  try {
    await transporter.sendMail({
      // Google staat alleen het eigen account als afzender toe; de naam mag vrij.
      from: `Madern Offerte <${user}>`,
      to,
      replyTo: body.email || undefined,
      subject: `Offerteaanvraag – ${naam} (${body.plaats || "Apeldoorn"})`,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[offerte] SMTP-fout:", err);
    return NextResponse.json({ error: "Verzenden mislukt" }, { status: 502 });
  }
}
