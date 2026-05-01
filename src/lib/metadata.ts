import type { Metadata } from "next";

export const siteConfig = {
  name: "Agent Blueprint",
  description:
    "8 MCP tools generating multi-agent architectures for 45+ coding agents. 6-stage LLM pipeline produces business cases with 5-year ROI, technical blueprints, and implementation plans. Export as Agent Skills for Claude Code, Codex, Cursor. Vendor-agnostic.",
  url: "https://agentblueprint.ai",
  appUrl: "https://app.agentblueprint.ai",
  ogImage: "https://agentblueprint.ai/images/logo.png",
};

export const siteMetadata: Metadata = {
  title: {
    default: "Agent Blueprint | AI Agents. From Strategy to Execution.",
    template: "%s | Agent Blueprint",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Agent Blueprint | AI Agents. From Strategy to Execution.",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1024,
        height: 1024,
        alt: "Agent Blueprint",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Blueprint | AI Agents. From Strategy to Execution.",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://agentblueprint.ai/#org",
  name: "Agent Blueprint",
  url: siteConfig.url,
  logo: siteConfig.ogImage,
  description:
    "Enterprise AI advisory platform generating multi-agent architectures, business cases, and implementation plans. 8 MCP tools serving 45+ coding agents across ServiceNow, Salesforce, and any enterprise platform.",
  foundingDate: "2025",
  sameAs: [
    "https://www.linkedin.com/company/agentblueprint",
    "https://github.com/agent-blueprint",
    "https://www.npmjs.com/package/agentblueprint",
    "https://registry.modelcontextprotocol.io/v0/servers?search=agent-blueprint",
  ],
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://agentblueprint.ai/#app",
  name: "Agent Blueprint",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteConfig.appUrl,
  description:
    "Multi-stage LLM pipeline generating AI agent blueprints: Business Profile, AI Readiness Assessment, Use Cases, Technical Blueprint, Business Case with ROI projections, and Implementation Plan.",
  author: { "@id": "https://agentblueprint.ai/#org" },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
  },
};

export const mcpServerSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://agentblueprint.ai/#mcp-server",
  name: "Agent Blueprint MCP Server",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  url: "https://www.npmjs.com/package/agentblueprint",
  description:
    "8 MCP tools for exploring and downloading AI agent blueprints. Install via npx agentblueprint. Compatible with Claude Code, Codex, Cursor, Copilot, Windsurf, and 45+ other coding agents. Vendor-agnostic output works with any enterprise platform.",
  softwareVersion: "0.7.17",
  author: { "@id": "https://agentblueprint.ai/#org" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  sameAs: [
    "https://www.npmjs.com/package/agentblueprint",
    "https://github.com/agent-blueprint/mcp-server",
    "https://registry.modelcontextprotocol.io/v0/servers?search=agent-blueprint",
  ],
};

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://agentblueprint.ai/#howto",
  name: "How to design and deploy multi-agent AI teams with Agent Blueprint",
  description:
    "6-step pipeline from business profile to production-ready AI agent deployment. Generates architecture for 3-15 agent teams with orchestration patterns, integration points, and 5-year ROI projections.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Create Business Profile",
      text: "Capture organization context: industry, size, tech stack, current processes, and strategic goals. This grounds all AI recommendations in your specific operational reality.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Assess AI Readiness",
      text: "Automated assessment across 6 dimensions: data maturity, process standardization, technical infrastructure, organizational readiness, change management, and governance.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Generate Use Cases",
      text: "LLM pipeline surfaces and prioritizes AI agent opportunities scored by impact, feasibility, and strategic alignment. Typical output: 5-12 ranked use cases per organization.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Build Technical Blueprint",
      text: "Each use case gets a full architecture: agent team composition (3-15 agents), orchestration pattern (routing, pipeline, or orchestrator-workers), integration points, tool definitions, and prompt structures.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Generate Business Case",
      text: "5-year financial model with implementation costs, projected savings, revenue impact, and payback period. Deterministic calculations, no fudge factors.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Export and Deploy",
      text: "Download as Agent Skills (SKILL.md + references/) consumable by Claude Code, Codex, Cursor, and 45+ other coding agents. Vendor-agnostic: deploy to ServiceNow, Salesforce, or any platform. Monitor live performance against ROI targets.",
    },
  ],
};

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://agentblueprint.ai/#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Agent Blueprint?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint is an enterprise AI advisory platform with 8 MCP tools that generate multi-agent architectures for coding agents. It produces 6 pipeline artifacts (Business Profile, AI Readiness, Use Cases, Technical Blueprint, Business Case with 5-year ROI, Implementation Plan) and exports them as vendor-agnostic Agent Skills consumable by 45+ coding agents including Claude Code, Codex, Cursor, and Copilot.",
      },
    },
    {
      "@type": "Question",
      name: "How does Agent Blueprint work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint runs a multi-stage LLM pipeline: (1) Capture business context via structured profile, (2) Assess AI readiness across 6 dimensions, (3) Generate prioritized use cases scored by impact and feasibility, (4) Produce technical blueprints defining agent teams, orchestration patterns, and integration points, (5) Calculate 5-year ROI with payback period, (6) Generate phased implementation plan. Output is machine-readable Agent Skills format, not PDFs.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Agent Blueprint for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint serves two audiences: (1) Enterprise teams deploying 3+ AI agents across multiple workflows who need architecture planning before build, and (2) Coding agents (Claude Code, Codex, Cursor) that need structured blueprints to implement multi-agent systems. Use it when you have complex agent orchestration needs, not for single chatbot deployments.",
      },
    },
    {
      "@type": "Question",
      name: "How do I install the Agent Blueprint MCP server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Install via npm: npx agentblueprint. The MCP server provides 8 tools (list_blueprints, get_blueprint, get_business_case, get_implementation_plan, get_use_case, get_implementation_spec, get_business_profile, download_blueprint). Requires an API key from app.agentblueprint.ai/settings/api-tokens. Works with any MCP-compatible agent via stdio transport.",
      },
    },
    {
      "@type": "Question",
      name: "What agent skills are available open-source?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "7 open-source Agent Skills available via npx skills add agent-blueprint/agent-blueprint-skills. Includes 4 foundation skills (agent-fundamentals, servicenow-ai-agents, agent-deployment, research-agent) and 3 blueprint patterns (IT Service Desk Triage with 5 agents, Procurement RFx Processing with 6 agents, Customer Onboarding with 5 agents). Apache 2.0 licensed. Compatible with 45+ coding agents.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Agent Blueprint different from consulting firms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint automates what consultants do manually. Traditional AI consulting takes 6-12 weeks and costs $150K-500K for strategy alone. Agent Blueprint generates equivalent output (architecture, ROI, implementation plan) in minutes via LLM pipeline. Output is machine-readable and directly consumable by coding agents. Blueprints are living documents that update as your business context changes, not frozen deliverables.",
      },
    },
  ],
};

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${siteConfig.url}${item.path}`,
      })),
    ],
  };
}

export function webPageSchema({
  name,
  description,
  path,
  datePublished,
  dateModified,
}: {
  name: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    ...(datePublished && { datePublished }),
    dateModified,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
