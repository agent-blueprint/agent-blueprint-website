import type { Metadata } from "next";
import { PartnersSection } from "@/components/partners-section";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "For Partners",
  description:
    "An AI Strategy & Delivery platform that helps ServiceNow Partners streamline AI advisory services, automate agent design, accelerate build, and secure recurring managed services revenue.",
  alternates: {
    canonical: "/partners",
  },
};

const partnersBreadcrumb = breadcrumbSchema([
  { name: "For Partners", path: "/partners" },
]);
const partnersWebPage = webPageSchema({
  name: "For Partners | Agent Blueprint",
  description:
    "An AI Strategy & Delivery platform that helps ServiceNow Partners streamline AI advisory services, automate agent design, accelerate build, and secure recurring managed services revenue.",
  path: "/partners",
  dateModified: "2026-02-28",
});

export default function PartnersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(partnersBreadcrumb),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(partnersWebPage),
        }}
      />
      <PartnersSection />
    </>
  );
}
