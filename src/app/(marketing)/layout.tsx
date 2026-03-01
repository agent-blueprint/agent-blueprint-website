import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BlueprintMargins } from "@/components/blueprint-margins";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <BlueprintMargins />
      <main>{children}</main>
      <Footer />
    </>
  );
}
