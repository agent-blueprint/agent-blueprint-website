import type { Metadata } from "next";
import { SecuritySection } from "@/components/security-section";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Learn about Agent Blueprint's security practices including authentication, data protection, AI safety, and infrastructure safeguards.",
  alternates: {
    canonical: "/security",
  },
};

export default function SecurityPage() {
  return <SecuritySection />;
}
