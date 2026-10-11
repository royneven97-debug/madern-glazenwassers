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
  // Regio voor groepering op /werkgebied. Ontbreekt = regio Apeldoorn.
  regio?: Regio;
  // Wegafstand en reistijd vanaf de thuisbasis Apeldoorn (afgerond), voor plaatsen buiten de directe omgeving.
  afstand?: { km: number; min: number };
  // Slugs van nabijgelegen plaatsen, voor "Ook in de buurt"-links (interne links binnen de regio).
  nabij?: string[];
};

export type Regio = "apeldoorn" | "amersfoort";

export const regios: { key: Regio; name: string; intro: string }[] = [
  {
    key: "apeldoorn",
    name: "Apeldoorn en omgeving",
    intro: "Onze thuisbasis: de wijken van Apeldoorn en de dorpen eromheen op de Veluwe.",
  },
  {
    key: "amersfoort",
    name: "Amersfoort en omgeving",
    intro:
      "Via de A1 rijden we vanuit Apeldoorn naar Amersfoort en de plaatsen eromheen, van de Gelderse Vallei tot Soest en Baarn.",
  },
];

export function regioOf(p: Plaats): Regio {
  return p.regio ?? "apeldoorn";
}

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
          "In het zuiden van Apeldoorn staan veel woningen met karakter: hoge ramen, glas in lood, erkers en serres. Dat vraagt om zorgvuldigheid, want oud glas en verweerde kozijnen zijn kwetsbaarder dan modern isolatieglas. Wij werken met zacht osmosewater en watergevoede telescoopstelen, zodat we ook hoger gelegen ramen veilig vanaf de begane grond bereiken, meestal zonder ladder tegen uw gevel.",
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
          "Ugchelen kent veel vrijstaande woningen en villa's met grote raampartijen, serres en hoge gevels. Juist die grote glasoppervlakken vallen op zodra ze dof of gevlekt zijn. Met onze watergevoede telescoopstelen bereiken we ook hoger gelegen ramen veilig vanaf de begane grond, meestal zonder ladder in uw borders en zonder risico voor uw beplanting.",
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

  // ── Regio Amersfoort ────────────────────────────────────────────────────
  {
    slug: "amersfoort",
    afstand: { km: 47, min: 35 },
    name: "Amersfoort",
    regio: "amersfoort",
    nabij: ["leusden", "hoevelaken", "nijkerk", "soest", "baarn", "barneveld"],
    intro:
      "Amersfoort is naast Apeldoorn ons tweede werkgebied. Via de A1 zijn we er vanuit onze thuisbasis snel, en we plannen de adressen in en rond Amersfoort zo veel mogelijk op dezelfde dagen. Zo houden we de reistijd laag en de prijs per beurt eerlijk.",
    detail:
      "Van de binnenstad en het Bergkwartier tot Vathorst, Nieuwland, Kattenbroek, Schothorst en Hoogland: voor woningen, winkels en kantoren in heel Amersfoort maken we de ramen streepvrij schoon.",
    sections: [
      {
        heading: "Glazenwasser in Amersfoort",
        paragraphs: [
          "Madern wast ramen met gezuiverd osmosewater. Dat water bevat geen kalk of mineralen, droogt volledig vlekkeloos op en laat geen strepen achter. Omdat er geen zeepresten op het glas blijven zitten, hecht nieuw vuil minder snel en blijven uw ramen langer helder dan na een beurt met leidingwater en een zeem.",
          "We werken met watergevoede telescoopstelen. Daarmee bereiken we ook de ramen op de tweede en derde verdieping veilig vanaf de grond, meestal zonder ladder tegen uw gevel of in uw tuin. Voor [particulieren](/glazenwassen-particulier) en [bedrijven](/glazenwassen-zakelijk) in Amersfoort kunt u kiezen voor een eenmalige beurt of een vast schema.",
        ],
      },
      {
        heading: "Van de Muurhuizen tot Vathorst",
        paragraphs: [
          "Amersfoort is een stad van uitersten. In de middeleeuwse binnenstad, rond de Muurhuizen en de Onze Lieve Vrouwetoren, staan monumentale panden met kleine ruitjes, roedeverdeling en soms glas in lood. Dat glas is kwetsbaarder dan modern isolatieglas en vraagt om een rustige, zorgvuldige aanpak. In het Bergkwartier en het Leusderkwartier vindt u statige villa's en jaren dertig woningen met erkers en hoge ramen.",
          "Aan de noordkant van de stad is het beeld heel anders. In Vathorst, Nieuwland en Kattenbroek staan vooral nieuwere woningen met grote raampartijen, glazen pui's en appartementen met veel glas aan de balkonzijde. Juist op die grote vlakken ziet u strepen en kalkranden direct. Met osmosewater worden ze weer egaal helder, ook in de zon.",
        ],
      },
      {
        heading: "Nieuwland en de zonnepanelen",
        paragraphs: [
          "Nieuwland was een van de eerste wijken in Nederland waar zonnepanelen op grote schaal op de daken kwamen. Inmiddels liggen er in heel Amersfoort panelen. Vuil, stuifmeel en vogelpoep kosten rendement, en bij oudere panelen telt elk procent. Wij [maken zonnepanelen schoon](/zonnepanelen-schoonmaken) met hetzelfde osmosewater en zachte borstels, zonder schoonmaakmiddelen die de coating aantasten.",
          "Dat combineren we graag met de ramen en [het schoonmaken van dakgoten](/dakgoot-schoonmaken). Dan bent u in één afspraak klaar en heeft u één vast aanspreekpunt.",
        ],
      },
      {
        heading: "Winkels en bedrijven in Amersfoort",
        paragraphs: [
          "Voor winkels in de binnenstad, zoals langs de Langestraat en de Utrechtsestraat, zijn schone etalages het visitekaartje. We plannen het [etalage reinigen](/etalage-reinigen) bij voorkeur vóór openingstijd, zodat uw klanten er geen last van hebben. Ook kantoren en bedrijfspanden op bijvoorbeeld De Hoef en Isselt kunnen bij ons terecht voor een vast onderhoudsschema.",
          "U krijgt vooraf een vaste prijs, zonder verrassingen achteraf. Vraag gerust een gratis offerte aan, dan kijken we samen wat uw pand nodig heeft.",
        ],
      },
    ],
  },
  {
    slug: "leusden",
    afstand: { km: 52, min: 40 },
    name: "Leusden",
    regio: "amersfoort",
    nabij: ["amersfoort", "soest", "barneveld"],
    intro:
      "Leusden ligt direct ten zuiden van Amersfoort, tussen de Leusderheide en de landgoederen van de Utrechtse Heuvelrug. Madern verzorgt hier de glasbewassing voor woningen en bedrijven.",
    detail:
      "Van Leusden-Zuid en het centrum tot Achterveld en Stoutenburg: we combineren adressen in Leusden met onze ronde door Amersfoort, zodat we efficiënt kunnen plannen.",
    sections: [
      {
        heading: "Glazenwasser in Leusden",
        paragraphs: [
          "In Leusden wonen veel gezinnen in ruime eengezinswoningen en vrijstaande huizen met flink wat glas aan de tuinzijde. Wij wassen die ramen met gezuiverd osmosewater, dat zonder strepen opdroogt en geen kalk achterlaat. Met onze telescoopstelen bereiken we ook de ramen boven en [de dakkapel](/dakkapel-reinigen) veilig vanaf de grond.",
        ],
      },
      {
        heading: "Wonen tussen heide en bos",
        paragraphs: [
          "Het groen rond Leusden is prachtig, maar heeft een keerzijde voor uw ramen en gevel. Stuifmeel in het voorjaar, blad en naalden in het najaar en groene aanslag op de noordkant zorgen ervoor dat glas hier sneller dof wordt dan in de stad. Woont u aan de rand van het dorp, richting de heide of de landgoederen, dan adviseren we vaak vier tot zes beurten per jaar.",
          "[Dakgoten](/dakgoot-schoonmaken) lopen door de bomen in de omgeving snel vol. Dat nemen we graag mee in dezelfde afspraak, net als [het schoonmaken van zonnepanelen](/zonnepanelen-schoonmaken) en [het reinigen van uw gevel](/gevelreiniging).",
        ],
      },
    ],
  },
  {
    slug: "hoevelaken",
    afstand: { km: 42, min: 30 },
    name: "Hoevelaken",
    regio: "amersfoort",
    nabij: ["amersfoort", "nijkerk", "barneveld"],
    intro:
      "Hoevelaken, in de gemeente Nijkerk, ligt pal tegen Amersfoort-Vathorst aan. Een dorp met een rustige kern en veel ruime woningen, op een paar minuten van ons werk in Amersfoort.",
    detail:
      "Voor woningen en bedrijven in Hoevelaken verzorgen we eenmalige beurten en vaste onderhoudsafspraken, gecombineerd met onze ronde door Amersfoort en Nijkerk.",
    sections: [
      {
        heading: "Ramen wassen in Hoevelaken",
        paragraphs: [
          "Hoevelaken heeft een dorpse sfeer, met veel vrijstaande en twee-onder-een-kapwoningen en nieuwere wijken aan de randen. Wij maken de ramen hier streepvrij schoon met osmosewater, zonder chemicaliën en meestal zonder ladder tegen uw gevel.",
        ],
      },
      {
        heading: "Dicht bij de snelweg, sneller vuil",
        paragraphs: [
          "Hoevelaken ligt tussen de A1 en de A28. Waar veel verkeer rijdt, zet zich fijn stof en roet af op ramen, kozijnen en zonnepanelen. Dat ziet u vooral op ramen aan de wegkant en op glas dat veel zon krijgt. Met een vast schema blijft het glas het hele jaar helder en voorkomt u dat vuil zich vastzet.",
          "We kijken bij een gratis inventarisatie welke frequentie bij uw woning past. [Dakgoten](/dakgoot-schoonmaken), [zonnepanelen](/zonnepanelen-schoonmaken) en [de gevel](/gevelreiniging) kunnen we in dezelfde afspraak meenemen.",
        ],
      },
    ],
  },
  {
    slug: "nijkerk",
    afstand: { km: 45, min: 35 },
    name: "Nijkerk",
    regio: "amersfoort",
    nabij: ["amersfoort", "hoevelaken", "barneveld"],
    intro:
      "Nijkerk combineert een historische binnenstad met grote woonwijken als Corlaer en Paasbos. Madern maakt hier ramen, etalages en zonnepanelen streepvrij schoon.",
    detail:
      "Ook voor Nijkerkerveen en het buitengebied rond de polder Arkemheen kunt u bij ons terecht, particulier of zakelijk.",
    sections: [
      {
        heading: "Glazenwasser in Nijkerk",
        paragraphs: [
          "In de oude binnenstad van Nijkerk staan karakteristieke panden met kleinere ruitjes en oude kozijnen, die om een zorgvuldige aanpak vragen. In wijken als Corlaer en Paasbos gaat het juist om moderne woningen met grote ramen en veel glas. Voor allebei werken we met osmosewater, dat zonder strepen opdroogt en geen kalkranden achterlaat.",
          "Winkeliers in het centrum helpen we met [het reinigen van etalages](/etalage-reinigen), op een moment dat het u uitkomt.",
        ],
      },
      {
        heading: "Dicht bij het water en de polder",
        paragraphs: [
          "Nijkerk ligt tussen het Nijkerkernauw en de open polder van Arkemheen. Wind, vocht en het open landschap zorgen voor meer aanslag op ramen en gevels, en noordgevels worden hier sneller groen. Een vast schema van een paar beurten per jaar houdt dat goed bij.",
          "Naast ramen reinigen we in Nijkerk ook [gevels](/gevelreiniging), [dakgoten](/dakgoot-schoonmaken) en [zonnepanelen](/zonnepanelen-schoonmaken). Combineren in één afspraak scheelt u tijd en gedoe.",
        ],
      },
    ],
  },
  {
    slug: "soest",
    afstand: { km: 60, min: 45 },
    name: "Soest",
    regio: "amersfoort",
    nabij: ["amersfoort", "baarn", "leusden"],
    intro:
      "Soest, met Soestdijk en Soesterberg, ligt tussen Amersfoort en de Utrechtse Heuvelrug. Een groene gemeente met veel bos, de Soesterduinen en ruime woningen.",
    detail:
      "Van villawijken aan de bosrand tot rijtjeshuizen en appartementen: Madern verzorgt in heel Soest de glasbewassing voor particulieren en bedrijven.",
    sections: [
      {
        heading: "Glazenwasser in Soest",
        paragraphs: [
          "In Soest staan veel vrijstaande woningen en villa's met grote raampartijen, serres en [dakkapellen](/dakkapel-reinigen). Met onze watergevoede telescoopstelen wassen we ook die hogere ramen veilig vanaf de grond, meestal zonder ladder in uw borders. We gebruiken gezuiverd osmosewater, dus geen strepen, geen kalk en geen chemicaliën.",
        ],
      },
      {
        heading: "Bos en duinen rond de deur",
        paragraphs: [
          "Wie in Soest woont, woont dicht bij het bos. Dat betekent stuifmeel en hars in het voorjaar, naalden en blad in het najaar en groene aanslag op de schaduwkant van het huis. Ramen worden daardoor sneller dof en dakgoten lopen sneller vol dan in een stenige omgeving. Veel bewoners kiezen daarom voor een vast schema.",
          "In Soesterberg, rond het voormalige vliegveld en het Nationaal Militair Museum, en in Soestdijk werken we op dezelfde manier. De [dakgoten](/dakgoot-schoonmaken), [zonnepanelen](/zonnepanelen-schoonmaken) en [de gevel](/gevelreiniging) nemen we desgewenst in één afspraak mee.",
        ],
      },
    ],
  },
  {
    slug: "baarn",
    afstand: { km: 58, min: 45 },
    name: "Baarn",
    regio: "amersfoort",
    nabij: ["amersfoort", "soest"],
    intro:
      "Baarn staat bekend als villadorp, met monumentale panden, het Baarnse Bos en Paleis Soestdijk binnen de gemeentegrens. Madern wast hier ramen met de zorg die zulke woningen verdienen.",
    detail:
      "Ook voor Lage Vuursche en Eembrugge kunt u bij ons terecht, voor een eenmalige beurt of een vast onderhoudsschema.",
    sections: [
      {
        heading: "Glazenwasser in Baarn",
        paragraphs: [
          "Veel woningen in Baarn zijn oud en karakteristiek: hoge ramen, roedeverdeling, glas in lood, serres en erkers. Dat glas is vaak dunner en kwetsbaarder dan modern dubbel glas, en oude kozijnen hebben zachtere kitranden. Wij werken daarom met zacht osmosewater en rustige handbewegingen, zonder agressieve middelen en zonder druk op het glas.",
          "Met telescoopstelen bereiken we ook hoger gelegen ramen vanaf de grond. Zo hoeft er meestal geen ladder tegen uw gevel of op uw grind te staan.",
        ],
      },
      {
        heading: "Groen dorp, meer onderhoud",
        paragraphs: [
          "De lanen en tuinen in Baarn staan vol oude bomen. Mooi om te zien, maar ramen, gevels en dakgoten hebben er meer last van. Blad en takjes verstoppen de goten, en op de schaduwkant ontstaan sneller mos en algen. We adviseren u graag over een passende frequentie en nemen [gevel](/gevelreiniging), [dakgoot](/dakgoot-schoonmaken) en [zonnepanelen](/zonnepanelen-schoonmaken) mee waar nodig.",
        ],
      },
    ],
  },
  {
    slug: "barneveld",
    afstand: { km: 30, min: 25 },
    name: "Barneveld",
    regio: "amersfoort",
    nabij: ["amersfoort", "apeldoorn", "nijkerk", "leusden"],
    intro:
      "Barneveld ligt in de Gelderse Vallei, precies aan de A1 tussen onze thuisbasis Apeldoorn en Amersfoort. We komen er dus vaak langs, en dat houdt de planning voor Barneveldse klanten makkelijk.",
    detail:
      "Van het centrum van Barneveld tot Voorthuizen, Kootwijkerbroek, Garderen en Zwartebroek: we verzorgen de glasbewassing voor woningen, boerderijen en bedrijven in de hele gemeente.",
    sections: [
      {
        heading: "Glazenwasser in Barneveld",
        paragraphs: [
          "Barneveld groeit hard, met veel nieuwe woonwijken naast het oude dorpscentrum. Nieuwbouwwoningen hebben vaak grote ramen en glazen schuifpuien waarop strepen meteen opvallen. Wij wassen ze met gezuiverd osmosewater, dat volledig vlekkeloos opdroogt. Voor oudere panden in het centrum werken we met dezelfde zorg.",
        ],
      },
      {
        heading: "Platteland, stof en bedrijven",
        paragraphs: [
          "Rond Barneveld is veel agrarische bedrijvigheid. Stof van het land, van stallen en van het verkeer op de doorgaande wegen zet zich af op ramen, kozijnen en zonnepanelen. Juist [zonnepanelen op grote schuur- en staldaken](/zonnepanelen-schoonmaken) verliezen daardoor rendement. We maken ze schoon met osmosewater en zachte borstels, zonder middelen die de coating aantasten.",
          "Voor [bedrijfspanden](/glazenwassen-zakelijk) op de bedrijventerreinen van Barneveld en Voorthuizen bieden we vaste onderhoudscontracten met een vaste prijs per beurt. Ook [dakgoten schoonmaken](/dakgoot-schoonmaken) en [gevelreiniging](/gevelreiniging) nemen we graag in dezelfde afspraak mee.",
        ],
      },
    ],
  },
];

export const primaryPlaats = plaatsen.find((p) => p.primary)!;

// Sitebrede links (footer, dienstpagina's): de Apeldoornse plaatsen plus Amersfoort
// als hub van de Amersfoortse regio. De dorpen rond Amersfoort hangen onder
// Amersfoort en /werkgebied, zodat linkkracht binnen de gebiedssilo blijft.
export const sitebredePlaatsen = plaatsen.filter(
  (p) => regioOf(p) === "apeldoorn" || p.slug === "amersfoort",
);

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
