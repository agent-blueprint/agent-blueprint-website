import { siteConfig } from "@/lib/metadata";

// JSON Feed of the site's main pages. Keep summaries in step with public/llms.txt.
const items = [
  {
    path: "/",
    title: "Agent Blueprint: Know Whether Each AI Agent Is Worth It",
    summary:
      "Measure an agent's real cost and results against a number set in advance, and decide to keep, fix or stop it: three weeks for an agent already running, day 90 for a new one. $7,500 fixed per agent, any platform.",
    published: "2025-09-15",
    modified: "2026-11-03",
    tags: ["ai-agents", "ai-roi", "ai-cost", "agent-governance"],
  },
  {
    path: "/sample-review",
    title: "Sample: One AI Agent, Reviewed at 90 Days",
    summary:
      "A finished review for a fictional company's IT ticket agent: finance summary, scorecard and the agent's full one page, with every number shown.",
    published: "2026-11-03",
    modified: "2026-11-03",
    tags: ["ai-agents", "ai-roi", "sample"],
  },
  {
    path: "/blueprints/it-ticket-triage",
    title: "IT Ticket Triage AI Agent: Free Blueprint",
    summary:
      "What a ticket triage agent needs, what not to let it touch, how to test it, starter instructions, the number to set before launch and the keep, fix or stop rule.",
    published: "2026-11-03",
    modified: "2026-11-03",
    tags: ["it-service-desk", "ticket-triage", "ai-agents", "blueprint"],
  },
  {
    path: "/agent-one-page-template",
    title: "One-Page AI Agent Summary Template",
    summary:
      "Free template for an agent card or charter: what the agent may do, what it costs and its ROI, with a filled example.",
    published: "2026-11-01",
    modified: "2026-11-03",
    tags: ["template", "ai-agents", "agent-card"],
  },
  {
    path: "/agent-cost-benchmark",
    title: "AI Agent Cost Per Task: Measured Token Usage",
    summary: "Measured token usage and cost for ten everyday coding-agent jobs, five runs each on Claude Code and Codex.",
    published: "2026-11-02",
    modified: "2026-11-02",
    tags: ["benchmark", "token-cost", "coding-agents"],
  },
  {
    path: "/servicenow",
    title: "Agent Blueprint for ServiceNow (in development)",
    summary:
      "An app being built for the ServiceNow Store that keeps each agent's cost, results and decision current. Not certified or listed yet; the view shown is a mockup.",
    published: "2026-11-01",
    modified: "2026-11-03",
    tags: ["servicenow", "ai-agents", "app"],
  },
];

export function GET() {
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Agent Blueprint",
    home_page_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.json`,
    description: siteConfig.description,
    icon: `${siteConfig.url}/images/logo.png`,
    language: "en-US",
    items: items.map((item) => ({
      id: `${siteConfig.url}${item.path}`,
      url: `${siteConfig.url}${item.path}`,
      title: item.title,
      summary: item.summary,
      date_published: `${item.published}T00:00:00Z`,
      date_modified: `${item.modified}T00:00:00Z`,
      tags: item.tags,
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
