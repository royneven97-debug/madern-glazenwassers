// Diensten-registry. Pagina's worden hieruit gegenereerd, dus scope wijzigen = één regel.
// `available: false` → pagina/links worden niet getoond (bouwt niets dat Madern niet levert).
//
// SEO-methode: de slug = puur het zoekwoord, en `title` (de H1) is EXACT gelijk
// aan dat zoekwoord (kebab → spaties). De langere SEO <title> staat in `metaTitle`.

export type Service = {
  slug: string;
  available: boolean;
  audience: "particulier" | "zakelijk" | "beide";
  // Korte naam (nav/cards)
  name: string;
  // H1 — EXACT het zoekwoord (= slug zonder streepjes)
  title: string;
  // Voor metadata (<title>)
  metaTitle: string;
  metaDescription: string;
  // Korte tagline (cards)
  tagline: string;
  // Intro-paragraaf (hero op dienstpagina)
  intro: string;
  // Belangrijkste keyword(s) waar deze pagina op mikt
  keywords: string[];
  // USP-/uitleg-blokken op de pagina
  highlights: { title: string; body: string }[];
  // Veelgestelde vragen (FAQ-schema)
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "glazenwassen-particulier",
    available: true,
    audience: "particulier",
    name: "Glazenwassen particulier",
    title: "Glazenwassen particulier",
    metaTitle: "Glazenwasser particulier Apeldoorn | Ramen wassen | Madern",
    metaDescription:
      "Stralend schone ramen voor uw woning in Apeldoorn. Binnen- én buitenkant, streepvrij met osmosewater. Flexibele afspraken, ook in het weekend. Gratis offerte.",
    tagline: "Stralend schone ramen voor uw woning.",
    intro:
      "Eerste indrukken tellen — ook bij uw eigen huis. Madern Glazenwassers maakt alle soorten ramen aan de binnen- en buitenkant perfect schoon, streepvrij en zonder gedoe. We werken met gezuiverd osmosewater voor een langdurig helder resultaat zonder chemicaliën.",
    keywords: [
      "glazenwasser particulier Apeldoorn",
      "ramen wassen Apeldoorn",
      "ramen laten wassen",
    ],
    highlights: [
      {
        title: "Binnen én buiten",
        body: "Alle soorten ramen, kozijnen en glasoppervlakken — aan beide kanten perfect schoon.",
      },
      {
        title: "Streepvrij met osmosewater",
        body: "Gezuiverd water laat geen kalk of strepen achter en houdt uw ramen langer helder, zonder chemicaliën.",
      },
      {
        title: "Vaste frequentie of eenmalig",
        body: "Een vast schema (bijvoorbeeld 4–8 keer per jaar) of een eenmalige beurt — u kiest.",
      },
    ],
    faqs: [
      {
        q: "Hoe vaak laat ik mijn ramen het beste wassen?",
        a: "Voor de meeste woningen werkt 4 tot 8 keer per jaar goed. In een drukke of bosrijke omgeving worden ramen sneller vuil; we adviseren u graag een passende frequentie.",
      },
      {
        q: "Maken jullie ook de binnenkant van de ramen schoon?",
        a: "Ja. We maken zowel de binnen- als de buitenkant schoon, inclusief kozijnen op verzoek.",
      },
      {
        q: "Moet ik thuis zijn tijdens het glazenwassen?",
        a: "Voor de buitenkant niet per se. Voor de binnenkant maken we een afspraak die u uitkomt — ook in het weekend mogelijk.",
      },
    ],
  },
  {
    slug: "glazenwassen-zakelijk",
    available: true,
    audience: "zakelijk",
    name: "Glazenwassen zakelijk",
    title: "Glazenwassen zakelijk",
    metaTitle: "Glazenwasser zakelijk Apeldoorn | Kantoren & bedrijfspanden | Madern",
    metaDescription:
      "Professionele glazenwasser voor kantoren en bedrijfspanden in Apeldoorn. Vaste contracten met flexibele frequentie, betrouwbaar en streepvrij. Vraag een offerte aan.",
    tagline: "Representatieve panden, vaste afspraken.",
    intro:
      "Een verzorgd pand straalt vertrouwen uit naar uw klanten en medewerkers. Madern Glazenwassers verzorgt de glasbewassing van kantoren en bedrijfspanden in Apeldoorn en omgeving, met vaste contracten en een frequentie die bij u past.",
    keywords: [
      "glazenwasser zakelijk Apeldoorn",
      "glazenwasser bedrijven Apeldoorn",
      "glasbewassing kantoor Apeldoorn",
    ],
    highlights: [
      {
        title: "Vaste contracten",
        body: "Een vast schema en vast aanspreekpunt. U hoeft er niet meer naar om te kijken.",
      },
      {
        title: "Flexibele frequentie",
        body: "Wekelijks, maandelijks of per kwartaal — afgestemd op uw pand en budget.",
      },
      {
        title: "Betrouwbaar en discreet",
        body: "Op afgesproken momenten, met respect voor uw bedrijfsproces en uw bezoekers.",
      },
    ],
    faqs: [
      {
        q: "Werken jullie met vaste contracten voor bedrijven?",
        a: "Ja. We stellen een onderhoudscontract op met een vaste frequentie en een vast tarief, zodat u nergens omkijken naar heeft.",
      },
      {
        q: "Kunnen jullie buiten kantooruren werken?",
        a: "Zeker. We plannen het glazenwassen op momenten die uw bedrijfsvoering het minst storen, ook vroeg of in het weekend.",
      },
    ],
  },
  {
    slug: "etalage-reinigen",
    available: true,
    audience: "zakelijk",
    name: "Etalage reinigen",
    title: "Etalage reinigen",
    metaTitle: "Etalage & winkelruiten reinigen Apeldoorn | Madern Glazenwassers",
    metaDescription:
      "Kristalheldere etalages en winkelruiten in Apeldoorn. Een uitnodigende uitstraling voor uw winkel, met flexibele en frequente schoonmaak. Vraag een offerte aan.",
    tagline: "Een uitnodigende etalage trekt klanten.",
    intro:
      "Eerste indrukken tellen. Wij houden uw etalages en winkelruiten kristalhelder voor een uitnodigend uiterlijk dat klanten naar binnen trekt. Frequent en flexibel, zodat uw winkel er altijd op zijn best uitziet.",
    keywords: [
      "etalage reinigen Apeldoorn",
      "winkelruiten wassen Apeldoorn",
      "glazenwasser winkel Apeldoorn",
    ],
    highlights: [
      {
        title: "Hoge frequentie mogelijk",
        body: "Dagelijks of wekelijks — etalages worden snel vuil, wij houden ze helder.",
      },
      {
        title: "Voor of na openingstijd",
        body: "We werken op momenten die uw winkel niet storen.",
      },
      {
        title: "Streepvrij resultaat",
        body: "Met osmosewater geen strepen of kalkranden op uw etalageruiten.",
      },
    ],
    faqs: [
      {
        q: "Hoe vaak moeten etalageruiten worden gewassen?",
        a: "Etalages worden snel vuil door verkeer en weer. Veel winkels kiezen voor wekelijks; voor drukke locaties is vaker aan te raden.",
      },
    ],
  },
  {
    slug: "zonnepanelen-reinigen",
    available: true,
    audience: "beide",
    name: "Zonnepanelen reinigen",
    title: "Zonnepanelen reinigen",
    metaTitle: "Zonnepanelen reinigen Apeldoorn | Meer opbrengst | Madern",
    metaDescription:
      "Vuile zonnepanelen leveren minder op. Madern reinigt uw zonnepanelen in Apeldoorn streepvrij met osmosewater, veilig en zonder krassen. Vraag een offerte aan.",
    tagline: "Schone panelen, meer rendement.",
    intro:
      "Stof, mos en vogelpoep verminderen de opbrengst van uw zonnepanelen. Madern reinigt uw panelen veilig en streepvrij met gezuiverd osmosewater — zonder agressieve middelen die de coating kunnen aantasten — zodat ze weer maximaal renderen.",
    keywords: [
      "zonnepanelen reinigen Apeldoorn",
      "zonnepanelen schoonmaken Apeldoorn",
    ],
    highlights: [
      {
        title: "Meer opbrengst",
        body: "Schone panelen vangen meer licht op. Reinigen verdient zichzelf vaak terug.",
      },
      {
        title: "Veilig en krasvrij",
        body: "Met zacht, gezuiverd water en het juiste gereedschap, zonder de coating te beschadigen.",
      },
      {
        title: "Zonder chemicaliën",
        body: "Osmosewater laat geen residu achter en is beter voor uw panelen en het milieu.",
      },
    ],
    faqs: [
      {
        q: "Hoe vaak moet ik mijn zonnepanelen laten reinigen?",
        a: "Eén tot twee keer per jaar is voor de meeste daken voldoende. Bij veel bomen of een plat dak kan vaker lonen.",
      },
      {
        q: "Beschadigt het reinigen mijn panelen niet?",
        a: "Nee. We gebruiken zacht osmosewater en zachte borstels, speciaal geschikt voor zonnepanelen, zonder krassen of agressieve middelen.",
      },
    ],
  },
  {
    slug: "gevelreiniging",
    available: true,
    audience: "beide",
    name: "Gevelreiniging",
    title: "Gevelreiniging",
    metaTitle: "Gevelreiniging Apeldoorn | Frisse, schone gevel | Madern",
    metaDescription:
      "Professionele gevelreiniging in Apeldoorn. Verwijder vuil, algen en groene aanslag van uw gevel voor een frisse uitstraling. Vraag een gratis offerte aan.",
    tagline: "Een frisse, schone gevel.",
    intro:
      "Een schone gevel maakt uw hele pand weer fris. Madern verwijdert vuil, algen en groene aanslag van uw gevel met de juiste methode voor het materiaal — zorgvuldig en met een mooi, egaal resultaat.",
    keywords: ["gevelreiniging Apeldoorn", "gevel reinigen Apeldoorn"],
    highlights: [
      {
        title: "Algen & groene aanslag weg",
        body: "We pakken vervuiling, algen en aanslag aan voor een egale, frisse gevel.",
      },
      {
        title: "Passend bij het materiaal",
        body: "Baksteen, stucwerk of beplating — we kiezen de juiste, veilige methode.",
      },
      {
        title: "Particulier én zakelijk",
        body: "Van woning tot bedrijfspand, met een vrijblijvende offerte vooraf.",
      },
    ],
    faqs: [
      {
        q: "Hoe vaak is gevelreiniging nodig?",
        a: "Dat hangt af van de ligging en het materiaal. Op het noorden en onder bomen ontstaat sneller groene aanslag; vaak volstaat eens per paar jaar.",
      },
    ],
  },
  {
    slug: "dakgootreiniging",
    available: true,
    audience: "beide",
    name: "Dakgootreiniging",
    title: "Dakgootreiniging",
    metaTitle: "Dakgootreiniging Apeldoorn | Voorkom waterschade | Madern",
    metaDescription:
      "Verstopte dakgoten voorkomen lekkage en waterschade. Madern reinigt uw dakgoten in Apeldoorn snel en veilig. Vraag een gratis, vrijblijvende offerte aan.",
    tagline: "Voorkom waterschade door verstopping.",
    intro:
      "Verstopte dakgoten kunnen leiden tot lekkage en waterschade. Madern reinigt uw dakgoten veilig en grondig, verwijdert blad en vuil, zodat het regenwater weer vrij kan wegstromen.",
    keywords: ["dakgootreiniging Apeldoorn", "dakgoot reinigen Apeldoorn"],
    highlights: [
      {
        title: "Voorkom lekkage",
        body: "Vrije goten en regenpijpen voorkomen overlopen en waterschade.",
      },
      {
        title: "Blad en vuil verwijderd",
        body: "We halen bladeren, mos en aanslag weg en controleren de afvoer.",
      },
      {
        title: "Veilig uitgevoerd",
        body: "Met het juiste materiaal en oog voor veiligheid op hoogte.",
      },
    ],
    faqs: [
      {
        q: "Wanneer kan ik mijn dakgoten het beste laten reinigen?",
        a: "Meestal in het najaar, ná de bladval, en eventueel in het voorjaar. Bij veel bomen in de buurt is twee keer per jaar verstandig.",
      },
    ],
  },
];

export const availableServices = services.filter((s) => s.available);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug && s.available);
}
