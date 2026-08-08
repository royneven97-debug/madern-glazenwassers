import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Slugs hernoemd naar de zoekwoorden die de markt daadwerkelijk gebruikt.
      // Zie docs/superpowers/specs/2026-08-08-seo-clusteronderzoek-design.md
      {
        source: "/dakgootreiniging",
        destination: "/dakgoot-schoonmaken",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
