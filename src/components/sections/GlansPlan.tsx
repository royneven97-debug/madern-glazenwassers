import Link from "next/link";
import type { CSSProperties } from "react";
import { siteConfig } from "@/lib/site";

// Het GlansPlan: drie onderhoudsabonnementen (Brons/Zilver/Goud) met een vast
// maandbedrag. Zilver staat bewust in het midden op een verhoogd "podium" met
// een glansveeg, dat is het pakket dat we willen verkopen.

type Plan = {
  name: string;
  tag: string;
  price: string;
  accent: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Brons",
    tag: "Frisse basis",
    price: "30",
    accent: "#b46a1c",
    features: [
      "4× per jaar buitenramen wassen",
      "Kozijnen bij iedere beurt afnemen",
    ],
  },
  {
    name: "Zilver",
    tag: "Extra verzorgd",
    price: "45",
    accent: "#94a3b1",
    features: [
      "6× per jaar buitenramen wassen",
      "Raamomlijsting intensief reinigen",
      "1× per jaar binnenramen wassen",
    ],
  },
  {
    name: "Goud",
    tag: "Grondig compleet",
    price: "65",
    accent: "#e0ac0f",
    features: [
      "6× intensieve glas- en kozijnreiniging",
      "2× binnenzijde grondig reinigen",
      "1× al het afgesproken houtwerk",
    ],
  },
];

const voordelen = [
  { kop: "€45 i.p.v. €55", uitleg: "per geraamd arbeidsuur" },
  { kop: "ca. 18% voordeel", uitleg: "op de arbeidscomponent" },
  { kop: "12 gelijke bedragen", uitleg: "automatisch per maand" },
];

function PlanCard({ plan, featured = false }: { plan: Plan; featured?: boolean }) {
  return (
    <article
      style={{ "--accent": plan.accent } as CSSProperties}
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl bg-white px-6 pb-7 pt-8 ${
        featured ? "" : "shadow-xl shadow-navy-900/10"
      }`}
    >
      {/* Gekleurde streep in de linkermarge, de "kleur" van het pakket */}
      <span className="absolute left-0 bottom-7 top-7 w-[7px] rounded-r-md bg-[var(--accent)]" />

      <h3 className="text-center text-xl font-bold text-navy-900">{plan.name}</h3>
      <span className="mx-auto mt-2 w-fit rounded-full bg-mist-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-navy-900">
        {plan.tag}
      </span>

      <p
        className={`mt-5 text-center font-extrabold leading-none tracking-tight text-navy-900 ${
          featured ? "text-6xl" : "text-5xl"
        }`}
      >
        €{plan.price}
        <span className="text-lg font-semibold">/mnd</span>
      </p>
      <p className="mt-1 text-center text-xs font-medium text-navy-800/60">
        12 gelijke bedragen per jaar
      </p>

      <hr className="my-5 border-t border-mist-200" />

      <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-800/60">
        Inbegrepen
      </p>
      <ul className="mb-7 flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm leading-snug text-navy-800/90">
            <span aria-hidden className="mt-px shrink-0 font-bold text-[var(--accent)]">
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href="/offerte"
        className={`mt-auto block rounded-xl px-5 py-3.5 text-center text-sm font-semibold text-white transition-colors ${
          featured ? "bg-water-600 hover:bg-water-800" : "bg-navy-900 hover:bg-navy-800"
        }`}
      >
        Maandprijs aanvragen
      </Link>
    </article>
  );
}

export function GlansPlan() {
  const [brons, zilver, goud] = plans;

  return (
    <section
      id="glansplan"
      className="relative overflow-hidden border-b border-mist-200 bg-gradient-to-b from-water-50 via-mist-50 to-white py-16 sm:py-20"
    >
      {/* Decoratieve zeepbellen */}
      <span aria-hidden className="pointer-events-none absolute right-[6%] top-8 h-24 w-24 rounded-full bg-water-300/70 sm:h-28 sm:w-28" />
      <span aria-hidden className="pointer-events-none absolute right-[16%] top-40 hidden h-11 w-11 rounded-full bg-water-300/70 sm:block" />
      <span aria-hidden className="pointer-events-none absolute bottom-10 left-[3%] h-20 w-20 rounded-full bg-water-300/55" />
      <span aria-hidden className="pointer-events-none absolute left-[9%] top-32 hidden h-4 w-4 rounded-full bg-water-600/80 sm:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-accent-600">
          Nieuw: het Madern GlansPlan
        </p>
        <h2 className="mt-3 text-balance text-center text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          Altijd helder. Alles geregeld.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-navy-800/75">
          Zes vaste onderhoudsmomenten per jaar, één voorspelbaar maandbedrag.
          Kies het pakket dat bij uw woning past.
        </p>

        <div className="mx-auto mt-11 grid max-w-md items-center gap-6 lg:max-w-none lg:grid-cols-3">
          <PlanCard plan={brons} />

          {/* Zilver op een podium: blauwe lijst met een glansveeg eroverheen */}
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-water-500 via-water-600 to-water-800 p-3.5 shadow-2xl shadow-navy-900/40">
            <span aria-hidden className="animate-glans pointer-events-none absolute -bottom-1/4 -top-1/4 left-0 z-20 w-[42%] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <p className="mb-3 mt-0.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              Meest gekozen
            </p>
            <PlanCard plan={zilver} featured />
          </div>

          <PlanCard plan={goud} />
        </div>

        {/* Waarom een abonnement voordeliger is */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 rounded-2xl border border-mist-200 bg-white px-6 py-5 text-center">
          {voordelen.map((v) => (
            <div key={v.kop}>
              <b className="block font-bold text-navy-900">{v.kop}</b>
              <span className="text-xs font-medium text-navy-800/60">{v.uitleg}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-pretty text-center text-sm text-navy-800/65">
          Prijs op maat na woningscan. De exacte werkzaamheden staan in uw
          persoonlijke offerte en overeenkomst.
          <br />
          <a href={siteConfig.phone.href} className="font-semibold text-water-600 hover:underline">
            {siteConfig.phone.display}
          </a>
        </p>
      </div>
    </section>
  );
}
