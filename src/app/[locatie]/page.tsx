import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locatiePlaatsen, getPlaatsByLocatie, locatieSlug } from "@/lib/plaatsen";
import { availableServices } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { generatePageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

// Alleen de gegenereerde glazenwasser-[plaats] slugs zijn geldig; al het andere → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locatiePlaatsen.map((p) => ({ locatie: locatieSlug(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locatie: string }>;
}): Promise<Metadata> {
  const { locatie } = await params;
  const p = getPlaatsByLocatie(locatie);
  if (!p) return {};
  return generatePageMetadata({
    title: `Glazenwasser ${p.name} | Ramen wassen | Madern Glazenwassers`,
    description: `Glazenwasser in ${p.name}? Madern maakt uw ramen streepvrij schoon met osmosewater, voor particulier en zakelijk. Flexibel en betrouwbaar. Vraag een offerte aan.`,
    path: `/${locatie}`,
  });
}

export default async function LocatiePage({
  params,
}: {
  params: Promise<{ locatie: string }>;
}) {
  const { locatie } = await params;
  const p = getPlaatsByLocatie(locatie);
  if (!p) notFound();

  const faqs = [
    {
      q: `Werkt Madern Glazenwassers ook in ${p.name}?`,
      a: `Ja. ${p.name} valt binnen ons werkgebied. We verzorgen hier glasbewassing voor zowel particulieren als bedrijven, eenmalig of met een vast schema.`,
    },
    {
      q: `Wat kost een glazenwasser in ${p.name}?`,
      a: "De prijs hangt af van het aantal ramen, het type pand en de frequentie. U ontvangt vooraf altijd een gratis, vrijblijvende offerte.",
    },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Werkgebied", path: "/werkgebied" },
          { name: `Glazenwasser ${p.name}`, path: `/${locatie}` },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Glazenwasser <span className="text-accent-500">{p.name}</span>
        </h1>
        <p className="mt-5 text-pretty text-lg text-navy-800/80">{p.intro}</p>
        <p className="mt-4 text-pretty text-navy-800/80">{p.detail}</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button href="/offerte" size="lg">Offerte voor {p.name}</Button>
          <Button href={siteConfig.phone.href} size="lg" variant="ghost">
            Bel {siteConfig.phone.display}
          </Button>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-navy-900">
          Onze diensten in {p.name}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {availableServices.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group rounded-xl border border-mist-200 bg-white p-5 hover:border-water-300"
            >
              <h3 className="font-semibold text-navy-900 group-hover:text-water-600">{s.name}</h3>
              <p className="mt-1 text-sm text-navy-800/70">{s.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="py-8">
        <Faq faqs={faqs} title={`Veelgestelde vragen — ${p.name}`} />
      </div>

      <div className="py-12">
        <CtaBand title={`Glazenwasser nodig in ${p.name}?`} />
      </div>
    </>
  );
}
