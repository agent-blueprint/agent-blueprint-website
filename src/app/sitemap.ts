import type { MetadataRoute } from "next";

const pages = [
  { path: "", modified: "2026-11-01", priority: 1 },
  { path: "/personal", modified: "2026-11-01", priority: 0.9 },
  { path: "/servicenow", modified: "2026-11-01", priority: 0.9 },
  { path: "/agents", modified: "2026-11-01", priority: 0.9 },
  { path: "/agent-one-page-template", modified: "2026-11-01", priority: 0.9 },
  { path: "/agent-cost-benchmark", modified: "2026-11-02", priority: 0.9 },
  { path: "/privacy", modified: "2026-11-03", priority: 0.3 },
  { path: "/terms", modified: "2026-11-03", priority: 0.3 },
  { path: "/method", modified: "2026-10-31", priority: 0.8 },
  { path: "/security", modified: "2025-02-20", priority: 0.8 },
  { path: "/developers", modified: "2026-07-09", priority: 0.8 },
  { path: "/use-cases/procurement-rfx-ai-agents", modified: "2026-07-09", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `https://agentblueprint.ai${page.path}`,
    lastModified: page.modified,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));
}
