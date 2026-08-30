import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles, getArticle } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/sections/Faq";
import { LeadForm } from "@/components/sections/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, faqSchema } from "@/lib/schema";
import { RichText } from "@/components/blog/RichText";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return generatePageMetadata({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/blog/${a.slug}`,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  return (
    <>
      <JsonLd
        schema={articleSchema({
          title: a.title,
          description: a.metaDescription,
          path: `/blog/${a.slug}`,
          datePublished: a.datePublished,
          dateModified: a.dateModified,
          image: a.image?.src,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blog" },
          { name: a.title, path: `/blog/${a.slug}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-sm font-medium text-navy-800/70">{formatDate(a.datePublished)}</p>
        <h1 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          {a.title}
        </h1>
        <p className="mt-5 text-pretty text-lg text-navy-800/80">{a.intro}</p>

        {a.image && (
          <div className="mt-8 overflow-hidden rounded-3xl">
            <Image
              src={a.image.src}
              alt={a.image.alt}
              width={1000}
              height={560}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-10 space-y-10">
          {a.sections.map((sec) => (
            <div key={sec.heading}>
              <h2 className="text-2xl font-bold text-navy-900">{sec.heading}</h2>
              {sec.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-pretty leading-relaxed text-navy-800/85">
                  <RichText text={p} />
                </p>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-navy-800/70">
          Geschreven door {siteConfig.founder}, oprichter van Madern Glazenwassers in Apeldoorn.
        </p>

        <div className="mt-8">
          <Link href="/blog" className="text-sm font-semibold text-water-600 hover:text-water-700">
            &larr; Terug naar alle artikelen
          </Link>
        </div>
      </article>

      {a.faqs && a.faqs.length > 0 && (
        <>
          <JsonLd schema={faqSchema(a.faqs)} />
          <div className="py-8">
            <Faq faqs={a.faqs} />
          </div>
        </>
      )}

      {!a.hideLeadForm && <LeadForm title="Ramen laten wassen in Apeldoorn?" />}
    </>
  );
}
