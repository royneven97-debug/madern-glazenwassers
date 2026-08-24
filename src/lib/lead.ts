// Formulier-afhandeling: elke aanvraag gaat via e-mail (SMTP, server-side)
// naar de owner. De klant kan zelf apart contact opnemen via de WhatsApp-knop;
// het formulier stuurt bewust GEEN WhatsApp namens de klant.
import { siteConfig } from "./site";

export type LeadFields = {
  naam?: string;
  telefoon?: string;
  email?: string;
  plaats?: string;
  dienst?: string;
  bericht?: string;
};

export type LeadResult = "email" | "mailto";

const LABELS: [keyof LeadFields, string][] = [
  ["naam", "Naam"],
  ["telefoon", "Telefoon"],
  ["email", "E-mail"],
  ["plaats", "Plaats"],
  ["dienst", "Dienst"],
  ["bericht", "Bericht"],
];

function buildMessage(fields: LeadFields, pageUrl: string): string {
  const lines = ["Nieuwe aanvraag via madernglazenwassers.nl", ""];
  for (const [key, label] of LABELS) {
    const value = fields[key]?.toString().trim();
    if (value) lines.push(`${label}: ${value}`);
  }
  lines.push("", `Pagina: ${pageUrl}`);
  return lines.join("\n");
}

function openMailto(fields: LeadFields): void {
  const message = buildMessage(fields, window.location.href);
  window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "Offerteaanvraag via de website",
  )}&body=${encodeURIComponent(message)}`;
}

export async function submitLead(fields: LeadFields): Promise<LeadResult> {
  if (typeof window === "undefined") return "mailto";

  // Altijd via e-mail (SMTP via Google Workspace, server-side).
  try {
    const res = await fetch("/api/offerte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    if (!res.ok) throw new Error("mislukt");
    return "email";
  } catch {
    // Mailserver tijdelijk niet bereikbaar: open het mailprogramma als terugval.
    openMailto(fields);
    return "mailto";
  }
}
