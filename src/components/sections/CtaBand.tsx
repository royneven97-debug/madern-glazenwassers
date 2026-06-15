import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function CtaBand({
  title = "Klaar voor stralend schone ramen?",
  subtitle = "Vraag vandaag nog een gratis en vrijblijvende offerte aan. We reageren zo snel mogelijk.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="bg-water-sheen relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="text-balance text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-mist-100/85">{subtitle}</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/offerte" size="lg" variant="primary">
            Gratis offerte aanvragen
          </Button>
          <Button href={siteConfig.phone.href} size="lg" variant="white">
            Bel {siteConfig.phone.display}
          </Button>
        </div>
      </div>
    </section>
  );
}
