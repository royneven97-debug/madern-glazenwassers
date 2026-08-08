// Werkgebied. Elke plaats heeft UNIEKE copy (geen boilerplate) om thin/duplicate
// content te voorkomen op een jong domein. Apeldoorn is de thuisbasis.

export type PlaatsSection = { heading: string; paragraphs: string[] };

export type Plaats = {
  slug: string;
  name: string;
  // Korte, unieke omschrijving van het gebied (verschijnt op de plaatspagina)
  intro: string;
  // Lokaal detail: wijken/kernen of kenmerk, maakt de pagina uniek
  detail: string;
  // Uitgebreide, unieke long-form content per plaats (voor diepte + lokale SEO)
  sections?: PlaatsSection[];
  primary?: boolean; // thuisbasis
};

export const plaatsen: Plaats[] = [
  {
    slug: "apeldoorn",
    name: "Apeldoorn",
    primary: true,
    intro:
      "Apeldoorn is onze thuisbasis. Madern is een Apeldoorns bedrijf, opgericht door een geboren en getogen Apeldoorner, we kennen de stad, de wijken en het weer aan de rand van de Veluwe als geen ander.",
    detail:
      "Van het centrum en Zevenhuizen tot De Maten, Osseveld, Kerschoten en Zuidbroek: voor woningen, kantoren en winkels in heel Apeldoorn maken we de ramen streepvrij schoon.",
  },
  {
    slug: "apeldoorn-de-maten",
    name: "Apeldoorn De Maten",
    intro:
      "De Maten is met afstand de grootste wijk van Apeldoorn, gebouwd in de jaren zeventig en tachtig en opgezet rond woonerven, water en veel groen. Madern wast hier de ramen van honderden eengezinswoningen, hoekwoningen en appartementen.",
    detail:
      "Van Matenhoeve en Matendonk tot Matenveld en de flats langs de Laan van de Dierenriem: wij kennen de wijk en plannen onze routes zo dat we meerdere adressen in dezelfde straat op één dag doen.",
    sections: [
      {
        heading: "Glazenwasser in De Maten",
        paragraphs: [
          "De woningen in De Maten hebben vaak grote raampartijen aan de tuinzijde en veel kozijnwerk, precies het soort glas waar strepen en kalkranden meteen opvallen. Wij wassen uw ramen met gezuiverd osmosewater, dat volledig vlekkeloos opdroogt en geen mineralen achterlaat. Daardoor blijven ze ook langer helder dan bij zemen met leidingwater.",
          "Doordat De Maten een compacte wijk is met veel gelijkvormige woningen, kunnen we hier scherp plannen. Woont u in dezelfde straat als een bestaande klant, dan kunnen we uw ramen vaak in dezelfde ronde meenemen, wat de prijs per beurt gunstig houdt.",
        ],
      },
      {
        heading: "Veel groen en water, dus sneller vuil",
        paragraphs: [
          "De wijk is bewust groen aangelegd, met plantsoenen, bomen langs de woonerven en de vijverpartijen rond de Matenpoort. Dat is prettig wonen, maar het betekent ook stuifmeel in het voorjaar, bladresten in het najaar en groene aanslag op noordgevels. Voor de meeste woningen in De Maten adviseren we vier tot zes beurten per jaar.",
          "Naast de ramen verzorgen we in De Maten ook het schoonmaken van dakgoten en zonnepanelen. Door dat in één afspraak te combineren bent u er in één keer vanaf en heeft u één aanspreekpunt voor het onderhoud van uw woning.",
        ],
      },
    ],
  },
  {
    slug: "apeldoorn-zuid",
    name: "Apeldoorn Zuid",
    intro:
      "Apeldoorn Zuid loopt van Kerschoten en de Sprengenweg tot aan Ugchelen en de zuidelijke rand van de stad. Het is een gevarieerd deel van Apeldoorn, met vooroorlogse woningen, jaren dertig panden en ruime villa's tegen de bossen aan.",
    detail:
      "Juist die variatie maakt het werk hier afwisselend: van hoge schuiframen in een oud herenhuis tot moderne kozijnen in een nieuwbouwwoning, wij hebben er het juiste materiaal voor.",
    sections: [
      {
        heading: "Glazenwasser in Apeldoorn Zuid",
        paragraphs: [
          "In het zuiden van Apeldoorn staan veel woningen met karakter: hoge ramen, glas in lood, erkers en serres. Dat vraagt om zorgvuldigheid, want oud glas en verweerde kozijnen zijn kwetsbaarder dan modern isolatieglas. Wij werken met zacht osmosewater en watergevoede telescoopstelen, zodat we ook hoger gelegen ramen veilig vanaf de begane grond bereiken, zonder ladders tegen uw gevel.",
          "Voor woningen met veel glasoppervlak is een vast schema meestal het voordeligst. U betaalt dan een gunstiger tarief per beurt en heeft er verder geen omkijken naar.",
        ],
      },
      {
        heading: "Tegen de bossen aan",
        paragraphs: [
          "Hoe dichter u bij Ugchelen en de Veluwse bossen woont, hoe sneller ramen groen en stoffig worden. Stuifmeel, bladresten en algen hechten zich aan het glas en aan de gevel, zeker op de noordkant. Bewoners van Apeldoorn Zuid kiezen daarom vaak voor een iets hogere frequentie dan gemiddeld.",
          "Ook gevelreiniging en het schoonmaken van dakgoten spelen hier meer dan elders in de stad. We bekijken tijdens een gratis inventarisatie wat uw woning nodig heeft en stellen daar een passend voorstel bij op.",
        ],
      },
    ],
  },
  {
    slug: "ugchelen",
    name: "Ugchelen",
    intro:
      "Ugchelen, het groene dorp tegen de bossen van de Veluwe aan, hoort bij ons directe werkgebied. Juist hier worden ramen door alle bomen sneller groen en stoffig.",
    detail:
      "We adviseren bewoners van Ugchelen graag over een passende frequentie zodat uw ramen, ondanks de bosrijke omgeving, het hele jaar helder blijven.",
    sections: [
      {
        heading: "Ramen wassen tussen de bossen van de Veluwe",
        paragraphs: [
          "Ugchelen ligt letterlijk tegen de bossen en sprengen van de Veluwe aan, en dat is precies waarom glasbewassing hier wat extra aandacht vraagt. Door alle bomen en het vele groen krijgen ramen, kozijnen en gevels sneller te maken met stuifmeel, bladresten en groene aanslag dan in een stenige stadsomgeving. Wij wassen uw ramen met gezuiverd osmosewater, dat volledig streepvrij opdroogt en het vuil langer op afstand houdt.",
          "Voor veel Ugchelense woningen adviseren we daarom een iets hogere frequentie, bijvoorbeeld vier tot acht keer per jaar, zodat uw ramen ondanks de bosrijke ligging het hele jaar helder blijven. Tijdens een gratis inventarisatie bekijken we uw situatie en stellen we samen een passend schema op.",
        ],
      },
      {
        heading: "Villa's en woningen met veel glas",
        paragraphs: [
          "Ugchelen kent veel vrijstaande woningen en villa's met grote raampartijen, serres en hoge gevels. Juist die grote glasoppervlakken vallen op zodra ze dof of gevlekt zijn. Met onze watergevoede telescoopstelen bereiken we ook hoger gelegen ramen veilig vanaf de begane grond, zonder ladders in uw borders en zonder risico voor uw beplanting.",
          "Op verzoek nemen we de binnenkant, de kozijnen en het glaswerk van deuren en serres mee, zodat uw hele woning er weer verzorgd uitziet.",
        ],
      },
      {
        heading: "Ook gevel, dakgoot en zonnepanelen",
        paragraphs: [
          "De groene omgeving vraagt om meer dan alleen schone ramen. Op noordgevels en onder dakranden ontstaat sneller mos en algen, dakgoten raken in het najaar vol met bladeren, en zonnepanelen leveren minder op door stuifmeel en schaduw. Madern combineert dit graag in één afspraak, zodat u met één vast aanspreekpunt uw hele woning in Ugchelen onderhoudt.",
        ],
      },
    ],
  },
  {
    slug: "beekbergen",
    name: "Beekbergen",
    intro:
      "Beekbergen en Lieren liggen op een steenworp van Apeldoorn, midden in het groen. Madern verzorgt hier de glasbewassing voor woningen en bedrijven.",
    detail:
      "Van vrijstaande woningen aan de bosrand tot ondernemingen langs de doorgaande wegen, we komen graag langs voor een vrijblijvende offerte.",
    sections: [
      {
        heading: "Glasbewassing in Beekbergen en Lieren",
        paragraphs: [
          "Beekbergen en het naastgelegen Lieren liggen midden in het groen, op een steenworp ten zuiden van Apeldoorn. De bosrijke omgeving is prachtig om in te wonen, maar zorgt er ook voor dat ramen, gevels en dakgoten sneller vervuilen door bladeren, stuifmeel en groene aanslag. Madern maakt uw ramen hier streepvrij schoon met gezuiverd osmosewater, zonder agressieve middelen en met een langdurig helder resultaat.",
          "Woont u aan de bosrand, dan adviseren we u graag over een frequentie die bij uw situatie past, zodat uw ramen het hele jaar door helder blijven.",
        ],
      },
      {
        heading: "Voor recreatie, horeca en bedrijven",
        paragraphs: [
          "Beekbergen is een echt recreatiedorp, met campings, vakantieparken, horeca en verblijfsrecreatie. Juist voor die bedrijven telt een verzorgde, uitnodigende uitstraling: schone ramen en heldere entrees maken meteen een goede indruk op uw gasten. We werken met vaste onderhoudscontracten en plannen het glazenwassen op momenten die u het beste uitkomen, bijvoorbeeld voor openingstijd of buiten het hoogseizoen.",
        ],
      },
      {
        heading: "Landelijk wonen vraagt meer onderhoud",
        paragraphs: [
          "Naast ramen verzorgen we in Beekbergen en Lieren ook gevelreiniging, het schoonmaken van dakgoten en het schoonmaken van zonnepanelen. In een groene omgeving hopen mos en bladeren zich nu eenmaal sneller op. Door meerdere klussen te combineren in één afspraak bespaart u tijd en heeft u één vast aanspreekpunt voor het onderhoud van uw woning of bedrijf.",
        ],
      },
    ],
  },
  {
    slug: "loenen",
    name: "Loenen",
    intro:
      "Loenen, aan de zuidkant van de gemeente Apeldoorn, valt ruim binnen ons werkgebied. Ook hier maken we ramen, etalages en zonnepanelen streepvrij schoon.",
    detail:
      "Particulier of zakelijk: we plannen flexibel, ook in het weekend, zodat het u altijd uitkomt.",
    sections: [
      {
        heading: "Glazenwasser in Loenen en omgeving",
        paragraphs: [
          "Loenen ligt landelijk aan de zuidkant van de gemeente Apeldoorn, bekend om de waterval en de uitgestrekte bossen van het Loenermark. Die groene ligging is heerlijk, maar zorgt ook voor snellere vervuiling van ramen, gevels en dakgoten. Wij wassen uw ramen met gezuiverd osmosewater voor een streepvrij resultaat dat langer mooi blijft, helemaal zonder agressieve chemicaliën.",
        ],
      },
      {
        heading: "Particulier én zakelijk in Loenen",
        paragraphs: [
          "Loenen combineert rustige woonkernen met de nodige bedrijvigheid langs de doorgaande wegen en op de bedrijventerreinen. Madern verzorgt hier zowel de ramen van particuliere woningen als de complete glasbewassing van bedrijfspanden, winkels en kantoren. Eenmalig of met een vast schema, u kiest wat het beste bij u past.",
          "Doordat we flexibel plannen, ook in het weekend, komt een afspraak u altijd goed uit.",
        ],
      },
      {
        heading: "Gevel, dakgoot en zonnepanelen",
        paragraphs: [
          "Door de bosrijke omgeving krijgen gevels in Loenen sneller te maken met algen en groene aanslag, raken dakgoten in het najaar verstopt en verliezen zonnepanelen rendement door stof en blad. We nemen deze klussen graag mee, zodat uw woning of pand er van boven tot onder weer verzorgd bij staat.",
        ],
      },
    ],
  },
  {
    slug: "vaassen",
    name: "Vaassen",
    intro:
      "Vaassen, net ten noorden van Apeldoorn in de gemeente Epe, bedienen we vanuit onze thuisbasis. Korte lijnen, persoonlijk contact en eerlijke prijzen.",
    detail:
      "Voor woningen en bedrijfspanden in Vaassen verzorgen we zowel eenmalige beurten als vaste onderhoudsafspraken.",
    sections: [
      {
        heading: "Ramen wassen in Vaassen",
        paragraphs: [
          "Vaassen ligt net ten noorden van Apeldoorn, in de gemeente Epe, en is vooral bekend van het historische Kasteel Cannenburch. Het dorp kent een mooie mix van karakteristieke, oudere panden en moderne nieuwbouwwijken. Voor allebei geldt: met schone, streepvrije ramen oogt uw woning of pand meteen verzorgder. Wij werken met gezuiverd osmosewater voor een langdurig helder resultaat zonder chemicaliën.",
        ],
      },
      {
        heading: "Voor woningen en bedrijfspanden",
        paragraphs: [
          "Van gezinswoningen in de woonwijken tot ondernemers op de bedrijventerreinen: Madern verzorgt in Vaassen de glasbewassing voor particulier en zakelijk. Dankzij onze korte lijnen vanuit Apeldoorn plannen we flexibel, ook in het weekend, en heeft u altijd een vast aanspreekpunt dat u kent.",
          "U kiest zelf voor een eenmalige beurt of een vast onderhoudscontract, met een eerlijke prijs die u vooraf kent.",
        ],
      },
      {
        heading: "Meer dan alleen ramen",
        paragraphs: [
          "Naast het wassen van ramen reinigen we in Vaassen ook gevels, dakgoten en zonnepanelen. Handig om te combineren: in één afspraak staat uw hele woning of bedrijfspand er weer fris bij, zonder dat u meerdere partijen hoeft in te schakelen.",
        ],
      },
    ],
  },
  {
    slug: "twello",
    name: "Twello",
    intro:
      "Twello, in de gemeente Voorst tussen Apeldoorn en Deventer, hoort bij ons werkgebied. Madern maakt hier ramen en glaswerk helder met gezuiverd osmosewater.",
    detail:
      "Of het nu om uw woning, kantoor of winkel gaat, we leveren een betrouwbaar, streepvrij resultaat.",
    sections: [
      {
        heading: "Glazenwasser in Twello",
        paragraphs: [
          "Twello is de grootste kern van de gemeente Voorst en ligt in de groene IJsselstreek tussen Apeldoorn en Deventer. Het is een geliefd forensendorp met veel woningen, omringd door landelijk gebied en landgoederen. Madern maakt hier ramen en glaswerk streepvrij schoon met gezuiverd osmosewater, voor een resultaat dat ook zonder chemicaliën langer helder blijft.",
        ],
      },
      {
        heading: "Van woonwijk tot bedrijventerrein",
        paragraphs: [
          "In Twello verzorgen we zowel de ramen van particuliere woningen als de glasbewassing van winkels in het centrum en bedrijven op de bedrijventerreinen. Of het nu om een eenmalige beurt of een vast onderhoudscontract gaat, u krijgt bij ons een eerlijke prijs vooraf en vakwerk met een persoonlijke aanpak.",
        ],
      },
      {
        heading: "Landelijk wonen bij de IJssel",
        paragraphs: [
          "De landelijke ligging bij de IJssel is prachtig, maar zorgt door het vele groen en vocht ook voor algen op gevels, blad in de dakgoten en aanslag op zonnepanelen. Die klussen nemen we graag mee, zodat u met één vast aanspreekpunt uw hele woning of pand in Twello onderhoudt.",
        ],
      },
    ],
  },
];

