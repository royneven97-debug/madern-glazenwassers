import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";
import {
  haalWeekCijfers,
  analyticsIsGeconfigureerd,
  type WeekCijfers,
  type KlikRegel,
} from "@/lib/webAnalytics";

// Wekelijks rapport met bel-, WhatsApp- en e-mailkliks vanaf de website.
// Draait via de cron in vercel.json, elke maandagochtend.
//
// Vereiste env-vars (naast die van lib/webAnalytics.ts):
//   SMTP_USER / SMTP_PASS – hergebruikt van het offerteformulier
//   RAPPORT_TO            – ontvanger(s), komma-gescheiden; standaard als OFFERTE_TO
//   CRON_SECRET           – zet Vercel automatisch mee op de cron-aanroep
//
// Google Bedrijfsprofiel (telefoontjes vanuit Maps) zit hier bewust níét in:
// die kliks raken de website nooit en vereisen een aparte Google-koppeling.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SOORT_LABEL: Record<string, string> = {
  bellen: "Gebeld",
  whatsapp: "WhatsApp",
  email: "E-mail",
};

function verschil(nu: number, vorige: number): string {
  if (vorige === 0) return nu === 0 ? "gelijk" : `+${nu} nieuw`;
  const pct = Math.round(((nu - vorige) / vorige) * 100);
  if (pct === 0) return "gelijk";
  return `${pct > 0 ? "+" : ""}${pct}%`;
}

function zoek(regels: KlikRegel[], label: string): number {
  return regels.find((r) => r.label === label)?.aantal ?? 0;
}

function opmaak(week: WeekCijfers, vorig: WeekCijfers, van: Date, tot: Date): string {
  const datum = (d: Date) => d.toLocaleDateString("nl-NL", { day: "numeric", month: "long" });

  const regels: string[] = [
    `Weekrapport ${siteConfig.name}`,
    `${datum(van)} t/m ${datum(tot)}`,
    "",
    `Totaal contactmomenten: ${week.totaal} (vorige week ${vorig.totaal}, ${verschil(
      week.totaal,
      vorig.totaal,
    )})`,
    "",
    "PER MANIER",
  ];

  const soorten = ["bellen", "whatsapp", "email"];
  for (const soort of soorten) {
    const nu = zoek(week.perSoort, soort);
    const toen = zoek(vorig.perSoort, soort);
    regels.push(`  ${SOORT_LABEL[soort]}: ${nu} (was ${toen}, ${verschil(nu, toen)})`);
  }

  regels.push("", "VANAF WELKE PAGINA");
  if (week.perPagina.length === 0) {
    regels.push("  Geen kliks deze week.");
  } else {
    for (const r of week.perPagina.slice(0, 10)) {
      regels.push(`  ${r.label}: ${r.aantal}`);
    }
  }

  regels.push(
    "",
    "Let op: dit zijn kliks op de bel- en WhatsApp-knoppen van de website.",
    "Telefoontjes die rechtstreeks vanuit het Google Bedrijfsprofiel worden",
    "gestart, staan hier niet in; die vind je in het Bedrijfsprofiel zelf.",
  );

  return regels.join("\n");
}

export async function GET(req: Request) {
  // Vercel stuurt CRON_SECRET mee als Authorization-header. Staat de secret niet
  // ingesteld, dan laten we de route door zodat handmatig testen mogelijk blijft.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Niet toegestaan" }, { status: 401 });
  }

  if (!analyticsIsGeconfigureerd()) {
    console.error("[weekrapport] VERCEL_ANALYTICS_TOKEN of project-id ontbreekt.");
    return NextResponse.json({ error: "Analytics niet geconfigureerd" }, { status: 503 });
  }

  const tot = new Date();
  const van = new Date(tot.getTime() - 7 * 24 * 60 * 60 * 1000);
  const vorigVan = new Date(van.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [week, vorig] = await Promise.all([
    haalWeekCijfers(van, tot),
    haalWeekCijfers(vorigVan, van),
  ]);

  const text = opmaak(week, vorig, van, tot);

  const user = process.env.SMTP_USER;
  // Google toont het app-wachtwoord met spaties; die zijn niet significant.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  if (!user || !pass) {
    console.error("[weekrapport] SMTP_USER of SMTP_PASS ontbreekt. Rapport:\n" + text);
    return NextResponse.json({ error: "E-mail niet geconfigureerd" }, { status: 503 });
  }

  const toEnv = process.env.RAPPORT_TO || process.env.OFFERTE_TO;
  const to = toEnv
    ? toEnv.split(",").map((s) => s.trim()).filter(Boolean)
    : [siteConfig.email, "royneven97@gmail.com"];

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `Madern Weekrapport <${user}>`,
      to,
      subject: `Weekrapport website – ${week.totaal} contactmomenten`,
      text,
    });
    return NextResponse.json({ ok: true, totaal: week.totaal });
  } catch (err) {
    console.error("[weekrapport] SMTP-fout:", err);
    return NextResponse.json({ error: "Verzenden mislukt" }, { status: 502 });
  }
}
