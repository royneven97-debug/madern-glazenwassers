// Werkgebied. Elke plaats heeft UNIEKE copy (geen boilerplate) om thin/duplicate
// content te voorkomen op een jong domein. Apeldoorn is de thuisbasis.

export type Plaats = {
  slug: string;
  name: string;
  // Korte, unieke omschrijving van het gebied (verschijnt op de plaatspagina)
  intro: string;
  // Lokaal detail: wijken/kernen of kenmerk — maakt de pagina uniek
  detail: string;
  primary?: boolean; // thuisbasis
};

export const plaatsen: Plaats[] = [
  {
    slug: "apeldoorn",
    name: "Apeldoorn",
    primary: true,
    intro:
      "Apeldoorn is onze thuisbasis. Madern is een Apeldoorns bedrijf, opgericht door een geboren en getogen Apeldoorner — we kennen de stad, de wijken en het weer aan de rand van de Veluwe als geen ander.",
    detail:
      "Van het centrum en Zevenhuizen tot De Maten, Osseveld, Kerschoten en Zuidbroek: voor woningen, kantoren en winkels in heel Apeldoorn maken we de ramen streepvrij schoon.",
  },
  {
    slug: "ugchelen",
    name: "Ugchelen",
    intro:
      "Ugchelen, het groene dorp tegen de bossen van de Veluwe aan, hoort bij ons directe werkgebied. Juist hier worden ramen door alle bomen sneller groen en stoffig.",
    detail:
      "We adviseren bewoners van Ugchelen graag over een passende frequentie zodat uw ramen, ondanks de bosrijke omgeving, het hele jaar helder blijven.",
  },
  {
    slug: "beekbergen",
    name: "Beekbergen",
    intro:
      "Beekbergen en Lieren liggen op een steenworp van Apeldoorn, midden in het groen. Madern verzorgt hier de glasbewassing voor woningen en bedrijven.",
    detail:
      "Van vrijstaande woningen aan de bosrand tot ondernemingen langs de doorgaande wegen — we komen graag langs voor een vrijblijvende offerte.",
  },
  {
    slug: "loenen",
    name: "Loenen",
    intro:
      "Loenen, aan de zuidkant van de gemeente Apeldoorn, valt ruim binnen ons werkgebied. Ook hier maken we ramen, etalages en zonnepanelen streepvrij schoon.",
    detail:
      "Particulier of zakelijk: we plannen flexibel, ook in het weekend, zodat het u altijd uitkomt.",
  },
  {
    slug: "vaassen",
    name: "Vaassen",
    intro:
      "Vaassen, net ten noorden van Apeldoorn in de gemeente Epe, bedienen we vanuit onze thuisbasis. Korte lijnen, persoonlijk contact en eerlijke prijzen.",
    detail:
      "Voor woningen en bedrijfspanden in Vaassen verzorgen we zowel eenmalige beurten als vaste onderhoudsafspraken.",
  },
  {
    slug: "twello",
    name: "Twello",
    intro:
      "Twello, in de gemeente Voorst tussen Apeldoorn en Deventer, hoort bij ons werkgebied. Madern maakt hier ramen en glaswerk helder met gezuiverd osmosewater.",
    detail:
      "Of het nu om uw woning, kantoor of winkel gaat — we leveren een betrouwbaar, streepvrij resultaat.",
  },
];

export const primaryPlaats = plaatsen.find((p) => p.primary)!;

export function getPlaats(slug: string): Plaats | undefined {
  return plaatsen.find((p) => p.slug === slug);
}
