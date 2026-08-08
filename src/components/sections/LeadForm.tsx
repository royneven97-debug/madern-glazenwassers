"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { submitLead } from "@/lib/lead";

type Props = {
  title?: string;
  // Vult het (verborgen) dienst-veld, bijv. op een dienstpagina
  dienst?: string;
  // Standaardwaarde voor het plaats-veld, bijv. op een locatiepagina
  defaultPlaats?: string;
};

export function LeadForm({ title, dienst, defaultPlaats = "Apeldoorn" }: Props) {
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
      plaats: data.plaats,
      dienst,
      bericht: data.bericht,
    });
    if (result === "email") {
      setStatus("success");
      form.reset();
    } else {
      // WhatsApp/mailto: browser navigeert weg; reset de knop voor de zekerheid.
      setStatus("idle");
    }
  }

  const field =
    "w-full rounded-xl border border-mist-200 bg-white px-4 py-2.5 text-navy-900 outline-none focus:border-water-400 focus:ring-2 focus:ring-water-200";

  return (
    <section className="border-y border-mist-200 bg-mist-50 py-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">
            {title ?? "Vraag vrijblijvend een offerte aan"}
          </h2>
          <p className="mt-3 text-pretty text-navy-800/75">
            Laat uw gegevens achter, dan nemen we snel contact met u op. Liever
            direct? Bel of app ons.
          </p>
        </div>

        {status === "success" ? (
          <div className="mt-8 rounded-3xl border border-water-200 bg-white p-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-water-500 text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-navy-900">Aanvraag verzonden!</h3>
            <p className="mt-2 text-navy-800/80">Bedankt. We nemen zo spoedig mogelijk contact met u op.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-3xl border border-mist-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {/* honeypot tegen spam */}
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="grid gap-4 sm:grid-cols-2">
              <input name="naam" required className={field} placeholder="Naam *" aria-label="Naam" />
              <input name="telefoon" required type="tel" className={field} placeholder="Telefoonnummer *" aria-label="Telefoonnummer" />
            </div>
            <input name="plaats" className={field} placeholder="Plaats" aria-label="Plaats" defaultValue={defaultPlaats} />
            <textarea
              name="bericht"
              rows={3}
              className={field}
              placeholder="Waar kunnen we u mee helpen? (optioneel)"
              aria-label="Bericht"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-water-500 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-water-600 disabled:opacity-60"
            >
              {status === "sending" ? "Versturen…" : "Verstuur aanvraag"}
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.phone.href}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-mist-200 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:border-water-300"
              >
                Bel {siteConfig.phone.display}
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1faa55]"
              >
                WhatsApp
              </a>
            </div>

            <p className="text-center text-xs text-navy-800/55">
              Door te versturen gaat u akkoord met ons{" "}
              <Link href="/privacy" className="underline hover:text-navy-900">privacybeleid</Link>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
