import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BlueprintMargins } from "@/components/blueprint-margins";
import { ScrollRuler } from "@/components/scroll-ruler";

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
      <main>{children}</main>
      <Footer />
    </>
  );
}
