import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

// Verstuurt de offerteaanvraag via Resend (REST API, geen extra dependency).
// Vereiste env-vars (in Vercel instellen):
//   RESEND_API_KEY   – API key van Resend
//   OFFERTE_TO        – ontvangstadres (bijv. info@madernglazenwassers.nl of Outlook-adres)
//   OFFERTE_FROM      – geverifieerd afzendadres in Resend (bijv. offerte@madernglazenwassers.nl)

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
  const to = process.env.OFFERTE_TO || siteConfig.email;
  const from = process.env.OFFERTE_FROM || "onboarding@resend.dev";

  if (!apiKey) {
    // Niet geconfigureerd: log zodat de aanvraag niet verloren gaat en geef nette fout.
    console.error("[offerte] RESEND_API_KEY ontbreekt. Aanvraag:", body);
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Madern Offerte <${from}>`,
        to: [to],
        reply_to: body.email || undefined,
        subject: `Offerteaanvraag – ${naam} (${body.plaats || "Apeldoorn"})`,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[offerte] Resend-fout:", res.status, detail);
      return NextResponse.json({ error: "Verzenden mislukt" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[offerte] Onverwachte fout:", err);
    return NextResponse.json({ error: "Verzenden mislukt" }, { status: 500 });
  }
}
