import type { Metadata } from "next";
import { DevelopersSection } from "@/components/developers-section";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Integrate Agent Blueprint into your dev workflow via CLI, MCP server, or direct export. Download blueprints as Agent Skills directories for any coding agent.",
  alternates: {
    canonical: "/developers",
  },
};

const developersBreadcrumb = breadcrumbSchema([
  { name: "Developers", path: "/developers" },
]);
const developersWebPage = webPageSchema({
  name: "Developers | Agent Blueprint",
  description:
    "Integrate Agent Blueprint into your dev workflow via CLI, MCP server, or direct export. Download blueprints as Agent Skills directories for any coding agent.",
  path: "/developers",
  dateModified: "2026-03-15",
});

export default function DevelopersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(developersBreadcrumb),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(developersWebPage),
        }}
      />
      <DevelopersSection />
    </>
  );
}
