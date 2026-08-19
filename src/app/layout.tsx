import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LogoWatermark } from "@/components/layout/LogoWatermark";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, websiteSchema, founderSchema } from "@/lib/schema";
import { getReviewAggregate } from "@/lib/reviews";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Glazenwasser Apeldoorn | Madern Glazenwassers",
    template: "%s",
  },
  description: siteConfig.shortDescription,
  // Maakt /llms.txt vindbaar voor AI-crawlers vanuit de <head>.
  alternates: {
    canonical: "/",
    types: { "text/plain": [{ url: "/llms.txt", title: "llms.txt" }] },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: "/madern-glazenwassers-logo.png", width: 1024, height: 1024, alt: siteConfig.name }],
  },
  icons: { icon: "/icon.png" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Echte Google-reviewcijfers, 24 uur gecached. Bij een storing bij Featurable
  // vervalt aggregateRating stilletjes in plaats van dat de build breekt.
  const reviews = await getReviewAggregate();

  return (
    <html lang="nl" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <JsonLd
          schema={[
            localBusinessSchema(reviews),
            websiteSchema(),
            founderSchema(),
          ]}
        />
        <LogoWatermark />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
