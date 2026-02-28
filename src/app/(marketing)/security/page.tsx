import type { Metadata } from "next";
import { SecuritySection } from "@/components/security-section";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Learn about Agent Blueprint's security practices including authentication, data protection, AI safety, and infrastructure safeguards.",
  alternates: {
    canonical: "/security",
  },
};

const securityBreadcrumb = breadcrumbSchema([
  { name: "Security", path: "/security" },
]);
const securityWebPage = webPageSchema({
  name: "Security | Agent Blueprint",
  description:
    "Learn about Agent Blueprint's security practices including authentication, data protection, AI safety, and infrastructure safeguards.",
  path: "/security",
  dateModified: "2025-02-20",
});

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(securityBreadcrumb),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(securityWebPage),
        }}
      />
      <SecuritySection />
    </>
  );
}
