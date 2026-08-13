# Kennisbank Implementatieplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Acht long-form artikelen op het osmose- en vraagcluster live krijgen onder `/blog`, onderling gelinkt tot één cluster, met een controleerbare vangrail eromheen.

**Architecture:** De site is data-gedreven. `src/lib/blog.ts` wordt opgesplitst naar `src/lib/blog/` met één bestand per artikel en een `index.ts` die de bestaande exports ongewijzigd doorgeeft. De paginatemplate `src/app/blog/[slug]/page.tsx` krijgt twee uitbreidingen: inline links in paragrafen en FAQ-schema. `scripts/seo-check.mjs` krijgt blog-invarianten en fungeert als testharnas: die faalt na taak 3 en wordt door de artikeltaken stap voor stap groen.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript 5, Tailwind v4. Geen testframework aanwezig, `npm run seo:check` is de toetsbare vangrail.

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-08-12-kennisbank-design.md`. Onderbouwing: `seo/onderzoek-bevindingen.md`.
- **Branch:** `seo/kennisbank`. Mergen naar `main` is een **expliciet besluit van Roy**, want elke push naar `main` deployt automatisch naar productie.
- **Nooit bedrijfsgegevens of prijzen verzinnen.** Het enige harde bedrijfscijfer in dit plan is het dakgoottarief in taak 6: **€5 per strekkende meter, minimum €95**. Dat is vastgesteld, zie spec 3.5. Verzin geen tweede bedrag, geen uurtarief op de site, geen kortingspercentages.
- **Geen em-dashes in klantgerichte tekst** (komma's gebruiken); en-dashes voor reeksen zijn toegestaan. `seo:check` handhaaft dit.
- **Adres blijft op stadsniveau.** Moerbosch 5 is het thuisadres en komt niet publiek op de site.
- **AggregateRating-schema blijft uit** (self-serving).
- **Lokaal bouwen faalt:** `D:` is exFAT, `next build` crasht daar. Verifieer met `npx tsc --noEmit`, `npm run lint` en `npm run seo:check`. Nooit `npm run build` lokaal draaien.
- **PowerShell:** `Remove-Item` op paden met `[ ]` (zoals `src/app/blog/[slug]`) vereist `-LiteralPath`. Gebruik voor hernoemen en verwijderen bij voorkeur `git mv` / `git rm` via Bash.
- **Schrijfregels per artikel:** direct antwoord in de eerste twee zinnen van de `intro`, 4 tot 6 H2-secties, 1.200 tot 1.600 woorden (taak 10 korter: 800 tot 1.000), 3 tot 5 FAQ's met de exacte gemeten vraagvormen.

### Over de artikelteksten in dit plan

Per artikel staan hieronder vast: slug, `title`, `metaTitle`, `metaDescription`, `excerpt`, beeld, de exacte H2-koppen met per kop wat erin moet, de exacte FAQ-vragen, de zoekwoorden die letterlijk in de tekst moeten voorkomen, en de interne links. De lopende alinea's zelf schrijft de uitvoerder, want dat proza *is* de deliverable en zou anders twee keer geschreven worden. `npm run seo:check` bewaakt of het resultaat aan de invarianten voldoet.

---

### Task 1: `src/lib/blog.ts` opsplitsen naar `src/lib/blog/`

Puur structureel, geen gedragsverandering. Met acht artikelen groeit één bestand richting de 900 regels, en dan wordt gericht bewerken onbetrouwbaar.

**Files:**
- Create: `src/lib/blog/types.ts`
- Create: `src/lib/blog/index.ts`
- Create: `src/lib/blog/hoe-vaak-ramen-laten-wassen.ts`
- Create: `src/lib/blog/wat-is-osmosewater.ts`
- Delete: `src/lib/blog.ts`

**Interfaces:**
- Consumes: niets uit eerdere taken.
- Produces: `import { blogArticles, getArticle } from "@/lib/blog"` blijft exact werken, plus `import type { BlogArticle, BlogSection } from "@/lib/blog"`. Alle volgende taken voegen artikelbestanden toe aan deze map en registreren ze in `index.ts`.

- [ ] **Step 1: Maak het typebestand**

Create `src/lib/blog/types.ts`:

```ts
// Types voor de kennisbank. Losgetrokken uit het oude src/lib/blog.ts zodat
// artikelbestanden een type kunnen importeren zonder de index te raken
// (dat zou een cirkelvormige import geven).

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
```

- [ ] **Step 2: Verplaats het eerste artikel naar een eigen bestand**

Create `src/lib/blog/hoe-vaak-ramen-laten-wassen.ts`. Neem het volledige objectliteraal van `hoe-vaak-ramen-laten-wassen` over uit `src/lib/blog.ts` (regel 23 tot en met 77), letterlijk, zonder tekstwijzigingen:

```ts
import type { BlogArticle } from "./types";

export const artikel: BlogArticle = {
  slug: "hoe-vaak-ramen-laten-wassen",
  // ... alle velden ongewijzigd overnemen uit het oude src/lib/blog.ts
};
```

- [ ] **Step 3: Verplaats het tweede artikel naar een eigen bestand**

Create `src/lib/blog/wat-is-osmosewater.ts`, op dezelfde manier, met het objectliteraal uit `src/lib/blog.ts` regel 78 tot en met 132:

```ts
import type { BlogArticle } from "./types";

export const artikel: BlogArticle = {
  slug: "wat-is-osmosewater",
  // ... alle velden ongewijzigd overnemen uit het oude src/lib/blog.ts
};
```

- [ ] **Step 4: Maak de index**

Create `src/lib/blog/index.ts`:

```ts
// Blog / kennisbank. Data-gedreven, net als diensten/plaatsen. Informatieve
// content voor long-tail zoekopdrachten ("hoe vaak ramen wassen", "osmosewater").
// Elke publicatie is uniek, geschreven vanuit de praktijk (E-E-A-T).
//
// Eén bestand per artikel. De volgorde hieronder is de volgorde waarin ze op
// /blog verschijnen: nieuwste bovenaan.

import { artikel as hoeVaakRamenLatenWassen } from "./hoe-vaak-ramen-laten-wassen";
import { artikel as watIsOsmosewater } from "./wat-is-osmosewater";

export type { BlogArticle, BlogSection } from "./types";

export const blogArticles = [
  hoeVaakRamenLatenWassen,
  watIsOsmosewater,
];

export function getArticle(slug: string) {
  return blogArticles.find((a) => a.slug === slug);
}
```

- [ ] **Step 5: Verwijder het oude bestand**

`src/lib/blog.ts` en de map `src/lib/blog/` mogen geen moment naast elkaar bestaan: dat geeft een ambigue module-resolutie waarbij TypeScript het bestand kiest en de map negeert, zonder foutmelding. Verwijderen via Bash:

```bash
git rm src/lib/blog.ts
```

- [ ] **Step 6: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: alle drie schoon. `seo:check` print `SEO-check: alles in orde` (die kent de blog nog niet, dat komt in taak 3).

Controleer daarnaast dat de resolutie echt via de map loopt:

```bash
node -e "const fs=require('fs'); console.log('blog.ts bestaat nog:', fs.existsSync('src/lib/blog.ts')); console.log('blog/index.ts bestaat:', fs.existsSync('src/lib/blog/index.ts'))"
```

Verwacht: `blog.ts bestaat nog: false` en `blog/index.ts bestaat: true`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: blog opsplitsen naar src/lib/blog/ met bestand per artikel"
```

---

### Task 2: Inline links in paragrafen en FAQ-schema

Twee dingen die de artikelen nodig hebben voordat ze geschreven kunnen worden.

De spec eist interne links per artikel, maar `BlogSection.paragraphs` is `string[]` en wordt als platte tekst gerenderd. Er is nu geen enkele manier om een link in een artikeltekst te zetten. Contextuele links midden in de lopende tekst wegen zwaarder dan een blokje "lees ook" onderaan, dus we voegen een minimale linksyntaxis toe in plaats van een apart veld.

Daarnaast: `faqSchema()` bestaat in `src/lib/schema.ts` en artikelen hebben FAQ's, maar `src/app/blog/[slug]/page.tsx` zet alleen `articleSchema` neer. De FAQ's staan zichtbaar op de pagina maar niet in de structured data.

**Files:**
- Create: `src/components/blog/RichText.tsx`
- Modify: `src/lib/blog/types.ts` (veld `hideLeadForm`)
- Modify: `src/app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `BlogArticle` uit taak 1.
- Produces:
  - Linksyntaxis `[zichtbare tekst](/pad)` binnen elke string in `sections[].paragraphs`. Alle artikeltaken gebruiken dit.
  - `<RichText text={string} />` uit `@/components/blog/RichText`.
  - Optioneel veld `hideLeadForm?: boolean` op `BlogArticle`. Taak 8 gebruikt dit.

- [ ] **Step 1: Schrijf de linkrenderer**

Create `src/components/blog/RichText.tsx`:

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

// Minimale linksyntaxis voor artikelteksten: [zichtbare tekst](/pad).
// Bewust geen markdown-parser: we willen precies dit ene ding en niets meer,
// en scripts/seo-check.mjs valideert met hetzelfde patroon of het pad bestaat.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) nodes.push(text.slice(last, at));
    nodes.push(
      <Link
        key={at}
        href={m[2]}
        className="font-medium text-water-600 underline underline-offset-2 hover:text-water-700"
      >
        {m[1]}
      </Link>,
    );
    last = at + m[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
```

- [ ] **Step 2: Voeg het veld `hideLeadForm` toe**

In `src/lib/blog/types.ts`, voeg toe aan `BlogArticle`, direct ná `faqs`:

```ts
  // Artikelen met doe-het-zelfintentie krijgen geen offerteblok: dat publiek
  // wil het zelf doen en haakt af op een verkoopblok. Zie spec 3.2.
  hideLeadForm?: boolean;
```

- [ ] **Step 3: Werk de paginatemplate bij**

In `src/app/blog/[slug]/page.tsx`, vervang regel 12:

```tsx
import { articleSchema } from "@/lib/schema";
```

door:

```tsx
import { articleSchema, faqSchema } from "@/lib/schema";
import { RichText } from "@/components/blog/RichText";
```

Vervang vervolgens het paragraafblok (regel 95 tot en met 99):

```tsx
              {sec.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-pretty leading-relaxed text-navy-800/85">
                  {p}
                </p>
              ))}
```

