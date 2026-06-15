import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = generatePageMetadata({
  title: "Over Madern Glazenwassers | Uw glazenwasser uit Apeldoorn",
  description:
    "Madern Glazenwassers is een Apeldoorns bedrijf, opgericht door Michael. Persoonlijk contact, betrouwbaarheid en eerlijke prijzen voor stralend schone ramen.",
  path: "/over-ons",
});

// Person-schema voor de oprichter — versterkt E-E-A-T.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.founder,
  jobTitle: "Oprichter",
  worksFor: { "@type": "LocalBusiness", name: siteConfig.name },
  homeLocation: { "@type": "City", name: "Apeldoorn" },
};

export default function OverOnsPage() {
  return (
    <>
      <JsonLd schema={personSchema} />
      <Breadcrumbs items={[{ name: "Over ons", path: "/over-ons" }]} />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Welkom bij Madern Glazenwassers
        </h1>
        <p className="mt-4 text-pretty text-lg text-navy-800/80">
          Een Apeldoornse onderneming, door Apeldoorners. We zijn een jong,
          gedreven glazenwassersbedrijf dat professionele service combineert met
          een persoonlijke aanpak.
        </p>

        <div className="mt-10 rounded-3xl border border-mist-200 bg-mist-50 p-7 sm:p-9">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-water-500 text-2xl font-bold text-white">
              {siteConfig.founder.charAt(0)}
            </span>
            <div>
              <p className="font-semibold text-navy-900">{siteConfig.founder}</p>
              <p className="text-sm text-navy-800/70">Oprichter Madern Glazenwassers</p>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-pretty text-navy-900/90">
            <p>
              &ldquo;Hallo! Ik ben {siteConfig.founder}, de oprichter van Madern
              Glazenwassers. Als geboren en getogen Apeldoorner heb ik altijd al
              een passie gehad voor schoonmaak en het leveren van kwaliteitswerk.
            </p>
            <p>
              Wat mij drijft? De voldoening van tevreden klanten en het zien van
              kristalheldere ramen. Ik geloof in persoonlijk contact,
              betrouwbaarheid en eerlijke prijzen. Met Madern Glazenwassers breng
              ik professionele service naar particulieren en bedrijven in de regio
              Apeldoorn.&rdquo;
            </p>
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-navy-900">Waar wij voor staan</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { t: "Persoonlijk contact", b: "U heeft één vast aanspreekpunt dat u kent en die u kent." },
            { t: "Betrouwbaar", b: "Afspraak is afspraak. We komen op tijd en leveren vakwerk." },
            { t: "Eerlijke prijzen", b: "Een duidelijke offerte vooraf, zonder verrassingen." },
            { t: "Streepvrij osmosewater", b: "Milieuvriendelijk schoon, zonder chemicaliën." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-mist-200 bg-white p-5">
              <h3 className="font-semibold text-navy-900">{v.t}</h3>
              <p className="mt-1.5 text-sm text-navy-800/75">{v.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/offerte" size="lg">Vraag een offerte aan</Button>
          <Button href="/contact" size="lg" variant="ghost">Neem contact op</Button>
        </div>
      </section>

      <div className="py-12">
        <CtaBand />
      </div>
    </>
  );
}
