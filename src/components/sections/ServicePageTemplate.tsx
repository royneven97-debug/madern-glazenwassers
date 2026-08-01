import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/services";
import { availableServices } from "@/lib/services";
import { getServiceContent } from "@/lib/serviceContent";
import { siteConfig } from "@/lib/site";
import { plaatsen, plaatsHref } from "@/lib/plaatsen";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { LeadForm } from "@/components/sections/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";

// Generieke werkfoto's om de long-form tekst mee af te wisselen.
const werkbeelden = [
  { src: "/images/werk-glazenwasser-woning-apeldoorn.jpg", alt: "Glazenwasser aan het werk bij een woning in Apeldoorn met een watergevoede telescoopsteel op een ladder" },
  { src: "/images/werk-glazenwasser-hoogte-apeldoorn.jpg", alt: "Michael van Madern Glazenwassers werkt veilig op hoogte bij een woning in Apeldoorn" },
  { src: "/images/werk-glasbewassing-bedrijfspand-apeldoorn.jpg", alt: "Glasbewassing bij een bedrijfspand bij Apeldoorn met een watergevoede telescoopsteel" },
  { src: "/images/werk-dakgoot-reinigen-apeldoorn.jpg", alt: "Dakgootreiniging bij een woning in Apeldoorn vanaf een ladder met telescoopsteel" },
  { src: "/images/werk-bedrijfspand-schoon-apeldoorn.jpg", alt: "Bedrijfspand bij Apeldoorn met schone ramen na glasbewassing door Madern Glazenwassers" },
  { src: "/images/werk-zakelijk-pand-apeldoorn.jpg", alt: "Zakelijk pand op een bedrijventerrein bij Apeldoorn dat Madern Glazenwassers onderhoudt" },
];

const usps = [
  "Streepvrij met osmosewater",
  "Flexibel, ook in het weekend",
  "Eerlijke prijs vooraf",
  "Persoonlijk contact",
];

export function ServicePageTemplate({ service }: { service: Service }) {
  const related = availableServices.filter((s) => s.slug !== service.slug).slice(0, 3);
  const content = getServiceContent(service.slug);

  // Kies per dienst een afwisselende set werkfoto's (deterministisch, maar niet overal gelijk).
  const offset =
    [...service.slug].reduce((a, c) => a + c.charCodeAt(0), 0) % werkbeelden.length;
  const beeldNa = (idx: number) =>
    werkbeelden[(offset + idx) % werkbeelden.length];

  return (
    <>
      <JsonLd
        schema={serviceSchema({
          name: service.name,
          description: service.metaDescription,
          path: `/${service.slug}`,
        })}
      />
      <Breadcrumbs items={[{ name: service.name, path: `/${service.slug}` }]} />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="flex flex-col justify-center">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg text-navy-800/80">
              {service.intro}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/offerte" size="lg">Gratis offerte aanvragen</Button>
              <Button href={siteConfig.phone.href} size="lg" variant="ghost">
                Of bel {siteConfig.phone.display}
              </Button>
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {usps.map((u) => (
                <li key={u} className="flex items-start gap-2.5 text-navy-900">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-water-500">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {u}
                </li>
              ))}
            </ul>
          </div>

          {content?.image && (
            <div className="overflow-hidden rounded-3xl lg:h-full">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={800}
                height={800}
                className="h-full min-h-64 w-full object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      <LeadForm dienst={service.name} />

      {/* Highlights */}
      {service.highlights.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-3">
            {service.highlights.map((h) => (
              <div key={h.title} className="rounded-2xl border border-mist-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-navy-900">{h.title}</h2>
                <p className="mt-2 text-pretty text-navy-800/75">{h.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Long-form content, afgewisseld met werkfoto's */}
      {content && content.sections.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <div className="space-y-10">
            {content.sections.map((sec, idx) => {
              // Toon een werkfoto na het 1e en 3e tekstblok.
              const beeld = idx === 0 ? beeldNa(0) : idx === 2 ? beeldNa(3) : null;
              return (
                <Fragment key={sec.heading}>
                  <div>
                    <h2 className="text-2xl font-bold text-navy-900">{sec.heading}</h2>
                    {sec.paragraphs.map((p, i) => (
                      <p key={i} className="mt-3 text-pretty leading-relaxed text-navy-800/85">
                        {p}
                      </p>
                    ))}
                  </div>
                  {beeld && (
                    <div className="overflow-hidden rounded-3xl">
                      <Image
                        src={beeld.src}
                        alt={beeld.alt}
                        width={1000}
                        height={600}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}

            {/* Werkgebied, interne links voor lokale SEO */}
            <div className="rounded-2xl border border-mist-200 bg-mist-50 p-6">
              <h2 className="text-xl font-bold text-navy-900">
                {service.name} in Apeldoorn en omgeving
              </h2>
              <p className="mt-2 text-navy-800/80">
                Madern is een Apeldoorns bedrijf en werkt in de hele regio. Bekijk uw plaats:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {plaatsen.map((p) => (
                  <Link
                    key={p.slug}
                    href={plaatsHref(p)}
                    className="rounded-full border border-mist-200 bg-white px-3.5 py-1.5 text-sm font-medium text-navy-800 hover:border-water-300 hover:text-water-700"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <div className="py-12">
          <Faq faqs={service.faqs} />
        </div>
      )}

      {/* Gerelateerde diensten */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h2 className="text-xl font-bold text-navy-900">Andere diensten</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((s) => (
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
      )}

      <div className="py-12">
        <CtaBand />
      </div>
    </>
  );
}
