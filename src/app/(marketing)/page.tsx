import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { breadcrumbSchema, webPageSchema, siteConfig } from "@/lib/metadata";

const homeBreadcrumb = breadcrumbSchema([]);
const homeWebPage = webPageSchema({
  name: "Agent Blueprint | AI Agents. From Strategy to Execution.",
  description: siteConfig.description,
  path: "/",
  datePublished: "2025-09-15",
  dateModified: "2026-03-04",
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
