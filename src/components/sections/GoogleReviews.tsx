"use client";

import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

// Featurable-widget-ID (gekoppeld aan het Google Bedrijfsprofiel van Madern).
// Reviews komen live uit Featurable; nooit handmatig verzinnen.
const FEATURABLE_WIDGET_ID = "29a985ff-ac28-4115-8c64-381c15cc896c";

// Nederlandse relatieve datums, bijv. "2 maanden geleden".
function relativeDateNL(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat("nl-NL", { numeric: "auto" });
  const seconds = Math.round((date.getTime() - Date.now()) / 1000);
  const abs = Math.abs(seconds);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];
  for (const [unit, secs] of units) {
    if (abs >= secs || unit === "second") {
      return rtf.format(Math.round(seconds / secs), unit);
    }
  }
  return "";
}

export function GoogleReviews() {
  return (
    <section className="border-y border-mist-200 bg-mist-50 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy-900">Wat klanten over ons zeggen</h2>
          <p className="mt-3 text-pretty text-navy-800/75">
            Echte Google-reviews van klanten in Apeldoorn en omgeving.
          </p>
        </div>
        <div className="mt-8">
          <ReactGoogleReviews
            layout="carousel"
            featurableId={FEATURABLE_WIDGET_ID}
            disableTranslation
            dateDisplay="relative"
            getRelativeDate={relativeDateNL}
            readMoreLabel="Lees meer"
            readLessLabel="Lees minder"
          />
        </div>
      </div>
    </section>
  );
}
