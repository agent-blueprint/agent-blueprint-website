import type { Metadata } from "next";

export const siteConfig = {
  name: "Agent Blueprint",
  description:
    "Agent Blueprint is software that turns a profile of your business into a ranked list of the AI agents worth building, each with a design and a business case.",
  url: "https://agentblueprint.ai",
  ogImage: "https://agentblueprint.ai/images/logo.png",
};

const defaultTitle = "Agent Blueprint | Know What Each AI Agent Will Cost and Save";

export const siteMetadata: Metadata = {
  title: {
    default: defaultTitle,
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
    title: defaultTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // The share image comes from src/app/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    // The card image comes from src/app/twitter-image.tsx.
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

// Structured data. Keep every description in step with public/llms.txt.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://agentblueprint.ai/#org",
  name: "Agent Blueprint",
  url: siteConfig.url,
  logo: siteConfig.ogImage,
  description:
    "Agent Blueprint, Inc. makes Agent Blueprint, software that turns a profile of a business into a ranked list of the AI agents worth building, each with a design and a business case.",
  foundingDate: "2025",
  founder: [
    { "@type": "Person", name: "Chris Faulkner", sameAs: "https://www.linkedin.com/in/cifaulkner" },
    { "@type": "Person", name: "Amy Glencross", sameAs: "https://www.linkedin.com/in/amyglencross" },
  ],
  sameAs: ["https://www.linkedin.com/company/agentblueprint", "https://github.com/agent-blueprint"],
};

// The registered service (Reg. No. 8,407,180, Class 42): software, not reviews.
// Describe only what the app does today.
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://agentblueprint.ai/#software",
  name: "Agent Blueprint",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://app.agentblueprint.ai",
  description:
    "Software as a service that turns a profile of a business into a ranked list of the AI agents worth building, and an agent design with a business case (cost, savings and payback, each figure labelled with its source) for each use case the customer picks, exported as Agent Skills files and through an MCP server for coding agents. Access by request.",
  featureList: [
    "Business profile",
    "Use cases rated for value and complexity, with a forced ranking",
    "Agent design: agents, tools, guardrails and human approval points",
    "Business case: cost, savings and payback",
    "Export as Agent Skills files and through an MCP server",
    "Consulting-firm accounts with each client kept separate",
  ],
  publisher: { "@id": "https://agentblueprint.ai/#org" },
};

export const mcpServerSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://agentblueprint.ai/#mcp-server",
  name: "Agent Blueprint remote MCP server",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  url: `${siteConfig.url}/mcp`,
  description:
    "Read-only remote MCP server (Streamable HTTP), no sign-in, keeps nothing. Tools: list_benchmark_jobs, estimate_agent_cost, check_agent_one_page and render_agent_map.",
  author: { "@id": "https://agentblueprint.ai/#org" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
