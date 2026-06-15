import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { availableServices } from "@/lib/services";
import { plaatsen, primaryPlaats } from "@/lib/plaatsen";
import { generatePageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { UspStrip } from "@/components/sections/UspStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = generatePageMetadata({
  title: "Glazenwasser Apeldoorn | Madern Glazenwassers",
  description: siteConfig.shortDescription,
  path: "/",
});

const homeFaqs = [
  {
    q: "Wat kost een glazenwasser in Apeldoorn?",
    a: "Dat hangt af van het aantal ramen, het type woning of pand en de frequentie. We geven u vooraf altijd een gratis, vrijblijvende offerte met een eerlijke prijs. Bekijk onze tarieven-pagina voor een indicatie.",
  },
  {
    q: "Werken jullie voor particulieren én bedrijven?",
    a: "Ja. Madern verzorgt glasbewassing voor woningen, kantoren, bedrijfspanden en winkels in Apeldoorn en omgeving — eenmalig of met een vast schema.",
  },
  {
    q: "Wat is osmosewater en waarom gebruiken jullie het?",
    a: "Osmosewater is volledig gezuiverd water zonder kalk en mineralen. Het droogt streepvrij op en houdt uw ramen langer schoon, helemaal zonder chemicaliën.",
  },
  {
    q: "In welke plaatsen zijn jullie actief?",
    a: `Onze thuisbasis is Apeldoorn. Daarnaast werken we onder meer in ${plaatsen
      .filter((p) => !p.primary)
      .map((p) => p.name)
      .join(", ")}.`,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden">
        <div className="bg-glass-grid absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-water-200 ring-1 ring-white/15">
              💧 Streepvrij met osmosewater · Apeldoorn
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Glazenwasser in Apeldoorn voor{" "}
              <span className="text-accent-400">stralend schone ramen</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg text-mist-100/85">
              Madern Glazenwassers maakt uw ramen aan binnen- én buitenkant
              streepvrij schoon — voor woningen, kantoren en winkels. Een
              Apeldoorns bedrijf, door Apeldoorners.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/offerte" size="lg">Gratis offerte aanvragen</Button>
              <Button href={siteConfig.phone.href} size="lg" variant="white">
                Bel {siteConfig.phone.display}
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist-100/80">
              <li className="flex items-center gap-2"><Check /> Binnen &amp; buiten</li>
              <li className="flex items-center gap-2"><Check /> Ook in het weekend</li>
              <li className="flex items-center gap-2"><Check /> Particulier &amp; zakelijk</li>
            </ul>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-water-400/30 to-water-700/20 ring-1 ring-white/15">
                <div className="absolute inset-0 bg-glass-grid opacity-60" aria-hidden />
                <span className="animate-shine absolute -inset-y-4 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent" aria-hidden />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-xl">
                  <p className="text-sm font-semibold text-navy-900">Kristalhelder resultaat</p>
                  <p className="mt-1 text-xs text-navy-800/70">
                    Gezuiverd osmosewater · geen strepen · geen chemicaliën
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="-mt-8 sm:-mt-10">
        <UspStrip />
      </div>

      {/* Diensten */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy-900">Onze diensten</h2>
          <p className="mt-3 text-pretty text-navy-800/75">
            Van uw woonkamerramen tot een compleet bedrijfspand — Madern levert
            vakwerk met een persoonlijke aanpak.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {availableServices.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group rounded-2xl border border-mist-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy-900/5"
            >
              <h3 className="text-xl font-semibold text-navy-900 group-hover:text-water-600">
                {s.name}
              </h3>
              <p className="mt-2 text-pretty text-navy-800/75">{s.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-water-600">
                Meer over deze dienst
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Osmosewater / waarom */}
      <section className="bg-mist-50 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Kwaliteit die u kunt zien</h2>
            <p className="mt-4 text-pretty text-navy-800/80">
              Wij werken met gezuiverd osmosewater voor een streepvrij en
              langdurig schoon resultaat zonder chemicaliën. Het water trekt vuil
              en kalk aan en droogt vlekkeloos op — beter voor uw ramen, uw
              kozijnen én het milieu.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Geen strepen, kalkranden of vegen",
                "Ramen blijven langer helder",
                "Veilig voor kozijnen, coatings en zonnepanelen",
                "Zonder agressieve schoonmaakmiddelen",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-900">
                  <span className="mt-0.5 text-water-500"><Check /></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/over-ons" variant="secondary">Maak kennis met Madern</Button>
            </div>
          </div>
          <div className="rounded-3xl border border-mist-200 bg-white p-8">
            <p className="text-lg font-medium leading-relaxed text-navy-900">
              &ldquo;Ik geloof in persoonlijk contact, betrouwbaarheid en eerlijke
              prijzen. Met Madern breng ik professionele service naar
              particulieren en bedrijven in de regio Apeldoorn.&rdquo;
            </p>
            <p className="mt-5 font-semibold text-navy-900">{siteConfig.founder}</p>
            <p className="text-sm text-navy-800/70">Oprichter Madern Glazenwassers</p>
          </div>
        </div>
      </section>

      {/* Werkgebied */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy-900">Werkgebied rondom Apeldoorn</h2>
          <p className="mt-3 text-navy-800/75">
            {primaryPlaats.name} is onze thuisbasis. We werken in de hele regio:
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {plaatsen.map((p) => (
            <Link
              key={p.slug}
              href={`/werkgebied/${p.slug}`}
              className="rounded-full border border-mist-200 bg-white px-4 py-2 text-sm font-medium text-navy-800 hover:border-water-300 hover:text-water-700"
            >
              Glazenwasser {p.name}
            </Link>
          ))}
        </div>
      </section>

      <Faq faqs={homeFaqs} />

      <div className="py-16">
        <CtaBand />
      </div>
    </>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-water-400">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
