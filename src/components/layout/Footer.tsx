import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { availableServices } from "@/lib/services";
import { plaatsen, plaatsHref } from "@/lib/plaatsen";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-navy-950 text-mist-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/madern-glazenwassers-logo.png"
            alt="Madern Glazenwassers logo"
            width={112}
            height={112}
            className="h-24 w-24 rounded-2xl object-cover ring-1 ring-white/10"
          />
          <p className="mt-4 max-w-xs text-sm text-mist-200/80">
            Professionele glazenwasser in Apeldoorn. Streepvrij schone ramen met
            gezuiverd osmosewater — voor particulier en zakelijk.
          </p>
          <p className="mt-4 text-sm">
            <a href={siteConfig.phone.href} className="font-semibold text-white hover:text-water-300">
              {siteConfig.phone.display}
            </a>
            <br />
            <a href={`mailto:${siteConfig.email}`} className="text-mist-200/80 hover:text-water-300">
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-water-300">Diensten</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {availableServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="text-mist-200/80 hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-water-300">Werkgebied</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {plaatsen.map((p) => (
              <li key={p.slug}>
                <Link href={plaatsHref(p)} className="text-mist-200/80 hover:text-white">
                  Glazenwasser {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-water-300">Bedrijf</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/over-ons" className="text-mist-200/80 hover:text-white">Over ons</Link></li>
            <li><Link href="/tarieven" className="text-mist-200/80 hover:text-white">Tarieven</Link></li>
            <li><Link href="/offerte" className="text-mist-200/80 hover:text-white">Offerte aanvragen</Link></li>
            <li><Link href="/contact" className="text-mist-200/80 hover:text-white">Contact</Link></li>
          </ul>
          <p className="mt-4 text-xs text-mist-200/60">
            {siteConfig.openingHoursHuman}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-mist-200/60 sm:flex-row sm:px-6">
          <p>© {year} {siteConfig.legalName} — Apeldoorn{siteConfig.kvk ? ` · KvK ${siteConfig.kvk}` : ""}</p>
          <p>Streepvrij schoon met osmosewater 💧</p>
        </div>
      </div>
    </footer>
  );
}
