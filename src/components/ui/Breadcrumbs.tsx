import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Kruimelpad" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <JsonLd schema={breadcrumbSchema([{ name: "Home", path: "/" }, ...items])} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-navy-700/70">
        <li>
          <Link href="/" className="hover:text-water-600">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {i === items.length - 1 ? (
              <span className="font-medium text-navy-900">{item.name}</span>
            ) : (
              <Link href={item.path} className="hover:text-water-600">{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
