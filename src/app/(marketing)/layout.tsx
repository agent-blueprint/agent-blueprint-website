import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BlueprintMargins } from "@/components/blueprint-margins";
import { ScrollRuler } from "@/components/scroll-ruler";
import { MetallicReflection } from "@/components/metallic-reflection";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <ScrollRuler />
      <BlueprintMargins />
      <MetallicReflection />
      <main>{children}</main>
      <Footer />
    </>
  );
}
