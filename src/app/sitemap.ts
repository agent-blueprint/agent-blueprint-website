import type { MetadataRoute } from "next";

const pages = [
  { path: "", modified: "2025-02-28", priority: 1 },
  { path: "/security", modified: "2025-02-20", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `https://agentblueprint.ai${page.path}`,
    lastModified: page.modified,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));
}
