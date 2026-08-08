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
      src: "/images/ramen-wassen-woning-apeldoorn.jpg",
      alt: "Glazenwasser van Madern wast vanaf een ladder de ramen en dakrand van een woning in Apeldoorn met een watergevoede telescoopsteel",
    },
    sections: [
      {
        heading: "Schone ramen maken uw woning af",
        paragraphs: [
          "Niets is zo zonde als een mooi huis met doffe, vieze ramen. Vuil, regenstrepen, stuifmeel en uitlaatgassen hechten zich ongemerkt aan het glas, waardoor er minder daglicht naar binnen valt en uw woning er minder verzorgd uitziet. Met schone ramen oogt uw huis direct frisser, lichter en uitnodigender, binnen én buiten.",
          "Madern Glazenwassers is gespecialiseerd in het wassen van ramen bij particulieren in Apeldoorn en omgeving. Of u nu in een rijtjeswoning, een twee-onder-een-kap of een vrijstaand huis woont: wij zorgen voor een streepvrij resultaat waar u dagelijks plezier van heeft. We werken netjes, op afspraak en met respect voor uw woning en tuin.",
        ],
      },
      {
        heading: "Streepvrij met gezuiverd osmosewater",
        paragraphs: [
          "Wij wassen uw ramen met gezuiverd osmosewater. Bij dit proces wordt al het kalk en alle mineralen uit het water gefilterd. Het resultaat: het water droogt volledig vlekkeloos op, zonder strepen of kalkranden, en helemaal zonder agressieve schoonmaakmiddelen. Beter voor uw ramen, uw kozijnen en het milieu.",
          "Doordat er geen mineralen achterblijven, blijven uw ramen ook langer schoon dan bij traditioneel zemen met leidingwater. Stof en vuil hechten minder snel aan een echt schoon oppervlak, waardoor u langer geniet van kristalheldere ruiten.",
          "Met onze watergevoede telescoopstelen bereiken we ook hoger gelegen ramen veilig vanaf de begane grond, zonder ladders tegen uw gevel en zonder risico voor uw beplanting.",
        ],
      },
      {
        heading: "Glasbewassing in Apeldoorn voor particulieren",
        paragraphs: [
          "Glasbewassing is het vakwoord voor wat u waarschijnlijk gewoon ramen wassen noemt: het professioneel schoonmaken van al het glas aan uw woning. Bij Madern betekent dat ramen, kozijnen, deuren, serres en dakramen, aan de binnen- en de buitenkant, met gezuiverd osmosewater.",
          "Veel mensen denken dat glasbewassing alleen iets is voor kantoren en winkels. Dat klopt niet: juist bij woningen levert het veel op, omdat u er elke dag doorheen kijkt. Wij werken met vaste schema's voor particulieren in heel Apeldoorn, van De Maten en Zevenhuizen tot Ugchelen en Beekbergen.",
          "Wij doen dit als osmose glasbewassing: het water gaat eerst door een filter dat alle kalk en mineralen eruit haalt. Daardoor droogt het vlekkeloos op en heeft u geen zeem of schoonmaakmiddel meer nodig om de laatste strepen weg te werken.",
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
      src: "/images/glasbewassing-bedrijfspand-apeldoorn.jpg",
      alt: "Glasbewassing van de glasgevel van een kantoorpand in Apeldoorn met een watergevoede telescoopsteel op osmosewater",
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
          "Met een onderhoudscontract heeft u nergens omkijken naar. We spreken een vaste frequentie af, wekelijks, maandelijks, per kwartaal of een ander interval, en komen daarna automatisch langs. U krijgt een vast aanspreekpunt en een vast, transparant tarief.",
          "De frequentie stemmen we af op uw pand, de ligging en uw budget. Een winkel in het centrum van Apeldoorn met veel passage heeft baat bij vaker wassen dan een kantoor op een rustig bedrijventerrein. We adviseren u graag over de meest efficiënte aanpak.",
        ],
      },
      {
        heading: "Betrouwbaar en zonder uw werk te verstoren",
        paragraphs: [
          "We begrijpen dat uw bedrijfsproces door moet gaan. Daarom plannen we het glazenwassen op momenten die u het beste uitkomen, vroeg in de ochtend, buiten openingstijden of in het weekend. We werken netjes, discreet en met oog voor de veiligheid van uw medewerkers en bezoekers.",
          "Voor hoger gelegen ramen werken we waar mogelijk met watergevoede telescoopstelen vanaf de grond. Zo voorkomen we onnodige risico's en overlast, en blijft uw pand bereikbaar tijdens het werk.",
        ],
      },
      {
        heading: "Meer dan alleen glasbewassing",
        paragraphs: [
          "Naast het wassen van ramen kunnen we ook andere onderhoudsklussen aan uw pand verzorgen, zoals het reinigen van de gevel, de dakgoten of de zonnepanelen op het dak. Door dit te combineren in één onderhoudscontract bespaart u tijd en heeft u één vast aanspreekpunt voor het uiterlijk van uw pand.",
          "Zo houdt u uw vastgoed niet alleen representatief, maar ook in goede staat, wat op de lange termijn kosten bespaart.",
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
      src: "/images/etalage-reinigen-apeldoorn.jpg",
      alt: "Streepvrij gereinigde glazen pui en entree van een bedrijfspand in Apeldoorn na etalagereiniging door Madern",
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

  "zonnepanelen-schoonmaken": {
    image: {
      src: "/images/glasdak-reinigen-apeldoorn.jpg",
      alt: "Glazen dakpanelen op een pand in Apeldoorn worden met wasborstel en osmosewater streepvrij gereinigd",
    },
    sections: [
      {
        heading: "Zonnepanelen schoonmaken: vuile panelen leveren minder op",
        paragraphs: [
          "Zonnepanelen werken het best als er zoveel mogelijk zonlicht op de cellen valt. In de praktijk hopen stof, stuifmeel, mos, bladeren en vogelpoep zich op het oppervlak op, vooral op panelen die plat of onder een kleine hoek liggen, want daar spoelt de regen het vuil niet vanzelf af. Die vervuiling vermindert de opbrengst, soms met een paar tot wel tien procent of meer.",
          "Door uw zonnepanelen periodiek te laten schoonmaken, herstelt u die opbrengst. De investering verdient zichzelf vaak terug in extra opgewekte stroom.",
        ],
      },
      {
        heading: "Veilig en krasvrij schoongemaakt",
        paragraphs: [
          "Zonnepanelen vragen om een voorzichtige aanpak. Wij maken ze schoon met zacht, gezuiverd osmosewater en speciaal gereedschap dat geschikt is voor het kwetsbare oppervlak. Geen agressieve middelen, geen harde borstels en geen krassen, zodat de beschermende coating intact blijft.",
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
          "Veel mensen overwegen eerst om hun zonnepanelen zelf te wassen. Dat kan, maar het betekent klimmen op een schuin dak met een emmer water, en leidingwater laat kalkvlekken achter die het licht juist tegenhouden. Wilt u uw zonnepanelen laten reinigen zonder dat risico, dan doen wij het vanaf een veilig werkvlak met gezuiverd water.",
          "We maken zonnepanelen schoon voor zowel particulieren als bedrijven in Apeldoorn en omgeving. Zowel op schuine daken als op platte daken, waar het vuil door het ontbreken van afspoeling juist sneller blijft liggen. Vraag vrijblijvend een offerte aan en haal weer het maximale uit uw installatie.",
        ],
      },
    ],
  },

  gevelreiniging: {
    image: {
      src: "/images/gevelreiniging-voor-na-apeldoorn.jpg",
      alt: "Gevelreiniging in Apeldoorn: damwandgevel met groene aanslag naast het al gereinigde, schone deel",
    },
    sections: [
      {
        heading: "Een schone gevel maakt uw pand weer fris",
        paragraphs: [
          "De gevel is het grootste zichtbare oppervlak van uw woning of bedrijfspand. In de loop der jaren ontstaat er groene aanslag, algen, mos en vuil, vooral op het noorden, onder dakranden en in de buurt van bomen. Dat geeft een verwaarloosde indruk en kan op termijn het materiaal aantasten. Met een professionele gevelreiniging oogt uw pand weer als nieuw.",
          "Madern verzorgt gevelreiniging voor particulieren en bedrijven in Apeldoorn en omgeving, met een aanpak die past bij uw type gevel.",
        ],
      },
      {
        heading: "De juiste methode voor elk materiaal",
        paragraphs: [
          "Niet elke gevel vraagt om dezelfde aanpak. Baksteen, stucwerk, houten delen, beton of gevelbeplating reageren elk anders op reiniging. Wij beoordelen vooraf het materiaal en de mate van vervuiling en kiezen de juiste, veilige methode, van een zachte, lagedruk-behandeling tot gerichte verwijdering van algen en aanslag.",
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
          "Elke gevel is anders, dus de prijs bepalen we op maat. We komen graag langs om de situatie te bekijken en stellen een heldere, vrijblijvende offerte op. Vaak combineren klanten gevelreiniging met het wassen van de ramen of het reinigen van de dakgoten, handig en voordelig in één keer.",
        ],
      },
    ],
  },

  "dakgoot-schoonmaken": {
    image: {
      src: "/images/dakgootreiniging-apeldoorn.jpg",
      alt: "Medewerker van Madern maakt vanaf een ladder de dakgoot en dakrand van een woning in Apeldoorn schoon met een telescoopsteel",
    },
    sections: [
      {
        heading: "Voorkom waterschade door verstopte dakgoten",
        paragraphs: [
          "Dakgoten hebben één belangrijke taak: regenwater gecontroleerd afvoeren. Raken ze verstopt met bladeren, mos en vuil, dan kan het water niet weg. Het loopt over de rand, langs de gevel naar beneden en kan zo leiden tot vochtplekken, schimmel en in het ergste geval lekkages en houtrot. Regelmatig de dakgoot schoonmaken voorkomt dure schade.",
          "Madern maakt dakgoten schoon voor particulieren en bedrijven in Apeldoorn en omgeving, snel, grondig en veilig.",
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
          "Het najaar, ná de bladval, is doorgaans het beste moment om de dakgoten te laten schoonmaken; bij veel bomen in de buurt is twee keer per jaar verstandig. De prijs hangt af van de lengte en bereikbaarheid van de goten. Vraag vrijblijvend een offerte aan, vaak te combineren met gevelreiniging of glasbewassing.",
        ],
      },
      {
        heading: "Dakgoten schoonmaken in Apeldoorn en omgeving",
        paragraphs: [
          "Wij komen voor het schoonmaken van dakgoten in heel Apeldoorn en de omliggende dorpen, van Ugchelen en Beekbergen tot Twello, Vaassen en Loenen. Juist aan de rand van de Veluwe zitten veel woningen dicht op de bomen, waardoor goten in het najaar razendsnel vollopen met blad en naalden.",
          "We halen het blad en slib eruit, spoelen de goot door en controleren of de regenpijp vrij is. Zo weet u zeker dat het water er ook echt uit kan. Op verzoek combineren we het schoonmaken van de dakgoot met de glasbewassing of gevelreiniging in dezelfde afspraak.",
          "U kunt uw dakgoten laten schoonmaken door Madern en hoeft dan zelf niet de ladder op, en dat scheelt jaarlijks het grootste risico rond huisonderhoud. De prijs voor dakgoot schoonmaken hangt af van de lengte en de hoogte van de goot; u krijgt dat vooraf zwart op wit.",
        ],
      },
    ],
  },

  "dakkapel-reinigen": {
    image: {
      src: "/images/werk-glazenwasser-woning-apeldoorn.jpg",
      alt: "Glazenwasser van Madern reinigt vanaf een ladder met een watergevoede telescoopsteel de dakrand en bovenste geveldelen van een woning in Apeldoorn",
    },
    sections: [
      {
        heading: "Waarom een dakkapel zo snel vies wordt",
        paragraphs: [
          "Een dakkapel staat vrij, vangt alle regen en wind op en droogt na een bui traag op omdat hij vaak in de schaduw van de dakrand ligt. Dat is precies de omstandigheid waarin algen en groene aanslag zich thuis voelen. Op kunststof zijwangen en boeidelen zie je dat het snelst: een grijsgroene waas die vanaf de straat meteen opvalt.",
          "Veel mensen laten alleen de ramen van de dakkapel doen en vergeten de rest. Juist die zijkanten en de onderrand bepalen of het geheel er verzorgd uitziet. Wij nemen ze standaard mee.",
        ],
      },
      {
        heading: "Kunststof, hout of aluminium",
        paragraphs: [
          "Niet elke dakkapel vraagt dezelfde aanpak. Kunststof heeft een coating die u met agressieve middelen of harde borstels permanent dof kunt maken. Houten boeidelen zijn gevoelig voor water dat blijft staan, en aluminium kan bij verkeerde reiniging vlekken vertonen. We beoordelen vooraf het materiaal en kiezen daar de juiste methode bij.",
          "In alle gevallen werken we met gezuiverd osmosewater. Dat bevat geen kalk of mineralen, droogt daardoor vlekkeloos op en laat geen residu achter op de zijwangen of het glas.",
        ],
      },
      {
        heading: "Veilig, zonder ladder tegen uw dakkapel",
        paragraphs: [
          "Een dakkapel zit per definitie hoog, en een ladder ertegenaan zetten is zowel voor u als voor de dakkapel geen goed idee. Met onze watergevoede telescoopstelen bereiken we het glas, de zijwangen en de boeidelen veilig vanaf de begane grond of vanaf een veilig werkvlak. Geen steunpunten tegen het kunststof, geen risico voor uw dakpannen.",
        ],
      },
      {
        heading: "Wat kost het en hoe vaak?",
        paragraphs: [
          "De prijs hangt af van de breedte van de dakkapel, het materiaal en hoe goed hij bereikbaar is. U krijgt vooraf een vaste prijs, zodat u niet voor verrassingen komt te staan. Voor de meeste woningen volstaat één beurt per jaar; ligt uw dakkapel op het noorden of staan er bomen vlakbij, dan komt de aanslag sneller terug.",
          "Veel klanten combineren het reinigen van de dakkapel met de glasbewassing of het schoonmaken van de dakgoot. Dat scheelt een aparte voorrijbeurt en houdt de prijs per klus gunstiger.",
        ],
      },
    ],
  },
};

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContent[slug];
}
