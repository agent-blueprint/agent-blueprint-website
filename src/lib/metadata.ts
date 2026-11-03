import type { Metadata } from "next";

export const siteConfig = {
  name: "Agent Blueprint",
  description:
    "One plain page per AI agent: what it can do, who answers for it, and whether it's worth it. Start free by having one agent draw itself, with no sign-up.",
  url: "https://agentblueprint.ai",
  appUrl: "https://app.agentblueprint.ai",
  ogImage: "https://agentblueprint.ai/images/logo.png",
};

export const siteMetadata: Metadata = {
  title: {
    default: "Agent Blueprint | Know What Your AI Agents Can Actually Do",
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
    title: "Agent Blueprint | Know What Your AI Agents Can Actually Do",
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
    title: "Agent Blueprint | Know What Your AI Agents Can Actually Do",
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
    "Agent Blueprint is a methodology and platform for designing and deploying enterprise AI agent teams. Each engagement produces a living blueprint: readiness evidence, a ranked use-case portfolio, agent team designs, business cases, and Agent Skills files that coding agents build from. Delivered through hands-on engagements, not self-serve signup.",
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
    "The Agent Blueprint platform holds an organization's blueprint registry: business profile, AI readiness assessment, ranked use-case portfolio, agent team blueprints, business cases, and implementation plans, with performance tracking after deployment. Access is provided to client teams as part of an engagement.",
  author: { "@id": "https://agentblueprint.ai/#org" },
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
    "MCP server for reading and downloading artifacts from an organization's Agent Blueprint registry: blueprints, business cases, implementation plans, and Agent Skills exports. Install via npx agentblueprint. Works with Claude Code, Codex, Cursor, and any MCP-compatible coding agent. API tokens are issued to client teams.",
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
  name: "How Agent Blueprint takes an organization from AI strategy to deployed agents",
  description:
    "The Agent Blueprint method: assess the organization, rank the use cases worth doing, design agent teams with business cases, then deploy through coding agents and track results against the plan.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Build the business profile",
      text: "Capture the organization's operating reality: industry, systems, processes, constraints, and goals. Every later recommendation is grounded in this context.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Assess AI readiness",
      text: "Score readiness across data, process, technology, people, and governance dimensions. The assessment produces evidence that later stages cite.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Rank the use-case portfolio",
      text: "Surface candidate agent use cases and force-rank them by impact and feasibility. The output is a portfolio with explicit priorities, not a list where everything is urgent.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Design the agent blueprint",
      text: "Each approved use case gets an agent team design: roles, orchestration pattern, tools, integration points, guardrails, and human approval gates.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Build the business case",
      text: "Deterministic financials computed from the organization's own numbers: implementation costs, projected savings, and payback period. No fudge factors.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Deploy and measure",
      text: "Blueprints export as Agent Skills directories that coding agents build from, with a phased rollout and test gates. Deployed agents report performance back against the business case, and the blueprint stays current.",
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
        text: "Agent Blueprint gives AI agents one plain page: what an agent can read, what it can change, and who has to say yes. Anyone can have a coding agent draw its own blueprint. For companies, it is also a methodology and platform for designing and deploying AI agent teams, producing a living blueprint for the organization: an AI readiness assessment, a ranked use-case portfolio, agent team designs, deterministic business cases, and implementation plans. Blueprints are machine-readable, so coding agents like Claude Code, Codex, and Cursor build from them directly.",
      },
    },
    {
      "@type": "Question",
      name: "How does Agent Blueprint work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The method runs in stages: capture the organization's business profile, assess AI readiness, rank candidate use cases by impact and feasibility, design agent teams with orchestration patterns and guardrails, build a deterministic business case, and plan a phased rollout with test gates. Humans review every stage. After deployment, agent performance is tracked against the business case and the blueprint is updated, not archived.",
      },
    },
    {
      "@type": "Question",
      name: "Is Agent Blueprint self-serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The personal blueprint is: paste one line into your coding agent, with no sign-up, at agentblueprint.ai/personal. Enterprise work is delivered through hands-on engagements. Client teams get platform access, API tokens, the CLI, and the MCP server as part of an engagement. To see how it would work on your organization, use the contact form at agentblueprint.ai/#contact.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Agent Blueprint for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anyone who runs a coding agent and wants a plain picture of what it can do, and organizations that want AI agents in production with evidence behind every decision. For organizations, we work directly with your team during an engagement, and your coding agents consume the blueprint through Agent Skills exports and the MCP server.",
      },
    },
    {
      "@type": "Question",
      name: "How do I install the Agent Blueprint MCP server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Install via npm: npx agentblueprint. The server connects a coding agent to your organization's blueprint registry, with tools for listing and downloading blueprints, business cases, and implementation plans. It uses stdio transport and works with any MCP-compatible agent. An API token issued with your engagement is required.",
      },
    },
    {
      "@type": "Question",
      name: "What open-source skills does Agent Blueprint publish?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free, Apache 2.0 licensed Agent Skills at github.com/agent-blueprint/agent-blueprint-skills: foundation skills (agent-fundamentals, servicenow-ai-agents, agent-deployment, research-agent) and blueprint patterns for common agent teams (IT service desk triage, procurement RFx processing, customer onboarding). Install via npx skills add agent-blueprint/agent-blueprint-skills.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a blueprint different from a consulting deliverable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical strategy deliverable is a document that starts aging the day it lands. An Agent Blueprint is a living artifact in a registry: recommendations link to readiness evidence, the blueprint exports as files coding agents build from, and performance data flows back in after deployment. When the business changes, the blueprint changes with it.",
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
