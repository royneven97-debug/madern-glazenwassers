import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

export function Faq({
  faqs,
  title = "Veelgestelde vragen",
}: {
  faqs: { q: string; a: string }[];
  title?: string;
}) {
  if (!faqs.length) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <JsonLd schema={faqSchema(faqs)} />
      <h2 className="text-center text-2xl font-bold text-navy-900 sm:text-3xl">{title}</h2>
      <div className="mt-8 divide-y divide-mist-200 rounded-2xl border border-mist-200 bg-mist-50">
        {faqs.map((f) => (
          <details key={f.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-navy-900">
              {f.q}
              <span className="text-water-500 transition-transform group-open:rotate-45" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-pretty text-navy-800/80">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
