# SEO-woordkeuze en clusteruitbreiding — Implementatieplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** De dienstpagina's laten mikken op de woorden die de markt daadwerkelijk intypt
("dakgoot schoonmaken" i.p.v. "dakgootreiniging"), twee wijkpagina's toevoegen, en de
wijzigingen borgen met een controleerbaar SEO-invariantscript.

**Architecture:** De site is data-gedreven: `src/lib/services.ts` en `src/lib/plaatsen.ts`
zijn de bron, pagina's onder `src/app/` zijn dunne wrappers rond gedeelde templates, en
`src/app/sitemap.ts` leest dezelfde registries. Een slug wijzigen betekent daarom: registry
aanpassen, routemap hernoemen, en een permanente redirect toevoegen in `next.config.ts`.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript 5, Tailwind v4. Geen
testframework aanwezig — taak 1 introduceert een klein Node-script als toetsbare vangrail.

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-08-08-seo-clusteronderzoek-design.md`. Onderbouwing: `seo/onderzoek-bevindingen.md`.
- **SEO-methode (bestaand, niet wijzigen):** slug = puur het zoekwoord; `title` (de H1) is EXACT gelijk aan de slug met spaties; de langere SEO-titel staat in `metaTitle`.
- **Nooit bedrijfsgegevens of prijzen verzinnen.** Ontbrekende gegevens blijven ontbreken tot Roy ze aanlevert.
- **Geen em-dashes in klantgerichte tekst** (komma's gebruiken); en-dashes voor reeksen zijn toegestaan.
- **Adres blijft op stadsniveau.** Moerbosch 5 is het thuisadres en komt niet publiek op de site.
- **AggregateRating-schema blijft uit** (self-serving).
- **Lokaal bouwen faalt:** `D:` is exFAT, `next build` crasht daar. Verifieer met `npx tsc --noEmit`, `npm run lint` en `node scripts/seo-check.mjs`. Nooit `npm run build` lokaal draaien.
- **PowerShell:** `Remove-Item` op paden met `[ ]` (zoals `src/app/[locatie]`) vereist `-LiteralPath`. Gebruik voor hernoemen bij voorkeur `git mv` via Bash.
- **`main` deployt automatisch naar productie.** Werk op een feature-branch; mergen naar `main` is een expliciet besluit van Roy.

---

### Task 1: SEO-invariantcheck als vangrail

Zonder testharnas is elke volgende taak onverifieerbaar. Dit script controleert de regels
die de site stilzwijgend aanneemt, en faalt zichtbaar als iemand ze breekt.

**Files:**
- Create: `scripts/seo-check.mjs`
- Modify: `package.json` (scripts-blok)

**Interfaces:**
- Consumes: niets uit eerdere taken.
- Produces: commando `npm run seo:check`, dat exit-code 1 geeft bij een overtreding. Alle volgende taken gebruiken dit als verificatiestap.

- [ ] **Step 1: Schrijf het falende controlescript**

Create `scripts/seo-check.mjs`:

```js
// Controleert SEO-invarianten die de site stilzwijgend aanneemt.
// Draaien: npm run seo:check   (exit 1 bij overtreding)
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const errors = [];
const check = (ok, msg) => { if (!ok) errors.push(msg); };

const read = (p) => readFileSync(join(root, p), "utf8");