export const primaryPlaats = plaatsen.find((p) => p.primary)!;

// Plaatsen die een eigen /glazenwasser-[plaats] pagina krijgen (Apeldoorn = homepage).
export const locatiePlaatsen = plaatsen.filter((p) => !p.primary);

export function getPlaats(slug: string): Plaats | undefined {
  return plaatsen.find((p) => p.slug === slug);
}

// Link naar de plaats: Apeldoorn → homepage, rest → /glazenwasser-[plaats].
export function plaatsHref(p: Plaats): string {
  return p.primary ? "/" : `/glazenwasser-${p.slug}`;
}

// URL-segment voor de locatiepagina, bijv. "glazenwasser-vaassen".
export function locatieSlug(p: Plaats): string {
  return `glazenwasser-${p.slug}`;
}

// Zoek een plaats op basis van het volledige locatie-segment ("glazenwasser-vaassen").
export function getPlaatsByLocatie(locatie: string): Plaats | undefined {
  if (!locatie.startsWith("glazenwasser-")) return undefined;
  const slug = locatie.replace(/^glazenwasser-/, "");
  const p = plaatsen.find((x) => x.slug === slug);
  // Apeldoorn heeft geen eigen locatiepagina (dat is de homepage).
  return p && !p.primary ? p : undefined;
}
