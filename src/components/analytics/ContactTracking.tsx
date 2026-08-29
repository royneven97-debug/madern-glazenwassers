"use client";

import { useEffect } from "react";
import { Analytics, track } from "@vercel/analytics/react";

/**
 * Telt bel-, WhatsApp- en e-mailkliks.
 *
 * Werkt met event-delegatie op document-niveau in plaats van een onClick per
 * knop: de bel- en WhatsApp-links staan op veertien plekken verspreid over tien
 * bestanden, en nieuwe links worden zo automatisch meegeteld zonder dat iemand
 * eraan hoeft te denken.
 *
 * Vercel Analytics is cookieloos en slaat geen persoonsgegevens op, dus hier is
 * geen cookiebanner voor nodig.
 */

export type ContactSoort = "bellen" | "whatsapp" | "email";

function soortVanHref(href: string): ContactSoort | null {
  if (href.startsWith("tel:")) return "bellen";
  if (href.startsWith("mailto:")) return "email";
  if (href.includes("wa.me") || href.includes("api.whatsapp.com")) return "whatsapp";
  return null;
}

export function ContactTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!link) return;

      // getAttribute i.p.v. link.href: tel:-links worden anders genormaliseerd.
      const href = link.getAttribute("href");
      if (!href) return;

      const soort = soortVanHref(href);
      if (!soort) return;

      track("contact_klik", {
        soort,
        // Waar op de site is geklikt. Levert het "vanaf welke pagina"-overzicht
        // in het weekrapport op.
        pagina: window.location.pathname,
      });
    }

    // Capture-fase: de klik wordt geteld ook als een handler onderweg
    // stopPropagation() aanroept of de navigatie direct start.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return <Analytics />;
}
