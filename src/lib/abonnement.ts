// Rekenmodel achter het GlansPlan. Alle bedragen en tijden staan hier bij
// elkaar, zodat een tarief bijstellen niets aan de opmaak verandert.
//
// Het model rekent in tijd, niet in losse raamprijzen: per bezoek een vaste
// opstarttijd (aanrijden, opbouwen) plus een aantal minuten per raam, maal het
// uurtarief. Bij €45/uur komt dat neer op €7,50 opstart en €1,25 per raam.

export const TARIEVEN = {
  /** Uurtarief binnen een abonnement. */
  uurtariefAbonnement: 45,
  /** Uurtarief voor losse opdrachten, alleen gebruikt in de vergelijking. */
  uurtariefLos: 60,
  /** Aanrijden en opbouwen, per bezoek. */
  opstartMinuten: 10,
  /** Een raam van circa 1 × 1,5 m, buitenzijde. */
  minutenPerRaamBuiten: 1.67,
  /** Binnen kost per raam ongeveer evenveel: geen ladder, wel spullen verzetten. */
  minutenPerRaamBinnen: 1.67,
  /** Onder dit bedrag rijden we niet uit. */
  minimumPerBeurt: 30,
  /** Prijs per zonnepaneel, vanaf het aantal waarop het minimum wordt gehaald. */
  prijsPerZonnepaneel: 2.5,
  /**
   * Bodembedrag voor het reinigen van de panelen. Ook voor een handvol panelen
   * moeten de spullen erbij worden gepakt; onder dit bedrag doen we het niet.
   * Bij €2,50 per paneel gaat de prijs dus pas vanaf 10 panelen omhoog.
   */
  minimumZonnepanelen: 25,
} as const;

export type OptieKey =
  | "schuifwanden"
  | "verandadak"
  | "houtwerk"
  | "goten"
  | "zonnepanelen";

export type Optie = {
  key: OptieKey;
  label: string;
  /** Vaste prijs per keer. */
  prijs?: number;
  /** Of een prijs per stuk, waarbij het aantal uit de rekentool komt. */
  prijsPerStuk?: number;
  /** Bodembedrag bij een prijs per stuk: onder dit bedrag rijden we niet uit. */
  minimum?: number;
  /** Alle opties rekenen we één keer per jaar. */
  perJaar: number;
};

export const ZONNEPANELEN: Optie = {
  key: "zonnepanelen",
  label: "Zonnepanelen reinigen",
  prijsPerStuk: TARIEVEN.prijsPerZonnepaneel,
  minimum: TARIEVEN.minimumZonnepanelen,
  perJaar: 1,
};

export const OPTIES: Optie[] = [
  ZONNEPANELEN,
  { key: "schuifwanden", label: "Veranda schuifwanden", prijs: 30, perJaar: 1 },
  { key: "verandadak", label: "Veranda dak, binnen én buiten", prijs: 30, perJaar: 1 },
  { key: "houtwerk", label: "Houtwerk van het huis", prijs: 200, perJaar: 1 },
  { key: "goten", label: "Goten legen", prijs: 25, perJaar: 1 },
];

export type PakketId = "brons" | "zilver" | "goud";

export type Pakket = {
  id: PakketId;
  naam: string;
  tag: string;
  accent: string;
  /** Aantal buitenwasbeurten per jaar. */
  beurtenPerJaar: number;
  /** Hoe vaak de binnenzijde meegaat, tijdens een reguliere beurt. */
  binnenPerJaar: number;
  /** Opties die standaard in het pakket zitten en dus altijd meetellen. */
  inbegrepen: OptieKey[];
  /** Vaste regels in de kaart; de frequentieregel komt uit de berekening. */
  features: string[];
};

export const PAKKETTEN: Pakket[] = [
  {
    id: "brons",
    naam: "Brons",
    tag: "Frisse basis",
    accent: "#b46a1c",
    beurtenPerJaar: 4,
    binnenPerJaar: 0,
    inbegrepen: [],
    features: ["Kozijnen bij iedere beurt afgenomen"],
  },
  {
    id: "zilver",
    naam: "Zilver",
    tag: "Extra verzorgd",
    accent: "#94a3b1",
    beurtenPerJaar: 6,
    binnenPerJaar: 1,
    inbegrepen: [],
    features: ["Kozijnen intensief gereinigd"],
  },
  {
    id: "goud",
    naam: "Goud",
    tag: "Grondig compleet",
    accent: "#e0ac0f",
    beurtenPerJaar: 6,
    binnenPerJaar: 2,
    inbegrepen: ["houtwerk"],
    features: ["Intensieve glas- en kozijnreiniging"],
  },
];

export type Keuze = Record<OptieKey, boolean>;

export const GEEN_OPTIES: Keuze = {
  schuifwanden: false,
  verandadak: false,
  houtwerk: false,
  goten: false,
  zonnepanelen: false,
};

/** Alles wat de bezoeker in de rekentool invult. */
export type Invoer = {
  /** Blijft staan zoals aangeklikt, ook als daarna het aantal ramen wijzigt. */
  woningtype: string;
  ramen: number;
  panelen: number;
  keuze: Keuze;
};

