import { createHash } from "node:crypto";
import { discoveryHeaders, serverCard } from "@/lib/agent-discovery";

// MCP Server Card for the /mcp tools server, at the location SEP-2127
// reserves: <streamable-http-url>/server-card.
const body = JSON.stringify(serverCard, null, 2);
const etag = `"${createHash("sha256").update(body).digest("hex").slice(0, 16)}"`;

export function GET(request: Request) {
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: { ...discoveryHeaders, ETag: etag } });
  }
  return new Response(body, {
    headers: {
      ...discoveryHeaders,
      "Content-Type": "application/mcp-server-card+json",
      ETag: etag,
    },
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: discoveryHeaders });
}
