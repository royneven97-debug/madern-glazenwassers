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

export type Herkomst = {
  bron?: string;
  /** utm_medium en utm_campaign, als de link die had. */
  medium?: string;
  campagne?: string;
  landing?: string;
};

const SLEUTEL = "herkomst";

// Volgorde telt: gemini.google.com moet voor de algemene Google-regel staan.
const BRONNEN: [RegExp, string][] = [
  [/(^|\.)gemini\.google\.com$/, "gemini"],
  [/(^|\.)google\.[a-z.]+$/, "google"],
  [/(^|\.)copilot\.microsoft\.com$/, "copilot"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)duckduckgo\.com$/, "duckduckgo"],
  [/(^|\.)(chatgpt\.com|chat\.openai\.com)$/, "chatgpt"],
  [/(^|\.)perplexity\.ai$/, "perplexity"],
  [/(^|\.)(facebook\.com|fb\.com)$/, "facebook"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, "linkedin"],
];

// Klik-id's die een advertentieplatform aan de link hangt.
const KLIK_IDS: [string, string][] = [
  ["gclid", "google-ads"],
  ["gbraid", "google-ads"],
  ["wbraid", "google-ads"],
  ["fbclid", "meta-ads"],
  ["msclkid", "bing-ads"],
];

function zonderWww(host: string): string {
  return host.toLowerCase().replace(/^www\./, "");
}

/** Zelfde naam voor een bron, of hij nu uit een utm_source of een verwijzer komt. */
function bronNaam(waarde: string): string {
  const w = zonderWww(waarde.trim()).slice(0, 60);
  for (const [patroon, naam] of BRONNEN) {
    if (patroon.test(w)) return naam;
  }
  return w;
}

function bepaal(): Herkomst | null {
  const url = new URL(window.location.href);
  const landing = url.pathname;
  const param = (naam: string) => url.searchParams.get(naam)?.toLowerCase().slice(0, 60) || undefined;

  const utm = url.searchParams.get("utm_source");
  if (utm) {
    return {
      bron: bronNaam(utm),
      medium: param("utm_medium"),
      campagne: param("utm_campaign"),
      landing,
    };
  }
  for (const [id, naam] of KLIK_IDS) {
    if (url.searchParams.has(id)) return { bron: naam, landing };
  }

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

  return { bron: bronNaam(host), landing };
}

/**
 * Aanroepen zodra de site laadt; doet niets als dit tabblad het al weet. Geeft
 * de herkomst terug als dit het begin van een bezoek is, zodat de aanroeper
 * dat ene bezoek kan melden, en anders null.
 */
export function onthoudHerkomst(): Herkomst | null {
  try {
    if (sessionStorage.getItem(SLEUTEL)) return null;
    const h = bepaal();
    if (!h) return null;
    sessionStorage.setItem(SLEUTEL, JSON.stringify(h));
    return h;
  } catch {
    // Privevenster of geblokkeerde opslag: dan meten we zonder herkomst.
    return null;
  }
}

/**
 * Meldt het begin van een bezoek aan de eigen /api/klik, een keer per tabblad.
 * Daarmee is te zien hoeveel bezoekers een bron oplevert, ook als ze daarna
 * nergens op klikken. Geautomatiseerde browsers tellen niet mee.
 */
export function meldBezoek(pad = "/api/klik"): void {
  const begin = onthoudHerkomst();
  if (!begin || navigator.webdriver) return;
  try {
    const apparaat = window.matchMedia("(max-width: 767px)").matches ? "mobiel" : "desktop";
    const body = JSON.stringify({ ...begin, soort: "BEZOEK", apparaat });
    const verstuurd =
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon(pad, new Blob([body], { type: "application/json" }));
    if (!verstuurd) {
      void fetch(pad, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    // Meten mag nooit in de weg zitten van het bezoek zelf.
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