door:

```tsx
              {sec.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-pretty leading-relaxed text-navy-800/85">
                  <RichText text={p} />
                </p>
              ))}
```

Vervang daarna het FAQ-blok en het offerteblok (regel 115 tot en met 121):

```tsx
      {a.faqs && a.faqs.length > 0 && (
        <div className="py-8">
          <Faq faqs={a.faqs} />
        </div>
      )}

      <LeadForm title="Ramen laten wassen in Apeldoorn?" />
```

door:

```tsx
      {a.faqs && a.faqs.length > 0 && (
        <>
          <JsonLd schema={faqSchema(a.faqs)} />
          <div className="py-8">
            <Faq faqs={a.faqs} />
          </div>
        </>
      )}

      {!a.hideLeadForm && <LeadForm title="Ramen laten wassen in Apeldoorn?" />}
```

- [ ] **Step 4: Verifieer dat de renderer werkt**

Zet tijdelijk een link in een bestaande paragraaf. In `src/lib/blog/wat-is-osmosewater.ts`, in de laatste sectie ("Voor welke oppervlakken is het geschikt?"), vervang in de laatste alinea het fragment `Vraag vrijblijvend een offerte aan.` door:

```
[Vraag vrijblijvend een offerte aan](/offerte).
```

Dit is geen tijdelijke test die weer weg moet: het is een zinvolle interne link die blijft staan.

```bash
npx tsc --noEmit
npm run lint
```

Verwacht: beide schoon.

- [ ] **Step 5: Controleer de gerenderde pagina**

```bash
npm run dev
```

Open `http://localhost:3000/blog/wat-is-osmosewater`. Verwacht:
- De zin "Vraag vrijblijvend een offerte aan" is een klikbare link naar `/offerte`, en de vierkante haken en ronde haakjes zijn **niet** zichtbaar in de tekst.
- Onderaan staat nog steeds het offerteblok.
- In de paginabron (Ctrl+U, zoek op `FAQPage`) staat nu een tweede JSON-LD-blok met `"@type": "FAQPage"` en de twee vragen van dit artikel.

Zie je de haken wél letterlijk staan, dan wordt `RichText` niet gebruikt en is stap 3 niet goed doorgevoerd. Stop de dev-server met Ctrl+C.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: inline links in artikelteksten en FAQ-schema op blogpagina's"
```

---

### Task 3: `seo-check.mjs` uitbreiden met blog-invarianten

Dit is de falende test die de rest van het plan aanstuurt. Na deze taak meldt `seo:check` zes ontbrekende artikelen, en elke volgende artikeltaak maakt één melding groen.

**Files:**
- Modify: `scripts/seo-check.mjs`

**Interfaces:**
- Consumes: de map `src/lib/blog/` uit taak 1, de linksyntaxis uit taak 2.
- Produces: vijf blog-invarianten binnen het bestaande `npm run seo:check`. Elke artikeltaak eindigt met deze check.

- [ ] **Step 1: Voeg het blogblok toe**

In `scripts/seo-check.mjs`, voeg toe direct ná blok 5 (de em-dash-controle, regel 94) en vóór de afsluitende `if (errors.length)`:

```js
// --- 6. Kennisbank: elk verwacht artikel bestaat en dekt zijn doelzoekwoorden ---
// Zie docs/superpowers/specs/2026-08-12-kennisbank-design.md sectie 3.
// Deze lijst is de bron: staat een artikel hier, dan moet het bestand bestaan
// en moeten de termen letterlijk in de tekst staan.
const ARTIKELEN = [
  ["wat-is-osmosewater", ["wat is osmose water", "hoe werkt osmose", "nadelen van osmose water"]],
  ["hoe-vaak-ramen-laten-wassen", ["hoe vaak ramen wassen", "ramen wassen buiten"]],
  ["wat-kost-dakgoot-schoonmaken", ["wat kost dakgoot schoonmaken", "dakgoot schoonmaken prijs", "per strekkende meter"]],
  ["hoe-vaak-zonnepanelen-schoonmaken", ["hoe vaak zonnepanelen schoonmaken", "moet je zonnepanelen schoonmaken"]],
  ["waarmee-kun-je-het-beste-ramen-wassen", ["waarmee kun je het beste ramen wassen", "ramen wassen zonder strepen"]],
  ["hoe-vaak-dakgoot-schoonmaken", ["hoe vaak dakgoot schoonmaken", "wanneer dakgoot schoonmaken"]],
  ["wat-voor-water-gebruikt-een-glazenwasser", ["wat voor water gebruikt een glazenwasser", "welk water gebruikt een glazenwasser"]],
  ["wat-is-glasbewassing", ["wat is glasbewassing", "glasbewassing"]],
];

const blogDir = join(root, "src/lib/blog");
const artikelBestanden = readdirSync(blogDir)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts");

const indexSrc = read("src/lib/blog/index.ts");
const gezieneSlugs = new Set();

for (const [slug, termen] of ARTIKELEN) {
  const bestand = `src/lib/blog/${slug}.ts`;
  if (!existsSync(join(root, bestand))) {
    errors.push(`artikel "${slug}" ontbreekt: ${bestand} bestaat niet`);
    continue;
  }
  const src = read(bestand);
  const tekst = src.toLowerCase().replace(/\s+/g, " ");

  // 6a. Doelzoekwoorden moeten letterlijk in de tekst staan
  for (const term of termen) {
    check(tekst.includes(term), `artikel "${slug}": zoekterm "${term}" ontbreekt in de tekst`);
  }

  // 6b. Het artikel is geregistreerd in index.ts
  check(indexSrc.includes(`"./${slug}"`),
    `artikel "${slug}" staat niet geregistreerd in src/lib/blog/index.ts`);

  // 6c. Beeld bestaat echt
  const img = (src.match(/src:\s*"(\/images\/[^"]+)"/) || [])[1];
  if (img) {
    check(existsSync(join(root, "public", img)),
      `artikel "${slug}": afbeelding ${img} bestaat niet in public/images`);
  }

  // 6d. Slug in het bestand komt overeen met de bestandsnaam
  const slugInBestand = (src.match(/slug:\s*"([^"]+)"/) || [])[1];
  check(slugInBestand === slug,
    `artikel "${slug}": slug in het bestand is "${slugInBestand}", dat wijkt af van de bestandsnaam`);
  gezieneSlugs.add(slug);
}

// 6e. Geen artikelbestanden die niet in ARTIKELEN staan (verweesd of vergeten)
for (const f of artikelBestanden) {
  const slug = f.replace(/\.ts$/, "");
  check(gezieneSlugs.has(slug),
    `src/lib/blog/${f} hoort bij geen enkel artikel uit de spec (verweesd bestand?)`);
}

// --- 7. Elke interne link in de artikelteksten wijst naar een bestaande route ---
const ALLE_SLUGS = new Set(ARTIKELEN.map(([s]) => s));
for (const f of artikelBestanden) {
  const src = read(`src/lib/blog/${f}`);
  for (const m of src.matchAll(/\[[^\]]+\]\((\/[^)]*)\)/g)) {
    const pad = m[1];
    if (pad.startsWith("/blog/")) {
      const doel = pad.slice("/blog/".length);
      check(ALLE_SLUGS.has(doel),
        `src/lib/blog/${f}: link naar ${pad}, maar dat artikel bestaat niet`);
    } else if (pad === "/") {
      continue;
    } else {
      check(existsSync(join(root, "src/app", pad.slice(1), "page.tsx")),
        `src/lib/blog/${f}: link naar ${pad}, maar src/app${pad}/page.tsx bestaat niet`);
    }
  }
}

// --- 8. Geen em-dashes in de artikelbestanden ---
for (const f of artikelBestanden) {
  read(`src/lib/blog/${f}`).split("\n").forEach((r, i) => {
    if (r.includes("—")) errors.push(`em-dash in src/lib/blog/${f}:${i + 1}`);
  });
}
```

- [ ] **Step 2: Draai de check en verwacht dat hij FAALT**

Run: `npm run seo:check`

Verwacht: exit 1, met precies zes meldingen van de vorm `artikel "<slug>" ontbreekt`, voor:
`wat-kost-dakgoot-schoonmaken`, `hoe-vaak-zonnepanelen-schoonmaken`,
`waarmee-kun-je-het-beste-ramen-wassen`, `hoe-vaak-dakgoot-schoonmaken`,
`wat-voor-water-gebruikt-een-glazenwasser`, `wat-is-glasbewassing`.

Plus meldingen over ontbrekende zoektermen in `wat-is-osmosewater` en
`hoe-vaak-ramen-laten-wassen`, want die moeten nog uitgebreid worden (taak 4 en 5).

Verschijnen er andere meldingen, bijvoorbeeld over links of afbeeldingen, dan is er iets
anders aan de hand dan dit plan aanneemt. **Pas het script dan niet aan om ze weg te
poetsen**, zoek eerst uit waarom de aanname niet klopt en meld het.

- [ ] **Step 3: Commit**

```bash
git add scripts/seo-check.mjs
git commit -m "test: blog-invarianten toevoegen aan seo-check (faalt: 6 artikelen ontbreken)"
```

---

### Task 4: `wat-is-osmosewater` uitbreiden

Staat op positie 24,9 met 182 vertoningen. Doelcluster: wat is osmose water (5.550-cluster), wat is osmose (900), hoe werkt osmose, nadelen osmose water.

**Files:**
- Modify: `src/lib/blog/wat-is-osmosewater.ts`

**Interfaces:**
- Consumes: linksyntaxis uit taak 2, invarianten uit taak 3.
- Produces: niets voor latere taken, behalve dat taak 10 hiernaar linkt en taak 12 de wederzijdse links legt.

- [ ] **Step 1: Herschrijf de metadata en de intro**

In `src/lib/blog/wat-is-osmosewater.ts`, vervang deze velden:

```ts
  title: "Wat is osmosewater? Zo werkt het en dit zijn de nadelen",
  metaTitle: "Wat is osmose water? Werking, voordelen en nadelen | Madern",
  metaDescription:
    "Wat is osmose water en hoe werkt osmose precies? Uitleg over omgekeerde osmose, waarom het glas streeploos opdroogt, en eerlijk over de nadelen.",
  excerpt:
    "Water zonder kalk en mineralen droogt vlekkeloos op. Hoe omgekeerde osmose werkt, waarvoor het geschikt is, en waar het tekortschiet.",
  dateModified: "2026-08-13",
