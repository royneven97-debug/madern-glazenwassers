"use client";

import { useState } from "react";
import Link from "next/link";
import { submitLead } from "@/lib/lead";

const diensten = [
  "Glazenwassen woning",
  "Glazenwassen bedrijf/kantoor",
  "Etalage / winkelruiten",
  "Zonnepanelen reinigen",
  "Anders / weet ik nog niet",
];

export function HeroForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.company_website) return; // honeypot
    setStatus("sending");
    const result = await submitLead({
      naam: data.naam,
      telefoon: data.telefoon,
      dienst: data.dienst,
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
      <div className="rounded-2xl border border-mist-200 bg-white p-7 text-center shadow-xl shadow-navy-900/10">
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
    <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-xl shadow-navy-900/10">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-navy-900">Vraag een offerte aan</h2>
        <p className="text-sm text-navy-800/70">Gratis &amp; vrijblijvend, reactie zo snel mogelijk.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* honeypot */}
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        <input name="naam" required className={field} placeholder="Naam *" aria-label="Naam" />
        <input name="telefoon" required type="tel" className={field} placeholder="Telefoonnummer *" aria-label="Telefoonnummer" />
        <select name="dienst" className={field} defaultValue={diensten[0]} aria-label="Welke dienst?">
          {diensten.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-gradient-to-b from-accent-400 to-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:to-accent-700 disabled:opacity-60"
        >
          {status === "sending" ? "Versturen…" : "Verstuur aanvraag"}
        </button>
        <p className="text-center text-[12px] leading-tight text-navy-800/70">
          Door te versturen gaat u akkoord met ons{" "}
          <Link href="/privacy" className="underline hover:text-navy-900">privacybeleid</Link>.
          Op onze werkzaamheden zijn onze{" "}
          <Link href="/algemene-voorwaarden" className="underline hover:text-navy-900">
            algemene voorwaarden
          </Link>{" "}
          van toepassing.
        </p>
      </form>
    </div>
  );
}
