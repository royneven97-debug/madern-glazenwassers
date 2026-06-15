import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = generatePageMetadata({
  title: "Tarieven glazenwasser Apeldoorn | Wat kost ramen wassen? | Madern",
  description:
    "Wat kost een glazenwasser in Apeldoorn? Bekijk een indicatie van de tarieven voor particulier en zakelijk. U ontvangt altijd vooraf een gratis, vrijblijvende offerte.",
  path: "/tarieven",
});

const faqs = [
  {
    q: "Hoe wordt de prijs bepaald?",
    a: "De prijs hangt af van het aantal ramen, de bereikbaarheid, het type woning of pand en de gekozen frequentie. Bij een vast schema profiteert u doorgaans van een gunstiger tarief per beurt.",
  },
  {
    q: "Zijn er extra kosten?",
    a: "Nee. U ontvangt vooraf een duidelijke offerte met een vaste prijs. Geen verrassingen achteraf.",
  },
  {
    q: "Is een eenmalige beurt ook mogelijk?",
    a: "Ja. Naast vaste abonnementen kunt u ook een eenmalige beurt aanvragen, bijvoorbeeld voor een grote schoonmaak of een speciale gelegenheid.",
  },
];

export default function TarievenPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Tarieven", path: "/tarieven" }]} />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Wat kost een glazenwasser in Apeldoorn?
        </h1>
        <p className="mt-4 text-pretty text-lg text-navy-800/80">
          Elke woning en elk pand is anders, dus de exacte prijs bepalen we op
          maat. Om u een idee te geven, hieronder een indicatie. U ontvangt
          altijd vooraf een gratis, vrijblijvende offerte met een eerlijke,
          vaste prijs.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { t: "Particulier", p: "Op maat", d: "Woning binnen & buiten, eenmalig of met vast schema." },
            { t: "Vast abonnement", p: "Voordeel­tarief", d: "Vaste frequentie (bijv. 4–8× per jaar) tegen een gunstiger prijs per beurt.", featured: true },
            { t: "Zakelijk", p: "Op maat", d: "Kantoren, bedrijfspanden en winkels met onderhoudscontract." },
          ].map((c) => (
            <div
              key={c.t}
              className={`rounded-2xl border p-6 ${
                c.featured
                  ? "border-water-300 bg-water-50 ring-1 ring-water-200"
                  : "border-mist-200 bg-white"
              }`}
            >
              <h2 className="text-lg font-semibold text-navy-900">{c.t}</h2>
              <p className="mt-2 text-2xl font-bold text-water-600">{c.p}</p>
              <p className="mt-2 text-sm text-navy-800/75">{c.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-navy-800/60">
          Ter oriëntatie: voor een rijtjeswoning rekent men landelijk doorgaans
          circa € 30–55 per beurt, voor een vrijstaande woning meer. Uw exacte
          prijs hangt af van uw situatie — vraag vrijblijvend een offerte aan.
        </p>

        <div className="mt-8">
          <Button href="/offerte" size="lg">Vraag uw gratis offerte aan</Button>
        </div>
      </section>

      <div className="py-8">
        <Faq faqs={faqs} />
      </div>

      <div className="py-12">
        <CtaBand />
      </div>
    </>
  );
}
