// Types voor de kennisbank. Losgetrokken uit het oude src/lib/blog.ts zodat
// artikelbestanden een type kunnen importeren zonder de index te raken
// (dat zou een cirkelvormige import geven).

export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogArticle = {
  slug: string;
  title: string; // H1
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  datePublished: string; // ISO (YYYY-MM-DD)
  dateModified?: string;
  image?: { src: string; alt: string };
  intro: string;
  sections: BlogSection[];
  faqs?: { q: string; a: string }[];
  // Artikelen met doe-het-zelfintentie krijgen geen offerteblok: dat publiek
  // wil het zelf doen en haakt af op een verkoopblok. Zie spec 3.2.
  hideLeadForm?: boolean;
};
