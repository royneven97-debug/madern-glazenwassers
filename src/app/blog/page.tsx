import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { blogArticles } from "@/lib/blog";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog & tips | Glazenwasser Apeldoorn | Madern Glazenwassers",
  description:
    "Tips en uitleg over ramen wassen, osmosewater, zonnepanelen reinigen en gevelonderhoud, van uw glazenwasser in Apeldoorn.",
  path: "/blog",
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          Blog &amp; tips van uw glazenwasser
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg text-navy-800/80">
          Praktische uitleg en tips over ramen wassen, osmosewater en onderhoud,
          uit de dagelijkse praktijk van Madern Glazenwassers in Apeldoorn.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {blogArticles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-mist-200 bg-white transition-shadow hover:shadow-lg hover:shadow-navy-900/5"
            >
              {a.image && (
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={a.image.src}
                    alt={a.image.alt}
                    width={640}
                    height={360}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium text-navy-800/70">{formatDate(a.datePublished)}</p>
                <h2 className="mt-2 text-xl font-bold text-navy-900 group-hover:text-water-600">
                  {a.title}
                </h2>
                <p className="mt-2 flex-1 text-pretty text-navy-800/75">{a.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-water-600">
                  Lees meer
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="py-12">
        <CtaBand />
      </div>
    </>
  );
}
