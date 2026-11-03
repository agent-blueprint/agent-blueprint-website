import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const description =
  "The Agent Blueprint method for enterprise engagements: readiness assessment, ranked use cases, agent team designs, business cases, and files coding agents build from.";

export const metadata: Metadata = {
  title: "The Method",
  description,
  alternates: { canonical: "/method", types: { "text/markdown": "/method.md" } },
};

const breadcrumb = breadcrumbSchema([{ name: "The Method", path: "/method" }]);
const webPage = webPageSchema({
  name: "The Agent Blueprint Method",
  description,
  path: "/method",
  datePublished: "2025-09-15",
  dateModified: "2026-10-31",
});

export default function MethodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <HeroSection />
      <HowItWorksSection />
      <CapabilitiesSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
