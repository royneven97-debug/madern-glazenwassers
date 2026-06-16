"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "/glazenwassen-particulier", label: "Particulier" },
  { href: "/glazenwassen-zakelijk", label: "Zakelijk" },
  { href: "/zonnepanelen-reinigen", label: "Zonnepanelen" },
  { href: "/tarieven", label: "Tarieven" },
  { href: "/werkgebied", label: "Werkgebied" },
  { href: "/over-ons", label: "Over ons" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mist-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Madern Glazenwassers home">
          <Image
            src="/madern-glazenwassers-logo.png"
            alt="Madern Glazenwassers logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover"
            priority
          />
          <span className="text-lg font-bold tracking-tight text-navy-900">
            Madern<span className="text-accent-500"> Glazenwassers</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-navy-800 hover:bg-mist-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.phone.href}
            className="hidden text-sm font-semibold text-navy-900 hover:text-water-600 sm:inline"
          >
            {siteConfig.phone.display}
          </a>
          <Button href="/offerte" className="hidden sm:inline-flex">
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

