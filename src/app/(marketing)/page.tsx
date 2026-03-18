import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { breadcrumbSchema, webPageSchema, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: {
    absolute: "Agent Blueprint | AI Agents from Strategy to Execution in Days",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Agent Blueprint | AI Agents from Strategy to Execution in Days",
    description: siteConfig.description,
  },
  twitter: {
    title: "Agent Blueprint | AI Agents from Strategy to Execution in Days",
    description: siteConfig.description,
  },
};

const homeBreadcrumb = breadcrumbSchema([]);
const homeWebPage = webPageSchema({
  name: "Agent Blueprint | AI Agents. From Strategy to Execution.",
  description: siteConfig.description,
  path: "/",
  datePublished: "2025-09-15",
  dateModified: "2026-03-18",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPage) }}
      />
      <HeroSection />
      <HowItWorksSection />
      <CapabilitiesSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
