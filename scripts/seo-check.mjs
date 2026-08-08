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
