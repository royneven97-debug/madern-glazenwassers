import type { Metadata } from "next";
import { siteConfig } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  // Pad zonder domein, beginnend met "/" (bijv. "/zonnepanelen-reinigen"). Leeg = home.
  path?: string;
  // Indexeerbaar? Standaard true.
  index?: boolean;
};

/**
 * Genereert consistente metadata met canonical, OpenGraph en Twitter-cards.
 * Titel krijgt automatisch het merk-suffix tenzij die al aanwezig is.
 */
export function generatePageMetadata({
  title,
  description,
  path = "",
  index = true,
}: PageMetaInput): Metadata {
  const canonical = `${siteConfig.url}${path}`;
  const fullTitle = title.includes("Madern")
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      url: canonical,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