```

Vervang de `intro` door een direct antwoord in de eerste twee zinnen:

```ts
  intro:
    "Osmose water is water waar vrijwel alle kalk en mineralen uit gefilterd zijn, gemaakt met een proces dat omgekeerde osmose heet. Doordat er niets in zit dat kan achterblijven, droogt het volledig streeploos op, en dat is precies waarom glazenwassers ermee werken. In dit artikel leest u hoe osmose werkt, waarvoor het geschikt is, en waar het tekortschiet.",
```

- [ ] **Step 2: Voeg de sectie over de werking toe**

Voeg in `sections` een nieuwe sectie toe, direct ná "Wat is osmosewater precies?":

```ts
      {
        heading: "Hoe werkt osmose precies?",
        paragraphs: [
          // Leg uit: natuurlijke osmose (water trekt door een membraan naar de kant met
          // de hoogste concentratie opgeloste stoffen, zoals in plantenwortels), en
          // daarna omgekeerde osmose (druk op het vuile water dwingt het de andere kant
          // op door het membraan, waarbij kalk, zouten en mineralen achterblijven).
          // Noem dat het membraan poriën heeft van ongeveer een tienduizendste micrometer.
          // Noem dat er restwater overblijft dat de tegengehouden stoffen afvoert.
          // Sluit af met de TDS-waarde: leidingwater zit rond de 200 tot 300 ppm,
          // osmosewater onder de 10 ppm, en pas onder die grens droogt glas vlekkeloos op.
        ],
      },
```

De term **"hoe werkt osmose"** moet letterlijk in deze sectie voorkomen, en **"wat is osmose water"** ergens in het artikel (de intro dekt dat al).

- [ ] **Step 3: Voeg de nadelen-sectie toe**

Voeg toe ná "De voordelen op een rij". Dit is het onderscheidende deel van het artikel: de concurrentie duikt hier omheen terwijl mensen er wel op zoeken.

```ts
      {
        heading: "De nadelen van osmose water op een rij",
        paragraphs: [
          // Behandel eerlijk: (1) een installatie kost geld en neemt ruimte in,
          // (2) er gaat spoelwater verloren, afhankelijk van het systeem enkele liters
          // per liter gezuiverd water, (3) het membraan en de voorfilters slijten en
          // moeten periodiek vervangen worden, (4) het werkt trager dan een kraan,
          // (5) het is ongeschikt als drinkwater zonder hermineralisatie, omdat er ook
          // nuttige mineralen uit zijn, (6) op zwaar vervuild glas met vet of verf komt
          // u er met water alleen niet, dan is voorbewerking nodig.
          // Sluit af met de conclusie: voor glas wegen de nadelen niet op tegen het
          // resultaat, maar het is geen wondermiddel voor alles.
        ],
      },
```

De term **"nadelen van osmose water"** moet letterlijk in deze sectie voorkomen.

- [ ] **Step 4: Breid de FAQ's uit**

Vervang de `faqs`-array door vijf vragen, met behoud van de twee bestaande:

```ts
    faqs: [
      {
        q: "Wat is osmose water?",
        a: "Osmose water is water waaruit vrijwel alle kalk, zouten en mineralen zijn gefilterd met omgekeerde osmose. Wat overblijft is bijna zuiver water dat bij het opdrogen niets achterlaat.",
      },
      {
        q: "Hoe werkt osmose?",
        a: "Bij omgekeerde osmose wordt water onder druk door een fijn membraan geperst. Het water komt er wel doorheen, de opgeloste stoffen niet. Die worden met het restwater afgevoerd.",
      },
      {
        q: "Wat zijn de nadelen van osmose water?",
        a: "Een installatie kost geld en ruimte, er gaat spoelwater verloren, en het membraan moet periodiek vervangen worden. Als drinkwater is het zonder hermineralisatie minder geschikt, omdat ook nuttige mineralen eruit zijn gehaald.",
      },
      {
        q: "Is osmosewater beter dan zemen?",
        a: "Voor de buitenkant wel: osmosewater droogt streepvrij op zonder chemicaliën en houdt ramen langer schoon, omdat er geen mineralen achterblijven waaraan vuil zich hecht.",
      },
      {
        q: "Kun je zonnepanelen met osmosewater reinigen?",
        a: "Ja. Osmosewater is zacht en mineraalvrij, dus het reinigt zonnepanelen streepvrij zonder krassen of kalkresten en zonder de coating aan te tasten.",
      },
    ],
```

- [ ] **Step 5: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: `tsc` en `lint` schoon. `seo:check` meldt geen fouten meer voor `wat-is-osmosewater`, wel nog de zes ontbrekende artikelen en de zoektermen van `hoe-vaak-ramen-laten-wassen`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "content: wat-is-osmosewater uitbreiden met werking en nadelen"
```

---

### Task 5: `hoe-vaak-ramen-laten-wassen` uitbreiden

Doelwoorden: hoe vaak ramen wassen (200), hoe vaak ramen wassen buiten (90).

**Files:**
- Modify: `src/lib/blog/hoe-vaak-ramen-laten-wassen.ts`

**Interfaces:**
- Consumes: taak 2 en 3.
- Produces: niets voor latere taken.

- [ ] **Step 1: Herschrijf metadata en intro**

```ts
  title: "Hoe vaak moet je je ramen laten wassen?",
  metaTitle: "Hoe vaak ramen wassen? Advies per situatie | Madern",
  metaDescription:
    "Hoe vaak ramen wassen? Voor woningen vier tot acht keer per jaar, voor etalages wekelijks. Advies per situatie, en waarom de buitenkant vaker moet.",
  dateModified: "2026-08-13",
```

Vervang de `intro` door een direct antwoord:

```ts
  intro:
    "Hoe vaak ramen wassen verstandig is, hangt vooral af van waar u woont: voor de meeste woningen werkt vier tot acht keer per jaar goed, voor winkels en etalages meestal wekelijks. In een groene omgeving zoals de rand van de Veluwe zit u aan de bovenkant van die range. Hieronder leest u waar de ideale frequentie precies van afhangt, en waarom de buitenkant vaker aan de beurt is dan de binnenkant.",
```

- [ ] **Step 2: Voeg de sectie over buiten versus binnen toe**

Voeg toe in `sections`, ná "Richtlijn per situatie":

```ts
      {
        heading: "Hoe vaak ramen wassen buiten en binnen?",
        paragraphs: [
          // Kern: de buitenkant vervuilt veel sneller dan de binnenkant, dus die vraagt
          // een hogere frequentie. Behandel: regen, stuifmeel, uitlaatgassen, vogelpoep
          // en groene aanslag op de noordzijde. Richtlijn: buiten vier tot acht keer per
          // jaar, binnen twee tot vier keer, want daar zijn het vooral vingerafdrukken,
          // kookdamp en stof. Noem dat wij bij een vast schema de buitenkant standaard
          // meenemen en de binnenkant op afspraak.
          // Verwijs met een inline link naar [glazenwassen voor particulieren](/glazenwassen-particulier).
        ],
      },
```

De termen **"hoe vaak ramen wassen"** en **"ramen wassen buiten"** moeten letterlijk in het artikel voorkomen. De eerste staat al in de intro, de tweede moet hier terugkomen, bijvoorbeeld in de zin "Hoe vaak ramen wassen buiten nodig is, hangt af van...".

- [ ] **Step 3: Voeg twee FAQ's toe**

Voeg toe aan de bestaande `faqs`-array:

```ts
      {
        q: "Hoe vaak moet je ramen wassen aan de buitenkant?",
        a: "Vier tot acht keer per jaar. De buitenkant vangt regen, stuifmeel en uitlaatgassen op en vervuilt daardoor sneller dan de binnenkant, die met twee tot vier keer per jaar meestal toekan.",
      },
      {
        q: "Wat is de beste tijd van het jaar om ramen te laten wassen?",
        a: "Er is geen slechte periode, maar na de bloei in het late voorjaar en na de bladval in het najaar valt het resultaat het meest op. Bij vorst wassen we niet, dan bevriest het water op het glas.",
      },
```

- [ ] **Step 4: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: `seo:check` meldt nu alleen nog de zes ontbrekende artikelen.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "content: hoe-vaak-ramen-laten-wassen uitbreiden met buitenkant-sectie"
```

---

### Task 6: `wat-kost-dakgoot-schoonmaken`

Het enige artikel in deze set met echte koopintentie. Doelwoorden: dakgoot schoonmaken prijs (400), wat kost een dakgoot schoonmaken (100, TP 1.500).

**Files:**
- Create: `src/lib/blog/wat-kost-dakgoot-schoonmaken.ts`
- Modify: `src/lib/blog/index.ts`

**Interfaces:**
- Consumes: `BlogArticle` uit taak 1, linksyntaxis uit taak 2.
- Produces: artikel `wat-kost-dakgoot-schoonmaken`. Taak 12 legt de link vanuit taak 9.

> **Prijsregel.** €5 per strekkende meter, minimum €95. Dat is het enige bedrag dat in dit artikel mag staan. Geen uurtarief, geen kortingspercentage, geen tweede bedrag. Zie spec 3.5 voor de onderbouwing.

- [ ] **Step 1: Maak het artikelbestand**

Create `src/lib/blog/wat-kost-dakgoot-schoonmaken.ts`:

```ts
import type { BlogArticle } from "./types";

