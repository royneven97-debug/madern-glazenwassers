// JSON-LD schema-builders. LocalBusiness is dé hefboom voor lokale SEO:
// naam/telefoon/plaats MOETEN exact gelijk zijn aan het Google Bedrijfsprofiel.

import { siteConfig } from "./site";
import { plaatsen } from "./plaatsen";
import type { ReviewAggregate } from "./reviews";

const businessId = `${siteConfig.url}/#localbusiness`;
const founderId = `${siteConfig.url}/#founder`;

// Echte werkfoto's. Google toont in lokale resultaten liever een foto van het
// werk dan een logo, dus die staan hier bovenaan.
const businessPhotos = [
  "/images/glazenwasser-apeldoorn-aan-het-werk.jpg",
  "/images/werk-glazenwasser-woning-apeldoorn.jpg",
  "/images/werk-glasbewassing-bedrijfspand-apeldoorn.jpg",
  "/images/werk-dakgoot-reinigen-apeldoorn.jpg",
  "/images/gevelreiniging-voor-na-apeldoorn.jpg",
  "/madern-glazenwassers-logo.png",
];

export function localBusinessSchema(reviews?: ReviewAggregate | null) {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    // Specifieker dan LocalBusiness: glazenwassen valt onder
    // HomeAndConstructionBusiness, dat helpt Google de branche te plaatsen.
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": businessId,
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    telephone: siteConfig.phone.e164,
    email: siteConfig.email,
    priceRange: siteConfig.priceRange,
    image: businessPhotos.map((p) => `${siteConfig.url}${p}`),
    logo: `${siteConfig.url}/madern-glazenwassers-logo.png`,
    founder: { "@id": founderId },
    foundingDate: String(siteConfig.foundingYear),
    ...(siteConfig.kvk
      ? {
          identifier: {
            "@type": "PropertyValue",
            propertyID: "KvK",
            value: siteConfig.kvk,
          },
        }
      : {}),
    address: {
      "@type": "PostalAddress",
      ...(siteConfig.address.streetAddress
        ? { streetAddress: siteConfig.address.streetAddress }
        : {}),
      ...(siteConfig.address.postalCode
        ? { postalCode: siteConfig.address.postalCode }
        : {}),
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    hasMap: `https://www.google.com/maps/place/?q=place_id:${siteConfig.reviews.googlePlaceId}`,
    areaServed: plaatsen.map((p) => ({
      "@type": "City",
      name: p.name,
    })),
    // Verzorgingsgebied als cirkel rond Apeldoorn (±20 km).
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.lat,
        longitude: siteConfig.geo.lng,
      },
      geoRadius: 20000,
    },
    knowsLanguage: ["nl-NL"],
    currenciesAccepted: "EUR",
    paymentAccepted: "Contant, Pinnen, Bankoverschrijving",
    openingHoursSpecification: siteConfig.openingHours.map((o) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: o.days,
      opens: o.opens,
      closes: o.closes,
    })),
    ...(sameAs.length ? { sameAs } : {}),
  };

  // Echte reviews alleen toevoegen als ze bestaan, nooit verzinnen.
  // De cijfers komen live uit het Google Bedrijfsprofiel (lib/reviews.ts).
  if (reviews && reviews.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.ratingValue,
      reviewCount: reviews.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

// Person voor de oprichter: versterkt E-E-A-T en koppelt een echt mens aan het
// bedrijf in plaats van alleen een handelsnaam.
export function founderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderId,
    name: siteConfig.founder,
    jobTitle: "Oprichter en glazenwasser",
    image: `${siteConfig.url}/michael-oprichter-glazenwasser-apeldoorn.jpg`,
    url: `${siteConfig.url}/over-ons`,
    worksFor: { "@id": businessId },
    knowsAbout: [
      "Glazenwassen",
      "Glasbewassing",
      "Reinigen met osmosewater",
      "Gevelreiniging",
      "Dakgootreiniging",
      "Zonnepanelen reinigen",
    ],
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "nl-NL",
    publisher: { "@id": businessId },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.name,
    url: `${siteConfig.url}${opts.path}`,
    provider: { "@id": businessId },
    areaServed: plaatsen.map((p) => ({ "@type": "City", name: p.name })),
  };
}

// ItemList van diensten, versterkt de /diensten hub-pagina.
export function serviceListSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${siteConfig.url}${opts.path}`,
    mainEntityOfPage: `${siteConfig.url}${opts.path}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    ...(opts.image ? { image: `${siteConfig.url}${opts.image}` } : {}),
    author: { "@type": "Person", name: siteConfig.founder },
    publisher: { "@id": businessId },
  };
}

export function jobPostingSchema(opts: {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  /** Schema.org-waarden; standaard een gewone deeltijd-/voltijdvacature. */
  employmentType?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opts.title,
    description: opts.description,
    datePosted: opts.datePosted,
    ...(opts.validThrough ? { validThrough: opts.validThrough } : {}),
    employmentType: opts.employmentType ?? ["FULL_TIME", "PART_TIME"],
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}/madern-glazenwassers-logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
    },
    applicantLocationRequirements: { "@type": "Country", name: "Nederland" },
    directApply: false,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
