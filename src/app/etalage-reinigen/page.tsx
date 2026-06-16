import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/lib/services";
import { generatePageMetadata } from "@/lib/metadata";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";

const slug = "etalage-reinigen";
const service = getService(slug);

export const metadata: Metadata = service
  ? generatePageMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: `/${slug}`,
    })
  : {};

export default function Page() {
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
