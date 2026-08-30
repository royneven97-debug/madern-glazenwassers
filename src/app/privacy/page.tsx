import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacybeleid | Madern Glazenwassers Apeldoorn",
  description:
    "Hoe Madern Glazenwassers omgaat met uw persoonsgegevens: welke gegevens we verzamelen via het contact- en offerteformulier, waarvoor en uw rechten.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const updated = new Date("2026-07-25").toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Breadcrumbs items={[{ name: "Privacybeleid", path: "/privacy" }]} />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Privacybeleid
        </h1>
        <p className="mt-3 text-sm text-navy-800/70">Laatst bijgewerkt: {updated}</p>

        <div className="mt-8 space-y-8 text-pretty leading-relaxed text-navy-800/85">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Wie zijn wij?</h2>
            <p className="mt-3">
              Dit is het privacybeleid van {siteConfig.legalName}
              {siteConfig.kvk ? ` (KvK ${siteConfig.kvk})` : ""}, gevestigd in
              Apeldoorn. Voor vragen over uw privacy kunt u contact met ons
              opnemen via {siteConfig.email} of {siteConfig.phone.display}.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900">Welke gegevens verzamelen we?</h2>
            <p className="mt-3">
              Wanneer u ons contact- of offerteformulier invult, verwerken we de
              gegevens die u zelf achterlaat: uw naam en telefoonnummer, en
              optioneel uw e-mailadres, plaats of adres, de gewenste dienst en uw
              bericht. We verzamelen geen gegevens die u niet zelf aan ons verstrekt.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900">Waarvoor gebruiken we ze?</h2>
            <p className="mt-3">
              We gebruiken uw gegevens uitsluitend om op uw aanvraag te reageren,
              een offerte op te stellen en een afspraak te maken. We gebruiken uw
              gegevens niet voor marketing en verkopen ze niet aan derden.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900">Hoe wordt uw aanvraag verstuurd?</h2>
            <p className="mt-3">
              Afhankelijk van uw apparaat wordt uw aanvraag verstuurd via WhatsApp
              (op mobiel) of per e-mail (op desktop). Voor de e-mailverzending
              maken we gebruik van de dienst Resend als verwerker. Onze website
              wordt gehost bij Vercel. Op de homepage tonen we openbare
              Google-reviews via de dienst Featurable; hierbij worden gegevens van
              Google geladen.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900">Hoe lang bewaren we uw gegevens?</h2>
            <p className="mt-3">
              We bewaren uw aanvraag niet langer dan nodig is om u te helpen en om
              aan onze administratieve verplichtingen te voldoen. Daarna verwijderen
              we uw gegevens.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900">Uw rechten</h2>
            <p className="mt-3">
              U heeft het recht om uw gegevens in te zien, te laten corrigeren of te
              laten verwijderen. Ook kunt u bezwaar maken tegen de verwerking. Stuur
              hiervoor een e-mail naar {siteConfig.email}. Bent u het niet eens met
              hoe wij met uw gegevens omgaan, dan kunt u een klacht indienen bij de
              Autoriteit Persoonsgegevens.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy-900">Cookies</h2>
            <p className="mt-3">
              Onze website gebruikt zelf geen tracking- of advertentiecookies. Voor
              het tonen van Google-reviews kan de ingesloten dienst functionele
              gegevens laden.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
