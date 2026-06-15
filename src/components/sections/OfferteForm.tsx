"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const services = [
  "Glazenwassen woning",
  "Glazenwassen bedrijf/kantoor",
  "Etalage / winkelruiten",
  "Zonnepanelen reinigen",
  "Anders / weet ik nog niet",
];

export function OfferteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/offerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Verzenden mislukt");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="email">E-mailadres</label>
          <input id="email" name="email" type="email" className={field} placeholder="uw@email.nl" />
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
          rows={4}
          className={field}
          placeholder="Aantal ramen, type woning/pand, bijzonderheden, gewenste frequentie, etc."
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Er ging iets mis bij het verzenden. Probeer het later opnieuw of bel ons direct.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-water-500 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-water-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Verzenden…" : "Verstuur offerteaanvraag"}
      </button>

      <p className="text-xs text-navy-800/60">
        Door dit formulier te versturen gaat u akkoord met ons privacybeleid.
        We gebruiken uw gegevens alleen om op uw aanvraag te reageren.
      </p>
    </form>
  );
}
