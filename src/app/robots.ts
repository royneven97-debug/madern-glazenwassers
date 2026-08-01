import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // /llms.txt staat er expliciet bij zodat AI-crawlers (GPTBot,
      // PerplexityBot, ClaudeBot) hem zeker mogen ophalen. In de <head> staat
      // daarnaast een link rel="alternate" naar hetzelfde bestand.
      allow: ["/", "/llms.txt"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