export const artikel: BlogArticle = {
  slug: "wat-kost-dakgoot-schoonmaken",
  title: "Wat kost dakgoot schoonmaken?",
  metaTitle: "Wat kost dakgoot schoonmaken? Prijs per meter | Madern",
  metaDescription:
    "Wat kost dakgoot schoonmaken? Bij Madern betaalt u 5 euro per strekkende meter, met een minimum van 95 euro. Bekijk de rekenvoorbeelden per woningtype.",
  excerpt:
    "Vijf euro per strekkende meter, met een minimum van 95 euro. Wat dat betekent voor uw woning, en wat de prijs omhoog of omlaag brengt.",
  datePublished: "2026-08-13",
  image: {
    src: "/images/dakgootreiniging-apeldoorn.jpg",
    alt: "Medewerker van Madern haalt blad en slib uit de dakgoot van een woning in Apeldoorn",
  },
  intro:
    "Dakgoot schoonmaken kost bij Madern 5 euro per strekkende meter, met een minimumbedrag van 95 euro per beurt. Voor een gemiddelde tussenwoning komt u daarmee op ongeveer 95 euro uit, voor een vrijstaande woning op zo'n 175 euro. Hieronder ziet u wat dat per woningtype betekent, wat de prijs omhoog of omlaag brengt, en wat er precies voor dat bedrag gebeurt.",
  sections: [
    // Zie stap 2 voor de koppen en de inhoud per sectie.
  ],
  faqs: [
    // Zie stap 3.
  ],
};
```

- [ ] **Step 2: Schrijf de secties**

Vul `sections` met precies deze zes koppen. Per kop staat wat erin moet.

```ts
      {
        heading: "Dakgoot schoonmaken prijs per meter",
        paragraphs: [
          // Herhaal het tarief expliciet: 5 euro per strekkende meter, minimum 95 euro.
          // Leg uit waarom per strekkende meter gerekend wordt en niet per uur: het is
          // vooraf te bepalen, dus u weet wat u betaalt voordat we beginnen.
          // Noem dat de lengte van de goot leidend is, niet de oppervlakte van het dak.
          // Leg uit hoe u zelf de lengte schat: meet de gevelbreedte aan de zijden waar
          // een goot zit, en tel die op.
        ],
      },
      {
        heading: "Rekenvoorbeelden per woningtype",
        paragraphs: [
          // Werk deze vier uit in lopende tekst, met de exacte bedragen:
          //   tussenwoning, circa 12 meter goot     -> 95 euro (minimumbedrag)
          //   hoekwoning, circa 18 meter goot       -> 95 euro (minimumbedrag)
          //   twee-onder-een-kap, circa 22 meter    -> 110 euro
          //   vrijstaande woning, circa 35 meter    -> 175 euro
          // Vermeld erbij dat het schattingen zijn en dat de exacte lengte per woning
          // verschilt. Reken niet zelf andere voorbeelden uit met andere bedragen.
        ],
      },
      {
        heading: "Wat bepaalt de prijs?",
        paragraphs: [
          // Behandel: lengte van de goot, hoogte van het pand, bereikbaarheid (kan de
          // ladder erbij, staat er een schuur of een serre in de weg, is de tuin
          // toegankelijk), mate van vervuiling, en bomen in de directe omgeving.
          // Noem dat bij panden boven ongeveer 7,5 meter een hoogwerker nodig kan zijn
          // en dat dat de prijs verandert, zonder daar een bedrag aan te hangen.
          // Link naar de dienstpagina: [dakgoot schoonmaken](/dakgoot-schoonmaken).
        ],
      },
      {
        heading: "Wat zit er in de prijs?",
        paragraphs: [
          // Concreet: goot leeghalen (blad, mos, slib), het materiaal afvoeren, de goot
          // doorspoelen, en controleren of de regenpijp vrij is en het water echt weg kan.
          // Noem dat we het melden als we onderweg schade zien, zoals een losse beugel,
          // een lekkende naad of houtrot aan het boeideel.
        ],
      },
      {
        heading: "Waarom een minimumbedrag?",
        paragraphs: [
          // Eerlijk uitleggen: rijden, materiaal opbouwen, opruimen en afvoeren kosten
          // tijd die niet meebeweegt met de lengte van de goot. Bij een korte goot zou
          // de prijs anders niet in verhouding staan tot de rit.
          // Noem de manier om dat te ondervangen: combineer de dakgoot met een
          // glasbewassingsbeurt, dan is de rit er toch al.
          // Link: [glasbewassing voor particulieren](/glazenwassen-particulier).
        ],
      },
      {
        heading: "Wat kost dakgoot schoonmaken als u het zelf doet?",
        paragraphs: [
          // Eerlijke afweging: zelf doen kost geen geld maar wel tijd en risico.
          // Noem dat vallen van een ladder een van de meest voorkomende ongevallen in
          // en om het huis is, en dat een goot op hoogte met natte handschoenen en een
          // emmer geen prettige plek is. Noem dat een dakgootreinigingsset ook geld kost.
          // Sluit af met een zachte CTA naar [een vrijblijvende offerte](/offerte).
        ],
      },
```

De termen **"wat kost dakgoot schoonmaken"**, **"dakgoot schoonmaken prijs"** en **"per strekkende meter"** moeten letterlijk in de tekst voorkomen. De eerste staat in de laatste kop, de tweede in de eerste kop, de derde in de intro.

- [ ] **Step 3: Schrijf de FAQ's**

```ts
  faqs: [
    {
      q: "Wat kost dakgoot schoonmaken per meter?",
      a: "Bij Madern betaalt u 5 euro per strekkende meter, met een minimumbedrag van 95 euro per beurt. U weet dus vooraf waar u aan toe bent.",
    },
    {
      q: "Wat kost het schoonmaken van de dakgoot bij een tussenwoning?",
      a: "Een tussenwoning heeft doorgaans zo'n 12 meter goot. Dat komt onder het minimumbedrag uit, dus u betaalt 95 euro.",
    },
    {
      q: "Zijn er voorrijkosten?",
      a: "Nee. Het minimumbedrag van 95 euro dekt de rit, het opbouwen en het opruimen. Er komen geen aparte voorrijkosten bovenop.",
    },
    {
      q: "Is dakgoot schoonmaken goedkoper in combinatie met ramen wassen?",
      a: "In de praktijk wel, omdat we dan toch al bij u zijn. Combineert u het met een glasbewassingsbeurt, dan plannen we het in dezelfde afspraak.",
    },
  ],
```

- [ ] **Step 4: Registreer het artikel**

In `src/lib/blog/index.ts`, voeg de import toe bovenaan bij de andere imports:

```ts
import { artikel as watKostDakgootSchoonmaken } from "./wat-kost-dakgoot-schoonmaken";
```

En voeg het als eerste element toe aan de `blogArticles`-array, want nieuwste bovenaan:

```ts
export const blogArticles = [
  watKostDakgootSchoonmaken,
  hoeVaakRamenLatenWassen,
  watIsOsmosewater,
];
```

- [ ] **Step 5: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: `seo:check` meldt nog vijf ontbrekende artikelen, niet meer `wat-kost-dakgoot-schoonmaken`.

Controleer daarnaast dat er geen tweede bedrag in de tekst is geslopen:

```bash
node -e "const s=require('fs').readFileSync('src/lib/blog/wat-kost-dakgoot-schoonmaken.ts','utf8'); const b=[...s.matchAll(/(\d+)\s*euro/gi)].map(m=>m[1]); console.log('bedragen:', [...new Set(b)].join(', '))"
```

Verwacht: `bedragen: 5, 95, 110, 175`. Het patroon matcht alleen getallen die door "euro" worden gevolgd, dus lengtes als "12 meter" tellen niet mee. Staat er een ander bedrag tussen, bijvoorbeeld een uurtarief of een kortingspercentage, dan is de prijsregel geschonden en moet dat eruit.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "content: wat-kost-dakgoot-schoonmaken (5 euro per meter, minimum 95)"
```

---

### Task 7: `hoe-vaak-zonnepanelen-schoonmaken`

Doelwoorden: moet je zonnepanelen schoonmaken (300, TP 7.300), hoe vaak zonnepanelen schoonmaken (150, TP 2.200). Hoogste traffic potential van de hele set.

**Files:**
- Create: `src/lib/blog/hoe-vaak-zonnepanelen-schoonmaken.ts`
- Modify: `src/lib/blog/index.ts`

**Interfaces:**
- Consumes: taak 1 en 2.
- Produces: artikel `hoe-vaak-zonnepanelen-schoonmaken`.

- [ ] **Step 1: Maak het artikelbestand**

Create `src/lib/blog/hoe-vaak-zonnepanelen-schoonmaken.ts`, met dezelfde opbouw als taak 6 stap 1:

```ts
import type { BlogArticle } from "./types";

export const artikel: BlogArticle = {
  slug: "hoe-vaak-zonnepanelen-schoonmaken",
  title: "Hoe vaak moet je zonnepanelen schoonmaken?",
  metaTitle: "Hoe vaak zonnepanelen schoonmaken? Advies per dak | Madern",
  metaDescription:
    "Hoe vaak zonnepanelen schoonmaken? Een tot twee keer per jaar, en op een plat dak vaker. Zo veel opbrengst levert schoonmaken werkelijk op.",
  excerpt:
    "Vuile panelen leveren minder op, maar hoeveel precies? En maakt het uit of uw dak schuin of plat is?",
  datePublished: "2026-08-13",
  image: {
    src: "/images/werk-glazenwasser-hoogte-apeldoorn.jpg",
    alt: "Medewerker van Madern reinigt met een watergevoede telescoopsteel panelen op een dak in Apeldoorn",
  },
  intro:
    "Voor de meeste daken is een tot twee keer per jaar zonnepanelen schoonmaken voldoende. Ligt uw installatie op een plat dak, staan er bomen in de buurt of woont u dicht bij een drukke weg, dan is twee keer per jaar verstandig. Hieronder leest u hoeveel opbrengst u werkelijk verliest door vuil, waarom een plat dak sneller vervuilt, en wanneer schoonmaken zichzelf terugverdient.",
  sections: [
    // Zie stap 2.
  ],
  faqs: [
    // Zie stap 3.
  ],
};
```

- [ ] **Step 2: Schrijf de secties**

Vijf koppen:

