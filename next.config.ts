import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The /mcp route reads the drawing template from disk at startup.
  outputFileTracingIncludes: {
    "/mcp": ["./public/draw/v0.2/template.html"],
  },
  // Unlisted review material (such as directory-review videos) stays out of search.
  async headers() {
    return [
      {
        source: "/review/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/draw.md",
        destination: "/draw/v0.2/draw.md",
      },
      {
        source: "/agent-cost-benchmark.md",
        destination: "/benchmarks/agent-jobs/2026-11-02/results.md",
      },
      {
        source: "/agent-one-page-template.md",
        destination: "/templates/agent-one-page/v1/template.md",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/install",
        destination: "/developers",
        permanent: true,
      },
      {
        source: "/docs/cli",
        destination: "/developers",
        permanent: true,
      },
      {
        source: "/cli",
        destination: "/developers",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
