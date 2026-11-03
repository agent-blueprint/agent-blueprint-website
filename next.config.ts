import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The /mcp route reads the drawing template from disk at startup.
  outputFileTracingIncludes: {
    "/mcp": ["./public/draw/v0.2/template.html"],
  },
  async headers() {
    // Instruction and data files that people paste into chat apps go out as plain
    // text: ChatGPT's web reader refuses text/markdown (tested 2026-11-03).
    const plainText = [{ key: "Content-Type", value: "text/plain; charset=utf-8" }];
    return [
      // Unlisted review material (such as directory-review videos) stays out of search.
      {
        source: "/review/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      { source: "/draw.md", headers: plainText },
      { source: "/draw/:version/draw.md", headers: plainText },
      { source: "/agent-one-page-template.md", headers: plainText },
      { source: "/templates/agent-one-page/:version/:file", headers: plainText },
      { source: "/agent-cost-benchmark.md", headers: plainText },
      { source: "/benchmarks/agent-jobs/:date/results.md", headers: plainText },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/draw.md",
        destination: "/draw/v0.2/draw.md",
      },
      {
        // Opens a drawing from a link (data after "#", never sent here) or pasted data.
        source: "/draw/view",
        destination: "/draw/v0.2/view.html",
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
