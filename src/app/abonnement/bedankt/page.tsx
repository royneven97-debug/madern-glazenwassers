import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { generatePageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { PAKKETTEN } from "@/lib/abonnement";
import { haalBetaalstatus, type Betaalstatus } from "@/lib/mollie";

// Landingspagina na een Mollie-betaling. Hier zet je de redirectUrl van de
// eerste betaling naartoe, met het betaal-id erin zodat we de status kunnen
// controleren:
//
//   redirectUrl: `${siteConfig.url}/abonnement/bedankt?id=${payment.id}&pakket=zilver`
//   cancelUrl:   `${siteConfig.url}/abonnement/bedankt?status=geannuleerd`
//
// Mollie stuurt de bezoeker na élke afgeronde poging naar redirectUrl, dus de
// pagina leest de echte status op bij Mollie voordat ze iets belooft. Zonder
// MOLLIE_API_KEY of zonder id valt ze terug op een neutrale bevestiging.
//
// Let op: de redirect is nooit het bewijs dat een abonnement loopt. Dat blijft
// de webhook (webhookUrl) aan de serverkant; die pagina is puur voor de klant.

export const metadata: Metadata = generatePageMetadata({
  title: "Bedankt voor uw aanmelding | Madern Glazenwassers",
  description:
    "Uw aanmelding voor het GlansPlan is ontvangen. Hier leest u wat er nu gebeurt.",
  path: "/abonnement/bedankt",
  index: false,
});

type Zoek = { id?: string; pakket?: string; status?: string };

/** Wat er in de kop en de gekleurde badge komt te staan, per uitkomst. */
const KOPPEN: Record<Betaalstatus, { titel: string; intro: string }> = {
  gelukt: {
    titel: "Bedankt, uw machtiging is geregeld",
    intro:
      "We hebben uw toestemming voor automatische incasso ontvangen. Uw GlansPlan staat klaar.",
  },
  bezig: {
    titel: "We wachten nog op uw bank",
    intro:
      "Uw betaling is in behandeling. Zodra uw bank de machtiging bevestigt, is uw GlansPlan actief.",
  },
  mislukt: {
    titel: "De machtiging is niet afgerond",
    intro:
      "Uw aanmelding is niet voltooid en er is niets van uw rekening afgeschreven. U kunt het gewoon opnieuw proberen.",
  },
  onbekend: {
    titel: "Bedankt voor uw aanmelding",
    intro:
      "We hebben uw aanmelding voor het GlansPlan ontvangen. U krijgt de bevestiging per e-mail.",
  },
};

function Stap({ nummer, titel, children }: { nummer: number; titel: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-water-100 text-sm font-bold text-water-700">
        {nummer}
      </span>
      <div>
        <p className="font-semibold text-navy-900">{titel}</p>
        <p className="mt-1 text-navy-800/80">{children}</p>
      </div>
    </li>
  );
}

export default async function AbonnementBedanktPage({
  searchParams,
}: {
  searchParams: Promise<Zoek>;
}) {
  const { id, pakket, status: meegegeven } = await searchParams;

  // Een afgebroken betaling landt via cancelUrl hier, zonder betaal-id.
  const status: Betaalstatus =
    meegegeven === "geannuleerd" ? "mislukt" : await haalBetaalstatus(id);

  const kop = KOPPEN[status];
  const gekozen = PAKKETTEN.find((p) => p.id === pakket?.toLowerCase());
  const gelukt = status === "gelukt";

  return (
    <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <div
        className={`flex size-14 items-center justify-center rounded-full ${
          status === "mislukt" ? "bg-accent-100 text-accent-700" : "bg-water-100 text-water-700"
        }`}
        aria-hidden="true"
      >
        {status === "mislukt" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-7">
            <path d="M12 8v5" strokeLinecap="round" />
            <path d="M12 16.5h.01" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-7">
            <path d="m5 13 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <h1 className="mt-6 text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
        {kop.titel}
      </h1>
      <p className="mt-4 text-pretty text-lg leading-relaxed text-navy-800/85">{kop.intro}</p>

      {gekozen && status !== "mislukt" && (
        <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-mist-100 px-4 py-2 text-sm font-semibold text-navy-900">
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: gekozen.accent }}
            aria-hidden="true"
          />
          GlansPlan {gekozen.naam} · {gekozen.beurtenPerJaar}× per jaar
        </p>
      )}

      {status === "mislukt" ? (
        <>
          <div className="mt-8 rounded-card border border-mist-200 bg-mist-50 p-6 text-navy-800/85">
            <p>
              Meestal gaat het om een afgebroken betaling of een bank die de
              machtiging weigerde. Probeer het opnieuw, of bel ons even, dan
              regelen we het samen.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#glansplan" size="lg">
              Opnieuw proberen
            </Button>
            <Button href={siteConfig.phone.href} variant="secondary" size="lg">
              Bel {siteConfig.phone.display}
            </Button>
          </div>
        </>
      ) : (
        <>
          <ol className="mt-10 space-y-6 leading-relaxed">
            <Stap nummer={1} titel="U krijgt een bevestiging per e-mail">
              Daarin staat welk pakket u heeft gekozen, wat u per maand betaalt
              en wanneer de eerste incasso volgt.
            </Stap>
            <Stap nummer={2} titel="We plannen uw eerste beurt in">
              We nemen binnen twee werkdagen contact met u op om een moment af te
              spreken dat u schikt.
            </Stap>
            <Stap nummer={3} titel="Daarna loopt het automatisch">
              {gelukt
                ? "Het maandbedrag wordt elke maand automatisch van uw rekening geïncasseerd, met “Madern Glazenwassers” als omschrijving. U hoeft verder niets te doen."
                : "Zodra de machtiging is bevestigd, wordt het maandbedrag elke maand automatisch van uw rekening geïncasseerd. U hoeft verder niets te doen."}
            </Stap>
          </ol>

          <div className="mt-10 rounded-card border border-mist-200 bg-mist-50 p-6 text-navy-800/85">
            <h2 className="font-bold text-navy-900">Wijzigen of stoppen?</h2>
            <p className="mt-2">
              U kunt uw abonnement altijd aanpassen of opzeggen. Stuur een mail
              naar{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-water-600 hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              of bel{" "}
              <a
                href={siteConfig.phone.href}
                className="font-semibold text-water-600 hover:underline"
              >
                {siteConfig.phone.display}
              </a>
              . Een incasso kunt u bovendien altijd binnen acht weken bij uw eigen
              bank laten terugboeken.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" size="lg">
              Naar de homepage
            </Button>
            <Button href="/diensten" variant="ghost" size="lg">
              Bekijk onze diensten
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
