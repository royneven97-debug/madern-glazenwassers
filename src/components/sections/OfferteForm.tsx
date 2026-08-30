"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { submitLead } from "@/lib/lead";

const services = [
  "Glazenwassen woning",
  "Glazenwassen bedrijf/kantoor",
  "Etalage / winkelruiten",
  "Zonnepanelen reinigen",
  "Anders / weet ik nog niet",
];

export function OfferteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  // De rekentool van het GlansPlan stuurt de berekening mee in de URL, zodat de
  // aanvraag binnenkomt met het aantal ramen, het pakket en het extra werk erbij.
  const berekening = useSearchParams().get("bericht") ?? "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.company_website) return; // honeypot
    setStatus("sending");
    const result = await submitLead({
      naam: data.naam,
      telefoon: data.telefoon,
      email: data.email,
      adres: data.adres,
      plaats: data.plaats,
      dienst: data.dienst,
      bericht: data.bericht,
    });
    if (result === "email") {
      setStatus("success");
      form.reset();
    } else {
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-water-200 bg-water-50 p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-water-500 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-navy-900">Offerteaanvraag verzonden!</h2>
        <p className="mt-2 text-navy-800/80">
          Bedankt voor uw aanvraag. We nemen zo spoedig mogelijk contact met u op.
        </p>
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-mist-200 bg-white px-4 py-2.5 text-navy-900 outline-none focus:border-water-400 focus:ring-2 focus:ring-water-200";
  const label = "block text-sm font-medium text-navy-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* honeypot tegen spam */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="naam">Naam *</label>
          <input id="naam" name="naam" required className={field} placeholder="Uw naam" />
        </div>
        <div>
          <label className={label} htmlFor="telefoon">Telefoonnummer *</label>
          <input id="telefoon" name="telefoon" required type="tel" className={field} placeholder="06 ..." />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="email">E-mailadres</label>
        <input id="email" name="email" type="email" className={field} placeholder="uw@email.nl" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="adres">Adres</label>
          <input id="adres" name="adres" className={field} placeholder="Straatnaam 12" autoComplete="street-address" />
        </div>
        <div>
          <label className={label} htmlFor="plaats">Plaats *</label>
          <input id="plaats" name="plaats" required className={field} placeholder="Apeldoorn" defaultValue="Apeldoorn" />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="dienst">Welke dienst?</label>
        <select id="dienst" name="dienst" className={field} defaultValue={services[0]}>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="bericht">Vertel ons meer over uw situatie</label>
        <textarea
          id="bericht"
          name="bericht"
          rows={berekening ? 8 : 4}
          className={field}
          defaultValue={berekening}
          placeholder="Aantal ramen, type woning/pand, bijzonderheden, gewenste frequentie, etc."
        />
        {berekening && (
          <p className="mt-1.5 text-xs text-water-700">
            Uw berekening staat er al bij. Aanpassen of aanvullen mag natuurlijk.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-water-500 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-water-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Versturen…" : "Verstuur offerteaanvraag"}
      </button>

      <p className="text-xs text-navy-800/70">
        Door dit formulier te versturen gaat u akkoord met ons{" "}
        <Link href="/privacy" className="underline hover:text-navy-900">privacybeleid</Link>. We
        gebruiken uw gegevens alleen om op uw aanvraag te reageren. Op onze
        werkzaamheden zijn onze{" "}
        <Link href="/algemene-voorwaarden" className="underline hover:text-navy-900">
          algemene voorwaarden
        </Link>{" "}
        van toepassing.
      </p>
    </form>
  );
}