```ts
      {
        heading: "Moet je zonnepanelen schoonmaken?",
        paragraphs: [
          // Beantwoord de vraag eerlijk: regen spoelt los stof grotendeels weg, dus
          // panelen die schuin liggen en vrij staan hebben minder nodig dan vaak
          // gesuggereerd wordt. Maar: vogelpoep, mos, stuifmeel en de vuilrand langs de
          // onderrand van het frame spoelen niet weg, en juist die veroorzaken het verlies.
          // Conclusie: ja, maar hoe vaak hangt sterk af van de situatie.
        ],
      },
      {
        heading: "Hoeveel opbrengst verlies je door vuil?",
        paragraphs: [
          // Behandel dat het verlies bij normale vervuiling in de orde van enkele procenten
          // ligt, en bij hardnekkige vervuiling zoals mos en een dichte vuilrand flink
          // hoger kan uitvallen. Leg het mechanisme uit: een paneel bestaat uit cellen in
          // serie, dus een deels afgeschermde cel trekt de opbrengst van de hele streng
          // omlaag. Daarom kost een strook mos langs de onderrand meer dan een gelijkmatig
          // stoflaagje. Noem geen exacte percentages als vaststaand feit.
        ],
      },
      {
        heading: "Schuin dak of plat dak?",
        paragraphs: [
          // Kern van het artikel. Op een schuin dak spoelt regen een deel van het vuil weg.
          // Op een plat dak liggen panelen vaak onder een kleine hoek in een opstelling,
          // waardoor water blijft staan en het vuil juist indroogt in plaats van wegspoelt.
          // Plat dak dus vaker schoonmaken. Noem ook dat bij oost-westopstellingen op platte
          // daken de onderranden extra snel dichtslibben.
          // Link naar de dienstpagina: [zonnepanelen schoonmaken](/zonnepanelen-schoonmaken).
        ],
      },
      {
        heading: "Wanneer vaker nodig is",
        paragraphs: [
          // Situaties die de frequentie opdrijven: bomen in de directe omgeving (blad,
          // naalden, hars), vogels die op de nok zitten, een drukke weg of een landbouw-
          // omgeving met stof, en de rand van de Veluwe met veel stuifmeel in het voorjaar.
          // Noem als richtlijn: in die gevallen twee keer per jaar in plaats van een keer.
        ],
      },
      {
        heading: "Verdient schoonmaken zichzelf terug?",
        paragraphs: [
          // Eerlijke afweging: bij een kleine installatie op een schuin dak dat vrij ligt,
          // vaak nauwelijks. Bij een grotere installatie, een plat dak of zichtbare
          // vervuiling doorgaans wel. Adviseer om eerst naar de opbrengstgegevens in de
          // omvormer-app te kijken en die te vergelijken met vorig jaar in dezelfde maand.
          // Noem dat wij met osmosewater werken, zonder borstels met agressieve middelen
          // die de coating aantasten, en dat we vanaf de grond werken waar dat kan.
          // Sluit af met een zachte CTA naar [een vrijblijvende offerte](/offerte).
        ],
      },
```

De termen **"hoe vaak zonnepanelen schoonmaken"** en **"moet je zonnepanelen schoonmaken"** moeten letterlijk voorkomen. De eerste staat in de intro, de tweede is de eerste kop.

- [ ] **Step 3: Schrijf de FAQ's**

```ts
  faqs: [
    {
      q: "Moet je zonnepanelen schoonmaken?",
      a: "Voor panelen op een schuin, vrijliggend dak spoelt regen een deel van het vuil weg. Vogelpoep, mos en de vuilrand langs de onderrand blijven wel zitten, en juist die kosten opbrengst. Schoonmaken loont dus, maar hoe vaak verschilt per situatie.",
    },
    {
      q: "Hoe vaak moet je zonnepanelen schoonmaken?",
      a: "Een tot twee keer per jaar is voor de meeste daken voldoende. Bij een plat dak, veel bomen in de buurt of een stoffige omgeving is twee keer per jaar verstandig.",
    },
    {
      q: "Wat is de beste tijd van het jaar om zonnepanelen schoon te maken?",
      a: "Het late voorjaar, na de bloei en het stuifmeel, is meestal het beste moment. Dan gaat u de maanden met de hoogste opbrengst in met schone panelen.",
    },
    {
      q: "Mag je zonnepanelen met kraanwater schoonmaken?",
      a: "Dat kan, maar kraanwater bevat kalk en laat bij het opdrogen vlekken achter op het glas. Met gezuiverd osmosewater drogen de panelen vlekkeloos op zonder na te hoeven wrijven.",
    },
  ],
```

- [ ] **Step 4: Registreer het artikel**

In `src/lib/blog/index.ts`, voeg de import toe en zet het artikel bovenaan in `blogArticles`:

```ts
import { artikel as hoeVaakZonnepanelenSchoonmaken } from "./hoe-vaak-zonnepanelen-schoonmaken";
```

```ts
export const blogArticles = [
  hoeVaakZonnepanelenSchoonmaken,
  watKostDakgootSchoonmaken,
  hoeVaakRamenLatenWassen,
  watIsOsmosewater,
];
```

- [ ] **Step 5: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: nog vier ontbrekende artikelen.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "content: hoe-vaak-zonnepanelen-schoonmaken (TP 7.300)"
```

---

### Task 8: `waarmee-kun-je-het-beste-ramen-wassen`

Doelwoorden: waarmee ramen wassen (1.000, TP 3.000), hoe het beste ramen wassen (100, TP 3.600).

**Files:**
- Create: `src/lib/blog/waarmee-kun-je-het-beste-ramen-wassen.ts`
- Modify: `src/lib/blog/index.ts`

**Interfaces:**
- Consumes: `hideLeadForm` uit taak 2.
- Produces: artikel `waarmee-kun-je-het-beste-ramen-wassen`.

> **Bewuste afwijking.** Dit publiek heeft doe-het-zelfintentie: `ramen wassen` is in Ahrefs geclassificeerd als *Informational, Non-local*. Dit artikel krijgt daarom `hideLeadForm: true` en geen offerte-CTA in de tekst. Alleen één terloopse verwijzing in de laatste sectie. Een verkoopblok jaagt dit publiek weg en kost de rankings die we hier juist willen. Schrijf dit artikel alsof u een vriend helpt, niet alsof u een klus verkoopt.

- [ ] **Step 1: Maak het artikelbestand**

```ts
import type { BlogArticle } from "./types";

export const artikel: BlogArticle = {
  slug: "waarmee-kun-je-het-beste-ramen-wassen",
  title: "Waarmee kun je het beste ramen wassen?",
  metaTitle: "Waarmee kun je het beste ramen wassen? | Madern",
  metaDescription:
    "Waarmee kun je het beste ramen wassen? Zeem, trekker of microvezel, en werkt azijn echt? Praktisch advies van een glazenwasser, voor ramen wassen zonder strepen.",
  excerpt:
    "Zeem, trekker of microvezeldoek, en werkt azijn nu echt? Het eerlijke antwoord van iemand die het dagelijks doet.",
  datePublished: "2026-08-13",
  image: {
    src: "/images/ramen-wassen-woning-apeldoorn.jpg",
    alt: "Ramen van een woning in Apeldoorn worden gewassen met een trekker en gezuiverd water",
  },
  intro:
    "U wast ramen het beste met lauw water, een klein beetje neutraal schoonmaakmiddel en een goede trekker, afgewerkt met een droge microvezeldoek langs de randen. Zeem werkt ook, maar vraagt meer techniek om streeploos te blijven. Hieronder leest u welk gereedschap waarvoor geschikt is, wat er waar is van azijn en spiritus, en welke fouten de meeste strepen veroorzaken.",
  hideLeadForm: true,
  sections: [
    // Zie stap 2.
  ],
  faqs: [
    // Zie stap 3.
  ],
};
```

- [ ] **Step 2: Schrijf de secties**

Vijf koppen:

```ts
      {
        heading: "Zeem, trekker of microvezeldoek?",
        paragraphs: [
          // Vergelijk de drie eerlijk. Trekker: snelst en het meest streeploos mits het
          // rubber scherp en heel is, maar vraagt oefening in de haal. Zeem: vergevings-
          // gezinder maar laat sneller vegen achter als hij te nat is. Microvezel: prima
          // voor kleine ruiten en voor het nadrogen van randen en hoeken, minder geschikt
          // voor grote vlakken. Advies: trekker voor het vlak, microvezel voor de randen.
          // Noem dat een versleten trekkerrubber de meest onderschatte oorzaak van strepen is.
        ],
      },
      {
        heading: "Welk water en welk middel?",
        paragraphs: [
          // Lauw water, niet heet: heet water droogt te snel en dat geeft juist strepen.
          // Een paar druppels neutraal middel is genoeg, meer schuim betekent meer residu.
          // Waarschuw expliciet voor te veel afwasmiddel: dat is de klassieke fout.
          // Noem dat hard water in deze regio kalkvlekken achterlaat en dat dat de reden is
          // dat professionals met gezuiverd water werken.
        ],
      },
      {
        heading: "Werkt azijn of spiritus echt?",
        paragraphs: [
          // Azijn: helpt tegen kalkaanslag doordat het zuur de kalk oplost, maar is geen
          // wondermiddel en de geur is hardnekkig. Waarschuw dat azijn natuursteen dorpels
          // en sommige kitranden kan aantasten, dus niet laten uitlopen.
          // Spiritus: laat water sneller verdampen en helpt bij vet en nicotine, vooral
          // binnen. Waarschuw dat het brandbaar is en niet in de volle zon te gebruiken.
          // Conclusie: allebei bruikbaar voor specifieke problemen, geen dagelijkse keuze.
        ],
      },
      {
        heading: "Volgorde, weer en veelgemaakte fouten",
        paragraphs: [
          // Volgorde: eerst grof vuil en spinrag weg, dan kozijnen, dan glas, van boven
          // naar beneden. Weer: niet in de volle zon en niet bij vorst, want dan droogt
          // het water te snel of bevriest het.
          // Fouten op een rij: te veel middel, een vuile of te natte doek, met rondjes
          // wrijven in plaats van in banen werken, en de trekker niet afvegen tussen de
          // halen door. Gebruik hier de term "ramen wassen zonder strepen".
        ],
      },
      {
        heading: "Wanneer het zelf doen niet meer loont",
        paragraphs: [
          // Nuchter, geen verkooppraat: hoge ramen, dakramen, serres en grote glaspartijen
          // zijn met een ladder lastig en niet zonder risico. Noem dat een watergevoede
          // telescoopsteel die ramen vanaf de grond bereikt en dat dat het verschil is
          // tussen zelf doen en uitbesteden.
          // Precies een terloopse verwijzing, geen aansporing:
          // "Wilt u het toch liever uit handen geven, dan leest u op onze pagina over
          // [glazenwassen voor particulieren](/glazenwassen-particulier) hoe we werken."
        ],
      },
