import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

// Verstuurt de offerteaanvraag via Resend (REST API, geen extra dependency).
// Roy krijgt de aanvraag binnen; vult de bezoeker een e-mailadres in, dan gaat
// er ook een kopie naar hemzelf.
// Vereiste env-vars (in Vercel instellen):
//   RESEND_API_KEY   – API key van Resend
//   OFFERTE_TO        – ontvangstadres (bijv. info@madernglazenwassers.nl of Outlook-adres)
//   OFFERTE_FROM      – geverifieerd afzendadres in Resend (bijv. offerte@madernglazenwassers.nl)

type Mail = {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
};

/** Grof genoeg om een typefout te vangen; de rest weigert Resend zelf. */
function lijktOpEmail(waarde: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waarde);
}

function verstuur(apiKey: string, from: string, mail: Mail): Promise<Response> {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Madern Glazenwassers <${from}>`,
      to: mail.to,
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
    }),
  });
}

/** De bevestiging voor de klant zelf, met zijn eigen aanvraag eronder. */
function kopieVoorKlant(naam: string, aanvraag: string): string {
  return [
    `Beste ${naam},`,
    "",
    "Bedankt voor uw aanvraag. Hieronder staat wat u heeft doorgegeven, zodat u",
    "het nog eens kunt nalezen. We nemen zo snel mogelijk contact met u op.",
    "",
    "Klopt er iets niet, of wilt u iets aanvullen? Antwoord dan gewoon op deze",
    `mail, of bel ${siteConfig.phone.display}.`,
    "",
    "Met vriendelijke groet,",
    siteConfig.name,
    `${siteConfig.phone.display} · ${siteConfig.url}`,
    "",
    "----------------------------------------",
    "Uw aanvraag",
    "----------------------------------------",
    aanvraag,
  ].join("\n");
}

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

  const apiKey = process.env.RESEND_API_KEY;
  // Ontvangers: standaard naar info@ én royneven97@; override via OFFERTE_TO (komma-gescheiden).
  const toEnv = process.env.OFFERTE_TO;
  const to = toEnv
    ? toEnv.split(",").map((s) => s.trim()).filter(Boolean)
    : [siteConfig.email, "royneven97@gmail.com"];
  const from = process.env.OFFERTE_FROM || "onboarding@resend.dev";

  if (!apiKey) {
    // Niet geconfigureerd: log zodat de aanvraag niet verloren gaat en geef nette fout.
    console.error("[offerte] RESEND_API_KEY ontbreekt. Aanvraag:", body);
    return NextResponse.json({ error: "E-mail nog niet geconfigureerd" }, { status: 500 });
  }

  const email = (body.email || "").trim();

  // Eén opsomming, die zowel Roy als de klant onder ogen krijgt.
  const aanvraag = [
    `Naam: ${naam}`,
    `Telefoon: ${telefoon}`,
    `E-mail: ${email || "-"}`,
    `Adres: ${body.adres || "-"}`,
    `Plaats: ${body.plaats || "-"}`,
    `Gewenste planning: ${body.wanneer || "-"}`,
    `Dienst: ${body.dienst || "-"}`,
    "",
    "Bericht:",
    body.bericht || "-",
  ].join("\n");

  try {
    const res = await verstuur(apiKey, from, {
      to,
      replyTo: email || undefined,
      subject: `Offerteaanvraag – ${naam} (${body.plaats || "Apeldoorn"})`,
      text: [`Nieuwe offerteaanvraag via ${siteConfig.url}`, "", aanvraag].join("\n"),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[offerte] Resend-fout:", res.status, detail);
      return NextResponse.json({ error: "Verzenden mislukt" }, { status: 502 });
    }

    // Kopie naar de klant. Bewust ná de mail aan Roy, en een mislukking hiervan
    // laat de aanvraag staan: de lead is dan al binnen, dus daar hoort de
    // bezoeker geen foutmelding voor te krijgen. E-mail is een optioneel veld.
    if (lijktOpEmail(email)) {
      try {
        const kopie = await verstuur(apiKey, from, {
          to: [email],
          replyTo: siteConfig.email,
          subject: "Uw offerteaanvraag bij Madern Glazenwassers",
          text: kopieVoorKlant(naam, aanvraag),
        });
        if (!kopie.ok) {
          console.error("[offerte] Kopie aan klant mislukt:", kopie.status, await kopie.text());
        }
      } catch (err) {
        console.error("[offerte] Kopie aan klant mislukt:", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[offerte] Onverwachte fout:", err);
    return NextResponse.json({ error: "Verzenden mislukt" }, { status: 500 });
  }
}
