# Kennisbank — ontwerp

Datum: 2026-08-12
Onderbouwing: `seo/onderzoek-bevindingen.md` (ronde 2, vraag-cluster en osmose)
Voorafgaand ontwerp: `docs/superpowers/specs/2026-08-08-seo-clusteronderzoek-design.md`, laag 3

Dit is de uitwerking van laag 3 uit het clusteronderzoek. Die laag was bewust buiten het
woordkeuze-plan gehouden omdat acht long-form artikelen te breed is om in dezelfde ronde
goed uit te voeren, en omdat het rendement van andere aard is.

---

## 1. Doel en meetlat

Het osmose-cluster doet 19.500/mnd landelijk, het vraag-cluster 9.730/mnd met traffic
potential tot 4.000. Regionaal is beide **nul**.

Dit cluster levert autoriteit en zichtbaarheid in AI-zoekmachines op, **geen directe
leads**. Zo moet het ook beoordeeld worden. Wie hier klikken en offerteaanvragen van
verwacht, zal teleurgesteld raken en om de verkeerde reden concluderen dat het niet werkt.

**Uitzondering:** artikel 5 (`wat-kost-dakgoot-schoonmaken`) heeft wel echte koopintentie
en voedt het dakgoot-cluster, dat regionaal 1.220/mnd doet. Dat artikel mag wel op
aanvragen worden afgerekend.

### Meetlat na 12 weken

Meten in Google Search Console, per artikel:

| Wat | Nulmeting 2026-08-08 |
|---|---|
| `wat-is-osmosewater`, vertoningen | 182 |
| `wat-is-osmosewater`, gemiddelde positie | 24,9 |
| Overige zeven artikelen | bestaan nog niet, dus nul |

Succes is: vertoningen op het osmose- en vraagcluster stijgen, en het osmose-artikel
zakt onder positie 15. Klikken en leads zijn hier expliciet **geen** criterium, behalve
bij artikel 5.

---

## 2. Architectuur

### Route blijft `/blog/[slug]`

Niet hernoemen naar `/kennisbank`. Dat kost redirects, breekt de twee bestaande artikelen
die al vertoningen krijgen, en levert inhoudelijk niets op. De term "kennisbank" is een
interne aanduiding voor dit cluster, geen URL.

### `src/lib/blog.ts` opsplitsen naar `src/lib/blog/`

`src/lib/blog.ts` is nu 137 regels met twee artikelen. Met acht artikelen van 1.200 tot
1.600 woorden groeit dat richting de 900 regels in één bestand. Dat is het formaat waarop
gericht bewerken onbetrouwbaar wordt: een edit raakt de verkeerde plek, of een artikel
sneuvelt ongemerkt bij een aanpassing aan een ander artikel.

Nieuwe indeling:

```
src/lib/blog/
  types.ts        BlogSection, BlogArticle
  index.ts        verzamelt de artikelen, exporteert blogArticles + getArticle
  wat-is-osmosewater.ts
  waarmee-kun-je-het-beste-ramen-wassen.ts
  ...             één bestand per artikel
```

`index.ts` exporteert exact dezelfde namen als nu (`blogArticles`, `getArticle`,
`BlogArticle`, `BlogSection`). Alle bestaande imports uit `src/app/blog/page.tsx` en
`src/app/blog/[slug]/page.tsx` blijven ongewijzigd werken, omdat TypeScript
`@/lib/blog` naar `src/lib/blog/index.ts` resolvet zodra `src/lib/blog.ts` weg is.

**Let op bij uitvoering:** `src/lib/blog.ts` en de map `src/lib/blog/` mogen niet naast
elkaar bestaan, dat geeft een ambigue module-resolutie. Het bestand wordt verwijderd in
dezelfde stap waarin de map ontstaat.

---

## 3. De acht artikelen

Bronmateriaal: bestaande site-teksten, vakkennis en de gemeten zoekvragen uit GSC. Er
worden **geen bedrijfsgegevens verzonnen**. Het enige harde bedrijfscijfer in deze set is
het dakgoottarief in artikel 5, dat expliciet is vastgesteld (zie 3.5).

### 3.1 `wat-is-osmosewater` — uitbreiden

Bestaat al, staat op positie 24,9 met 182 vertoningen.

**Doelwoorden:** wat is osmose water (5.550-cluster), wat is osmose (900), hoe werkt
osmose, nadelen osmose water.

