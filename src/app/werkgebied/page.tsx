import Link from "next/link";
import type { Metadata } from "next";
import { plaatsen, plaatsHref } from "@/lib/plaatsen";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = generatePageMetadata({
  title: "Werkgebied | Glazenwasser in Apeldoorn en omgeving",
  description:
    "Madern Glazenwassers werkt in Apeldoorn en de omliggende plaatsen op de Veluwe. Bekijk ons werkgebied en vraag een offerte aan voor uw plaats.",
  path: "/werkgebied",
});

export default function WerkgebiedPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Werkgebied", path: "/werkgebied" }]} />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Glazenwasser in Apeldoorn en omgeving
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg text-navy-800/80">
          Apeldoorn is onze thuisbasis. Vanuit hier verzorgen we glasbewassing in
          de hele regio — van de wijken van Apeldoorn tot de omliggende dorpen op
          de Veluwe. Staat uw plaats er niet bij? Bel of mail ons gerust.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plaatsen.map((p) => (
            <Link
              key={p.slug}
              href={plaatsHref(p)}
              className="group rounded-2xl border border-mist-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy-900/5"
            >
              <h2 className="text-xl font-semibold text-navy-900 group-hover:text-water-600">
                Glazenwasser {p.name}
                {p.primary && (
                  <span className="ml-2 rounded-full bg-water-50 px-2 py-0.5 text-xs font-medium text-water-700 align-middle">
                    thuisbasis
                  </span>
                )}
              </h2>
              <p className="mt-2 line-clamp-3 text-pretty text-sm text-navy-800/75">{p.intro}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="py-12">
        <CtaBand />
      </div>
    </>
  );
}