```

De termen **"waarmee kun je het beste ramen wassen"** en **"ramen wassen zonder strepen"** moeten letterlijk voorkomen.

- [ ] **Step 3: Schrijf de FAQ's**

```ts
  faqs: [
    {
      q: "Waarmee kun je het beste ramen wassen?",
      a: "Met lauw water, een paar druppels neutraal schoonmaakmiddel en een trekker met een scherp rubber. Droog de randen na met een schone microvezeldoek, daar ontstaan de meeste strepen.",
    },
    {
      q: "Kun je ramen wassen met azijn?",
      a: "Azijn helpt tegen kalkaanslag, omdat het zuur de kalk oplost. Het is geen wondermiddel voor gewoon vuil, en laat het niet uitlopen over natuursteen dorpels of kitranden, want dat kan aantasten.",
    },
    {
      q: "Wat is beter, een zeem of een trekker?",
      a: "Een trekker gaat sneller en geeft een streeploser resultaat, mits het rubber heel en scherp is. Een zeem is vergevingsgezinder in het gebruik, maar laat eerder vegen achter als hij te nat wordt.",
    },
    {
      q: "Waarom krijg ik strepen op mijn ramen?",
      a: "Meestal door te veel schoonmaakmiddel, door in de volle zon te werken zodat het water te snel opdroogt, of door een versleten trekkerrubber. Ook kalk uit hard leidingwater laat bij het opdrogen strepen achter.",
    },
  ],
```

- [ ] **Step 4: Registreer het artikel**

```ts
import { artikel as waarmeeKunJeHetBesteRamenWassen } from "./waarmee-kun-je-het-beste-ramen-wassen";
```

Bovenaan in `blogArticles` zetten, boven `hoeVaakZonnepanelenSchoonmaken`.

- [ ] **Step 5: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: nog drie ontbrekende artikelen.

- [ ] **Step 6: Controleer dat het offerteblok weg is**

```bash
npm run dev
```

Open `http://localhost:3000/blog/waarmee-kun-je-het-beste-ramen-wassen`. Verwacht: onderaan staat **geen** offerteformulier, terwijl dat op `http://localhost:3000/blog/wat-kost-dakgoot-schoonmaken` wel staat. Stop de dev-server met Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "content: waarmee-kun-je-het-beste-ramen-wassen (DIY-intentie, zonder offerteblok)"
```

---

### Task 9: `hoe-vaak-dakgoot-schoonmaken`

Doelwoorden: hoe vaak dakgoot schoonmaken (150, TP 1.300), wanneer dakgoot schoonmaken (150).

**Files:**
- Create: `src/lib/blog/hoe-vaak-dakgoot-schoonmaken.ts`
- Modify: `src/lib/blog/index.ts`

**Interfaces:**
- Consumes: taak 1 en 2.
- Produces: artikel `hoe-vaak-dakgoot-schoonmaken`. Taak 12 legt de wederzijdse link met taak 6.

- [ ] **Step 1: Maak het artikelbestand**

```ts
import type { BlogArticle } from "./types";

export const artikel: BlogArticle = {
  slug: "hoe-vaak-dakgoot-schoonmaken",
  title: "Hoe vaak moet je de dakgoot schoonmaken?",
  metaTitle: "Hoe vaak dakgoot schoonmaken? Advies per situatie | Madern",
  metaDescription:
    "Hoe vaak dakgoot schoonmaken? Een keer per jaar in het najaar, en twee keer bij bomen vlakbij. Dit gaat er mis als u het te lang uitstelt.",
  excerpt:
    "Een keer per jaar volstaat meestal, maar met bomen om het huis is twee keer verstandiger. En dit gebeurt er als u het laat lopen.",
  datePublished: "2026-08-13",
  image: {
    src: "/images/werk-dakgoot-reinigen-apeldoorn.jpg",
    alt: "Dakgoot van een woning in Apeldoorn wordt leeggehaald en doorgespoeld",
  },
  intro:
    "Voor de meeste woningen volstaat het om de dakgoot een keer per jaar schoon te maken, in het najaar na de bladval. Staan er bomen vlak bij het dak, dan is twee keer per jaar verstandig: een keer in het late voorjaar en een keer in november. Hieronder leest u waarom die momenten het beste werken, hoe u ziet dat het nodig is, en wat er misgaat als u het te lang uitstelt.",
  sections: [
    // Zie stap 2.
  ],
  faqs: [
    // Zie stap 3.
  ],
};
```

- [ ] **Step 2: Schrijf de secties**

Vijf koppen:

```ts
      {
        heading: "Wanneer dakgoot schoonmaken in het jaar?",
        paragraphs: [
          // Kern: november, na de bladval, is het belangrijkste moment. Dan gaat de goot
          // schoon het natte seizoen in, precies wanneer hij het hardst moet werken.
          // Tweede moment: het late voorjaar, na de bloei, tegen uitgebloeide bloesem,
          // zaden en helikoptertjes van esdoorns. Waarschuw tegen te vroeg in het najaar:
          // ruim je in september op, dan ligt de goot in november weer vol.
          // Gebruik hier letterlijk "wanneer dakgoot schoonmaken".
        ],
      },
      {
        heading: "Hoe bomen de frequentie bepalen",
        paragraphs: [
          // Onderscheid maken: geen bomen in de buurt is een keer per jaar genoeg;
          // loofbomen binnen een meter of tien vragen twee keer; naaldbomen vragen extra
          // aandacht omdat naalden het hele jaar door vallen en met hars een dichte prop
          // vormen die water vasthoudt.
          // Noem de Apeldoornse context: aan de rand van de Veluwe, richting Ugchelen,
          // Beekbergen en Loenen, staan veel woningen dicht op het bos.
        ],
      },
      {
        heading: "Wat er misgaat als je het uitstelt",
        paragraphs: [
          // Concreet en op volgorde van erg: goot loopt over bij hevige regen, water
          // slaat tegen de gevel en trekt in het metselwerk, boeidelen en houten
          // gootbetimmering gaan rotten, vocht bereikt de spouw, en in de winter vriest
          // staand water uit waardoor zinken goten kunnen scheuren en beugels loskomen.
          // Noem ook dat een goot vol organisch materiaal een kweekplek is voor mos dat
          // zich vervolgens op het dak uitbreidt.
          // Link naar de dienstpagina: [dakgoot schoonmaken](/dakgoot-schoonmaken).
        ],
      },
      {
        heading: "Hoe zie je dat het nodig is?",
        paragraphs: [
          // Praktische signalen vanaf de grond, zonder de ladder op te hoeven: water dat
          // over de rand loopt in plaats van door de pijp, groene strepen op de gevel
          // onder de goot, plantjes of grassprieten die boven de gootrand uitkomen,
          // een regenpijp die niet klatert bij regen, en vogels die in de goot scharrelen.
        ],
      },
      {
        heading: "Zelf doen of laten doen?",
        paragraphs: [
          // Nuchtere afweging: een bungalow met een lage goot is prima zelf te doen,
          // een tweelaags woning met de goot op zes meter niet. Noem dat vallen van een
          // ladder een van de meest voorkomende ongevallen in en om het huis is, en dat
          // een ladder op een zachte of scheve ondergrond het risico vergroot.
          // Noem dat wij de goot niet alleen leeghalen maar ook doorspoelen en de
          // regenpijp controleren, want een lege goot met een verstopte pijp lost niets op.
          // Sluit af met een zachte CTA naar [een vrijblijvende offerte](/offerte).
        ],
      },
```

De termen **"hoe vaak dakgoot schoonmaken"** en **"wanneer dakgoot schoonmaken"** moeten letterlijk voorkomen. De eerste in de intro of een FAQ, de tweede in de eerste kop.

- [ ] **Step 3: Schrijf de FAQ's**

```ts
  faqs: [
    {
      q: "Hoe vaak moet je dakgoten schoonmaken?",
      a: "Voor de meeste woningen is een keer per jaar genoeg. Staan er bomen vlak bij het dak, dan is twee keer per jaar verstandig omdat de goot dan veel sneller dichtslibt.",
    },
    {
      q: "Wanneer kun je het beste de dakgoot schoonmaken?",
      a: "In november, na de bladval. Dan gaat de goot schoon het natte seizoen in. Bij veel bomen is een tweede beurt in het late voorjaar aan te raden, tegen bloesem en zaden.",
    },
    {
      q: "Wat gebeurt er als je de dakgoot niet schoonmaakt?",
      a: "Het water loopt over de rand en slaat tegen de gevel. Op termijn geeft dat vochtplekken in het metselwerk, houtrot aan de boeidelen en in de winter vorstschade doordat staand water uitzet.",
    },
    {
      q: "Hoe zie je dat de dakgoot vol zit?",
      a: "Aan water dat bij regen over de rand loopt, groene strepen op de gevel onder de goot, en plantjes die boven de gootrand uitkomen. Klatert de regenpijp niet bij een flinke bui, dan zit er een verstopping.",
    },
  ],
```

- [ ] **Step 4: Registreer het artikel**

```ts
import { artikel as hoeVaakDakgootSchoonmaken } from "./hoe-vaak-dakgoot-schoonmaken";
```

Bovenaan in `blogArticles` zetten.

- [ ] **Step 5: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: nog twee ontbrekende artikelen.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "content: hoe-vaak-dakgoot-schoonmaken"
```

---

### Task 10: `wat-voor-water-gebruikt-een-glazenwasser`

Doelwoorden: wat voor water gebruikt een glazenwasser (80), welk water gebruikt een glazenwasser (70).

**Files:**
- Create: `src/lib/blog/wat-voor-water-gebruikt-een-glazenwasser.ts`
- Modify: `src/lib/blog/index.ts`

**Interfaces:**
- Consumes: taak 1 en 2.
- Produces: artikel `wat-voor-water-gebruikt-een-glazenwasser`.

> **Afbakening tegen taak 4.** Dit artikel en `wat-is-osmosewater` overlappen en kunnen elkaar kannibaliseren. Dit artikel is **kort en breed**: 800 tot 1.000 woorden, vier H2-secties, en het zet leidingwater, gedemineraliseerd water en osmosewater naast elkaar. Het gaat **niet** de diepte in over membranen, TDS of nadelen, want dat is precies wat `wat-is-osmosewater` doet. De link loopt van hier naar dat artikel en niet terug, zodat voor Google eenduidig is welke pagina het zwaartepunt van het osmose-onderwerp is. Die link legt taak 12.

- [ ] **Step 1: Maak het artikelbestand**

