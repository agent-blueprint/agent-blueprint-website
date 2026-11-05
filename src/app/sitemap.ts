import type { MetadataRoute } from "next";

// /personal and /agents (Draw my agent) are frozen: they stay online for the
// plugin listings but are left out of the sitemap and marked noindex.
const pages = [
  { path: "", modified: "2026-11-04", priority: 1 },
  { path: "/blueprints", modified: "2026-11-04", priority: 0.8 },
  { path: "/blueprints/it-ticket-triage", modified: "2026-11-04", priority: 0.9 },
  { path: "/servicenow", modified: "2026-11-04", priority: 0.9 },
  { path: "/consulting-firms", modified: "2026-11-04", priority: 0.7 },
  { path: "/agent-one-page-template", modified: "2026-11-04", priority: 0.9 },
  { path: "/agent-cost-benchmark", modified: "2026-11-04", priority: 0.9 },
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
