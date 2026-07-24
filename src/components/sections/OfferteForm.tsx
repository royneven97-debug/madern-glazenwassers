"use client";

import { useState } from "react";
import { submitLead } from "@/lib/lead";

const services = [
  "Glazenwassen woning",
  "Glazenwassen bedrijf/kantoor",
  "Etalage / winkelruiten",
  "Zonnepanelen reinigen",
  "Anders / weet ik nog niet",
];

export function OfferteForm() {
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as Record<string, string>;
    if (data.company_website) return; // honeypot
    setSending(true);
    submitLead({
      naam: data.naam,
      telefoon: data.telefoon,
      email: data.email,
      plaats: data.plaats,
      dienst: data.dienst,
      bericht: data.bericht,
    });
    window.setTimeout(() => setSending(false), 2500);
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

      <button
        type="submit"
        disabled={sending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-water-500 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-water-600 disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Openen…" : "Verstuur offerteaanvraag"}
      </button>

      <p className="text-xs text-navy-800/60">
        Op mobiel versturen we uw aanvraag via WhatsApp, op desktop via uw
        e-mailprogramma. We gebruiken uw gegevens alleen om op uw aanvraag te reageren.
      </p>
    </form>
  );
}
