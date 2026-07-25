// Blog / kennisbank. Data-gedreven, net als diensten/plaatsen. Informatieve
// content voor long-tail zoekopdrachten ("hoe vaak ramen wassen", "osmosewater").
// Elke publicatie is uniek, geschreven vanuit de praktijk (E-E-A-T).

export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogArticle = {
  slug: string;
  title: string; // H1
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  datePublished: string; // ISO (YYYY-MM-DD)
  dateModified?: string;
  image?: { src: string; alt: string };
  intro: string;
  sections: BlogSection[];
  faqs?: { q: string; a: string }[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "hoe-vaak-ramen-laten-wassen",
    title: "Hoe vaak moet je je ramen laten wassen?",
    metaTitle: "Hoe vaak ramen laten wassen? Advies per situatie | Madern",
    metaDescription:
      "Hoe vaak moet je je ramen laten wassen? Praktisch advies per woning, winkel en bedrijfspand in Apeldoorn, plus waarom vaker wassen vaak voordeliger is.",
    excerpt:
      "Van een gezinswoning tot een winkel in het centrum: de ideale frequentie verschilt per situatie. Een praktische richtlijn.",
    datePublished: "2026-07-25",
    image: {
      src: "/images/werk-glazenwasser-woning-apeldoorn.jpg",
      alt: "Glazenwasser wast de ramen van een woning in Apeldoorn",
    },
    intro:
      "Het is een van de vragen die we het vaakst krijgen: hoe vaak moet je je ramen nu eigenlijk laten wassen? Er is geen vast antwoord dat voor iedereen klopt, want het hangt af van uw situatie. In dit artikel zetten we op een rij waar de ideale frequentie van afhangt en geven we een praktische richtlijn.",
    sections: [
      {
        heading: "Waar hangt de ideale frequentie van af?",
        paragraphs: [
          "Hoe snel ramen vervuilen verschilt sterk per locatie. De belangrijkste factoren zijn de omgeving (veel bomen, groen of juist een drukke weg), het weer, en het type pand. In een bosrijke omgeving zoals Ugchelen of aan de rand van de Veluwe hechten stuifmeel en groene aanslag sneller aan het glas. Langs drukke wegen zorgen uitlaatgassen en opspattend vuil voor snellere vervuiling.",
          "Ook de hoogte en bereikbaarheid spelen mee: ramen op de begane grond zien vuil eerder dan hoge ramen, maar hoge ramen zijn juist lastiger zelf schoon te houden.",
        ],
      },
      {
        heading: "Richtlijn per situatie",
        paragraphs: [
          "Voor de meeste woningen werkt vier tot acht keer per jaar het beste. Woont u in een groene omgeving, dan is de bovenkant van die range verstandig. Voor winkels en etalages adviseren we vaak wekelijks: de etalage is uw visitekaartje en wordt snel vuil door verkeer en handen aan het glas.",
          "Voor kantoren en bedrijfspanden werkt maandelijks of per kwartaal doorgaans goed, afhankelijk van de ligging en de gewenste uitstraling. We stemmen het schema altijd af op uw pand en budget.",
        ],
      },
      {
        heading: "Waarom vaker wassen vaak voordeliger is",
        paragraphs: [
          "Het klinkt tegenstrijdig, maar met een vaste, regelmatige beurt bent u vaak goedkoper uit dan met incidenteel wassen. Vuil dat lang op het glas zit, hecht sterker en kost meer tijd om te verwijderen. Bij een vast schema blijft het glas in goede conditie en gaat elke beurt sneller.",
          "Wij werken bovendien met gezuiverd osmosewater, waardoor uw ramen langer streepvrij blijven dan bij traditioneel zemen. Het vuil krijgt minder kans om zich te hechten aan een echt schoon oppervlak.",
        ],
      },
      {
        heading: "Zelf doen of uitbesteden?",
        paragraphs: [
          "De buitenkant van hoger gelegen ramen zelf schoonhouden is lastig en niet zonder risico. Met watergevoede telescoopstelen bereiken wij die ramen veilig vanaf de begane grond, zonder ladders tegen de gevel. Voor de binnenkant maken we een afspraak die u uitkomt.",
          "Twijfelt u over de juiste frequentie voor uw situatie in Apeldoorn of omgeving? Vraag vrijblijvend een offerte aan, dan adviseren we u graag.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hoe vaak ramen wassen bij een woning?",
        a: "Voor de meeste woningen werkt vier tot acht keer per jaar goed. In een bosrijke omgeving is vaker aan te raden omdat ramen sneller groen en stoffig worden.",
      },
      {
        q: "Hoe vaak moet een winkel de etalage laten wassen?",
        a: "Voor winkels adviseren we meestal wekelijks. De etalage wordt snel vuil en een heldere ruit trekt klanten naar binnen.",
      },
    ],
  },
  {
    slug: "wat-is-osmosewater",
    title: "Wat is osmosewater en waarom is het beter voor je ramen?",
    metaTitle: "Wat is osmosewater? Streepvrij ramen wassen uitgelegd | Madern",
    metaDescription:
      "Wat is osmosewater en waarom droogt het streepvrij op? Uitleg over gezuiverd water voor het wassen van ramen, zonnepanelen en glaswerk, zonder chemicaliën.",
    excerpt:
      "Gezuiverd water zonder kalk en mineralen droogt vlekkeloos op, zonder chemicaliën. Zo werkt het en dit zijn de voordelen.",
    datePublished: "2026-07-25",
    image: {
      src: "/images/glazenwasser-apeldoorn-aan-het-werk.jpg",
      alt: "Glazenwasser reinigt glas streepvrij met een watergevoede telescoopsteel in Apeldoorn",
    },
    intro:
      "Steeds meer glazenwassers werken met osmosewater in plaats van leidingwater en zeem. Maar wat is osmosewater precies, en waarom is het beter voor uw ramen? In dit artikel leggen we het helder uit.",
    sections: [
      {
        heading: "Wat is osmosewater precies?",
        paragraphs: [
          "Osmosewater is water waaruit vrijwel alle mineralen en kalk zijn gefilterd. Dat gebeurt met een proces dat omgekeerde osmose heet: het water wordt onder druk door een fijn membraan geperst dat opgeloste stoffen tegenhoudt. Wat overblijft is vrijwel zuiver water.",
          "Gewoon leidingwater bevat kalk en mineralen. Als dat opdroogt op glas, blijven die achter als witte vlekken, strepen en kalkranden. Bij osmosewater gebeurt dat niet.",
        ],
      },
      {
        heading: "Waarom droogt het streepvrij op?",
        paragraphs: [
          "Omdat er geen mineralen in het water zitten, laat osmosewater bij het opdrogen niets achter. Het glas droogt volledig vlekkeloos op, zonder na te hoeven zemen. Precies daarom kunnen we streepvrij werken zonder schoonmaakmiddelen: het water zelf doet het werk.",
          "Bijkomend voordeel: doordat er geen residu achterblijft, hecht nieuw vuil minder snel. Uw ramen blijven daardoor langer helder dan na traditioneel zemen met leidingwater.",
        ],
      },
      {
        heading: "De voordelen op een rij",
        paragraphs: [
          "Osmosewater is streepvrij, houdt ramen langer schoon en werkt volledig zonder agressieve chemicaliën. Dat is niet alleen beter voor het glas en de kozijnen, maar ook voor uw beplanting en het milieu. Omdat we het water via telescoopstelen aanvoeren, bereiken we hoger gelegen ramen veilig vanaf de grond, zonder ladders tegen de gevel.",
        ],
      },
      {
        heading: "Voor welke oppervlakken is het geschikt?",
        paragraphs: [
          "Naast ramen is osmosewater uitstekend voor kozijnen, etalages, serres en zelfs zonnepanelen. Juist bij zonnepanelen is de zachte, mineraalvrije reiniging een groot pluspunt: geen krassen, geen kalkresten en geen aantasting van de coating.",
          "Wilt u uw ramen of zonnepanelen in Apeldoorn en omgeving streepvrij laten reinigen met osmosewater? Vraag vrijblijvend een offerte aan.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is osmosewater beter dan zemen?",
        a: "Voor de buitenkant wel: osmosewater droogt streepvrij op zonder chemicaliën en houdt ramen langer schoon, omdat er geen mineralen achterblijven waaraan vuil zich hecht.",
      },
      {
        q: "Kun je zonnepanelen met osmosewater reinigen?",
        a: "Ja. Osmosewater is zacht en mineraalvrij, dus het reinigt zonnepanelen streepvrij zonder krassen of kalkresten en zonder de coating aan te tasten.",
      },
    ],
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}
