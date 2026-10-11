import Link from "next/link";
import type { Metadata } from "next";
import { plaatsen, plaatsHref, regios, regioOf } from "@/lib/plaatsen";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";
import { LeadForm } from "@/components/sections/LeadForm";

export const metadata: Metadata = generatePageMetadata({
  title: "Werkgebied | Glazenwasser in Apeldoorn, Amersfoort en omgeving",
  description:
    "Madern Glazenwassers werkt in Apeldoorn, Amersfoort en de plaatsen eromheen, van de Veluwe tot de Gelderse Vallei. Bekijk ons werkgebied en vraag een offerte aan.",
  path: "/werkgebied",
});

export default function WerkgebiedPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Werkgebied", path: "/werkgebied" }]} />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Werkgebied
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg text-navy-800/80">
          Apeldoorn is onze thuisbasis. Vanuit hier verzorgen we glasbewassing
          in de wijken van Apeldoorn en de dorpen op de Veluwe, en via de A1 ook
          in Amersfoort en omgeving. Staat uw plaats er niet bij? Bel of mail
          ons gerust.
        </p>

        {regios.map((r) => (
          <div key={r.key} className="mt-12">
            <h2 className="text-2xl font-bold text-navy-900">{r.name}</h2>
            <p className="mt-2 max-w-2xl text-pretty text-navy-800/75">
              {r.intro}
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {plaatsen
                .filter((p) => regioOf(p) === r.key)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={plaatsHref(p)}
                    className="group rounded-2xl border border-mist-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy-900/5"
                  >
                    <h3 className="text-xl font-semibold text-navy-900 group-hover:text-water-600">
                      Glazenwasser {p.name}
                      {p.primary && (
                        <span className="ml-2 rounded-full bg-water-50 px-2 py-0.5 text-xs font-medium text-water-700 align-middle">
                          thuisbasis
                        </span>
                      )}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-pretty text-sm text-navy-800/75">
                      {p.intro}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>

      <LeadForm />

      <div className="py-12">
        <CtaBand />
      </div>
    </>
  );
}
