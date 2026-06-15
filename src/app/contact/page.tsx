import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact | Madern Glazenwassers Apeldoorn",
  description:
    "Neem contact op met Madern Glazenwassers in Apeldoorn. Bel, mail of vraag direct een gratis offerte aan voor stralend schone ramen.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Contact
        </h1>
        <p className="mt-4 text-pretty text-lg text-navy-800/80">
          Vragen of direct een afspraak maken? We staan u graag te woord. Madern
          Glazenwassers is een Apeldoorns bedrijf en werkt in Apeldoorn en
          omgeving.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a href={siteConfig.phone.href} className="rounded-2xl border border-mist-200 bg-white p-6 hover:border-water-300">
            <p className="text-sm font-medium text-water-600">Bellen</p>
            <p className="mt-1 text-lg font-semibold text-navy-900">{siteConfig.phone.display}</p>
          </a>
          <a href={`mailto:${siteConfig.email}`} className="rounded-2xl border border-mist-200 bg-white p-6 hover:border-water-300">
            <p className="text-sm font-medium text-water-600">E-mailen</p>
            <p className="mt-1 text-lg font-semibold text-navy-900 break-all">{siteConfig.email}</p>
          </a>
          <a href={siteConfig.whatsapp} className="rounded-2xl border border-mist-200 bg-white p-6 hover:border-water-300">
            <p className="text-sm font-medium text-water-600">WhatsApp</p>
            <p className="mt-1 text-lg font-semibold text-navy-900">Stuur een bericht</p>
          </a>
          <div className="rounded-2xl border border-mist-200 bg-white p-6">
            <p className="text-sm font-medium text-water-600">Openingstijden</p>
            <p className="mt-1 font-semibold text-navy-900">{siteConfig.openingHoursHuman}</p>
            <p className="mt-1 text-sm text-navy-800/70">Werkgebied: Apeldoorn e.o.</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-mist-50 p-7 text-center">
          <h2 className="text-xl font-bold text-navy-900">Liever direct een offerte?</h2>
          <p className="mt-2 text-navy-800/75">Vul het formulier in en we reageren zo snel mogelijk.</p>
          <div className="mt-5">
            <Button href="/offerte" size="lg">Gratis offerte aanvragen</Button>
          </div>
        </div>
      </section>
    </>
  );
}
