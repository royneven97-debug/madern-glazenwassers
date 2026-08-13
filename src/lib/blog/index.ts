// Blog / kennisbank. Data-gedreven, net als diensten/plaatsen. Informatieve
// content voor long-tail zoekopdrachten ("hoe vaak ramen wassen", "osmosewater").
// Elke publicatie is uniek, geschreven vanuit de praktijk (E-E-A-T).
//
// Eén bestand per artikel. De volgorde hieronder is de volgorde waarin ze op
// /blog verschijnen: nieuwste bovenaan.

import { artikel as waarmeeKunJeHetBesteRamenWassen } from "./waarmee-kun-je-het-beste-ramen-wassen";
import { artikel as hoeVaakZonnepanelenSchoonmaken } from "./hoe-vaak-zonnepanelen-schoonmaken";
import { artikel as watKostDakgootSchoonmaken } from "./wat-kost-dakgoot-schoonmaken";
import { artikel as hoeVaakRamenLatenWassen } from "./hoe-vaak-ramen-laten-wassen";
import { artikel as watIsOsmosewater } from "./wat-is-osmosewater";

export type { BlogArticle, BlogSection } from "./types";

export const blogArticles = [
  waarmeeKunJeHetBesteRamenWassen,
  hoeVaakZonnepanelenSchoonmaken,
  watKostDakgootSchoonmaken,
  hoeVaakRamenLatenWassen,
  watIsOsmosewater,
];

export function getArticle(slug: string) {
  return blogArticles.find((a) => a.slug === slug);
}