// --- 1. Elke available service heeft een routemap die exact op de slug matcht ---
const servicesSrc = read("src/lib/services.ts");
const serviceBlocks = servicesSrc.split(/\n  \{\n/).slice(1);
const services = serviceBlocks.map((b) => ({
  slug: (b.match(/slug:\s*"([^"]+)"/) || [])[1],
  available: /available:\s*true/.test(b),
  title: (b.match(/\n    title:\s*"([^"]+)"/) || [])[1],
}));

// Bewuste uitzondering: de slug blijft "glazenwassen-particulier" (exact-match zou
// "ramen wassen" vragen, maar dat woord heeft doe-het-zelf-intentie). Zie spec 3.1.3.
const TITEL_UITZONDERINGEN = new Set(["glazenwassen-particulier"]);

for (const s of services.filter((s) => s.available)) {
  check(existsSync(join(root, "src/app", s.slug, "page.tsx")),
    `service "${s.slug}" is available maar src/app/${s.slug}/page.tsx ontbreekt`);
  if (TITEL_UITZONDERINGEN.has(s.slug)) continue;
  // H1 moet exact de slug zijn met spaties (de afgesproken exact-match methode)
  const verwacht = s.slug.replace(/-/g, " ");
  check(s.title && s.title.toLowerCase() === verwacht,
    `service "${s.slug}": title "${s.title}" wijkt af van exact-match "${verwacht}"`);
}

// --- 2. Elke routemap onder src/app die een service lijkt, staat in de registry ---
const known = new Set([
  "api", "blog", "contact", "diensten", "offerte", "over-ons", "privacy",
  "tarieven", "werkgebied", "werken-bij", "[locatie]",
]);
for (const dir of readdirSync(join(root, "src/app"), { withFileTypes: true })) {
  if (!dir.isDirectory() || known.has(dir.name)) continue;
  check(services.some((s) => s.slug === dir.name && s.available),
    `map src/app/${dir.name} hoort bij geen enkele available service (verweesde route?)`);
}

// --- 3. Elke oude slug die we hernoemd hebben, heeft een permanente redirect ---
const config = read("next.config.ts");
const RENAMED = [
  ["/dakgootreiniging", "/dakgoot-schoonmaken"],
  ["/zonnepanelen-reinigen", "/zonnepanelen-schoonmaken"],
];
for (const [oud, nieuw] of RENAMED) {
  if (!existsSync(join(root, "src/app", nieuw.slice(1), "page.tsx"))) continue;
  check(config.includes(`"${oud}"`),
    `redirect ontbreekt in next.config.ts voor ${oud} -> ${nieuw}`);
  check(!existsSync(join(root, "src/app", oud.slice(1))),
    `oude routemap src/app${oud} bestaat nog naast de redirect`);
}

// --- 4. Doelzoekwoorden moeten daadwerkelijk in de paginatekst staan ---
const CONTENT = read("src/lib/serviceContent.ts").toLowerCase();
const VERPLICHT = [
  ["dakgoot schoonmaken", "dakgoot-cluster (2.600/mnd)"],
  ["dakgoten schoonmaken", "dakgoot-cluster (800/mnd)"],
  ["zonnepanelen schoonmaken", "zonnepanelen-cluster (4.400/mnd)"],
  ["glasbewassing", "glasbewassing (1.400/mnd)"],
];
for (const [term, waarom] of VERPLICHT) {
  check(CONTENT.includes(term), `zoekterm "${term}" ontbreekt in serviceContent.ts — ${waarom}`);
}

// --- 5. Geen em-dashes in klantgerichte teksten ---
for (const f of ["src/lib/services.ts", "src/lib/serviceContent.ts", "src/lib/plaatsen.ts"]) {
  const regels = read(f).split("\n");
  regels.forEach((r, i) => {
    if (r.includes("—")) errors.push(`em-dash in ${f}:${i + 1}`);
  });
}

if (errors.length) {
  console.error(`\nSEO-check: ${errors.length} probleem(en)\n`);
  for (const e of errors) console.error("  x " + e);
  process.exit(1);
}
console.log("SEO-check: alles in orde");
```

- [ ] **Step 2: Voeg het script toe aan package.json**

Voeg in het `"scripts"`-blok toe, ná `"lint": "eslint"`:

```json
    "seo:check": "node scripts/seo-check.mjs"
```

Let op de komma achter de voorgaande regel.

- [ ] **Step 3: Draai de check en verwacht dat hij FAALT**

Run: `npm run seo:check`

Verwacht: exit 1, met precies deze twee meldingen, want de wijzigingen zijn nog niet gedaan:
- `zoekterm "dakgoot schoonmaken" ontbreekt in serviceContent.ts`
- `zoekterm "zonnepanelen schoonmaken" ontbreekt in serviceContent.ts`

Verschijnen er andere meldingen, dan is er iets anders aan de hand dan dit plan aanneemt.
**Pas het script dan niet aan om ze weg te poetsen** — zoek eerst uit waarom de aanname
niet klopt en meld het.

- [ ] **Step 4: Commit**

```bash
git checkout -b seo/woordkeuze-clusteruitbreiding
git add scripts/seo-check.mjs package.json
git commit -m "test: voeg SEO-invariantcheck toe als vangrail"
```

---

### Task 2: Dakgootpagina naar "dakgoot schoonmaken"

Grootste enkele winst: 2.600/mnd tegenover 150 voor het huidige woord, en de pagina staat
nu op positie 77,5 met 337 vertoningen.

**Files:**
- Rename: `src/app/dakgootreiniging/` → `src/app/dakgoot-schoonmaken/`
- Modify: `src/app/dakgoot-schoonmaken/page.tsx` (constante `slug`)
- Modify: `src/lib/services.ts:232-265` (het dakgoot-serviceobject)
- Modify: `src/lib/serviceContent.ts:207` (sleutel + tekst)
- Modify: `next.config.ts` (redirect)

**Interfaces:**
- Consumes: `npm run seo:check` uit taak 1.
- Produces: slug `dakgoot-schoonmaken`. Taak 4 en 5 verwijzen hiernaar in interne links.

- [ ] **Step 1: Hernoem de routemap**

```bash
git mv src/app/dakgootreiniging src/app/dakgoot-schoonmaken
```

- [ ] **Step 2: Werk de slug-constante in de pagina bij**

In `src/app/dakgoot-schoonmaken/page.tsx`, vervang:

```tsx
const slug = "dakgootreiniging";
```

door:

```tsx
const slug = "dakgoot-schoonmaken";
```

- [ ] **Step 3: Werk het serviceobject bij**

In `src/lib/services.ts`, vervang de velden van het dakgoot-object (regel 233 t/m 244):

```ts
    slug: "dakgoot-schoonmaken",
    available: true,
    audience: "beide",
    name: "Dakgoot schoonmaken",
    title: "Dakgoot schoonmaken",
    metaTitle: "Dakgoot schoonmaken Apeldoorn | Voorkom waterschade | Madern",
    metaDescription:
      "Dakgoot schoonmaken in Apeldoorn? Madern haalt blad, mos en vuil uit uw dakgoten en voorkomt zo lekkage en waterschade. Vraag een gratis offerte aan.",
    tagline: "Voorkom waterschade door verstopping.",
    intro:
      "Verstopte dakgoten kunnen leiden tot lekkage en waterschade. Madern maakt uw dakgoten veilig en grondig schoon, verwijdert blad en vuil, zodat het regenwater weer vrij kan wegstromen.",
    keywords: [
      "dakgoot schoonmaken Apeldoorn",
      "dakgoten schoonmaken Apeldoorn",
      "dakgoot schoonmaken Twello",
      "dakgoot laten schoonmaken",
      "dakgoot reinigen Apeldoorn",
    ],
```

Vervang daarnaast de bestaande FAQ (regel 259 t/m 264) door drie vragen die de
gemeten vraagvormen dekken:

```ts
    faqs: [
      {
        q: "Wanneer kan ik mijn dakgoot het beste laten schoonmaken?",
        a: "Meestal in het najaar, ná de bladval, en eventueel in het voorjaar. Bij veel bomen in de buurt is twee keer per jaar verstandig.",
      },
      {
        q: "Wat kost dakgoot schoonmaken?",
        a: "Dat hangt af van de lengte van de goten, de hoogte en de bereikbaarheid. U ontvangt vooraf altijd een gratis, vrijblijvende offerte, zodat u niet voor verrassingen komt te staan.",
      },
      {
        q: "Hoe vaak moet je dakgoten schoonmaken?",
        a: "Voor de meeste woningen volstaat één keer per jaar. Staan er bomen vlak bij het dak, dan is twee keer per jaar verstandig omdat de goten dan sneller dichtslibben.",
      },
    ],
```

- [ ] **Step 4: Werk de long-form content bij**

In `src/lib/serviceContent.ts`, hernoem de sleutel op regel 207 van `dakgootreiniging:`
naar `"dakgoot-schoonmaken":`.

Vervang in dezelfde blok de zin op regel 216 die eindigt met "Regelmatige
dakgootreiniging voorkomt dure schade." door:

```
Regelmatig de dakgoot schoonmaken voorkomt dure schade.
```

Vervang in regel 235 het fragment "de dakgoten te laten reinigen" door:

```
de dakgoten te laten schoonmaken
```

Voeg als laatste sectie in dit blok toe, zodat "dakgoten schoonmaken" (800/mnd) en de
lokale variant gedekt zijn:

```ts
      {
        heading: "Dakgoten schoonmaken in Apeldoorn en omgeving",
        paragraphs: [
          "Wij komen voor het schoonmaken van dakgoten in heel Apeldoorn en de omliggende dorpen, van Ugchelen en Beekbergen tot Twello, Vaassen en Loenen. Juist aan de rand van de Veluwe zitten veel woningen dicht op de bomen, waardoor goten in het najaar razendsnel vollopen met blad en naalden.",
          "We halen het blad en slib eruit, spoelen de goot door en controleren of de regenpijp vrij is. Zo weet u zeker dat het water er ook echt uit kan. Op verzoek combineren we het schoonmaken van de dakgoot met de glasbewassing of gevelreiniging in dezelfde afspraak.",
        ],
      },
```

- [ ] **Step 5: Voeg de permanente redirect toe**

Vervang de volledige inhoud van `next.config.ts` door:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Slugs hernoemd naar de zoekwoorden die de markt daadwerkelijk gebruikt.
      // Zie docs/superpowers/specs/2026-08-08-seo-clusteronderzoek-design.md
      {
        source: "/dakgootreiniging",
        destination: "/dakgoot-schoonmaken",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 6: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: `tsc` en `lint` schoon. `seo:check` meldt nog wel
`zoekterm "zonnepanelen schoonmaken" ontbreekt` (dat is taak 3), maar **niet** meer de
dakgoot-meldingen, en niet `verweesde route` of `redirect ontbreekt`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "seo: dakgootreiniging -> dakgoot-schoonmaken (2.600 vs 150 vol/mnd)"
```

---

### Task 3: Zonnepanelenpagina naar "zonnepanelen schoonmaken"

4.400/mnd tegenover 1.000. Pagina staat nu op positie 21,2 met 271 vertoningen.

**Files:**
- Rename: `src/app/zonnepanelen-reinigen/` → `src/app/zonnepanelen-schoonmaken/`
- Modify: `src/app/zonnepanelen-schoonmaken/page.tsx`
- Modify: `src/lib/services.ts:157-172` plus de bijbehorende FAQ
- Modify: `src/lib/serviceContent.ts:136`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: het `redirects()`-blok uit taak 2.
- Produces: slug `zonnepanelen-schoonmaken`.

- [ ] **Step 1: Hernoem de routemap**

```bash
git mv src/app/zonnepanelen-reinigen src/app/zonnepanelen-schoonmaken
```

- [ ] **Step 2: Werk de slug-constante bij**

In `src/app/zonnepanelen-schoonmaken/page.tsx`, vervang
`const slug = "zonnepanelen-reinigen";` door `const slug = "zonnepanelen-schoonmaken";`.

- [ ] **Step 3: Werk het serviceobject bij**

In `src/lib/services.ts`, vervang regel 158 t/m 172:

```ts
    slug: "zonnepanelen-schoonmaken",
    available: true,
    audience: "beide",
    name: "Zonnepanelen schoonmaken",
    title: "Zonnepanelen schoonmaken",
    metaTitle: "Zonnepanelen schoonmaken Apeldoorn | Meer opbrengst | Madern",
    metaDescription:
      "Vuile zonnepanelen leveren minder op. Madern maakt uw zonnepanelen in Apeldoorn streepvrij schoon met osmosewater, veilig en zonder krassen. Vraag een offerte aan.",
    tagline: "Schone panelen, meer rendement.",
    intro:
      "Stof, mos en vogelpoep verminderen de opbrengst van uw zonnepanelen. Madern maakt uw panelen veilig en streepvrij schoon met gezuiverd osmosewater, zonder agressieve middelen die de coating kunnen aantasten, zodat ze weer maximaal renderen.",
    keywords: [
      "zonnepanelen schoonmaken Apeldoorn",
      "zonnepanelen laten schoonmaken",
      "zonnepanelen reinigen Apeldoorn",
      "zonnepanelen schoonmaken kosten",
    ],
```

Vervang de eerste FAQ-vraag (regel 189) door de gemeten vraagvorm:

```ts
      {
        q: "Hoe vaak moet je zonnepanelen schoonmaken?",
        a: "Eén tot twee keer per jaar is voor de meeste daken voldoende. Bij veel bomen of een plat dak kan vaker lonen.",
      },
```

En voeg als extra FAQ toe:

```ts
      {
        q: "Wat kost zonnepanelen schoonmaken?",
        a: "De prijs hangt af van het aantal panelen, de hoogte en de bereikbaarheid van het dak. U krijgt vooraf een gratis offerte met een vaste prijs.",
      },
```

- [ ] **Step 4: Werk de long-form content bij**

In `src/lib/serviceContent.ts`, hernoem de sleutel op regel 136 van
`"zonnepanelen-reinigen":` naar `"zonnepanelen-schoonmaken":`.

Pas exact deze vijf plekken aan. De overige "reinigen"-vermeldingen blijven bewust staan:
dat woord doet zelf nog 1.000/mnd en volledig verwijderen zou zoekverkeer kosten.

Regel 143, heading — vervang:
`heading: "Vuile zonnepanelen leveren minder op",`
door:
`heading: "Zonnepanelen schoonmaken: vuile panelen leveren minder op",`

Regel 146 — vervang:
`"Door uw zonnepanelen periodiek te laten reinigen, herstelt u die opbrengst. De investering verdient zichzelf vaak terug in extra opgewekte stroom.",`
door:
`"Door uw zonnepanelen periodiek te laten schoonmaken, herstelt u die opbrengst. De investering verdient zichzelf vaak terug in extra opgewekte stroom.",`

Regel 150, heading — vervang:
`heading: "Veilig en krasvrij gereinigd",`
door:
`heading: "Veilig en krasvrij schoongemaakt",`

Regel 152 — vervang het begin `"Zonnepanelen vragen om een voorzichtige aanpak. Wij reinigen ze met zacht,`
door:
`"Zonnepanelen vragen om een voorzichtige aanpak. Wij maken ze schoon met zacht,`

Regel 166 — vervang:
`"We reinigen zonnepanelen voor zowel particulieren als bedrijven in Apeldoorn en omgeving. Vraag vrijblijvend een offerte aan en haal weer het maximale uit uw installatie.",`
door:
`"We maken zonnepanelen schoon voor zowel particulieren als bedrijven in Apeldoorn en omgeving. Zowel op schuine daken als op platte daken, waar het vuil door het ontbreken van afspoeling juist sneller blijft liggen. Vraag vrijblijvend een offerte aan en haal weer het maximale uit uw installatie.",`

- [ ] **Step 5: Voeg de tweede redirect toe**

In `next.config.ts`, voeg binnen de array van `redirects()` toe, ná het dakgoot-object:

```ts
      {
        source: "/zonnepanelen-reinigen",
        destination: "/zonnepanelen-schoonmaken",
        permanent: true,
      },
```

- [ ] **Step 6: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: alle drie schoon. `seo:check` print nu `SEO-check: alles in orde`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "seo: zonnepanelen-reinigen -> zonnepanelen-schoonmaken (4.400 vs 1.000 vol/mnd)"
```

---

### Task 4: "Glasbewassing" gericht targeten

1.400/mnd landelijk, 150 op `glasbewassing apeldoorn` (KD 3). De site gebruikt het woord
al terloops maar mikt er nergens op: GSC toont 71 vertoningen op positie 13,2.

**Files:**
- Modify: `src/app/page.tsx:17` (metaDescription) en het tekstblok rond regel 180
- Modify: `src/lib/services.ts` (keywords van `glazenwassen-particulier`)
- Modify: `src/lib/serviceContent.ts` (blok `glazenwassen-particulier`)

**Interfaces:**
- Consumes: niets nieuws.
- Produces: geen nieuwe exports.

> **Bewuste niet-wijziging.** De slug `glazenwassen-particulier` blijft staan. "Ramen
> wassen" doet 4.800 maar heeft intentie `Informational, Non-local` (doe-het-zelvers); de
> koopvariant "ramen laten wassen" doet slechts 100. Overstappen zou commerciële intentie
> inruilen voor verkeer dat niet koopt. Zie spec sectie 3.1.3.

- [ ] **Step 1: Voeg glasbewassing toe aan de keywords van de particulierpagina**

In `src/lib/services.ts`, vervang de `keywords`-array van `glazenwassen-particulier`
(regel 43 t/m 47) door:

```ts
    keywords: [
      "glazenwasser particulier Apeldoorn",
      "glasbewassing Apeldoorn",
      "glasbewassing particulier",
      "ramen laten wassen",
    ],
```

- [ ] **Step 2: Voeg een H2-sectie over glasbewassing toe**

In `src/lib/serviceContent.ts`, voeg binnen het blok `"glazenwassen-particulier"` een
sectie toe, ná de sectie "Streepvrij met gezuiverd osmosewater":

```ts
      {
        heading: "Glasbewassing in Apeldoorn voor particulieren",
        paragraphs: [
          "Glasbewassing is het vakwoord voor wat u waarschijnlijk gewoon ramen wassen noemt: het professioneel schoonmaken van al het glas aan uw woning. Bij Madern betekent dat ramen, kozijnen, deuren, serres en dakramen, aan de binnen- en de buitenkant, met gezuiverd osmosewater.",
          "Veel mensen denken dat glasbewassing alleen iets is voor kantoren en winkels. Dat klopt niet: juist bij woningen levert het veel op, omdat u er elke dag doorheen kijkt. Wij werken met vaste schema's voor particulieren in heel Apeldoorn, van De Maten en Zevenhuizen tot Ugchelen en Beekbergen.",
        ],
      },
```

- [ ] **Step 3: Werk de homepage-meta bij**

In `src/app/page.tsx` regel 17, vervang de metaDescription-tekst door:

```
"Glazenwasser Apeldoorn nodig? - Madern Glazenwassers voor streepvrije glasbewassing, zonnepanelen schoonmaken, gevelreiniging en dakgoot schoonmaken bij u in de buurt"
```

Let op: dit bevat nu ook de nieuwe dienstwoorden uit taak 2 en 3.

- [ ] **Step 4: Werk de diensten-hub bij**

In `src/app/diensten/page.tsx` regel 33, vervang "zonnepanelen reinigen, gevel- en
dakgootreiniging" door:

```
zonnepanelen schoonmaken, gevelreiniging en dakgoot schoonmaken
```

- [ ] **Step 5: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: alle drie schoon.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "seo: glasbewassing gericht targeten op home en particulierpagina"
```

---

### Task 5: Wijkpagina's De Maten en Apeldoorn Zuid

**Bewijs komt uitsluitend uit GSC, niet uit Ahrefs** (dat geeft 0 voor wijknamen):
De Maten haalt 50 vertoningen op positie 3 zonder eigen pagina, Apeldoorn Zuid 78
vertoningen op positie 18,7. Ahrefs geeft `glazenwasser apeldoorn zuid` = 50.

**Files:**
- Modify: `src/lib/plaatsen.ts` (twee entries toevoegen aan de `plaatsen`-array)

**Interfaces:**
- Consumes: bestaande `locatieSlug(p)` die `glazenwasser-${p.slug}` teruggeeft; slug `apeldoorn-de-maten` levert dus vanzelf `/glazenwasser-apeldoorn-de-maten`. Geen wijziging aan `plaatsen.ts`-functies nodig.
- Produces: twee extra routes via `generateStaticParams`, en twee extra sitemap-entries. Beide gaan automatisch.

- [ ] **Step 1: Voeg De Maten toe**

In `src/lib/plaatsen.ts`, voeg toe aan de `plaatsen`-array, ná het `apeldoorn`-object en
vóór `ugchelen`:

```ts
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
```

- [ ] **Step 2: Voeg Apeldoorn Zuid toe**

Direct ná het De Maten-object:

```ts
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
```

- [ ] **Step 3: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: alle drie schoon. De routes worden automatisch gegenereerd omdat
`generateStaticParams` in `src/app/[locatie]/page.tsx` over `locatiePlaatsen` loopt, en de
sitemap leest dezelfde lijst.

- [ ] **Step 4: Controleer dat de routes echt bestaan**

Run:

```bash
node -e "const s=require('fs').readFileSync('src/lib/plaatsen.ts','utf8'); const m=[...s.matchAll(/slug: \"([^\"]+)\"/g)].map(x=>x[1]); console.log(m.map(x=>x==='apeldoorn'?'(home)':'/glazenwasser-'+x).join('\n'))"
```

Verwacht in de uitvoer: `/glazenwasser-apeldoorn-de-maten` en `/glazenwasser-apeldoorn-zuid`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "seo: wijkpagina's De Maten en Apeldoorn Zuid toevoegen"
```

---

### Task 6: Rank-tracker bijwerken

De nulmeting moet vastliggen, anders is over twaalf weken niet vast te stellen of dit
gewerkt heeft.

**Files:**
- Modify: `seo/rank-tracker.csv`

**Interfaces:**
- Consumes: niets.
- Produces: niets in code.

- [ ] **Step 1: Werk de doelpagina's van bestaande regels bij**

Het bestand is puntkomma-gescheiden met deze kolommen:

```
Zoekwoord;Intentie;Doelpagina;Google organisch (positie);Local pack top-3? (J/N);Datum check;Concurrent #1;Notities
```

Zoek bestaande regels waarvan de `Doelpagina` verwijst naar een hernoemde slug
(`/dakgootreiniging`, `/zonnepanelen-reinigen`) en werk die kolom bij naar
`/dakgoot-schoonmaken` respectievelijk `/zonnepanelen-schoonmaken`.

- [ ] **Step 2: Voeg de nieuwe doelzoekwoorden toe**

Voeg deze regels toe aan het eind van het bestand. De positiekolom bevat de GSC-nulmeting
van 2026-08-08:

```csv
dakgoot schoonmaken apeldoorn;Commercieel / lokaal;/dakgoot-schoonmaken;77,5;;2026-08-08;;Nulmeting GSC, 160 vertoningen
dakgoten schoonmaken apeldoorn;Commercieel / lokaal;/dakgoot-schoonmaken;70,2;;2026-08-08;;Nulmeting GSC, 66 vertoningen
dakgoot schoonmaken twello;Commercieel / lokaal;/dakgoot-schoonmaken;;;2026-08-08;;Ahrefs 100/mnd, nog geen vertoningen
zonnepanelen schoonmaken apeldoorn;Commercieel / lokaal;/zonnepanelen-schoonmaken;21,2;;2026-08-08;;Nulmeting GSC, 122 vertoningen
glasbewassing apeldoorn;Commercieel / lokaal;/ (home);13,2;;2026-08-08;;Nulmeting GSC, 71 vertoningen
glazenwasser apeldoorn de maten;Commercieel / lokaal;/glazenwasser-apeldoorn-de-maten;3,0;;2026-08-08;;Stond op pos 3 zonder eigen pagina
glazenwasser apeldoorn zuid;Commercieel / lokaal;/glazenwasser-apeldoorn-zuid;18,7;;2026-08-08;;Nulmeting GSC, 78 vertoningen
glazenwasser apeldoorn kosten;Commercieel / lokaal;/tarieven;10,7;;2026-08-08;;Tarievenpagina krijgt zelf 0 vertoningen
dakkapel reinigen apeldoorn;Commercieel / lokaal;(nog geen pagina);89,7;;2026-08-08;;Geblokkeerd tot Michael bevestigt
```

- [ ] **Step 3: Commit**

```bash
git add seo/rank-tracker.csv
git commit -m "seo: nulmeting 2026-08-08 en nieuwe doelzoekwoorden in rank-tracker"
```

---

### Task 7 (UITGESTELD): `/tarieven` herbouwen

**Status 2026-08-08:** Roy is nog bezig prijzen te bepalen die klanten accepteren, en
heeft besloten dit voorlopig te laten liggen. De pagina blijft ongewijzigd. **Niet
uitvoeren met placeholderbedragen.** Oppakken zodra de tarieven vaststaan.

Zodra de cijfers er zijn, mikt de pagina op: wat kost een glazenwasser (500), prijs
glazenwasser (200), glazenwasser tarieven (150), glazenwasser prijs (150), glazenwasser
kosten (150), kosten glazenwasser (150), wat kost een glazenwasser per uur (150), per m2
(100), gemiddeld (70), kosten glazenwasser particulier (60), kosten glazenwasser
appartement (40). Allemaal KD 0-1. Lokaal: glazenwasser apeldoorn kosten (50), nu positie
10,7 met 56 vertoningen, terwijl de pagina zelf nul vertoningen krijgt.

---

### Task 8 (AFGEROND 2026-08-08): `/dakkapel-reinigen`

Roy bevestigde dat Michael dakkapellen schoonmaakt. Pagina gebouwd met
`available: true`, long-form content over kunststof/hout/aluminium, veilig werken vanaf
de grond, en prijs/frequentie. Hergebruikt `werk-glazenwasser-woning-apeldoorn.jpg`;
een echte dakkapelfoto zou beter zijn zodra die er is.

Cluster ~2.400/mnd landelijk: dakkapel reinigen (700), dakkapel schoonmaken (450),
dakkapel laten reinigen (150), dakkapel reinigen kosten (150), dakkapel schoonmaken kosten
(150), kunststof dakkapel reinigen (150). Regio 350. GSC toont al 42 vertoningen op
positie 89,7 zonder pagina. Let op: hier is "reinigen" (700) juist het sterkere woord dan
"schoonmaken" (450), dus de slug wordt `dakkapel-reinigen`.

---

## Buiten scope van dit plan

Laag 3 uit de spec (de kennisbank, acht artikelen op het osmose- en vraag-cluster) is een
eigen project en krijgt een eigen spec-plan-cyclus. Reden: acht long-form artikelen is te
breed om in dezelfde ronde goed uit te voeren, en het rendement is anders van aard
(autoriteit en AI-zichtbaarheid, geen directe leads).

## Afronding

Na taak 6: merge naar `main` is een **expliciet besluit van Roy**, want elke push naar
`main` deployt automatisch naar productie. Verifieer daarna op de live site:

```bash
curl -sI https://www.madernglazenwassers.nl/dakgootreiniging | head -5
curl -sI https://www.madernglazenwassers.nl/zonnepanelen-reinigen | head -5
```

Verwacht in beide gevallen: `HTTP/2 308` met een `location`-header naar de nieuwe slug.

Dien daarna de bijgewerkte sitemap opnieuw in via Google Search Console en vraag
handmatige indexering aan voor de twee hernoemde pagina's en de twee wijkpagina's.
