// Controleert SEO-invarianten die de site stilzwijgend aanneemt.
// Draaien: npm run seo:check   (exit 1 bij overtreding)
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const errors = [];
const check = (ok, msg) => { if (!ok) errors.push(msg); };

// Regeleindes normaliseren: op Windows zet git bestanden met CRLF terug (autocrlf),
// waardoor patronen als "\n  {\n" niet meer matchen en de check onterecht faalt.
const read = (p) => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");

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
// Paginatekst = long-form content + de intro's/FAQ's uit de services-registry.
const CONTENT = (read("src/lib/serviceContent.ts") + read("src/lib/services.ts"))
  .toLowerCase()
  .replace(/\s+/g, " ");
const VERPLICHT = [
  ["dakgoot schoonmaken", "dakgoot-cluster (2.600/mnd)"],
  ["dakgoten schoonmaken", "dakgoot-cluster (800/mnd)"],
  ["zonnepanelen schoonmaken", "zonnepanelen-cluster (4.400/mnd)"],
  ["glasbewassing", "glasbewassing (1.400/mnd)"],
  // Koopvarianten: lager volume, maar wie "laten" typt wil inhuren in plaats van
  // zelf doen. Per bezoeker dus meer waard dan het volume suggereert.
  ["dakgoten laten schoonmaken", "koopvariant dakgoot (100/mnd)"],
  ["dakgoot laten schoonmaken", "koopvariant dakgoot (70/mnd)"],
  ["zonnepanelen laten reinigen", "koopvariant zonnepanelen (250/mnd)"],
  ["zonnepanelen laten schoonmaken", "koopvariant zonnepanelen (200/mnd)"],
  ["dakkapel laten reinigen", "koopvariant dakkapel (150/mnd)"],
  ["dakkapel laten schoonmaken", "koopvariant dakkapel (70/mnd)"],
  ["zonnepanelen zelf te wassen", "variant zonnepanelen wassen (250/mnd)"],
  ["dakkapel schoonmaken", "dakkapel-cluster (450/mnd)"],
  ["osmose glasbewassing", "osmose-koppeling (100/mnd)"],
];
for (const [term, waarom] of VERPLICHT) {
  check(CONTENT.includes(term), `zoekterm "${term}" ontbreekt in de paginatekst — ${waarom}`);
}

// --- 5. Geen em-dashes in klantgerichte teksten ---
for (const f of ["src/lib/services.ts", "src/lib/serviceContent.ts", "src/lib/plaatsen.ts"]) {
  const regels = read(f).split("\n");
  regels.forEach((r, i) => {
    if (r.includes("—")) errors.push(`em-dash in ${f}:${i + 1}`);
  });
}

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

if (errors.length) {
  console.error(`\nSEO-check: ${errors.length} probleem(en)\n`);
  for (const e of errors) console.error("  x " + e);
  process.exit(1);
}
console.log("SEO-check: alles in orde");
