"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const planningOpties = [
  "Zo snel mogelijk",
  "Binnen 1–2 weken",
  "Deze maand",
  "Maakt niet uit / flexibel",
];

export function HeroForm() {
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
      if (!res.ok) throw new Error("mislukt");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-7 text-center shadow-2xl shadow-navy-950/30">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-500 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-bold text-navy-900">Aanvraag verzonden!</h2>
        <p className="mt-2 text-sm text-navy-800/80">
          Bedankt. We nemen zo snel mogelijk contact met u op.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-mist-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-water-400 focus:ring-2 focus:ring-water-200";

  return (
    <div className="rounded-2xl bg-white p-5 shadow-2xl shadow-navy-950/30 sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-navy-900">Vraag een offerte aan</h2>
        <p className="text-sm text-navy-800/70">Gratis &amp; vrijblijvend — reactie zo snel mogelijk.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* honeypot */}
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        <input name="naam" required className={field} placeholder="Naam *" aria-label="Naam" />
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="email" type="email" className={field} placeholder="E-mailadres" aria-label="E-mailadres" />
          <input name="telefoon" required type="tel" className={field} placeholder="Telefoonnummer *" aria-label="Telefoonnummer" />
        </div>
        <input name="adres" className={field} placeholder="Adres (straat, plaats)" aria-label="Adres" />
        <select name="wanneer" className={field} defaultValue={planningOpties[0]} aria-label="Wanneer wilt u een afspraak inplannen?">
          {planningOpties.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            Er ging iets mis. Probeer opnieuw of bel ons direct.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-gradient-to-b from-accent-400 to-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:to-accent-700 disabled:opacity-60"
        >
          {status === "sending" ? "Verzenden…" : "Verstuur aanvraag"}
        </button>
        <p className="text-center text-[11px] leading-tight text-navy-800/55">
          Door te versturen gaat u akkoord met ons privacybeleid.
        </p>
      </form>
    </div>
  );
}
