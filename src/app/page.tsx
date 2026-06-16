import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { availableServices } from "@/lib/services";
import { plaatsen, primaryPlaats, plaatsHref } from "@/lib/plaatsen";
import { generatePageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { UspStrip } from "@/components/sections/UspStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { HeroForm } from "@/components/sections/HeroForm";

export const metadata: Metadata = generatePageMetadata({
  title: "Glazenwasser Apeldoorn | Madern Glazenwassers",
  description: siteConfig.shortDescription,
  path: "/",
});

const homeFaqs = [
  {
    q: "Wat kost een glazenwasser in Apeldoorn?",
    a: "Dat hangt af van het aantal ramen, het type woning of pand en de frequentie. We geven u vooraf altijd een gratis, vrijblijvende offerte met een eerlijke prijs. Bekijk onze tarieven-pagina voor een indicatie.",
  },
  {
    q: "Werken jullie voor particulieren én bedrijven?",
    a: "Ja. Madern verzorgt glasbewassing voor woningen, kantoren, bedrijfspanden en winkels in Apeldoorn en omgeving — eenmalig of met een vast schema.",
  },
  {
    q: "Wat is osmosewater en waarom gebruiken jullie het?",
    a: "Osmosewater is volledig gezuiverd water zonder kalk en mineralen. Het droogt streepvrij op en houdt uw ramen langer schoon, helemaal zonder chemicaliën.",
  },
  {
    q: "In welke plaatsen zijn jullie actief?",
    a: `Onze thuisbasis is Apeldoorn. Daarnaast werken we onder meer in ${plaatsen
      .filter((p) => !p.primary)
      .map((p) => p.name)
      .join(", ")}.`,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero relative overflow-hidden">
        <div className="bg-glass-grid absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Glazenwasser <span className="text-accent-400">Apeldoorn</span>
            </h1>
            <p className="mt-4 text-pretty text-xl font-semibold text-water-100">
              Stralend schone ramen, streepvrij met osmosewater.
            </p>
            <p className="mt-4 max-w-xl text-pretty text-lg text-mist-100/85">
              Madern Glazenwassers maakt uw ramen aan binnen- én buitenkant
              streepvrij schoon — voor woningen, kantoren en winkels. Een
              Apeldoorns bedrijf, door Apeldoorners.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.phone.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-navy-900 transition-colors hover:bg-water-50"
              >
                <PhoneIcon /> Bel {siteConfig.phone.display}
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#1faa55]"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist-100/80">
              <li className="flex items-center gap-2"><Check /> Binnen &amp; buiten</li>
              <li className="flex items-center gap-2"><Check /> Ook in het weekend</li>
              <li className="flex items-center gap-2"><Check /> Particulier &amp; zakelijk</li>
            </ul>
          </div>

          <div className="lg:pl-2">
            <HeroForm />
          </div>
        </div>
      </section>

      <div className="pt-14 sm:pt-16">
        <UspStrip />
      </div>

      {/* Diensten */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy-900">Onze diensten</h2>
          <p className="mt-3 text-pretty text-navy-800/75">
            Van uw woonkamerramen tot een compleet bedrijfspand — Madern levert
            vakwerk met een persoonlijke aanpak.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {availableServices.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group rounded-2xl border border-mist-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy-900/5"
            >
              <h3 className="text-xl font-semibold text-navy-900 group-hover:text-water-600">
                {s.name}
              </h3>
              <p className="mt-2 text-pretty text-navy-800/75">{s.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-water-600">
                Meer over deze dienst
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature — lokale glazenwasser */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/images/glazenwasser-ramen-wassen-apeldoorn.jpg"
              alt="Glazenwasser van Madern wast ramen streepvrij schoon in Apeldoorn"
              width={900}
              height={650}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Uw glazenwasser in Apeldoorn</h2>
            <p className="mt-4 text-pretty leading-relaxed text-navy-800/85">
              Madern Glazenwassers is een jong, lokaal bedrijf, opgericht door een
              geboren en getogen Apeldoorner. We kennen de stad, de wijken en het
              weer aan de rand van de Veluwe — en weten dus precies wat uw ramen
              nodig hebben om het hele jaar door helder te blijven.
            </p>
            <p className="mt-3 text-pretty leading-relaxed text-navy-800/85">
              Of het nu gaat om de ramen van uw woning, de etalage van uw winkel of
              de complete glasbewassing van een bedrijfspand: u krijgt bij ons een
              vast aanspreekpunt, eerlijke prijzen en vakwerk met een persoonlijke
              aanpak. Afspraak is afspraak — en we komen, als het u beter uitkomt,
              ook in het weekend langs.
            </p>
            <p className="mt-3 text-pretty leading-relaxed text-navy-800/85">
              Omdat we met gezuiverd osmosewater werken, blijft uw glas langer
              streepvrij schoon, helemaal zonder agressieve chemicaliën. Beter voor
              uw ramen én voor het milieu.
            </p>
            <div className="mt-6">
              <Button href="/over-ons" variant="secondary">Lees ons verhaal</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Osmosewater / waarom */}
      <section className="bg-mist-50 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Kwaliteit die u kunt zien</h2>
            <p className="mt-4 text-pretty text-navy-800/80">
              Wij werken met gezuiverd osmosewater voor een streepvrij en
              langdurig schoon resultaat zonder chemicaliën. Het water trekt vuil
              en kalk aan en droogt vlekkeloos op — beter voor uw ramen, uw
              kozijnen én het milieu.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Geen strepen, kalkranden of vegen",
                "Ramen blijven langer helder",
                "Veilig voor kozijnen, coatings en zonnepanelen",
                "Zonder agressieve schoonmaakmiddelen",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-900">
                  <span className="mt-0.5 text-water-500"><Check /></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/over-ons" variant="secondary">Maak kennis met Madern</Button>
            </div>
          </div>
          <div className="rounded-3xl border border-mist-200 bg-white p-8">
            <p className="text-lg font-medium leading-relaxed text-navy-900">
              &ldquo;Ik geloof in persoonlijk contact, betrouwbaarheid en eerlijke
              prijzen. Met Madern breng ik professionele service naar
              particulieren en bedrijven in de regio Apeldoorn.&rdquo;
            </p>
            <p className="mt-5 font-semibold text-navy-900">{siteConfig.founder}</p>
            <p className="text-sm text-navy-800/70">Oprichter Madern Glazenwassers</p>
          </div>
        </div>
      </section>

      {/* Werkgebied */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy-900">Werkgebied rondom Apeldoorn</h2>
          <p className="mt-3 text-navy-800/75">
            {primaryPlaats.name} is onze thuisbasis. We werken in de hele regio:
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {plaatsen.map((p) => (
            <Link
              key={p.slug}
              href={plaatsHref(p)}
              className="rounded-full border border-mist-200 bg-white px-4 py-2 text-sm font-medium text-navy-800 hover:border-water-300 hover:text-water-700"
            >
              Glazenwasser {p.name}
            </Link>
          ))}
        </div>
      </section>

      <Faq faqs={homeFaqs} />

      <div className="py-16">
        <CtaBand />
      </div>
    </>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-water-400">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5-.17-.01-.37-.01-.56-.01s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.78 9.78 0 0 1-1.5-5.23c0-5.41 4.41-9.81 9.83-9.81 2.62 0 5.09 1.02 6.94 2.88a9.74 9.74 0 0 1 2.88 6.94c0 5.41-4.41 9.81-9.83 9.81Zm8.36-18.17A11.76 11.76 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.88c0 2.09.55 4.14 1.59 5.94L.06 24l6.33-1.66a11.86 11.86 0 0 0 5.66 1.44h.01c6.55 0 11.89-5.33 11.89-11.88 0-3.18-1.24-6.16-3.49-8.41Z" />
    </svg>
  );
}
