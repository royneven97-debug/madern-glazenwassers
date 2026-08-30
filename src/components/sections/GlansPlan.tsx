"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { siteConfig } from "@/lib/site";
import {
  GEEN_OPTIES,
  OPTIES,
  PAKKETTEN,
  PANELEN_MAX,
  PANELEN_MIN,
  PANELEN_STANDAARD,
  RAMEN_MAX,
  RAMEN_MIN,
  RAMEN_STANDAARD,
  TARIEVEN,
  WONINGTYPE_STANDAARD,
  WONINGTYPES,
  berekenPakket,
  berekeningSamenvatting,
  euro,
  optieOmschrijving,
  optiePrijs,
  prijsPerBeurt,
  type Berekening,
  type Invoer,
  type OptieKey,
} from "@/lib/abonnement";

// Het GlansPlan: drie onderhoudsabonnementen (Brons/Zilver/Goud) met een vast
// maandbedrag. Onder de kaarten staat de rekentool; wat de bezoeker daar invult
// rekenen alle drie de kaarten live door. Zilver staat bewust in het midden op
// een verhoogd "podium" met een glansveeg, dat is het pakket dat we willen
// verkopen.

const voordelen = [
  {
    kop: `€${TARIEVEN.uurtariefAbonnement} i.p.v. €${TARIEVEN.uurtariefLos}`,
    uitleg: "per geraamd arbeidsuur",
  },
  { kop: "25% voordeel", uitleg: "op de arbeidscomponent" },
  { kop: "12 gelijke bedragen", uitleg: "automatisch per maand" },
];

/**
 * Laat een bedrag naar zijn nieuwe waarde toe tellen in plaats van er hard
 * naartoe te springen. Zonder die beweging ziet niemand dat een vinkje de
 * prijs veranderde. Bij "prefers-reduced-motion" springt hij gewoon.
 */
function useTellend(doel: number): number {
  const [waarde, setWaarde] = useState(doel);
  const vorige = useRef(doel);

  useEffect(() => {
    const van = vorige.current;
    vorige.current = doel;
    if (van === doel) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWaarde(doel);
      return;
    }

    const duur = 420;
    const start = performance.now();
    let frame = requestAnimationFrame(function stap(nu) {
      const t = Math.min(1, (nu - start) / duur);
      const soepel = 1 - Math.pow(1 - t, 3);
      setWaarde(van + (doel - van) * soepel);
      if (t < 1) frame = requestAnimationFrame(stap);
    });

    return () => cancelAnimationFrame(frame);
  }, [doel]);

  return waarde;
}

/** Een bedrag dat naar zijn nieuwe waarde telt en daarbij kort oplicht. */
function Bedrag({ waarde, className }: { waarde: number; className?: string }) {
  const getoond = useTellend(waarde);
  const [puls, setPuls] = useState(false);
  const eersteRender = useRef(true);

  useEffect(() => {
    if (eersteRender.current) {
      eersteRender.current = false;
      return;
    }
    setPuls(true);
    const timer = setTimeout(() => setPuls(false), 700);
    return () => clearTimeout(timer);
  }, [waarde]);

  return (
    <span className={`${puls ? "animate-prijs-puls" : ""} ${className ?? ""}`}>
      {euro(getoond)}
    </span>
  );
}

/** Regels in de kaart: de vaste beloftes plus wat de bezoeker aanvinkte. */
function kaartRegels(b: Berekening, panelen: number): { tekst: string; inbegrepen: boolean }[] {
  const p = b.pakket;
  const regels = [
    { tekst: `${p.beurtenPerJaar}× per jaar buitenramen wassen`, inbegrepen: false },
    ...p.features.map((f) => ({ tekst: f, inbegrepen: false })),
  ];

  if (p.binnenPerJaar > 0) {
    regels.push({
      tekst: `${p.binnenPerJaar}× per jaar binnenramen wassen`,
      inbegrepen: false,
    });
  }

  // Opties die het pakket zelf al bevat, ongeacht de vinkjes.
  for (const key of p.inbegrepen) {
    const optie = OPTIES.find((o) => o.key === key);
    if (optie) {
      regels.push({
        tekst: `${optieOmschrijving(optie, panelen)}, 1× per jaar`,
        inbegrepen: true,
      });
    }
  }

  // Aangevinkt extra werk dat bovenop het pakket komt.
  for (const o of b.extraOpties) {
    regels.push({ tekst: `${optieOmschrijving(o, panelen)}, 1× per jaar`, inbegrepen: false });
  }

  return regels;
}

