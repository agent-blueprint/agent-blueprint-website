import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <CapabilitiesSection />
      <ContactSection />
    </>
  );
}
