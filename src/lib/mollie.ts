// Praat rechtstreeks met de Mollie API (REST v2, geen extra dependency), net
// zoals de offerteroute dat met Resend doet.
//
// Vereiste env-var (in Vercel instellen):
//   MOLLIE_API_KEY – de key uit het Mollie-dashboard (test_… of live_…)
//
// Zolang die key er niet is, valt alles netjes terug op "onbekend": de
// bedankpagina laat dan een neutrale bevestiging zien in plaats van een fout.

/** Wat de bezoeker op de bedankpagina te zien krijgt. */
export type Betaalstatus = "gelukt" | "bezig" | "mislukt" | "onbekend";

/** Mollie-betaal-id's zien er altijd zo uit; alles anders vragen we niet op. */
const ID_PATROON = /^tr_[A-Za-z0-9]+$/;

/**
 * Mollie kent zeven statussen. Voor een eerste betaling van een abonnement
 * (sequenceType "first") betekent paid/authorized dat de machtiging binnen is.
 */
function vertaal(status: string | undefined): Betaalstatus {
  switch (status) {
    case "paid":
    case "authorized":
      return "gelukt";
    case "open":
    case "pending":
      return "bezig";
    case "canceled":
    case "expired":
    case "failed":
      return "mislukt";
    default:
      return "onbekend";
  }
}

/**
 * Haalt de status van één betaling op. Mollie stuurt de bezoeker na iedere
 * afgeronde poging naar dezelfde redirectUrl — ook na een mislukking — dus
 * zonder deze controle zou de bedankpagina te vroeg juichen.
 */
export async function haalBetaalstatus(
  betalingId: string | undefined,
): Promise<Betaalstatus> {
  const key = process.env.MOLLIE_API_KEY;
  if (!key || !betalingId || !ID_PATROON.test(betalingId)) return "onbekend";

  try {
    const res = await fetch(
      `https://api.mollie.com/v2/payments/${betalingId}`,
      {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
      },
    );
    if (!res.ok) return "onbekend";

    const data = (await res.json()) as { status?: string };
    return vertaal(data.status);
  } catch {
    // Een storing bij Mollie mag de pagina niet stukmaken.
    return "onbekend";
  }
}
