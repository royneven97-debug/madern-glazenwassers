// Client-side lead-afhandeling zonder backend:
// - mobiel/touch -> opent WhatsApp met de klantgegevens (owner krijgt een appje)
// - desktop      -> opent het mailprogramma met de klantgegevens (owner krijgt een mail)
import { siteConfig } from "./site";

export type LeadFields = {
  naam?: string;
  telefoon?: string;
  email?: string;
  plaats?: string;
  dienst?: string;
  bericht?: string;
};

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
  const mobileUA = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(ua);
  const coarse =
    typeof window !== "undefined" && !!window.matchMedia?.("(pointer: coarse)")?.matches;
  return mobileUA || coarse;
}

export function submitLead(fields: LeadFields): void {
  if (typeof window === "undefined") return;
  const message = buildMessage(fields, window.location.href);

  if (prefersWhatsApp()) {
    const waNumber = siteConfig.phone.e164.replace(/\D/g, "");
    window.location.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  } else {
    const subject = "Offerteaanvraag via de website";
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(message)}`;
  }
}