**Invalshoek:** het diepe stuk over osmose zelf. Wat omgekeerde osmose is, hoe het membraan
werkt, waarom mineraalvrij water vlekkeloos opdroogt, en een eerlijke sectie over de
nadelen: hogere aanschaf, spoelwaterverbruik, membraan dat vervangen moet worden, en het
feit dat het voor sommige toepassingen juist ongeschikt is. Die nadelen-sectie is het
onderscheidende deel, want de concurrentie duikt daaromheen terwijl mensen er wel op
zoeken.

**Interne links:** `/glazenwassen-particulier`, artikel 3.7.

**Beeld:** ontbreekt, zie sectie 6. Voorlopig `glazenwasser-apeldoorn-aan-het-werk.jpg`.

### 3.2 `waarmee-kun-je-het-beste-ramen-wassen`

**Doelwoorden:** waarmee ramen wassen (1.000, TP 3.000), hoe het beste ramen wassen
(100, TP 3.600).

**Invalshoek:** eerlijk doe-het-zelfadvies. Zeem versus trekker versus microvezel, of
azijn en spiritus werken, waarom afwasmiddel strepen geeft, welke volgorde en welk weer.
Afsluiten met wanneer het niet meer loont om het zelf te doen: hoogte, dakramen, veel
glasoppervlak.

**Bewuste afwijking:** dit publiek heeft doe-het-zelfintentie (`ramen wassen` is
*Informational, Non-local*). Geen offerte-CTA aan het eind, alleen een terloopse verwijzing.
Een verkoopblok jaagt dit publiek weg en kost de rankings die we hier juist willen.

**Interne links:** `/glazenwassen-particulier`, artikel 3.8.

**Beeld:** `ramen-wassen-woning-apeldoorn.jpg`.

### 3.3 `hoe-vaak-zonnepanelen-schoonmaken`

**Doelwoorden:** moet je zonnepanelen schoonmaken (300, TP 7.300), hoe vaak zonnepanelen
schoonmaken (150, TP 2.200).

**Invalshoek:** hoeveel opbrengst je werkelijk verliest en waardoor, verschil tussen schuin
en plat dak (op een plat dak spoelt regen niets weg, dus vervuilt het sneller), wanneer
schoonmaken zichzelf terugverdient en wanneer niet.

**Interne links:** `/zonnepanelen-schoonmaken`, `/offerte`.

**Beeld:** ontbreekt, zie sectie 6. Voorlopig `werk-glazenwasser-hoogte-apeldoorn.jpg`.

### 3.4 `hoe-vaak-dakgoot-schoonmaken`

**Doelwoorden:** hoe vaak dakgoot schoonmaken (150, TP 1.300), wanneer dakgoot schoonmaken
(150).

**Invalshoek:** seizoensadvies (najaar na de bladval, eventueel voorjaar), hoe bomen in de
buurt de frequentie bepalen, en wat er concreet misgaat bij uitstel: overlopende goten,
natte gevels, houtrot aan boeidelen, vocht in de spouw.

**Interne links:** `/dakgoot-schoonmaken`, artikel 3.5.

**Beeld:** `werk-dakgoot-reinigen-apeldoorn.jpg`.

### 3.5 `wat-kost-dakgoot-schoonmaken`

**Doelwoorden:** dakgoot schoonmaken prijs (400), wat kost een dakgoot schoonmaken
(100, TP 1.500).

Het enige artikel in deze set met echte koopintentie.

**Vastgesteld tarief:** **€5 per strekkende meter, met een minimumbedrag van €95.**

Onderbouwing van dat bedrag, voor de volledigheid vastgelegd zodat het later navolgbaar is:

- Michael rekent per strekkende meter, afgeleid van zijn uurtarief van €70.
- Zijn eigen inschatting was 10 meter in 15 minuten, wat op €1,75 per meter zou uitkomen.
  Dat is alleen de tijd aan de goot en telt rijden, opbouwen, opruimen en administratie
  niet mee. Een woning met 20 meter goot kost van deur tot deur ongeveer anderhalf uur,
  waarmee €35 neerkomt op circa €23 per uur.
- De Nederlandse markt vraagt €3 tot €15 per meter, met €100 tot €150 voor 10 meter tot
  6 meter hoogte als veelgenoemd richtbedrag (Homedeal, Werkspot, Joslaan,
  dakgotenschoonmaken.com, geraadpleegd 2026-08-12).
- Bij €5 per meter komt diezelfde woning op €100, ofwel circa €67 per uur over de volle
  klus. Dat is het tarief dat Michael zelf wil verdienen, en het ligt aan de gunstige kant
  van de markt.

