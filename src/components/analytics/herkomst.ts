/**
 * Hoe het bezoek begon: via welke bron en op welke pagina. Wordt op de eerste
 * pagina van een tabblad bepaald en in sessionStorage bewaard, zodat een klik
 * op bellen later in het bezoek nog weet dat de bezoeker via Google op een
 * plaatspagina binnenkwam.
 *
 * Geen cookie en geen bezoeker-id: sessionStorage verdwijnt met het tabblad en
 * gaat nooit vanzelf mee met een verzoek. Het zoekwoord zelf geeft Google niet
 * mee, dus "google" is het meeste wat er te weten valt.
 */

export type Herkomst = { bron?: string; landing?: string };

const SLEUTEL = "herkomst";

const BRONNEN: [RegExp, string][] = [
  [/(^|\.)google\.[a-z.]+$/, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)duckduckgo\.com$/, "duckduckgo"],
  [/(^|\.)(facebook\.com|fb\.com)$/, "facebook"],
  [/(^|\.)instagram\.com$/, "instagram"],
];

function zonderWww(host: string): string {
  return host.toLowerCase().replace(/^www\./, "");
}

function bepaal(): Herkomst | null {
  const url = new URL(window.location.href);
  const landing = url.pathname;

  const utm = url.searchParams.get("utm_source");
  if (utm) return { bron: utm.toLowerCase().slice(0, 60), landing };
  if (url.searchParams.has("gclid")) return { bron: "google-ads", landing };

  // Geen verwijzer: adres getypt, bladwijzer, of een app die hem weglaat
  // (Google Maps, WhatsApp, Instagram in de app).
  if (!document.referrer) return { bron: "direct", landing };

  let host: string;
  try {
    host = zonderWww(new URL(document.referrer).hostname);
  } catch {
    return { bron: "direct", landing };
  }

  // De site zelf als verwijzer: een nieuw tabblad vanaf de eigen site. Het
  // echte begin van het bezoek is dan niet meer te achterhalen.
  if (host === zonderWww(url.hostname)) return null;

  for (const [patroon, naam] of BRONNEN) {
    if (patroon.test(host)) return { bron: naam, landing };
  }
  return { bron: host, landing };
}

/** Aanroepen zodra de site laadt; doet niets als dit tabblad het al weet. */
export function onthoudHerkomst(): void {
  try {
    if (sessionStorage.getItem(SLEUTEL)) return;
    const h = bepaal();
    if (h) sessionStorage.setItem(SLEUTEL, JSON.stringify(h));
  } catch {
    // Privevenster of geblokkeerde opslag: dan meten we zonder herkomst.
  }
}

export function herkomst(): Herkomst {
  try {
    const opgeslagen = sessionStorage.getItem(SLEUTEL);
    return opgeslagen ? (JSON.parse(opgeslagen) as Herkomst) : {};
  } catch {
    return {};
  }
}
