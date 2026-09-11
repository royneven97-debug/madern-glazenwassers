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

/** Elke aanvraag, met alle velden die het formulier had. */
export function meldAanvraag(aanvraag: Aanvraag): Promise<boolean> {
  return stuur("/api/intake", aanvraag);
}

/** Een klik op bellen, WhatsApp of e-mail. */
export function meldKlik(soort: "BELLEN" | "WHATSAPP" | "EMAIL", pagina?: string): Promise<boolean> {
  return stuur("/api/event", { soort, pagina });
}
