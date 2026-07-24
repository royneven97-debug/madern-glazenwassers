// Client-side lead-afhandeling:
// - mobiel/touch -> opent WhatsApp met de klantgegevens (owner krijgt een appje)
// - desktop      -> e-mail via de Resend-API (server-side); valt terug op mailto
//                   als de API (nog) niet is geconfigureerd
import { siteConfig } from "./site";

export type LeadFields = {
  naam?: string;
  telefoon?: string;
  email?: string;
  plaats?: string;
  dienst?: string;
  bericht?: string;
};

export type LeadResult = "whatsapp" | "email" | "mailto";

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

// Touch/mobiel? Dan WhatsApp, anders e-mail.
function prefersWhatsApp(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const mobileUA = /Android|iPhone|iPod|Mobile|Windows Phone/i.test(ua);
  const coarse =
    typeof window !== "undefined" && !!window.matchMedia?.("(pointer: coarse)")?.matches;
  return mobileUA || coarse;
}

function openWhatsApp(fields: LeadFields): void {
  const waNumber = siteConfig.phone.e164.replace(/\D/g, "");
  const message = buildMessage(fields, window.location.href);
  window.location.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

function openMailto(fields: LeadFields): void {
  const message = buildMessage(fields, window.location.href);
  window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "Offerteaanvraag via de website",
  )}&body=${encodeURIComponent(message)}`;
}

export async function submitLead(fields: LeadFields): Promise<LeadResult> {
  if (typeof window === "undefined") return "mailto";

  // Mobiel/touch: direct via WhatsApp.
  if (prefersWhatsApp()) {
    openWhatsApp(fields);
    return "whatsapp";
  }

  // Desktop: e-mail via Resend (server-side).
  try {
    const res = await fetch("/api/offerte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    if (!res.ok) throw new Error("mislukt");
    return "email";
  } catch {
    // Resend nog niet geconfigureerd of tijdelijk down: open het mailprogramma
    // zodat de aanvraag niet verloren gaat.
    openMailto(fields);
    return "mailto";
  }
}
