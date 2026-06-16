import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { availableServices } from "@/lib/services";
import { locatiePlaatsen, locatieSlug } from "@/lib/plaatsen";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths = [
    { path: "", priority: 1.0 },
    { path: "/tarieven", priority: 0.8 },
    { path: "/werkgebied", priority: 0.7 },
    { path: "/over-ons", priority: 0.6 },
    { path: "/offerte", priority: 0.9 },
    { path: "/contact", priority: 0.6 },
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${base}${p.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...availableServices.map((s) => ({
      url: `${base}/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...locatiePlaatsen.map((p) => ({
      url: `${base}/${locatieSlug(p)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
