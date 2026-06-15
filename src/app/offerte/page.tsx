import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { OfferteForm } from "@/components/sections/OfferteForm";

export const metadata: Metadata = generatePageMetadata({
  title: "Gratis offerte aanvragen | Madern Glazenwassers Apeldoorn",
  description:
    "Vraag vandaag nog een gratis en vrijblijvende offerte aan bij Madern Glazenwassers in Apeldoorn. We reageren zo spoedig mogelijk.",
  path: "/offerte",
});

export default function OffertePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Offerte aanvragen", path: "/offerte" }]} />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Vraag uw gratis offerte aan
          </h1>
          <p className="mt-4 text-pretty text-lg text-navy-800/80">
            Vertel ons over uw situatie en u ontvangt zo spoedig mogelijk een
            vrijblijvende offerte op maat. Liever even bellen? Dat kan natuurlijk
            ook.
          </p>

          <div className="mt-8 space-y-4">
            <a href={siteConfig.phone.href} className="flex items-center gap-3 text-navy-900 hover:text-water-600">
              <Dot /> <span className="font-semibold">{siteConfig.phone.display}</span>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-navy-900 hover:text-water-600">
              <Dot /> {siteConfig.email}
            </a>
            <p className="flex items-center gap-3 text-navy-800/70">
              <Dot /> {siteConfig.openingHoursHuman}
            </p>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-navy-800/80">
            {["Gratis en vrijblijvend", "Reactie zo snel mogelijk", "Eerlijke prijs vooraf"].map((u) => (
              <li key={u} className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-water-500">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {u}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-mist-200 bg-white p-6 shadow-sm sm:p-8">
          <OfferteForm />
        </div>
      </section>
    </>
  );
}

function Dot() {
  return <span className="h-2 w-2 shrink-0 rounded-full bg-water-500" aria-hidden />;
}
