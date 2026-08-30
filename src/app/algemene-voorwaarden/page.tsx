import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = generatePageMetadata({
  title: "Algemene voorwaarden | Madern Glazenwassers Apeldoorn",
  description:
    "De algemene voorwaarden die Madern Glazenwassers hanteert: de branchevoorwaarden voor schoonmaakwerkzaamheden van Schoonmakend Nederland, met een aanvullend hoofdstuk over glasbewassing en gevelreiniging.",
  path: "/algemene-voorwaarden",
});

/** Waar het bestand in public/ staat; ook de downloadnaam die de bezoeker krijgt. */
const PDF = "/algemene-voorwaarden-madern-glazenwassers.pdf";

// De artikelindeling van het document zelf. Bewust alleen de kopjes: de tekst
// van de voorwaarden staat in de PDF en hoort daar één bron te hebben, zodat
// een overgetypte versie op deze pagina er nooit van kan afwijken.
const hoofdstukken = [
  {
    titel: "Hoofdstuk A · Algemeen deel",
    intro: "Geldt voor alle schoonmaakdiensten en producten.",
    artikelen: [
      "1. Definities",
      "2. Rangorde",
      "3. Algemene bepalingen",
      "4. Aanbod en aanvaarding, totstandkoming Overeenkomst",
      "5. Uitvoering Overeenkomst en Werkprogramma door Aannemer",
      "6. Naleving en controle Werkprogramma",
      "7. Hulpmiddelen en ondersteuning door Opdrachtgever",
      "8. Onderaanneming",
      "9. Prijs van de Werkzaamheden",
      "10. Betalingsvoorwaarden",
      "11. Eigendomsvoorbehoud Producten",
      "12. Aansprakelijkheid en AVB",
      "13. Verbod op overname werknemers",
      "14. Contractswisseling en werkgelegenheid",
      "15. Overnameplicht bij inbesteding",
      "16. Overmacht, opschorting en ontbinding",
      "16a. Overmacht en onvoorziene omstandigheden aan de zijde van Opdrachtgever",
      "17. Verwerking van persoonsgegevens",
      "18. Duur en opzegging van de Overeenkomst",
      "19. Reparatieclausule nietigheden",
      "20. Toepasselijk recht en geschillen",
    ],
  },
  {
    titel: "Hoofdstuk B · Aanvullende voorwaarden",
    intro: "Specifiek voor glasbewassing, gevelreiniging en vloerenonderhoud.",
    artikelen: [
      "21. Aanvullende betalingsvoorwaarden glasbewassing",
      "22. Aanvullende bepalingen Hulpmiddelen en ondersteuning Opdrachtgever",
      "23. Aanvullende bepalingen uitvoering Overeenkomst",
      "24. Aanvullende aansprakelijkheidsvoorwaarden",
    ],
  },
];

export default function AlgemeneVoorwaardenPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Algemene voorwaarden", path: "/algemene-voorwaarden" }]}
      />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Algemene voorwaarden
        </h1>
        <p className="mt-3 text-sm text-navy-800/70">Versie december 2020</p>

        <div className="mt-8 space-y-8 text-pretty leading-relaxed text-navy-800/85">
          <p>
            Op alle aanbiedingen, offertes en werkzaamheden van{" "}
            {siteConfig.legalName}
            {siteConfig.kvk ? ` (KvK ${siteConfig.kvk})` : ""} zijn de{" "}
            <b>Algemene Voorwaarden voor Schoonmaakwerkzaamheden</b> van
            toepassing, vastgesteld door brancheorganisatie Schoonmakend
            Nederland. Het document bestaat uit een algemeen deel en een
            aanvullend hoofdstuk over glasbewassing, gevelreiniging en
            vloerenonderhoud.
          </p>

          {/* De PDF is de bron. Bewust prominent, want de voorwaarden moeten
              vóór of bij het sluiten van de overeenkomst beschikbaar zijn en
              door de klant op te slaan zijn voor later. */}
          <div className="rounded-2xl border border-mist-200 bg-mist-50 p-6">
            <p className="font-semibold text-navy-900">
              De volledige voorwaarden lezen of bewaren
            </p>
            <p className="mt-2 text-sm text-navy-800/75">
              Het volledige document telt negen pagina&rsquo;s. U kunt het hier
              openen, opslaan en uitprinten.
            </p>
            <a
              href={PDF}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-block rounded-xl bg-water-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-water-800"
            >
              Algemene voorwaarden openen (PDF)
            </a>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900">Wat staat erin?</h2>
            <p className="mt-3">
              Hieronder de indeling van het document, zodat u weet wat u waar
              terugvindt.
            </p>

            {hoofdstukken.map((h) => (
              <div key={h.titel} className="mt-6">
                <h3 className="font-bold text-navy-900">{h.titel}</h3>
                <p className="mt-1 text-sm text-navy-800/70">{h.intro}</p>
                <ul className="mt-3 grid gap-1.5 text-sm">
                  {h.artikelen.map((a) => (
                    <li key={a} className="flex gap-2.5">
                      <span aria-hidden className="text-water-600">
                        &middot;
                      </span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900">
              Vragen over de voorwaarden?
            </h2>
            <p className="mt-3">
              Loopt u tegen een bepaling aan die in uw situatie niet werkt, of
              wilt u iets anders afspreken? Neem gerust contact op via{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-water-600 hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              of{" "}
              <a
                href={siteConfig.phone.href}
                className="font-semibold text-water-600 hover:underline"
              >
                {siteConfig.phone.display}
              </a>
              . Afwijkende afspraken leggen we schriftelijk vast en gaan dan
              boven deze voorwaarden.
            </p>
            <p className="mt-3">
              Hoe we met uw gegevens omgaan staat in ons{" "}
              <Link href="/privacy" className="font-semibold text-water-600 hover:underline">
                privacybeleid
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
