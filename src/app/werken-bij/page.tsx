import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LeadForm } from "@/components/sections/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { jobPostingSchema } from "@/lib/schema";

export const metadata: Metadata = generatePageMetadata({
  title: "Vacature glazenwasser Apeldoorn | Werken bij Madern Glazenwassers",
  description:
    "Bijbaan als medewerker glazenwasser in Apeldoorn e.o. Oproep-/flexcontract conform de cao, minimaal 8 uur per week, te combineren met school of studie. Geen ervaring nodig.",
  path: "/werken-bij",
});

// De twee documenten staan in public/. De vacature is de volledige tekst om
// rustig na te lezen, de flyer is de versie die we uitdelen en ophangen.
const documenten = [
  {
    href: "/vacature-glazenwasser-apeldoorn.pdf",
    titel: "De vacature als PDF",
    uitleg: "De volledige vacaturetekst om rustig door te lezen of te bewaren.",
    grootte: "PDF · 150 kB",
  },
  {
    href: "/vacature-glazenwasser-apeldoorn-flyer.pdf",
    titel: "De vacatureflyer",
    uitleg: "Ken je iemand die dit werk zou liggen? Stuur de flyer door of print hem uit.",
    grootte: "PDF · 5 MB",
  },
];

const watDoeJe = [
  "Ramen wassen bij particuliere en zakelijke klanten, met het telescoopsysteem of met de hand.",
  "Zorgen voor een streeploos, representatief eindresultaat.",
  "Vriendelijk en professioneel contact met klanten.",
];

const wieZoeken = [
  "Je beheerst de Nederlandse taal uitstekend.",
  "Je kunt fysiek werk aan: buiten werken, staan en reiken.",
  "Je bent leergierig, zelfstandig en op tijd.",
  "Je bent beschikbaar op werkdagen en/of zaterdagen, minimaal 8 uur per week, in te vullen naast school of studie.",
  "Je bent gemotiveerd, netjes en klantvriendelijk.",
  "Ervaring is niet nodig, wij leiden je volledig op.",
  "In het bezit van een rijbewijs B is een pré.",
];

const watBieden = [
  "Een oproep-/flexcontract conform de cao Schoonmaak- en Glazenwassersbedrijf.",
  "Salaris volgens het (jeugd)minimumloon, afhankelijk van je leeftijd, met eventuele cao-toeslagen.",
  "Flexibele werktijden die je goed kunt combineren met school of studie.",
  "Uitzicht op meer uren of een vast contract bij goed functioneren.",
  "Een jong, groeiend bedrijf met een persoonlijke sfeer en ruimte voor eigen inbreng.",
  "Afwisselend werk in Apeldoorn en omgeving; we leiden je op tot volwaardig glazenwasser.",
];

export default function WerkenBijPage() {
  return (
    <>
      <JsonLd
        schema={jobPostingSchema({
          title: "Medewerker glazenwasser (bijbaan)",
          description:
            "Madern Glazenwassers in Apeldoorn zoekt een medewerker glazenwasser voor een bijbaan naast school of studie. Je wast ramen bij particulieren en bedrijven in Apeldoorn en omgeving, met het telescoopsysteem of met de hand, en zorgt voor een streeploos resultaat. Geen ervaring nodig: wij leiden je volledig op. We bieden een oproep-/flexcontract conform de cao Schoonmaak- en Glazenwassersbedrijf, salaris volgens het (jeugd)minimumloon met eventuele cao-toeslagen, flexibele werktijden vanaf 8 uur per week en uitzicht op meer uren of een vast contract.",
          datePosted: "2026-07-31",
          validThrough: "2027-07-31",
          // Een oproepcontract naast school of studie: geen voltijdbaan.
          employmentType: ["PART_TIME", "PER_DIEM"],
        })}
      />
      <Breadcrumbs items={[{ name: "Werken bij", path: "/werken-bij" }]} />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-sm font-semibold text-water-600">
          Vacature · Oproep-/flexcontract · Apeldoorn en omgeving
        </p>
        <h1 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Medewerker glazenwasser (bijbaan)
        </h1>
        <p className="mt-5 text-pretty text-lg text-navy-800/80">
          Ben jij scholier of student en zoek je een leuke, actieve bijbaan buiten
          school of je studie om? Madern Glazenwassers zoekt een enthousiaste
          medewerker die ons team komt versterken bij het glazenwassen van woningen
          en bedrijfspanden in Apeldoorn en omgeving. Lijkt het je wat om buiten te
          werken, elke dag een zichtbaar resultaat neer te zetten en klanten blij te
          maken met stralend schone ramen? Ervaring is niet nodig, wij leiden je
          volledig op.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-navy-900">Wat ga je doen?</h2>
        <ul className="mt-5 space-y-3">
          {watDoeJe.map((item) => (
            <li key={item} className="flex items-start gap-3 text-navy-900">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-water-500">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-navy-900">Wat vragen we?</h2>
        <ul className="mt-5 space-y-3">
          {wieZoeken.map((item) => (
            <li key={item} className="flex items-start gap-3 text-navy-900">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-water-500">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-navy-900">Wat bieden we?</h2>
        <ul className="mt-5 space-y-3">
          {watBieden.map((item) => (
            <li key={item} className="flex items-start gap-3 text-navy-900">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-water-500">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-navy-900">
          De vacature meenemen
        </h2>
        <p className="mt-3 text-pretty leading-relaxed text-navy-800/85">
          Wil je de vacature rustig nalezen, of ken je iemand voor wie dit werk
          is? Hieronder staan de vacature en de flyer om te openen, te bewaren of
          door te sturen.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {documenten.map((doc) => (
            <a
              key={doc.href}
              href={doc.href}
              target="_blank"
              rel="noopener"
              className="group flex gap-4 rounded-2xl border border-mist-200 bg-mist-50 p-5 transition-colors hover:border-water-500 hover:bg-white"
            >
              <svg
                aria-hidden
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-water-600"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
              </svg>
              <span>
                <span className="block font-semibold text-navy-900 group-hover:text-water-600">
                  {doc.titel}
                </span>
                <span className="mt-1 block text-sm text-navy-800/75">{doc.uitleg}</span>
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.1em] text-navy-800/55">
                  {doc.grootte}
                </span>
              </span>
            </a>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-navy-900">Werklocatie</h2>
        <p className="mt-3 text-pretty leading-relaxed text-navy-800/85">
          Apeldoorn en omgeving. We rijden samen vanuit Apeldoorn naar de klanten
          in de regio.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-navy-900">Hoe solliciteer je?</h2>
        <p className="mt-3 text-pretty leading-relaxed text-navy-800/85">
          Laat hieronder je gegevens achter en vertel kort iets over jezelf en je
          beschikbaarheid, dan nemen we snel contact met je op. Liever direct? Bel
          of app ons op {siteConfig.phone.display}, of mail naar{" "}
          {siteConfig.email}.
        </p>
      </section>

      <LeadForm
        title="Solliciteer als medewerker glazenwasser"
        dienst="Sollicitatie glazenwasser"
      />
    </>
  );
}