**Invalshoek:** de vraag direct beantwoorden met het bedrag, dan rekenvoorbeelden per
woningtype (tussenwoning, hoekwoning, twee-onder-een-kap, vrijstaand), dan wat de prijs
opdrijft (hoogte, bereikbaarheid, mate van vervuiling, begroeiing), en wat er in de prijs
zit (goot leeghalen, doorspoelen, regenpijp controleren).

**Interne links:** `/dakgoot-schoonmaken`, `/offerte`, artikel 3.4.

**Beeld:** `dakgootreiniging-apeldoorn.jpg`.

**Randvoorwaarde:** dit bedrag komt straks ook op `/tarieven` te staan. Het wordt hier één
keer vastgesteld en daar overgenomen, niet opnieuw bedacht.

### 3.6 `wat-is-glasbewassing`

**Doelwoorden:** wat is glasbewassing (60), glasbewassing (1.400).

**Invalshoek:** het vakwoord uitleggen. Wat er wel en niet onder valt (ramen, kozijnen,
deuren, serres, dakramen, binnen en buiten), het verschil met "ramen wassen" in het
spraakgebruik, en het misverstand dat glasbewassing alleen iets voor bedrijven is.

**Interne links:** `/glazenwassen-particulier`, `/glazenwassen-zakelijk`.

**Beeld:** `werk-glasbewassing-bedrijfspand-apeldoorn.jpg`.

### 3.7 `wat-voor-water-gebruikt-een-glazenwasser`

**Doelwoorden:** wat voor water gebruikt een glazenwasser (80), welk water gebruikt een
glazenwasser (70).

**Invalshoek:** kort en direct. Waarom kraanwater kalkvlekken en strepen achterlaat, wat
gedemineraliseerd water is, en waar osmosewater in dat rijtje past.

**Afbakening tegen artikel 3.1.** Deze twee overlappen inhoudelijk en kunnen elkaar
kannibaliseren. Ze krijgen daarom verschillende rollen:

| | 3.7 | 3.1 |
|---|---|---|
| Rol | kort, direct antwoord op "welk water" | diepe uitleg van osmose zelf |
| Lengte | 800 tot 1.000 woorden | 1.400 tot 1.600 woorden |
| Behandelt | leidingwater, gedemineraliseerd, osmose, naast elkaar | membraan, werking, nadelen, toepassing |
| Linkt naar | 3.1 als het uitgebreide stuk | 3.7 niet, om de richting eenduidig te houden |

De link loopt bewust maar één kant op, zodat voor Google duidelijk is welke pagina het
zwaartepunt van het osmose-onderwerp is.

**Beeld:** ontbreekt, zie sectie 6. Voorlopig `werk-glazenwasser-woning-apeldoorn.jpg`.

### 3.8 `hoe-vaak-ramen-laten-wassen` — uitbreiden

Bestaat al.

**Doelwoorden:** hoe vaak ramen wassen (200), hoe vaak ramen wassen buiten (90).

