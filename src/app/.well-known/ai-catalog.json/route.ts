import { aiCatalog, discoveryHeaders } from "@/lib/agent-discovery";

// Domain-level AI Catalog: lets agents find the /mcp server card from the
// domain alone.
export function GET() {
  return new Response(JSON.stringify(aiCatalog, null, 2), {
    headers: { ...discoveryHeaders, "Content-Type": "application/ai-catalog+json" },
  });
}
