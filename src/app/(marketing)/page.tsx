import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { FreeTrialSection } from "@/components/free-trial-section";
import { ContactSection } from "@/components/contact-section";
import { DimensionLine } from "@/components/dimension-line";
import { breadcrumbSchema, webPageSchema, siteConfig } from "@/lib/metadata";

const homeBreadcrumb = breadcrumbSchema([]);
const homeWebPage = webPageSchema({
  name: "Agent Blueprint | AI Agents. From Strategy to Execution.",
  description: siteConfig.description,
  path: "/",
  dateModified: "2026-02-28",
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
      <DimensionLine
        label="SECTION 02 — HOW IT WORKS"
        animate
        className="mx-auto max-w-7xl px-6 hidden md:flex"
      />
      <HowItWorksSection />
      <DimensionLine
        label="SECTION 03 — CAPABILITIES"
        animate
        accent
        className="mx-auto max-w-7xl px-6 hidden md:flex"
      />
      <CapabilitiesSection />
      <DimensionLine
        label="SECTION 04 — GET STARTED"
        animate
        className="mx-auto max-w-7xl px-6 hidden md:flex"
      />
      <FreeTrialSection />
      <DimensionLine
        label="SECTION 05 — CONTACT"
        animate
        accent
        className="mx-auto max-w-7xl px-6 hidden md:flex"
      />
      <ContactSection />
    </>
  );
}
