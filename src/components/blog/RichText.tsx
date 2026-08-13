import Link from "next/link";
import type { ReactNode } from "react";

// Minimale linksyntaxis voor artikelteksten: [zichtbare tekst](/pad).
// Bewust geen markdown-parser: we willen precies dit ene ding en niets meer,
// en scripts/seo-check.mjs valideert met hetzelfde patroon of het pad bestaat.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) nodes.push(text.slice(last, at));
    nodes.push(
      <Link
        key={at}
        href={m[2]}
        className="font-medium text-water-600 underline underline-offset-2 hover:text-water-700"
      >
        {m[1]}
      </Link>,
    );
    last = at + m[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
