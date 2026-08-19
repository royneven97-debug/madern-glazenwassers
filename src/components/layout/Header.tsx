"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "/diensten", label: "Diensten" },
  { href: "/glazenwassen-particulier", label: "Particulier" },
  { href: "/glazenwassen-zakelijk", label: "Zakelijk" },
  { href: "/tarieven", label: "Tarieven" },
  { href: "/werkgebied", label: "Werkgebied" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/blog", label: "Blog" },
];

// Op desktop een compactere set (Particulier/Zakelijk zitten al onder Diensten);
// het volledige menu blijft op mobiel beschikbaar.
const desktopNav = nav.filter(
  (i) => i.href !== "/glazenwassen-particulier" && i.href !== "/glazenwassen-zakelijk",
);

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mist-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Madern Glazenwassers home">
          {/* Beeldmerk met de naam erin, dus geen los tekstlabel ernaast meer.
              Het bestand is strak bijgesneden op de letters (872x367, 2,4:1),
              want het origineel is vierkant met 82% lege marge: ongesneden zou
              de naam op deze hoogte maar een fractie van de ruimte vullen.
              w-auto houdt de verhouding intact bij een vaste hoogte. */}
          <Image
            src="/madern-glazenwassers-logotekst.png"
            alt="Madern Glazenwassers, glazenwasser in Apeldoorn"
            width={872}
            height={367}
            className="h-14 w-auto sm:h-16"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {desktopNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-navy-800 hover:bg-mist-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.phone.href}
            className="hidden whitespace-nowrap text-sm font-semibold text-navy-900 hover:text-water-600 xl:inline"
          >
            {siteConfig.phone.display}
          </a>
          <Button href="/offerte" className="hidden whitespace-nowrap sm:inline-flex">
            Gratis offerte
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-navy-900 lg:hidden"
            aria-label="Menu openen"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-mist-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-navy-800 hover:bg-mist-100"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 flex flex-col gap-2">
              <Button href="/offerte" size="lg" onClick={() => setOpen(false)}>
                Gratis offerte aanvragen
              </Button>
              <a
                href={siteConfig.phone.href}
                className="text-center text-sm font-semibold text-water-600"
              >
                Bel {siteConfig.phone.display}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

