import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/draw.md",
        destination: "/draw/v0.2/draw.md",
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
