// Formulier-afhandeling: elke aanvraag gaat via e-mail (SMTP, server-side)
// naar de owner. De klant kan zelf apart contact opnemen via de WhatsApp-knop;
// het formulier stuurt bewust GEEN WhatsApp namens de klant.
import { siteConfig } from "./site";
import { herkomst } from "@/components/analytics/herkomst";

export type LeadFields = {
  naam?: string;
  telefoon?: string;
  email?: string;
  adres?: string;
  plaats?: string;
  dienst?: string;
  bericht?: string;
};

export type LeadResult = "email" | "mailto";

const LABELS: [keyof LeadFields, string][] = [
  ["naam", "Naam"],
  ["telefoon", "Telefoon"],
  ["email", "E-mail"],
  ["adres", "Adres"],
  ["plaats", "Plaats"],
  ["dienst", "Dienst"],
  ["bericht", "Bericht"],
];

function buildMessage(fields: LeadFields, pageUrl: string, fotos: number): string {
  const lines = ["Nieuwe aanvraag via madernglazenwassers.nl", ""];
  for (const [key, label] of LABELS) {
    const value = fields[key]?.toString().trim();
    if (value) lines.push(`${label}: ${value}`);
  }
  // Een mailto-link kan geen bijlagen meenemen. Benoem ze dan, zodat Roy weet
  // dat er foto's zijn en ernaar kan vragen.
  if (fotos) {
    lines.push(
      `Foto's: ${fotos} gekozen, maar niet meegestuurd. Vraag de klant ze per mail te sturen.`,
    );
  }
  lines.push("", `Pagina: ${pageUrl}`);
  return lines.join("\n");
}

function openMailto(fields: LeadFields, fotos: number): void {
  const message = buildMessage(fields, window.location.href, fotos);
  window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "Offerteaanvraag via de website",
  )}&body=${encodeURIComponent(message)}`;
}

/**
 * Foto's kunnen niet in JSON mee, dus zodra er bijlagen zijn gaat de aanvraag
 * als formuliergegevens de deur uit. De route leest beide vormen.
 */
function alsFormulier(fields: LeadFields, fotos: File[]): FormData {
  const formulier = new FormData();
  for (const [sleutel, waarde] of Object.entries(fields)) {
    if (waarde) formulier.append(sleutel, waarde);
  }
  formulier.append("pagina", window.location.pathname);
  formulier.append("herkomst", JSON.stringify(herkomst()));
  for (const foto of fotos) formulier.append("fotos", foto, foto.name);
  return formulier;
}

export async function submitLead(fields: LeadFields, fotos: File[] = []): Promise<LeadResult> {
  if (typeof window === "undefined") return "mailto";

  // Altijd via e-mail (SMTP via Google Workspace, server-side).
  try {
    // pagina gaat mee zodat de aanvragen-hub weet vanaf welke pagina de
    // aanvraag kwam; zonder dit veld blijft bronPagina daar altijd leeg.
    // De herkomst (Google, Bedrijfsprofiel, direct) gaat alleen naar de hub.
    // Bij een FormData zet de browser zelf het content-type met de grens erin.
    const res = await fetch("/api/offerte", {
      method: "POST",
      ...(fotos.length
        ? { body: alsFormulier(fields, fotos) }
        : {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...fields,
              pagina: window.location.pathname,
              herkomst: herkomst(),
            }),
          }),
    });
    if (!res.ok) throw new Error("mislukt");
    return "email";
  } catch {
    // Mailserver tijdelijk niet bereikbaar: open het mailprogramma als terugval.
    openMailto(fields, fotos.length);
    return "mailto";
  }
}
