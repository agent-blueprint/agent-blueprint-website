import type { Metadata } from "next";
import { DevelopersSection } from "@/components/developers-section";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const pageDescription =
  "Install the agentblueprint CLI and MCP server to download AI agent blueprints as Agent Skills directories for Claude Code, Cursor, Codex, and 18+ coding agents.";

export const metadata: Metadata = {
  title: "Agent Blueprint CLI & MCP Server | npm install agentblueprint",
  description: pageDescription,
  alternates: {
    canonical: "/developers",
  },
  keywords: [
    "agentblueprint",
    "agent blueprint cli",
    "mcp server",
    "ai agent",
    "agent skills",
    "claude code",
    "cursor",
    "codex",
  ],
  openGraph: {
    title: "Agent Blueprint CLI & MCP Server | npm install agentblueprint",
    description: pageDescription,
  },
  twitter: {
    title: "Agent Blueprint CLI & MCP Server | npm install agentblueprint",
    description: pageDescription,
  },
};

const developersBreadcrumb = breadcrumbSchema([
  { name: "Developers", path: "/developers" },
]);
const developersWebPage = webPageSchema({
  name: "Agent Blueprint CLI & MCP Server",
  description: pageDescription,
  path: "/developers",
  dateModified: "2026-03-17",
});
const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "agentblueprint",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0" },
  installUrl: "https://www.npmjs.com/package/agentblueprint",
  softwareVersion: "0.6.4",
  description:
    "CLI and MCP server for Agent Blueprint. Download AI agent blueprints as Agent Skills directories for Claude Code, Cursor, Codex, and 18+ coding agents.",
  url: "https://agentblueprint.ai/developers",
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppSchema),
        }}
      />
      <DevelopersSection />
    </>
  );
}
