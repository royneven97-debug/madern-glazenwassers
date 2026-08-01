// Haalt de echte Google-review-cijfers op via Featurable (gekoppeld aan het
// Google Bedrijfsprofiel). Nooit handmatig invullen: een verzonnen
// aggregateRating is een Google-richtlijnovertreding en kan tot een
// handmatige maatregel leiden.
//
// De fetch wordt 24 uur gecached, zodat pagina's statisch blijven. Faalt de
// API, dan geven we null terug en laat het schema aggregateRating gewoon weg.

import { siteConfig } from "./site";

export type ReviewAggregate = {
  ratingValue: number;
  reviewCount: number;
};

const FEATURABLE_API = "https://api.featurable.com/v1/widgets";

export async function getReviewAggregate(): Promise<ReviewAggregate | null> {
  try {
    const res = await fetch(
      `${FEATURABLE_API}/${siteConfig.reviews.featurableWidgetId}`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;

    const data: unknown = await res.json();
    if (typeof data !== "object" || data === null) return null;

    const { averageRating, totalReviewCount } = data as {
      averageRating?: unknown;
      totalReviewCount?: unknown;
    };

    if (typeof averageRating !== "number" || typeof totalReviewCount !== "number") {
      return null;
    }
    if (!(totalReviewCount > 0) || !(averageRating > 0)) return null;

    return {
      // Eén decimaal, zoals Google zelf toont (bijv. 4,8).
      ratingValue: Math.round(averageRating * 10) / 10,
      reviewCount: totalReviewCount,
    };
  } catch {
    return null;
  }
}