**Invalshoek:** het bestaande artikel dekt de frequentievraag al goed. Aanvullen met een
sectie over buitenzijde versus binnenzijde (de gemeten vraagvorm "hoe vaak ramen wassen
buiten"), en het directe antwoord naar voren halen conform sectie 4.

**Interne links:** `/glazenwassen-particulier`, artikel 3.2.

**Beeld:** ongewijzigd.

---

## 4. Opzet die alle acht delen

**Direct antwoord in de eerste twee zinnen.** De vraag uit de titel wordt letterlijk
beantwoord voordat de uitleg begint. Dit is wat AI-zoekmachines en featured snippets
oppikken, en het is precies waar de meeste concurrenten drie alinea's inleiding voor
zetten. Bij de bestaande artikelen 3.1 en 3.8 betekent dit dat de intro herschreven wordt.

**Vier tot zes H2-secties**, 1.200 tot 1.600 woorden per artikel (3.7 korter, zie 3.7).

**Drie tot vijf FAQ's** per artikel, met de exacte vraagvormen zoals gemeten in GSC, niet
met omgeschreven varianten.

**Interne links:** elk artikel linkt naar de bijbehorende dienstpagina plus één of twee
zusterartikelen, zoals per artikel gespecificeerd in sectie 3. Dat onderlinge web is wat
hier een cluster van maakt in plaats van acht losstaande pagina's.

**Zachte CTA aan het eind**, met uitzondering van artikel 3.2.

**Schrijfregels, ongewijzigd beleid:**

- Geen em-dashes in klantgerichte tekst, komma's gebruiken. En-dashes voor reeksen mogen.
- Geen verzonnen bedrijfsgegevens of prijzen. Het dakgoottarief in 3.5 is de enige
  uitzondering en is expliciet vastgesteld.
- Adres blijft op stadsniveau.

---

## 5. Twee ingrepen onderweg

### 5.1 FAQ-schema ontbreekt op blogpagina's

`faqSchema()` bestaat in `src/lib/schema.ts` en `BlogArticle` heeft een `faqs`-veld, maar
`src/app/blog/[slug]/page.tsx` zet alleen `articleSchema` neer. De FAQ's staan dus wel
zichtbaar op de pagina, maar niet in de structured data. Toevoegen.

### 5.2 `scripts/seo-check.mjs` uitbreiden met blog-invarianten

Zonder controle is bij acht artikelen niet vast te stellen of alles klopt. Toe te voegen
controles:

1. Elke artikel-slug is uniek.
2. Elk artikel heeft een `image.src` die daadwerkelijk in `public/images` bestaat.
3. Elke interne link in de artikelteksten wijst naar een bestaande route onder `src/app`.
4. Per artikel komt het primaire doelzoekwoord letterlijk in de tekst voor.
5. Geen em-dashes in de artikelbestanden.

Deze controles draaien mee in het bestaande `npm run seo:check`.

---

## 6. Beeldmateriaal

`public/images` bevat 13 foto's, genoeg om elk artikel een eigen beeld te geven zonder
herhaling. Twee ontbreken die er inhoudelijk toe doen:

| Ontbrekend | Voor | Waarom het uitmaakt |
|---|---|---|
| Osmose-installatie of waterfilter | 3.1, 3.7 | Kern van het hele cluster, nu illustreren we het onderwerp met een foto van iets anders |
| Zonnepanelen | 3.3 | Artikel gaat over panelen, beeld toont een glazenwasser |

Aanbeveling: die twee laten maken. Tot die tijd de terugvallen uit sectie 3 gebruiken.
Dit blokkeert de uitvoering niet.

---

## 7. Wat we bewust niet doen

| Niet doen | Reden |
|---|---|
| `/blog` hernoemen naar `/kennisbank` | Kost redirects, breekt bestaande vertoningen, levert niets op |
| Artikel 3.1 en 3.7 samenvoegen | Twee verschillende zoekintenties. Gescheiden houden met eenduidige linkrichting is beter dan één pagina die beide half bedient |
| Offerte-CTA in artikel 3.2 | Doe-het-zelfpubliek, verkoopblok werkt averechts |
| DIY-content uitbouwen (raamwisser, telescoopsteel, glazenwasser set) | 8.560/mnd maar levert geen klanten. Ongewijzigd beleid uit het clusteronderzoek |
| AggregateRating-schema | Blijft uit, self-serving. Ongewijzigd beleid |
| `/tarieven` herbouwen | Wacht op de volledige prijslijst. Het dakgoottarief uit 3.5 is straks het eerste vaste bedrag dat daar op kan |

---

## 8. Volgorde

1. Vangrail eerst: `blog.ts` opsplitsen en `seo-check.mjs` uitbreiden, zodat alles daarna
   controleerbaar is.
2. FAQ-schema toevoegen.
3. De twee bestaande artikelen uitbreiden (3.1, 3.8). Die hebben al posities, dus daar is
   het effect het snelst zichtbaar.
4. Artikel 3.5 (dakgootkosten), het enige met koopintentie.
5. De overige vijf, in volgorde van traffic potential: 3.3, 3.2, 3.4, 3.7, 3.6.
6. Rank-tracker uitbreiden met de nieuwe doelzoekwoorden en de nulmeting.

## 9. Randvoorwaarden bij uitvoering

- Werk op branch `seo/kennisbank`. Mergen naar `main` is een **expliciet besluit van Roy**,
  want elke push naar `main` deployt automatisch naar productie.
- Lokaal bouwen faalt: `D:` is exFAT, `next build` crasht daar. Verifieer met
  `npx tsc --noEmit`, `npm run lint` en `npm run seo:check`. Nooit `npm run build` lokaal
  draaien.
- PowerShell: `Remove-Item` op paden met `[ ]` vereist `-LiteralPath`. Gebruik voor
  hernoemen bij voorkeur `git mv` via Bash.
- Na merge: sitemap opnieuw indienen via Google Search Console en handmatige indexering
  aanvragen voor de zes nieuwe artikelen.