export type Berekening = {
  pakket: Pakket;
  /** Prijs van één buitenwasbeurt, inclusief opstart en na het minimum. */
  prijsPerBeurt: number;
  /** Meerprijs als de binnenzijde tijdens een beurt meegaat. */
  binnenMeerprijs: number;
  /** Opties die de klant aanvinkte en apart in rekening komen. */
  extraOpties: Optie[];
  jaarTotaal: number;
  perMaand: number;
};

const prijsPerMinuut = (uurtarief: number) => uurtarief / 60;

/** Prijs van één wasbeurt buiten: opstart plus de ramen, met het minimum als bodem. */
export function prijsPerBeurt(ramen: number): number {
  const minuten = TARIEVEN.opstartMinuten + ramen * TARIEVEN.minutenPerRaamBuiten;
  const prijs = minuten * prijsPerMinuut(TARIEVEN.uurtariefAbonnement);
  return Math.max(TARIEVEN.minimumPerBeurt, prijs);
}

/** Meerprijs voor de binnenzijde tijdens een beurt: geen extra opstart, alleen ramen. */
export function binnenMeerprijs(ramen: number): number {
  return ramen * TARIEVEN.minutenPerRaamBinnen * prijsPerMinuut(TARIEVEN.uurtariefAbonnement);
}

/** Wat een optie per keer kost; bij zonnepanelen hangt dat van het aantal af. */
export function optiePrijs(optie: Optie, panelen: number): number {
  if (optie.prijsPerStuk !== undefined) {
    return Math.max(optie.minimum ?? 0, optie.prijsPerStuk * panelen);
  }
  return optie.prijs ?? 0;
}

/** Regel zoals die in de kaart komt te staan, inclusief het aantal panelen. */
export function optieOmschrijving(optie: Optie, panelen: number): string {
  if (optie.key === "zonnepanelen") return `${optie.label}, ${panelen} stuks`;
  return optie.label;
}

export function berekenPakket(pakket: Pakket, invoer: Invoer): Berekening {
  const { ramen, panelen, keuze } = invoer;
  const beurt = prijsPerBeurt(ramen);
  const binnen = binnenMeerprijs(ramen);

  // Opties die het pakket zelf al bevat rekenen we altijd mee, ook als de klant
  // ze niet aanvinkte: het werk zit nu eenmaal in het abonnement.
  const inbegrepenOpties = OPTIES.filter((o) => pakket.inbegrepen.includes(o.key));
  const aangevinkt = OPTIES.filter((o) => keuze[o.key]);
  const extraOpties = aangevinkt.filter((o) => !pakket.inbegrepen.includes(o.key));

  const optieKosten = [...inbegrepenOpties, ...extraOpties].reduce(
    (som, o) => som + optiePrijs(o, panelen) * o.perJaar,
    0,
  );

  const jaarTotaal =
    pakket.beurtenPerJaar * beurt + pakket.binnenPerJaar * binnen + optieKosten;

  return {
    pakket,
    prijsPerBeurt: beurt,
    binnenMeerprijs: binnen,
    extraOpties,
    jaarTotaal,
    perMaand: jaarTotaal / 12,
  };
}

export type Woningtype = { label: string; ramen: number };

// Startpunten zodat niemand eerst zijn hele huis hoeft te tellen.
export const WONINGTYPES: Woningtype[] = [
  { label: "Appartement", ramen: 8 },
  { label: "Tussenwoning", ramen: 14 },
  { label: "Hoek- of 2-onder-1-kap", ramen: 20 },
  { label: "Vrijstaand", ramen: 28 },
];

export const WONINGTYPE_STANDAARD = "Tussenwoning";

export const RAMEN_MIN = 4;
export const RAMEN_MAX = 60;
export const RAMEN_STANDAARD = 14;

export const PANELEN_MIN = 2;
export const PANELEN_MAX = 40;
export const PANELEN_STANDAARD = 10;

/** Hele euro's; de tool geeft een indicatie, geen offerte tot op de cent. */
export const euro = (bedrag: number) => `€${Math.round(bedrag)}`;

/** Samenvatting die met de offerteaanvraag meegaat, zodat Roy de invoer ziet. */
export function berekeningSamenvatting(b: Berekening, invoer: Invoer): string {
  const regels = [
    `Berekening via de website (indicatie):`,
    `Pakket: ${b.pakket.naam}`,
    `Woningtype: ${invoer.woningtype}`,
    `Aantal ramen: ${invoer.ramen}`,
    `Frequentie: ${b.pakket.beurtenPerJaar}× per jaar buiten` +
      (b.pakket.binnenPerJaar > 0 ? `, ${b.pakket.binnenPerJaar}× per jaar binnen` : ""),
  ];

  // Wat het pakket zelf al doet, plus wat de bezoeker extra aanvinkte.
  const labels = new Set<string>();
  for (const key of b.pakket.inbegrepen) {
    const optie = OPTIES.find((o) => o.key === key);
    if (optie) labels.add(optieOmschrijving(optie, invoer.panelen));
  }
  for (const optie of b.extraOpties) {
    labels.add(optieOmschrijving(optie, invoer.panelen));
  }
  const alleOpties = [...labels];

  regels.push(`Extra werk: ${alleOpties.length > 0 ? alleOpties.join(", ") : "geen"}`);
  regels.push(`Indicatie: ± ${euro(b.perMaand)} per maand (${euro(b.jaarTotaal)} per jaar)`);

  return regels.join("\n");
}
