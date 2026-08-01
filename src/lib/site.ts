// Centrale bedrijfs- en site-configuratie.
// NAP (Naam/Adres/Telefoon) MOET exact overeenkomen met het Google Bedrijfsprofiel
// voor lokale SEO. Velden gemarkeerd met TODO door Roy/Michael aanvullen.

export const siteConfig = {
  name: "Madern Glazenwassers",
  legalName: "Madern Glazenwassers",
  // Productiedomein (www). Wordt gebruikt voor canonical, sitemap, schema.
  url: "https://www.madernglazenwassers.nl",
  shortDescription:
    "Professionele glazenwasser in Apeldoorn. Streepvrij schone ramen met gezuiverd osmosewater, voor particulier en zakelijk. Vraag gratis een offerte aan.",
  founder: "Michael",
  foundingYear: 2025,

  // Contact
  phone: {
    display: "06 22 15 84 98",
    href: "tel:+31622158498",
    e164: "+31622158498",
  },
  email: "info@madernglazenwassers.nl",
  whatsapp: "https://wa.me/31622158498",

  // Adres / vestiging, Madern is een Apeldoorns bedrijf zonder publiek bezoekadres.
  // Voor LocalBusiness-schema gebruiken we de plaats + werkgebied (serviceArea).
  address: {
    streetAddress: "", // TODO: vestigingsadres invullen indien gewenst (mag privé blijven)
    postalCode: "", // TODO
    city: "Apeldoorn",
    region: "Gelderland",
    country: "NL",
  },
  // Gecoördinaten centrum Apeldoorn (voor LocalBusiness geo + kaart)
  geo: { lat: 52.2112, lng: 5.9699 },

  // Wettelijke gegevens, placeholders, door Roy aanvullen
  kvk: "98660519",
  btw: "", // TODO: BTW-nummer

  // Openingstijden (Mo-Fr 08-18, Za op afspraak). Aanpassen indien nodig.
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { days: ["Saturday"], opens: "09:00", closes: "16:00" },
  ],
  openingHoursHuman: "Ma–vr 08:00–18:00 · za op afspraak",

  priceRange: "€€",

  // Social / externe profielen (vul aan zodra beschikbaar, versterkt sameAs in schema)
  social: {
    google: "https://www.google.com/maps/place/?q=place_id:ChIJUXBDc9fTVigRWwhR1eH6xSk",
    facebook: "", // TODO
    instagram: "", // TODO
  },

  // Reviews. NOOIT handmatig invullen: rating en aantal worden live uit het
  // Google Bedrijfsprofiel gehaald via Featurable (zie lib/reviews.ts).
  reviews: {
    googlePlaceId: "ChIJUXBDc9fTVigRWwhR1eH6xSk",
    featurableWidgetId: "29a985ff-ac28-4115-8c64-381c15cc896c",
    writeReviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJUXBDc9fTVigRWwhR1eH6xSk",
  },
} as const;

export type SiteConfig = typeof siteConfig;