```ts
import type { BlogArticle } from "./types";

export const artikel: BlogArticle = {
  slug: "wat-voor-water-gebruikt-een-glazenwasser",
  title: "Wat voor water gebruikt een glazenwasser?",
  metaTitle: "Wat voor water gebruikt een glazenwasser? | Madern",
  metaDescription:
    "Wat voor water gebruikt een glazenwasser? Geen kraanwater, maar gezuiverd water zonder kalk en mineralen. Daarom hoeft er niet nagezeemd te worden.",
  excerpt:
    "Waarom een glazenwasser geen kraanwater gebruikt, en wat het verschil is tussen gedemineraliseerd en osmosewater.",
  datePublished: "2026-08-13",
  image: {
    src: "/images/werk-glazenwasser-woning-apeldoorn.jpg",
    alt: "Glazenwasser van Madern werkt met een watergevoede telescoopsteel aan de ramen van een woning in Apeldoorn",
  },
  intro:
    "Een professionele glazenwasser gebruikt geen kraanwater, maar gezuiverd water waar de kalk en de mineralen uit zijn gehaald. Dat water droogt namelijk vlekkeloos op, waardoor er niet nagezeemd hoeft te worden. Hieronder leest u waarom kraanwater strepen achterlaat, wat het verschil is tussen gedemineraliseerd water en osmosewater, en hoe dat water bij het raam komt.",
  sections: [
    // Zie stap 2.
  ],
  faqs: [
    // Zie stap 3.
  ],
};
```

- [ ] **Step 2: Schrijf de secties**

Vier koppen, samen 800 tot 1.000 woorden. Korter dan de andere artikelen, dat is opzet.

```ts
      {
        heading: "Waarom geen kraanwater?",
        paragraphs: [
          // Kern: kraanwater bevat opgeloste kalk, zouten en mineralen. Het water
          // verdampt, die stoffen niet, dus die blijven als witte vlekken en strepen op
          // het glas achter. Daarom moet je bij kraanwater altijd nazemen of natrekken:
          // je haalt het residu er fysiek af voordat het opdroogt.
          // Noem dat het water in deze regio vrij hard is, dus dat effect is hier
          // sterker dan in gebieden met zacht water.
          // Gebruik hier letterlijk "welk water gebruikt een glazenwasser".
        ],
      },
      {
        heading: "Gedemineraliseerd water en osmosewater",
        paragraphs: [
          // Zet ze naast elkaar zonder de diepte in te gaan. Gedemineraliseerd water is
          // de verzamelnaam voor water waar de mineralen uit zijn. Dat kan met hars-
          // filters (ionenwisseling) of met omgekeerde osmose. Osmosewater is dus een
          // vorm van gedemineraliseerd water, niet iets anders.
          // Noem kort het praktische verschil: harsfilters zijn goedkoper in aanschaf
          // maar het hars is verbruiksmateriaal, osmose vraagt een installatie maar is
          // per liter voordeliger. Ga niet dieper, dat doet het osmose-artikel.
        ],
      },
      {
        heading: "Waarom dat water streeploos opdroogt",
        paragraphs: [
          // Simpel mechanisme: er zit niets in dat kan achterblijven, dus als het water
          // verdampt blijft het glas schoon achter. Daarom kan een glazenwasser het raam
          // gewoon nat laten en weglopen, zonder na te wrijven.
          // Noem het bijkomende voordeel: er blijft geen zeepresidu achter waar nieuw
          // vuil zich aan hecht, dus het glas blijft langer helder.
          // Noem dat er geen schoonmaakmiddelen aan te pas komen, wat prettig is voor
          // beplanting onder het raam.
        ],
      },
      {
        heading: "Hoe komt het water bij het raam?",
        paragraphs: [
          // Praktisch: het gezuiverde water gaat via een slang door een telescoopsteel
          // met een borstel op de kop. De borstel maakt het vuil los, het water spoelt
          // het weg. Zo worden ramen tot een meter of tien vanaf de grond bereikt,
          // zonder ladder tegen de gevel.
          // Noem dat dat naast comfort vooral veiliger is, en dat het bij dakramen,
          // serres en hoge glaspartijen het verschil maakt.
          // Link naar [glazenwassen voor particulieren](/glazenwassen-particulier).
        ],
      },
```

De termen **"wat voor water gebruikt een glazenwasser"** en **"welk water gebruikt een glazenwasser"** moeten letterlijk voorkomen. De eerste is de titel en staat in de intro, de tweede hoort in de eerste sectie.

- [ ] **Step 3: Schrijf de FAQ's**

```ts
  faqs: [
    {
      q: "Welk water gebruikt een glazenwasser?",
      a: "Gezuiverd water waar de kalk en mineralen uit zijn gefilterd, meestal met omgekeerde osmose. Dat droogt vlekkeloos op, dus er hoeft niet nagezeemd te worden.",
    },
    {
      q: "Waarom gebruiken glazenwassers geen kraanwater?",
      a: "Kraanwater bevat kalk en mineralen. Het water verdampt, die stoffen niet, dus die blijven als witte vlekken en strepen op het glas achter.",
    },
    {
      q: "Is gedemineraliseerd water hetzelfde als osmosewater?",
      a: "Osmosewater is een vorm van gedemineraliseerd water. Gedemineraliseerd is de verzamelnaam voor water zonder mineralen, en omgekeerde osmose is een van de manieren om dat te maken.",
    },
  ],
```

- [ ] **Step 4: Registreer het artikel**

```ts
import { artikel as watVoorWaterGebruiktEenGlazenwasser } from "./wat-voor-water-gebruikt-een-glazenwasser";
```

Bovenaan in `blogArticles` zetten.

- [ ] **Step 5: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: nog een ontbrekend artikel (`wat-is-glasbewassing`).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "content: wat-voor-water-gebruikt-een-glazenwasser"
```

---

### Task 11: `wat-is-glasbewassing`

Doelwoorden: wat is glasbewassing (60), glasbewassing (1.400). Maakt het cluster compleet en ondersteunt de site-brede glasbewassing-targeting uit het vorige plan.

**Files:**
- Create: `src/lib/blog/wat-is-glasbewassing.ts`
- Modify: `src/lib/blog/index.ts`

**Interfaces:**
- Consumes: taak 1 en 2.
- Produces: artikel `wat-is-glasbewassing`. Hiermee zijn alle acht artikelen aanwezig.

- [ ] **Step 1: Maak het artikelbestand**

```ts
import type { BlogArticle } from "./types";

export const artikel: BlogArticle = {
  slug: "wat-is-glasbewassing",
  title: "Wat is glasbewassing?",
  metaTitle: "Wat is glasbewassing? Het vakwoord uitgelegd | Madern",
  metaDescription:
    "Wat is glasbewassing? Het vakwoord voor het professioneel schoonmaken van al het glas aan een pand: ramen, kozijnen, serres en dakramen, binnen en buiten.",
  excerpt:
    "Het vakwoord voor wat u waarschijnlijk gewoon ramen wassen noemt. Wat valt eronder, en waarom is het niet alleen iets voor bedrijven?",
  datePublished: "2026-08-13",
  image: {
    src: "/images/werk-glasbewassing-bedrijfspand-apeldoorn.jpg",
    alt: "Glasbewassing van een bedrijfspand in Apeldoorn met een watergevoede telescoopsteel",
  },
  intro:
    "Glasbewassing is het vakwoord voor het professioneel schoonmaken van al het glas aan een gebouw: ramen, kozijnen, deuren, serres en dakramen, aan de binnen- en de buitenkant. Het is dus hetzelfde als wat de meeste mensen gewoon ramen wassen noemen, alleen dan als beroep. Hieronder leest u wat er precies onder valt, waar het woord vandaan komt, en waarom het misverstand dat het alleen voor bedrijven is niet klopt.",
  sections: [
    // Zie stap 2.
  ],
  faqs: [
    // Zie stap 3.
  ],
};
```

- [ ] **Step 2: Schrijf de secties**

Vier koppen:

```ts
      {
        heading: "Wat valt er allemaal onder glasbewassing?",
        paragraphs: [
          // Som concreet op: ramen binnen en buiten, kozijnen en sponningen, glazen
          // deuren en pui, etalageruiten, serres en veranda's, dakramen en lichtkoepels,
          // en glazen balustrades. Noem dat kozijnen meestal meegaan omdat vuil uit de
          // sponning anders op het schone glas terugloopt.
          // Noem wat er meestal niet onder valt: gevelreiniging en het verwijderen van
          // hardnekkige aanslag zoals verf of cementsluier, dat is ander werk.
          // Gebruik hier letterlijk "wat is glasbewassing".
        ],
      },
      {
        heading: "Glasbewassing of ramen wassen: is er verschil?",
        paragraphs: [
          // Eerlijk antwoord: inhoudelijk nauwelijks, het is vooral vaktaal versus
          // spreektaal. Glasbewassing wordt gebruikt in offertes, bestekken en
          // onderhoudscontracten, ramen wassen in de spreektaal.
          // Noem dat er in de praktijk wel een accentverschil is: wie glasbewassing zegt,
          // bedoelt vaker een structurele beurt volgens schema, en wie ramen wassen zegt,
          // vaker een losse klus.
        ],
      },
      {
        heading: "Niet alleen voor bedrijven",
        paragraphs: [
          // Ontkracht het misverstand. Veel mensen associeren glasbewassing met kantoren
          // en winkels omdat het woord daar in contracten opduikt. Bij woningen levert
          // het juist veel op omdat u er elke dag doorheen kijkt.
          // Noem dat wij met vaste schema's werken voor particulieren in heel Apeldoorn.
          // Twee links: [glasbewassing voor particulieren](/glazenwassen-particulier) en
          // [glasbewassing voor bedrijven](/glazenwassen-zakelijk).
        ],
      },
      {
        heading: "Hoe verloopt een glasbewassingsbeurt?",
        paragraphs: [
          // Praktisch verloop: eerst spinrag en grof vuil van de kozijnen, dan het glas
          // met gezuiverd water en een borstel op een telescoopsteel, van boven naar
          // beneden, en tot slot een controleronde langs de randen.
          // Noem dat de buitenkant meestal zonder afspraak kan omdat we er niet in hoeven,
          // en dat de binnenkant op afspraak gaat.
          // Sluit af met een zachte CTA naar [een vrijblijvende offerte](/offerte).
        ],
      },
