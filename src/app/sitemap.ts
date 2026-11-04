import type { MetadataRoute } from "next";

const pages = [
  { path: "", modified: "2026-11-03", priority: 1 },
  { path: "/sample-review", modified: "2026-11-03", priority: 0.9 },
  { path: "/blueprints", modified: "2026-11-03", priority: 0.8 },
  { path: "/blueprints/it-ticket-triage", modified: "2026-11-03", priority: 0.9 },
  { path: "/personal", modified: "2026-11-01", priority: 0.9 },
  { path: "/servicenow", modified: "2026-11-03", priority: 0.9 },
  { path: "/agents", modified: "2026-11-01", priority: 0.9 },
  { path: "/agent-one-page-template", modified: "2026-11-03", priority: 0.9 },
  { path: "/agent-cost-benchmark", modified: "2026-11-02", priority: 0.9 },
  { path: "/privacy", modified: "2026-11-03", priority: 0.3 },
  { path: "/terms", modified: "2026-11-03", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `https://agentblueprint.ai${page.path}`,
    lastModified: page.modified,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));
}