function PlanCard({
  berekening,
  invoer,
  featured = false,
}: {
  berekening: Berekening;
  invoer: Invoer;
  featured?: boolean;
}) {
  const plan = berekening.pakket;
  const offerteHref = `/offerte?bericht=${encodeURIComponent(
    berekeningSamenvatting(berekening, invoer),
  )}`;

  return (
    <article
      style={{ "--accent": plan.accent } as CSSProperties}
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl bg-white px-6 pb-7 pt-8 ${
        featured ? "" : "shadow-xl shadow-navy-900/10"
      }`}
    >
      {/* Gekleurde streep in de linkermarge, de "kleur" van het pakket */}
      <span className="absolute left-0 bottom-7 top-7 w-[7px] rounded-r-md bg-[var(--accent)]" />

      <h3 className="text-center text-xl font-bold text-navy-900">{plan.naam}</h3>
      <span className="mx-auto mt-2 w-fit rounded-full bg-mist-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-navy-900">
        {plan.tag}
      </span>

      <p
        className={`mt-5 text-center font-extrabold leading-none tracking-tight text-navy-900 ${
          featured ? "text-6xl" : "text-5xl"
        }`}
      >
        <span className="align-middle text-2xl font-bold text-navy-800/50">±&nbsp;</span>
        <Bedrag waarde={berekening.perMaand} />
        <span className="text-lg font-semibold">/mnd</span>
      </p>
      <p className="mt-1 text-center text-xs font-medium text-navy-800/60">
        12 gelijke bedragen · {euro(berekening.jaarTotaal)} per jaar
      </p>

      <hr className="my-5 border-t border-mist-200" />

      <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-800/60">
        Inbegrepen
      </p>
      <ul className="mb-7 flex flex-col gap-3">
        {kaartRegels(berekening, invoer.panelen).map((r) => (
          <li
            key={r.tekst}
            className="flex items-start gap-3 text-sm leading-snug text-navy-800/90"
          >
            <span aria-hidden className="mt-px shrink-0 font-bold text-[var(--accent)]">
              ✓
            </span>
            <span>
              {r.tekst}
              {r.inbegrepen && (
                <span className="ml-1.5 whitespace-nowrap rounded-full bg-water-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-water-700">
                  zit erin
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={offerteHref}
        className={`mt-auto block rounded-xl px-5 py-3.5 text-center text-sm font-semibold text-white transition-colors ${
          featured ? "bg-water-600 hover:bg-water-800" : "bg-navy-900 hover:bg-navy-800"
        }`}
      >
        {plan.naam} aanvragen
      </Link>
    </article>
  );
}

/** Het rekenpaneel: aantal ramen en extra werk sturen alle drie de kaarten aan. */
function Rekentool({
  invoer,
  setInvoer,
}: {
  invoer: Invoer;
  setInvoer: (i: Invoer) => void;
}) {
  const { woningtype, ramen, panelen, keuze } = invoer;
  const setRamen = (n: number) => setInvoer({ ...invoer, ramen: n });
  const kiesWoning = (label: string, n: number) =>
    setInvoer({ ...invoer, woningtype: label, ramen: n });
  const setPanelen = (n: number) => setInvoer({ ...invoer, panelen: n });
  const toggle = (key: OptieKey) =>
    setInvoer({ ...invoer, keuze: { ...keuze, [key]: !keuze[key] } });

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-mist-200 bg-white p-6 shadow-xl shadow-navy-900/10 sm:p-8">
      <h3 className="text-center text-lg font-bold text-navy-900">Wat kost het bij u?</h3>
      <p className="mx-auto mt-1.5 max-w-md text-center text-sm text-navy-800/70">
        Vul uw situatie in, dan rekenen de drie pakketten hierboven direct mee.
      </p>

      {/* Woningtype als startpunt, zodat niemand eerst hoeft te tellen */}
      <fieldset className="mt-7">
        <legend className="text-sm font-semibold text-navy-900">
          Wat voor woning heeft u?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {WONINGTYPES.map((w) => {
            // Aan de keuze zelf gekoppeld, niet aan het aantal ramen: wie daarna
            // aan de schuifknop draait, houdt zijn woningtype geselecteerd.
            const actief = woningtype === w.label;
            return (
              <button
                key={w.label}
                type="button"
                onClick={() => kiesWoning(w.label, w.ramen)}
                aria-pressed={actief}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  actief
                    ? "border-water-600 bg-water-600 text-white"
                    : "border-mist-200 bg-white text-navy-800 hover:border-water-300 hover:text-water-700"
                }`}
              >
                {w.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Aantal ramen */}
      <div className="mt-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <label htmlFor="aantal-ramen" className="text-sm font-semibold text-navy-900">
            Aantal ramen
          </label>
          <span className="text-sm font-medium text-navy-800/70">
            <b className="text-base font-bold text-navy-900">{ramen}</b> ramen ·{" "}
            {euro(prijsPerBeurt(ramen))} per wasbeurt
          </span>
        </div>
        <input
          id="aantal-ramen"
          type="range"
          min={RAMEN_MIN}
          max={RAMEN_MAX}
          step={1}
          value={ramen}
          onChange={(e) => setRamen(Number(e.target.value))}
          className="mt-3 w-full accent-water-600"
        />
        <p className="mt-2 text-xs text-navy-800/60">
          Tel elk raam apart, ook de kleine. Een schuifpui telt als twee ramen. Weet
          u het niet precies? Een ruwe schatting is genoeg.
        </p>
      </div>

      {/* Tweede schuifknop, alleen zichtbaar als de panelen zijn aangevinkt.
          Zelfde opbouw als hierboven, zodat beide balken even lang zijn. */}
      {keuze.zonnepanelen && (
        <div className="mt-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="aantal-panelen" className="text-sm font-semibold text-navy-900">
              Aantal zonnepanelen
            </label>
            <span className="text-sm font-medium text-navy-800/70">
              <b className="text-base font-bold text-navy-900">{panelen}</b> panelen ·{" "}
              {euro(panelen * TARIEVEN.prijsPerZonnepaneel)} per keer
            </span>
          </div>
          <input
            id="aantal-panelen"
            type="range"
            min={PANELEN_MIN}
            max={PANELEN_MAX}
            step={1}
            value={panelen}
            onChange={(e) => setPanelen(Number(e.target.value))}
            className="mt-3 w-full accent-water-600"
          />
          <p className="mt-2 text-xs text-navy-800/60">
            We reinigen de panelen alleen tijdens een reguliere wasbeurt.
          </p>
        </div>
      )}

      {/* Extra werk */}
      <fieldset className="mt-7">
        <legend className="text-sm font-semibold text-navy-900">
          Extra werk, 1× per jaar
        </legend>
        <div className="mt-3 grid gap-2">
          {OPTIES.map((o) => (
            <label
              key={o.key}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                keuze[o.key]
                  ? "border-water-300 bg-water-50 text-navy-900"
                  : "border-mist-200 bg-white text-navy-800 hover:border-water-300"
              }`}
            >
              <input
                type="checkbox"
                checked={keuze[o.key]}
                onChange={() => toggle(o.key)}
                className="h-4 w-4 shrink-0 accent-water-600"
              />
              <span className="flex-1">{o.label}</span>
              <span className="shrink-0 text-xs font-semibold text-navy-800/60">
                +{euro(optiePrijs(o, panelen))}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

/**
 * Meelopende prijsbalk. Verschijnt zodra de rekentool in beeld komt, want dan
 * staan de kaarten erboven buiten beeld en zou je de prijs niet zien bewegen.
 */
function PrijsBalk({
  berekeningen,
  invoer,
  zichtbaar,
}: {
  berekeningen: Berekening[];
  invoer: Invoer;
  zichtbaar: boolean;
}) {
  return (
    <div
      aria-hidden={!zichtbaar}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        zichtbaar ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-t border-white/10 bg-navy-900/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-3">
          {/* De drie kaarten zijn even breed en staan als groep gecentreerd, zodat
              Zilver precies in het midden van het scherm valt. Het label hangt er
              absoluut naast en verschuift die centrering dus niet. */}
          <div className="relative flex w-full max-w-md items-stretch justify-center gap-2 sm:max-w-lg sm:gap-3">
            <p className="absolute right-full top-1/2 hidden -translate-y-1/2 whitespace-nowrap pr-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55 lg:block">
              Uw indicatie
            </p>
            {berekeningen.map((b) => {
              const uitgelicht = b.pakket.id === "zilver";
              return (
                <Link
                  key={b.pakket.id}
                  href={`/offerte?bericht=${encodeURIComponent(
                    berekeningSamenvatting(b, invoer),
                  )}`}
                  tabIndex={zichtbaar ? undefined : -1}
                  className={`flex flex-1 basis-0 flex-col items-center rounded-xl px-2 py-1.5 transition-colors sm:px-3 ${
                    uitgelicht
                      ? "bg-water-600 hover:bg-water-500"
                      : "hover:bg-white/10"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
                    {b.pakket.naam}
                  </span>
                  <span
                    style={{ "--puls-kleur": "rgba(255,255,255,0.32)" } as CSSProperties}
                    className="text-base font-extrabold leading-tight text-white sm:text-lg"
                  >
                    ±&nbsp;
                    <Bedrag waarde={b.perMaand} />
                    <span className="text-[11px] font-semibold text-white/70">/mnd</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GlansPlan() {
  const [invoer, setInvoer] = useState<Invoer>({
    woningtype: WONINGTYPE_STANDAARD,
    ramen: RAMEN_STANDAARD,
    panelen: PANELEN_STANDAARD,
    keuze: GEEN_OPTIES,
  });

  const berekeningen = useMemo(
    () => PAKKETTEN.map((p) => berekenPakket(p, invoer)),
    [invoer],
  );
  const [brons, zilver, goud] = berekeningen;

  // De balk hoort pas te verschijnen als de kop "Wat kost het bij u?" bovenaan
  // in beeld staat, en weer weg te zakken zodra de rekentool voorbij is. Als
  // ijkpunt kijken we of de rekentool een dunne lijn vlak onder de plakkende
  // header kruist: dat is precies de periode dat iemand met de tool bezig is.
  const toolRef = useRef<HTMLDivElement>(null);
  const [balkZichtbaar, setBalkZichtbaar] = useState(false);

  useEffect(() => {
    const doel = toolRef.current;
    if (!doel) return;

    let observer: IntersectionObserver | undefined;

    // De header groeit mee met het scherm, dus meten we hem in plaats van een
    // vaste hoogte aan te nemen.
    const koppel = () => {
      observer?.disconnect();
      const headerHoogte = document.querySelector("header")?.offsetHeight ?? 88;
      const onder = Math.max(0, window.innerHeight - headerHoogte - 1);
      observer = new IntersectionObserver(
        ([entry]) => setBalkZichtbaar(entry.isIntersecting),
        { rootMargin: `-${headerHoogte}px 0px -${onder}px 0px` },
      );
      observer.observe(doel);
    };

    koppel();
    window.addEventListener("resize", koppel);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", koppel);
    };
  }, []);

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
          Vaste onderhoudsmomenten per jaar, één voorspelbaar maandbedrag. Vul
          onderaan uw situatie in, dan rekenen de pakketten mee.
        </p>

        <div className="mx-auto mt-11 grid max-w-md items-center gap-6 lg:max-w-none lg:grid-cols-3">
          <PlanCard berekening={brons} invoer={invoer} />

          {/* Zilver op een podium: blauwe lijst met een glansveeg eroverheen */}
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-water-500 via-water-600 to-water-800 p-3.5 shadow-2xl shadow-navy-900/40">
            <span aria-hidden className="animate-glans pointer-events-none absolute -bottom-1/4 -top-1/4 left-0 z-20 w-[42%] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <p className="mb-3 mt-0.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              Meest gekozen
            </p>
            <PlanCard berekening={zilver} invoer={invoer} featured />
          </div>

          <PlanCard berekening={goud} invoer={invoer} />
        </div>

        <div ref={toolRef}>
          <Rekentool invoer={invoer} setInvoer={setInvoer} />
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
          Deze bedragen zijn een indicatie op basis van uw invoer. De exacte prijs
          bepalen we na een woningscan; de afgesproken werkzaamheden staan in uw
          persoonlijke offerte en overeenkomst.
          <br />
          <a href={siteConfig.phone.href} className="font-semibold text-water-600 hover:underline">
            {siteConfig.phone.display}
          </a>
        </p>
      </div>

      <PrijsBalk berekeningen={berekeningen} invoer={invoer} zichtbaar={balkZichtbaar} />
    </section>
  );
}
