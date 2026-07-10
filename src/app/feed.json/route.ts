import { siteConfig } from "@/lib/metadata";

export function GET() {
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Agent Blueprint",
    home_page_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.json`,
    description:
      "Methodology and platform for enterprise AI agent teams. Living blueprints with readiness evidence, ranked use cases, agent team designs, business cases, and machine-readable delivery. Delivered through hands-on engagements.",
    icon: `${siteConfig.url}/images/logo.png`,
    language: "en-US",
    items: [
      {
        id: `${siteConfig.url}/`,
        url: `${siteConfig.url}/`,
        title: "Agent Blueprint: AI Agent Teams from Strategy to Production",
        summary:
          "The Agent Blueprint method: assess the organization, rank the use cases worth doing, design agent teams with deterministic business cases, then deploy through coding agents and track results against the plan. Delivered through hands-on engagements; blueprints stay current after deployment.",
        date_published: "2025-09-15T00:00:00Z",
        date_modified: "2026-07-09T00:00:00Z",
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
          "Install the MCP server via npx agentblueprint. Tools include list_blueprints, get_blueprint, get_business_case, get_implementation_plan, get_use_case, get_implementation_spec, get_business_profile, and download_blueprint. Works with Claude Code, Codex, Cursor, Copilot, Windsurf. Also available as CLI and ZIP export. API tokens are issued to client teams.",
        date_published: "2025-11-01T00:00:00Z",
        date_modified: "2026-07-09T00:00:00Z",
        tags: [
          "mcp-server",
          "cli",
          "agent-skills",
          "developer-tools",
          "coding-agents",
        ],
      },
      {
        id: `${siteConfig.url}/use-cases/procurement-rfx-ai-agents`,
        url: `${siteConfig.url}/use-cases/procurement-rfx-ai-agents`,
        title: "Procurement RFx AI Agents: 6-Agent Blueprint Pattern",
        summary:
          "A 6-agent architecture for RFP, RFQ, and RFI work: Intake, Requirements, Vendor Matching, Compliance, Evaluation, and Communication. Use Agent Blueprint to turn procurement RFx automation into a full business case, implementation plan, and Agent Skills package.",
        date_published: "2026-05-01T00:00:00Z",
        date_modified: "2026-05-01T00:00:00Z",
        tags: [
          "procurement",
          "rfx",
          "rfp",
          "agent-blueprint",
          "multi-agent-systems",
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
        title: "Open-Source Agent Skills for Coding Agents",
        summary:
          "Free Agent Skills (Apache 2.0): agent-fundamentals, servicenow-ai-agents, agent-deployment, research-agent, plus blueprint patterns for IT Service Desk Triage, Procurement RFx Processing, and Customer Onboarding. Install via npx skills add agent-blueprint/agent-blueprint-skills.",
        date_published: "2026-04-18T00:00:00Z",
        date_modified: "2026-07-09T00:00:00Z",
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
        title: "agentblueprint npm Package: CLI and MCP Server",
        summary:
          "MCP server for AI agent blueprint discovery and download. stdio transport. Install: npx agentblueprint. Requires an API token issued with an Agent Blueprint engagement. Listed on the Official MCP Registry, Glama, PulseMCP, MCPMarket.",
        date_published: "2026-02-01T00:00:00Z",
        date_modified: "2026-07-09T00:00:00Z",
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
