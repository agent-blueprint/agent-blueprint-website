import { siteConfig } from "@/lib/metadata";

// Discovery documents for the remote MCP server at /mcp, following the MCP
// Server Card extension (SEP-2127) and the AI Catalog it points from.
// Keep the name and version in step with server.json (the MCP Registry
// listing) and with serverInfo in src/app/mcp/route.ts.
export const MCP_SERVER_NAME = "ai.agentblueprint/agent-blueprint";
export const MCP_SERVER_VERSION = "0.2.0";
export const MCP_URL = `${siteConfig.url}/mcp`;
export const SERVER_CARD_URL = `${MCP_URL}/server-card`;

export const serverCard = {
  $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
  name: MCP_SERVER_NAME,
  title: "Agent Blueprint",
  description: "Measured agent costs, a one-page agent summary check, and an offline access map.",
  version: MCP_SERVER_VERSION,
  websiteUrl: `${siteConfig.url}/agents`,
  repository: {
    url: "https://github.com/agent-blueprint/agent-blueprint-website",
    source: "github",
  },
  icons: [{ src: `${siteConfig.url}/images/logo.png`, mimeType: "image/png", sizes: ["1024x1024"] }],
  remotes: [
    {
      type: "streamable-http",
      url: MCP_URL,
      supportedProtocolVersions: ["2025-11-25", "2025-06-18", "2025-03-26"],
    },
  ],
};

export const aiCatalog = {
  specVersion: "1.0",
  entries: [
    {
      identifier: "urn:air:agentblueprint.ai:mcp:agent-blueprint",
      type: "application/mcp-server-card+json",
      url: SERVER_CARD_URL,
    },
  ],
};

// Hosted cards must allow browser clients (SEP-2127, CORS requirements).
export const discoveryHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type, If-None-Match",
  "Access-Control-Expose-Headers": "ETag",
  "Cache-Control": "public, max-age=3600",
};
