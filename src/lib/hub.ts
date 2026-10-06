/**
 * Meldt aanvragen en contactklikken aan de aanvragen-hub, zodat ze bewaard
 * blijven en in het weekoverzicht verschijnen. De mail naar de klant blijft de
 * hoofdroute; dit is de kopie die niet verloren gaat.
 *
 * Faalt nooit hard: een storing bij de hub mag een aanvraag nooit tegenhouden.
 *
 * Env-vars (alleen op de server):
 *   HUB_URL  bijvoorbeeld https://aanvragen-hub.vercel.app
 *   HUB_KEY  de projectsleutel uit het dashboard
 */

const TIMEOUT_MS = 4000;

type Aanvraag = Record<string, unknown>;

async function stuur(pad: string, body: unknown): Promise<boolean> {
  const url = process.env.HUB_URL;
  const key = process.env.HUB_KEY;
  if (!url || !key) return false;

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}${pad}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Intake-Key": key },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[hub]", pad, res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[hub]", pad, "mislukt:", err);
    return false;
  }
}

/** Hoe het bezoek begon; zie components/herkomst.ts. */
export type Herkomst = { bron?: string; medium?: string; campagne?: string; landing?: string };

/**
 * Leest de herkomst uit wat de browser meestuurde. Alles wat geen korte tekst
 * is valt weg: dit komt van buiten en gaat rechtstreeks de hub in.
 */
export function herkomstUit(bron: unknown): Herkomst {
  if (typeof bron !== "object" || bron === null) return {};
  const b = bron as Record<string, unknown>;
  const veld = (v: unknown, max: number) =>
    typeof v === "string" && v ? v.slice(0, max) : undefined;
  return {
    bron: veld(b.bron, 100),
    medium: veld(b.medium, 60),
    campagne: veld(b.campagne, 100),
    landing: veld(b.landing, 200),
  };
}

/**
 * Elke aanvraag, met alle velden die het formulier had. De herkomst gaat mee
 * onder eigen namen, want "bron" betekent in de hub al de pagina van het
 * formulier.
 */
export function meldAanvraag(aanvraag: Aanvraag, herkomst?: Herkomst): Promise<boolean> {
  return stuur("/api/intake", {
    ...aanvraag,
    herkomstBron: herkomst?.bron,
    herkomstMedium: herkomst?.medium,
    herkomstCampagne: herkomst?.campagne,
    herkomstLanding: herkomst?.landing,
  });
}

/** Een klik op bellen, WhatsApp of e-mail. */
export function meldKlik(
  soort: "BELLEN" | "WHATSAPP" | "EMAIL",
  pagina?: string,
  herkomst?: Herkomst,
): Promise<boolean> {
  return stuur("/api/event", { soort, pagina, ...herkomst });
}

/** Het begin van een bezoek: één keer per tabblad, op de eerste pagina. */
export function meldBezoek(herkomst: Herkomst, apparaat?: "mobiel" | "desktop"): Promise<boolean> {
  if (!herkomst.bron) return Promise.resolve(false);
  return stuur("/api/event", { soort: "BEZOEK", apparaat, ...herkomst });
}