```

De termen **"wat is glasbewassing"** en **"glasbewassing"** moeten letterlijk voorkomen. Beide zijn met deze opzet vanzelf gedekt.

- [ ] **Step 3: Schrijf de FAQ's**

```ts
  faqs: [
    {
      q: "Wat is glasbewassing?",
      a: "Glasbewassing is het professioneel schoonmaken van al het glas aan een gebouw: ramen, kozijnen, deuren, serres en dakramen, aan de binnen- en de buitenkant.",
    },
    {
      q: "Wat is het verschil tussen glasbewassing en ramen wassen?",
      a: "Inhoudelijk nauwelijks iets. Glasbewassing is het vakwoord dat in offertes en onderhoudscontracten wordt gebruikt, ramen wassen is de spreektaal ervoor.",
    },
    {
      q: "Is glasbewassing alleen voor bedrijven?",
      a: "Nee. Het woord duikt vaak op in zakelijke contracten, maar bij woningen levert een vaste glasbewassingsbeurt net zo goed op. Wij werken met vaste schema's voor particulieren in heel Apeldoorn.",
    },
  ],
```

- [ ] **Step 4: Registreer het artikel**

```ts
import { artikel as watIsGlasbewassing } from "./wat-is-glasbewassing";
```

Bovenaan in `blogArticles` zetten.

- [ ] **Step 5: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: `seo:check` print nu `SEO-check: alles in orde`. Alle acht artikelen bestaan en dekken hun zoekwoorden.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "content: wat-is-glasbewassing, cluster compleet"
```

---

### Task 12: Onderlinge links leggen

Tot nu toe linkt elk artikel alleen naar dienstpagina's, want een link naar een artikel dat nog niet bestond zou de linkcontrole uit taak 3 laten falen. Nu alle acht bestaan, wordt het web tussen de artikelen gelegd. Dat onderlinge web is wat hier een cluster van maakt in plaats van acht losstaande pagina's.

**Files:**
- Modify: alle acht bestanden in `src/lib/blog/`

**Interfaces:**
- Consumes: alle artikelen uit taak 4 tot en met 11.
- Produces: niets nieuws in code.

- [ ] **Step 1: Voeg de links toe**

Voeg per artikel deze links toe in een bestaande alinea, op een plek waar het inhoudelijk logisch loopt. Verzin geen nieuwe alinea's als het ergens niet past, maar herschrijf dan een bestaande zin.

| In artikel | Link naar | Waar ongeveer |
|---|---|---|
| `wat-voor-water-gebruikt-een-glazenwasser` | `/blog/wat-is-osmosewater` | sectie "Gedemineraliseerd water en osmosewater" |
| `wat-is-osmosewater` | `/blog/hoe-vaak-ramen-laten-wassen` | sectie "De voordelen op een rij" |
| `hoe-vaak-ramen-laten-wassen` | `/blog/waarmee-kun-je-het-beste-ramen-wassen` | sectie "Zelf doen of uitbesteden?" |
| `waarmee-kun-je-het-beste-ramen-wassen` | `/blog/wat-voor-water-gebruikt-een-glazenwasser` | sectie "Welk water en welk middel?" |
| `hoe-vaak-dakgoot-schoonmaken` | `/blog/wat-kost-dakgoot-schoonmaken` | sectie "Zelf doen of laten doen?" |
| `wat-kost-dakgoot-schoonmaken` | `/blog/hoe-vaak-dakgoot-schoonmaken` | sectie "Waarom een minimumbedrag?" |
| `hoe-vaak-zonnepanelen-schoonmaken` | `/blog/wat-is-osmosewater` | sectie "Verdient schoonmaken zichzelf terug?" |
| `wat-is-glasbewassing` | `/blog/wat-voor-water-gebruikt-een-glazenwasser` | sectie "Hoe verloopt een glasbewassingsbeurt?" |

> **Let op de richting bij osmose.** `wat-voor-water-gebruikt-een-glazenwasser` linkt naar `wat-is-osmosewater`, maar **niet** andersom. Dat is opzet: zo is voor Google eenduidig welke pagina het zwaartepunt van het osmose-onderwerp is. Voeg die tegenlink dus niet toe, ook al lijkt dat symmetrischer.

- [ ] **Step 2: Verifieer**

```bash
npx tsc --noEmit
npm run lint
npm run seo:check
```

Verwacht: alle drie schoon. De linkcontrole uit taak 3 valideert nu acht artikellinks.

Controleer daarnaast dat elk artikel minstens een interne link heeft:

```bash
node -e "const fs=require('fs'); for (const f of fs.readdirSync('src/lib/blog').filter(f=>f.endsWith('.ts')&&f!=='index.ts'&&f!=='types.ts')) { const n=[...fs.readFileSync('src/lib/blog/'+f,'utf8').matchAll(/\[[^\]]+\]\(\//g)].length; console.log(n.toString().padStart(2), f); }"
```

Verwacht: elk bestand heeft er minstens twee.

- [ ] **Step 3: Controleer de gerenderde pagina's**

```bash
npm run dev
```

Loop de acht artikelen langs op `http://localhost:3000/blog`. Controleer per artikel: de links zijn klikbaar, er staan nergens letterlijke vierkante haken in de tekst, en elke link komt op een bestaande pagina uit. Stop de dev-server met Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "seo: onderlinge links tussen de acht kennisbankartikelen"
```

---

### Task 13: Rank-tracker bijwerken

De nulmeting moet vastliggen, anders is over twaalf weken niet vast te stellen of dit gewerkt heeft.

**Files:**
- Modify: `seo/rank-tracker.csv`

**Interfaces:**
- Consumes: niets.
- Produces: niets in code.

- [ ] **Step 1: Voeg de doelzoekwoorden toe**

Het bestand is puntkomma-gescheiden met deze kolommen:

```
Zoekwoord;Intentie;Doelpagina;Google organisch (positie);Local pack top-3? (J/N);Datum check;Concurrent #1;Notities
```

Voeg deze regels toe aan het eind. Alleen `wat is osmose water` heeft een nulmeting, de rest is nieuw:

```csv
wat is osmose water;Informationeel / landelijk;/blog/wat-is-osmosewater;24,9;;2026-08-13;;Nulmeting GSC, 182 vertoningen, cluster 5.550/mnd
nadelen osmose water;Informationeel / landelijk;/blog/wat-is-osmosewater;;;2026-08-13;;Nieuw, onbezet terrein volgens onderzoek
waarmee ramen wassen;Informationeel / landelijk;/blog/waarmee-kun-je-het-beste-ramen-wassen;;;2026-08-13;;Nieuw, 1.000/mnd, TP 3.000
moet je zonnepanelen schoonmaken;Informationeel / landelijk;/blog/hoe-vaak-zonnepanelen-schoonmaken;;;2026-08-13;;Nieuw, 300/mnd, TP 7.300
hoe vaak zonnepanelen schoonmaken;Informationeel / landelijk;/blog/hoe-vaak-zonnepanelen-schoonmaken;;;2026-08-13;;Nieuw, 150/mnd, TP 2.200
hoe vaak dakgoot schoonmaken;Informationeel / landelijk;/blog/hoe-vaak-dakgoot-schoonmaken;;;2026-08-13;;Nieuw, 150/mnd, TP 1.300
dakgoot schoonmaken prijs;Commercieel / landelijk;/blog/wat-kost-dakgoot-schoonmaken;;;2026-08-13;;Nieuw, 400/mnd, enige artikel met koopintentie
wat kost een dakgoot schoonmaken;Commercieel / landelijk;/blog/wat-kost-dakgoot-schoonmaken;;;2026-08-13;;Nieuw, 100/mnd, TP 1.500
wat voor water gebruikt een glazenwasser;Informationeel / landelijk;/blog/wat-voor-water-gebruikt-een-glazenwasser;;;2026-08-13;;Nieuw, 80/mnd
wat is glasbewassing;Informationeel / landelijk;/blog/wat-is-glasbewassing;;;2026-08-13;;Nieuw, 60/mnd, cluster 1.400
hoe vaak ramen wassen;Informationeel / landelijk;/blog/hoe-vaak-ramen-laten-wassen;;;2026-08-13;;Bestaand artikel uitgebreid, 200/mnd
```

- [ ] **Step 2: Verifieer het kolomaantal**

```bash
node -e "const l=require('fs').readFileSync('seo/rank-tracker.csv','utf8').replace(/\r/g,'').trim().split('\n'); const k=l[0].split(';').length; const fout=l.map((r,i)=>[i+1,r.split(';').length]).filter(([,n])=>n!==k); console.log(fout.length?'FOUT op regel(s): '+JSON.stringify(fout):'alle regels hebben '+k+' kolommen')"
```

Verwacht: `alle regels hebben 8 kolommen`.

- [ ] **Step 3: Commit**

```bash
git add seo/rank-tracker.csv
git commit -m "seo: kennisbank-doelzoekwoorden en nulmeting 2026-08-13 in rank-tracker"
```

---

## Afronding

Na taak 13: mergen naar `main` is een **expliciet besluit van Roy**, want elke push naar `main` deployt automatisch naar productie.

Verifieer na de merge op de live site dat de zes nieuwe artikelen bestaan:

```bash
for s in wat-kost-dakgoot-schoonmaken hoe-vaak-zonnepanelen-schoonmaken waarmee-kun-je-het-beste-ramen-wassen hoe-vaak-dakgoot-schoonmaken wat-voor-water-gebruikt-een-glazenwasser wat-is-glasbewassing; do
  curl -sI "https://www.madernglazenwassers.nl/blog/$s" | head -1
done
```

Verwacht: zes keer `HTTP/2 200`.

Controleer daarna dat de artikelen in de sitemap staan:

```bash
curl -s https://www.madernglazenwassers.nl/sitemap.xml | grep -c "/blog/"
```

Verwacht: 8.

Dien tot slot de sitemap opnieuw in via Google Search Console en vraag handmatige indexering aan voor de zes nieuwe artikelen en de twee uitgebreide.

## Openstaand na dit plan

- **Beeldmateriaal.** Twee foto's ontbreken die er inhoudelijk toe doen: een osmose-installatie of waterfilter (voor taak 4 en 10) en zonnepanelen (voor taak 7). Nu vallen die terug op bestaande foto's van glazenwaswerk. Zodra de foto's er zijn, alleen het `image`-blok in die drie artikelbestanden vervangen.
- **`/tarieven`.** Wacht op de volledige prijslijst. Het dakgoottarief uit taak 6 (€5 per strekkende meter, minimum €95) is het eerste vaste bedrag dat daar op kan, en moet daar letterlijk overgenomen worden, niet opnieuw bedacht.
- **Meting.** Herijken in GSC na 6 en na 12 weken, tegen de nulmeting uit taak 13. Beoordelen op vertoningen en positie, niet op klikken of leads. Uitzondering: `wat-kost-dakgoot-schoonmaken` mag wel op aanvragen worden afgerekend.
