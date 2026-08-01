"use client";

import { ReactGoogleReviews, type ReactGoogleReview } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import { siteConfig } from "@/lib/site";

// Featurable-widget-ID (gekoppeld aan het Google Bedrijfsprofiel van Madern).
// Reviews komen live uit Featurable; nooit handmatig verzinnen. Hetzelfde ID
// voedt de aggregateRating in het LocalBusiness-schema (lib/reviews.ts).
const FEATURABLE_WIDGET_ID = siteConfig.reviews.featurableWidgetId;

function relativeDateNL(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
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

function Stars({ rating }: { rating: number }) {
  return (
    <div className="mt-3 flex gap-0.5" aria-label={`${rating} van 5 sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "#FBBC04" : "#E0E0E0"} aria-hidden>
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden className="ml-auto shrink-0">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: ReactGoogleReview }) {
  const { reviewer, starRating, comment, createTime } = review;
  return (
    <article className="flex h-full flex-col rounded-2xl border border-mist-200 bg-white p-5 text-left shadow-sm">
      <div className="flex items-center gap-3">
        {reviewer.profilePhotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={reviewer.profilePhotoUrl}
            alt={`Profielfoto van ${reviewer.displayName}, klant van Madern Glazenwassers`}
            width={40}
            height={40}
            loading="lazy"
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-water-100 font-semibold text-water-700">
            {reviewer.displayName.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate font-semibold text-navy-900">{reviewer.displayName}</p>
          <p className="text-xs text-navy-800/55">{relativeDateNL(createTime)}</p>
        </div>
        <GoogleG />
      </div>
      <Stars rating={starRating} />
      {comment && (
        <p className="mt-3 line-clamp-6 text-pretty text-sm leading-relaxed text-navy-800/85">
          {comment}
        </p>
      )}
    </article>
  );
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
            layout="custom"
            featurableId={FEATURABLE_WIDGET_ID}
            disableTranslation
            renderer={(reviews) => (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.slice(0, 6).map((review) => (
                  <ReviewCard key={review.reviewId} review={review} />
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
