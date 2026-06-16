// Uitgebreide, unieke long-form content per dienst (voor diepte + SEO).
// Gekoppeld op service-slug. Wordt gerenderd door ServicePageTemplate.

export type ContentSection = { heading: string; paragraphs: string[] };
export type ServiceContent = {
  image?: { src: string; alt: string };
  sections: ContentSection[];
};

export const serviceContent: Record<string, ServiceContent> = {
  "glazenwassen-particulier": {
    image: {
      src: "/images/ramen-wassen-trekker-closeup.jpg",
      alt: "Glazenwasser wast een raam streepvrij met een trekker in Apeldoorn",
    },
    sections: [
      {
        heading: "Schone ramen maken uw woning af",
        paragraphs: [
          "Niets is zo zonde als een mooi huis met doffe, vieze ramen. Vuil, regenstrepen, stuifmeel en uitlaatgassen hechten zich ongemerkt aan het glas, waardoor er minder daglicht naar binnen valt en uw woning er minder verzorgd uitziet. Met schone ramen oogt uw huis direct frisser, lichter en uitnodigender — binnen én buiten.",
          "Madern Glazenwassers is gespecialiseerd in het wassen van ramen bij particulieren in Apeldoorn en omgeving. Of u nu in een rijtjeswoning, een twee-onder-een-kap of een vrijstaand huis woont: wij zorgen voor een streepvrij resultaat waar u dagelijks plezier van heeft. We werken netjes, op afspraak en met respect voor uw woning en tuin.",
        ],
      },
      {
        heading: "Streepvrij met gezuiverd osmosewater",
        paragraphs: [
          "Wij wassen uw ramen met gezuiverd osmosewater. Bij dit proces wordt al het kalk en alle mineralen uit het water gefilterd. Het resultaat: het water droogt volledig vlekkeloos op, zonder strepen of kalkranden, en helemaal zonder agressieve schoonmaakmiddelen. Beter voor uw ramen, uw kozijnen en het milieu.",
          "Doordat er geen mineralen achterblijven, blijven uw ramen ook langer schoon dan bij traditioneel zemen met leidingwater. Stof en vuil hechten minder snel aan een echt schoon oppervlak, waardoor u langer geniet van kristalheldere ruiten.",
          "Met onze watergevoede telescoopstelen bereiken we ook hoger gelegen ramen veilig vanaf de begane grond — zonder ladders tegen uw gevel en zonder risico voor uw beplanting.",
        ],
      },
      {
        heading: "Binnen- en buitenkant, inclusief kozijnen",
        paragraphs: [
          "We maken niet alleen de buitenkant van uw ramen schoon, maar op verzoek ook de binnenkant. Vingerafdrukken, aanslag en stof verdwijnen, zodat het glas aan beide zijden helder is. Ook uw kozijnen, vensterbanken en het glaswerk van deuren en serres nemen we graag mee.",
          "U bepaalt zelf wat er gebeurt. Wilt u alleen de buitenkant met een vaste regelmaat, of liever periodiek een complete beurt binnen én buiten? We stemmen het volledig op uw wensen af.",
        ],
      },
      {
        heading: "Hoe vaak laat u uw ramen wassen?",
        paragraphs: [
          "Voor de meeste woningen werkt vier tot acht keer per jaar het beste. Woont u in een groene of bosrijke omgeving, zoals in Ugchelen of aan de rand van de Veluwe, dan worden ramen sneller groen en stoffig en is een hogere frequentie aan te raden. Langs drukke wegen zorgen uitlaatgassen voor snellere vervuiling.",
          "Met een vast schema heeft u er geen omkijken naar: wij komen automatisch langs en u betaalt een gunstig tarief per beurt. Liever eenmalig, bijvoorbeeld voor een feest of de voorjaarsschoonmaak? Ook dat regelen we graag.",
        ],
      },
      {
        heading: "Betrouwbaar, flexibel en persoonlijk",
        paragraphs: [
          "Als jong, lokaal bedrijf draait alles bij ons om persoonlijk contact en betrouwbaarheid. U heeft een vast aanspreekpunt dat u kent, afspraken worden nagekomen en u weet vooraf precies waar u aan toe bent. We werken flexibel en kunnen, indien gewenst, ook in het weekend langskomen.",
          "Benieuwd wat het wassen van uw ramen kost? Vraag vrijblijvend een offerte aan. U ontvangt een eerlijke, vaste prijs zonder verrassingen achteraf.",
        ],
      },
    ],
  },

  "glazenwassen-zakelijk": {
    image: {
      src: "/images/glazenwasser-ramen-wassen-apeldoorn.jpg",
      alt: "Professionele glazenwasser maakt zakelijke ruiten schoon in Apeldoorn",
    },
    sections: [
      {
        heading: "Een representatief pand begint bij schone ramen",
        paragraphs: [
          "De uitstraling van uw bedrijfspand zegt iets over uw organisatie. Schone ramen en een verzorgde entree geven klanten, bezoekers en medewerkers direct een professioneel en verzorgd gevoel. Vieze ruiten daarentegen vallen onbewust negatief op. Madern Glazenwassers houdt uw kantoor of bedrijfspand in Apeldoorn er altijd verzorgd uit.",
          "Wij werken voor uiteenlopende zakelijke klanten: kantoren, winkels, showrooms, praktijken, horeca, scholen en VvE's. Voor elk type pand stellen we een passend onderhoudsplan op.",
        ],
      },
      {
        heading: "Vaste contracten met flexibele frequentie",
        paragraphs: [
          "Met een onderhoudscontract heeft u nergens omkijken naar. We spreken een vaste frequentie af — wekelijks, maandelijks, per kwartaal of een ander interval — en komen daarna automatisch langs. U krijgt een vast aanspreekpunt en een vast, transparant tarief.",
          "De frequentie stemmen we af op uw pand, de ligging en uw budget. Een winkel in het centrum van Apeldoorn met veel passage heeft baat bij vaker wassen dan een kantoor op een rustig bedrijventerrein. We adviseren u graag over de meest efficiënte aanpak.",
        ],
      },
      {
        heading: "Betrouwbaar en zonder uw werk te verstoren",
        paragraphs: [
          "We begrijpen dat uw bedrijfsproces door moet gaan. Daarom plannen we het glazenwassen op momenten die u het beste uitkomen — vroeg in de ochtend, buiten openingstijden of in het weekend. We werken netjes, discreet en met oog voor de veiligheid van uw medewerkers en bezoekers.",
          "Voor hoger gelegen ramen werken we waar mogelijk met watergevoede telescoopstelen vanaf de grond. Zo voorkomen we onnodige risico's en overlast, en blijft uw pand bereikbaar tijdens het werk.",
        ],
      },
      {
        heading: "Meer dan alleen glasbewassing",
        paragraphs: [
          "Naast het wassen van ramen kunnen we ook andere onderhoudsklussen aan uw pand verzorgen, zoals het reinigen van de gevel, de dakgoten of de zonnepanelen op het dak. Door dit te combineren in één onderhoudscontract bespaart u tijd en heeft u één vast aanspreekpunt voor het uiterlijk van uw pand.",
          "Zo houdt u uw vastgoed niet alleen representatief, maar ook in goede staat — wat op de lange termijn kosten bespaart.",
        ],
      },
      {
        heading: "Vraag een vrijblijvende offerte aan",
        paragraphs: [
          "Wilt u weten wat een glazenwasser voor uw bedrijfspand kost? We komen graag langs voor een vrijblijvende inventarisatie en stellen een passend voorstel op. U ontvangt een heldere offerte met een vast tarief per beurt of per maand.",
        ],
      },
    ],
  },

  "etalage-reinigen": {
    image: {
      src: "/images/glazenwasser-ramen-wassen-apeldoorn.jpg",
      alt: "Etalageruiten van een winkel worden streepvrij gereinigd",
    },
    sections: [
      {
        heading: "Een heldere etalage trekt klanten naar binnen",
        paragraphs: [
          "Voor winkels is de etalage het visitekaartje. Een kristalheldere etalageruit laat uw producten optimaal zien en nodigt voorbijgangers uit om binnen te komen. Vingerafdrukken, regenstrepen en stof doen juist afbreuk aan die eerste indruk. Madern Glazenwassers houdt uw etalages en winkelruiten in Apeldoorn altijd stralend schoon.",
          "Eerste indrukken tellen. Daarom zorgen wij dat uw winkel er, ongeacht het weer, elke dag verzorgd bij staat.",
        ],
      },
      {
        heading: "Hoge frequentie, flexibele tijden",
        paragraphs: [
          "Etalageruiten worden snel vuil door verkeer, weer en handen aan het glas. Veel winkels kiezen daarom voor wekelijkse reiniging; op drukke locaties in het centrum is vaker soms wenselijk. We bepalen samen met u de ideale frequentie.",
          "We werken voor of na openingstijd, zodat uw klanten geen hinder ondervinden en uw winkel er bij opening direct piekfijn uitziet.",
        ],
      },
      {
        heading: "Streepvrij resultaat met osmosewater",
        paragraphs: [
          "Ook voor etalages werken we met gezuiverd osmosewater, voor een streepvrij resultaat zonder kalkranden. Grote glasoppervlakken worden zo egaal helder, zonder vegen die juist opvallen als de zon erop schijnt.",
          "Naast de ruiten kunnen we ook de toegangsdeuren, het glaswerk van de pui en de kozijnen meenemen voor een compleet verzorgde uitstraling.",
        ],
      },
      {
        heading: "Voor elke winkel in Apeldoorn",
        paragraphs: [
          "Van een speciaalzaak in het centrum tot een showroom langs de invalsweg: wij verzorgen de glasbewassing voor winkels van elke omvang. Met een vast schema en een vast aanspreekpunt heeft u er geen omkijken naar en oogt uw zaak altijd op zijn best.",
          "Vraag vrijblijvend een offerte aan en ontdek hoe voordelig een verzorgde etalage kan zijn.",
        ],
      },
    ],
  },

  "zonnepanelen-reinigen": {
    image: {
      src: "/images/glazenwasser-osmosewater-steel.jpg",
      alt: "Zonnepanelen worden veilig en streepvrij gereinigd met een watersteel",
    },
    sections: [
      {
        heading: "Vuile zonnepanelen leveren minder op",
        paragraphs: [
          "Zonnepanelen werken het best als er zoveel mogelijk zonlicht op de cellen valt. In de praktijk hopen stof, stuifmeel, mos, bladeren en vogelpoep zich op het oppervlak op — vooral op panelen die plat of onder een kleine hoek liggen, want daar spoelt de regen het vuil niet vanzelf af. Die vervuiling vermindert de opbrengst, soms met een paar tot wel tien procent of meer.",
          "Door uw zonnepanelen periodiek te laten reinigen, herstelt u die opbrengst. De investering verdient zichzelf vaak terug in extra opgewekte stroom.",
        ],
      },
      {
        heading: "Veilig en krasvrij gereinigd",
        paragraphs: [
          "Zonnepanelen vragen om een voorzichtige aanpak. Wij reinigen ze met zacht, gezuiverd osmosewater en speciaal gereedschap dat geschikt is voor het kwetsbare oppervlak. Geen agressieve middelen, geen harde borstels en geen krassen — zodat de beschermende coating intact blijft.",
          "Met onze watergevoede telescoopstelen reinigen we de panelen waar mogelijk veilig vanaf de grond of vanaf een veilig werkvlak, zonder onnodig over uw dak te lopen.",
        ],
      },
      {
        heading: "Streepvrij en zonder chemicaliën",
        paragraphs: [
          "Omdat osmosewater geen kalk of mineralen bevat, droogt het vlekkeloos op en blijft er geen residu achter op de panelen. Dat is niet alleen beter voor de opbrengst, maar ook milieuvriendelijk: we gebruiken geen schoonmaakmiddelen die in uw tuin of het riool terechtkomen.",
        ],
      },
      {
        heading: "Hoe vaak en wanneer?",
        paragraphs: [
          "Voor de meeste daken volstaat één tot twee keer per jaar. Liggen uw panelen plat, of staan er veel bomen in de buurt, dan kan vaker reinigen lonen. Het voorjaar is een goed moment, zodat uw panelen in de zonrijke maanden maximaal renderen.",
          "We reinigen zonnepanelen voor zowel particulieren als bedrijven in Apeldoorn en omgeving. Vraag vrijblijvend een offerte aan en haal weer het maximale uit uw installatie.",
        ],
      },
    ],
  },

  gevelreiniging: {
    image: {
      src: "/images/glazenwasser-osmosewater-steel.jpg",
      alt: "Gevel wordt gereinigd voor een frisse uitstraling",
    },
    sections: [
      {
        heading: "Een schone gevel maakt uw pand weer fris",
        paragraphs: [
          "De gevel is het grootste zichtbare oppervlak van uw woning of bedrijfspand. In de loop der jaren ontstaat er groene aanslag, algen, mos en vuil — vooral op het noorden, onder dakranden en in de buurt van bomen. Dat geeft een verwaarloosde indruk en kan op termijn het materiaal aantasten. Met een professionele gevelreiniging oogt uw pand weer als nieuw.",
          "Madern verzorgt gevelreiniging voor particulieren en bedrijven in Apeldoorn en omgeving, met een aanpak die past bij uw type gevel.",
        ],
      },
      {
        heading: "De juiste methode voor elk materiaal",
        paragraphs: [
          "Niet elke gevel vraagt om dezelfde aanpak. Baksteen, stucwerk, houten delen, beton of gevelbeplating reageren elk anders op reiniging. Wij beoordelen vooraf het materiaal en de mate van vervuiling en kiezen de juiste, veilige methode — van een zachte, lagedruk-behandeling tot gerichte verwijdering van algen en aanslag.",
          "Zo bereiken we een mooi, egaal resultaat zonder de gevel te beschadigen.",
        ],
      },
      {
        heading: "Langer mooi, beter beschermd",
        paragraphs: [
          "Een schone gevel is niet alleen mooier om te zien, het verlengt ook de levensduur van het materiaal. Algen en mos houden vocht vast; door ze te verwijderen voorkomt u verdere aantasting en vochtproblemen. Op verzoek bespreken we hoe u uw gevel daarna langer schoon houdt.",
        ],
      },
      {
        heading: "Vraag een vrijblijvende offerte aan",
        paragraphs: [
          "Elke gevel is anders, dus de prijs bepalen we op maat. We komen graag langs om de situatie te bekijken en stellen een heldere, vrijblijvende offerte op. Vaak combineren klanten gevelreiniging met het wassen van de ramen of het reinigen van de dakgoten — handig en voordelig in één keer.",
        ],
      },
    ],
  },

  dakgootreiniging: {
    image: {
      src: "/images/glazenwasser-ramen-wassen-apeldoorn.jpg",
      alt: "Onderhoud aan een woning in Apeldoorn",
    },
    sections: [
      {
        heading: "Voorkom waterschade door verstopte dakgoten",
        paragraphs: [
          "Dakgoten hebben één belangrijke taak: regenwater gecontroleerd afvoeren. Raken ze verstopt met bladeren, mos en vuil, dan kan het water niet weg. Het loopt over de rand, langs de gevel naar beneden en kan zo leiden tot vochtplekken, schimmel en in het ergste geval lekkages en houtrot. Regelmatige dakgootreiniging voorkomt dure schade.",
          "Madern reinigt dakgoten voor particulieren en bedrijven in Apeldoorn en omgeving — snel, grondig en veilig.",
        ],
      },
      {
        heading: "Grondig schoon en gecontroleerd",
        paragraphs: [
          "We verwijderen bladeren, mos, zand en aanslag uit de goot en controleren of het water vrij kan wegstromen via de regenpijpen. Waar nodig spoelen we de goot door om verstoppingen in de afvoer op te sporen. Zo weet u zeker dat uw goten weer doen wat ze moeten doen.",
        ],
      },
      {
        heading: "Veilig werken op hoogte",
        paragraphs: [
          "Werken op hoogte vraagt om ervaring en het juiste materiaal. Wij werken veilig en zorgvuldig, zodat u niet zelf de ladder op hoeft. Dat scheelt u niet alleen risico, maar ook tijd en gedoe.",
        ],
      },
      {
        heading: "Het beste moment en de prijs",
        paragraphs: [
          "Het najaar, ná de bladval, is doorgaans het beste moment om de dakgoten te laten reinigen; bij veel bomen in de buurt is twee keer per jaar verstandig. De prijs hangt af van de lengte en bereikbaarheid van de goten. Vraag vrijblijvend een offerte aan — vaak te combineren met gevelreiniging of glasbewassing.",
        ],
      },
    ],
  },
};

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContent[slug];
}
