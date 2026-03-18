import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
