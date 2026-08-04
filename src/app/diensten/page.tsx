import Link from "next/link";
import type { Metadata } from "next";
import { availableServices } from "@/lib/services";
import { plaatsen, plaatsHref } from "@/lib/plaatsen";
import { siteConfig } from "@/lib/site";
import { generatePageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { LeadForm } from "@/components/sections/LeadForm";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceListSchema } from "@/lib/schema";

const dienstenFaqs = [
  {
    q: "Kan ik meerdere diensten combineren, bijvoorbeeld ramen en zonnepanelen?",
    a: "Ja, dat doen we vaak. We stemmen één afspraak af op alles wat u wilt laten reinigen, dat scheelt u tijd en is vaak voordeliger dan losse beurten.",
  },
  {
    q: "Welke dienst past bij mijn situatie?",
    a: "Voor een woning is glazenwassen particulier meestal het startpunt, eventueel aangevuld met zonnepanelen of dakgoot. Voor een winkel of kantoor kijken we naar etalage- of zakelijke glasbewassing met een vaste frequentie. Twijfelt u? Bel of app ons, we adviseren graag kosteloos.",
  },
  {
    q: "Werken jullie met een eenmalige beurt of alleen met abonnementen?",
    a: "Beide kan. Veel klanten kiezen uiteindelijk voor een vaste frequentie, maar een eenmalige beurt om kennis te maken is altijd mogelijk.",
  },
];

export const metadata: Metadata = generatePageMetadata({
  title: "Diensten glazenwasser Apeldoorn | Madern Glazenwassers",
  description:
    "Alle diensten van uw glazenwasser in Apeldoorn: glazenwassen voor particulier en zakelijk, etalages, zonnepanelen reinigen, gevel- en dakgootreiniging. Vraag een gratis offerte aan.",
  path: "/diensten",
});

export default function DienstenPage() {
  return (
    <>
      <JsonLd
        schema={serviceListSchema(
          availableServices.map((s) => ({ name: s.name, path: `/${s.slug}` })),
        )}
      />
      <Breadcrumbs items={[{ name: "Diensten", path: "/diensten" }]} />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Glazenwasser-diensten in <span className="text-accent-500">Apeldoorn</span>
        </h1>
        <p className="mt-5 text-pretty text-lg text-navy-800/80">
          Madern Glazenwassers is uw vaste glazenwasser in Apeldoorn en omgeving.
          Van streepvrij glazenwassen voor particulier en zakelijk tot het
          reinigen van etalages, zonnepanelen, gevels en dakgoten, alles met
          gezuiverd osmosewater en een persoonlijke aanpak. Hieronder vindt u al
          onze diensten.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button href="/offerte" size="lg">Gratis offerte aanvragen</Button>
          <Button href={siteConfig.phone.href} size="lg" variant="ghost">
            Of bel {siteConfig.phone.display}
          </Button>
        </div>
      </section>

      <LeadForm />

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {availableServices.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-mist-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy-900/5"
            >
              <h2 className="text-xl font-semibold text-navy-900 group-hover:text-water-600">
                {s.name}
              </h2>
              <p className="mt-2 flex-1 text-pretty text-navy-800/75">{s.tagline}</p>
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

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
          Waarom kiezen voor Madern Glazenwassers?
        </h2>
        <p className="mt-4 text-pretty text-navy-800/80">
          Wat de dienst ook is, we werken altijd met gezuiverd osmosewater
          voor een streepvrij en langdurig helder resultaat, zonder
          chemicaliën. U krijgt vooraf een eerlijke, vrijblijvende offerte,
          een vast aanspreekpunt en afspraken die ook in het weekend kunnen.
          Zo hoeft u met meerdere diensten niet meerdere partijen te bellen,
          Madern regelt het voor u.
        </p>
      </section>

      <div className="py-8">
        <Faq faqs={dienstenFaqs} title="Veelgestelde vragen over onze diensten" />
      </div>

      {/* Werkgebied, interne links voor lokale SEO */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-mist-200 bg-mist-50 p-6">
          <h2 className="text-xl font-bold text-navy-900">
            In welke plaatsen werken wij?
          </h2>
          <p className="mt-2 text-navy-800/80">
            Apeldoorn is onze thuisbasis. Daarnaast bent u bij ons aan het juiste
            adres in de hele regio, bekijk uw plaats:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {plaatsen.map((p) => (
              <Link
                key={p.slug}
                href={plaatsHref(p)}
                className="rounded-full border border-mist-200 bg-white px-3.5 py-1.5 text-sm font-medium text-navy-800 hover:border-water-300 hover:text-water-700"
              >
                Glazenwasser {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="py-12">
        <CtaBand />
      </div>
    </>
  );
}
