import { siteConfig } from "@/lib/metadata";

export function GET() {
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Agent Blueprint",
    home_page_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.json`,
    description:
      "Enterprise AI advisory platform. 8 MCP tools generating multi-agent architectures for 45+ coding agents. Vendor-agnostic output for ServiceNow, Salesforce, or any platform.",
    icon: `${siteConfig.url}/images/logo.png`,
    language: "en-US",
    items: [
      {
        id: `${siteConfig.url}/`,
        url: `${siteConfig.url}/`,
        title: "Agent Blueprint: AI Agent Architecture from Strategy to Execution",
        summary:
          "Multi-stage LLM pipeline generating 6 artifacts: Business Profile, AI Readiness, Use Cases, Technical Blueprint, Business Case (5-year ROI), and Implementation Plan. Output delivered as Agent Skills consumable by 45+ coding agents.",
        date_published: "2025-09-15T00:00:00Z",
        date_modified: "2026-04-20T00:00:00Z",
        tags: [
          "ai-agents",
          "mcp-server",
          "enterprise-ai",
          "agent-architecture",
          "multi-agent-systems",
        ],
      },
      {
        id: `${siteConfig.url}/developers`,
        url: `${siteConfig.url}/developers`,
        title: "Agent Blueprint for Developers: MCP Server, CLI, and Agent Skills Export",
        summary:
          "Install MCP server via npx agentblueprint. 8 tools: list_blueprints, get_blueprint, get_business_case, get_implementation_plan, get_use_case, get_implementation_spec, get_business_profile, download_blueprint. Works with Claude Code, Codex, Cursor, Copilot, Windsurf. Also available as CLI and ZIP export.",
        date_published: "2025-11-01T00:00:00Z",
        date_modified: "2026-04-18T00:00:00Z",
        tags: [
          "mcp-server",
          "cli",
          "agent-skills",
          "developer-tools",
          "coding-agents",
        ],
      },
      {
        id: `${siteConfig.url}/security`,
        url: `${siteConfig.url}/security`,
        title: "Agent Blueprint Security: Authentication, Data Protection, AI Safety",
        summary:
          "Four security pillars: Authentication via trusted identity providers with RBAC, encryption in transit and at rest, AI safety guardrails (prompt injection defense, output validation, human-in-the-loop), and enterprise-grade infrastructure on Vercel.",
        date_published: "2025-09-15T00:00:00Z",
        date_modified: "2025-02-20T00:00:00Z",
        tags: ["security", "enterprise", "ai-safety", "compliance"],
      },
      {
        id: "https://github.com/agent-blueprint/agent-blueprint-skills",
        url: "https://github.com/agent-blueprint/agent-blueprint-skills",
        title: "Open-Source Agent Skills: 7 Skills for 45+ Coding Agents",
        summary:
          "7 open-source Agent Skills (Apache 2.0): agent-fundamentals, servicenow-ai-agents, agent-deployment, research-agent, plus 3 blueprint patterns (IT Service Desk Triage, Procurement RFx Processing, Customer Onboarding). Install via npx skills add agent-blueprint/agent-blueprint-skills.",
        date_published: "2026-04-18T00:00:00Z",
        date_modified: "2026-04-20T00:00:00Z",
        tags: [
          "open-source",
          "agent-skills",
          "blueprint-patterns",
          "it-service-desk",
          "procurement",
          "customer-onboarding",
        ],
      },
      {
        id: "https://www.npmjs.com/package/agentblueprint",
        url: "https://www.npmjs.com/package/agentblueprint",
        title: "agentblueprint npm Package: MCP Server v0.7.15",
        summary:
          "MCP server providing 8 tools for AI agent blueprint discovery and download. stdio transport. Install: npx agentblueprint. Requires API key from app.agentblueprint.ai/settings/api-tokens. Listed on Official MCP Registry, Glama, PulseMCP, MCPMarket.",
        date_published: "2026-02-01T00:00:00Z",
        date_modified: "2026-04-18T00:00:00Z",
        tags: [
          "npm",
          "mcp-server",
          "model-context-protocol",
          "agent-tools",
        ],
      },
    ],
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
