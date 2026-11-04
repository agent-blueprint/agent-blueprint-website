import type { Metadata } from "next";
import { offer, homeFaqs } from "@/lib/offer";

export const siteConfig = {
  name: "Agent Blueprint",
  description:
    "Know whether each AI agent is worth it. We measure its real cost and results against a number set in advance and give a keep, fix or stop decision: three weeks for an agent already running, day 90 for a new one. Fixed price, any platform.",
  url: "https://agentblueprint.ai",
  ogImage: "https://agentblueprint.ai/images/logo.png",
};

const defaultTitle = "Agent Blueprint | Know Whether Each AI Agent Is Worth It";

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
    title: defaultTitle,
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

// Structured data. Keep every description in step with public/llms.txt.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://agentblueprint.ai/#org",
  name: "Agent Blueprint",
  url: siteConfig.url,
  logo: siteConfig.ogImage,
  description:
    "Agent Blueprint helps companies decide, one agent at a time, whether an AI agent is worth it: measure its real cost and results against a number set in advance, then decide to keep, fix or stop it (three weeks for an agent already running, day 90 for a new one). Reviews are delivered by NowGentic.",
  foundingDate: "2025",
  founder: [
    { "@type": "Person", name: "Chris Faulkner", sameAs: "https://www.linkedin.com/in/cifaulkner" },
    { "@type": "Person", name: "Amy Glencross", sameAs: "https://www.linkedin.com/in/amyglencross" },
  ],
  sameAs: ["https://www.linkedin.com/company/agentblueprint", "https://github.com/agent-blueprint"],
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://agentblueprint.ai/#review",
  name: "AI agent review",
  serviceType: "AI agent cost and results review",
  provider: { "@id": "https://agentblueprint.ai/#org" },
  areaServed: "Worldwide",
  description:
    "For one AI agent, planned or already running: measure the baseline, write the agent's one page, set a target and date, and give a keep, fix or stop decision with a summary for finance (three weeks for an agent already running, day 90 for a new one). Works on any platform, including AI billed as a license or a pool of credits.",
  offers: [
    {
      "@type": "Offer",
      name: "Per agent",
      price: offer.price.replace(/[$,]/g, ""),
      priceCurrency: "USD",
      url: `${siteConfig.url}/#offer`,
    },
    {
      "@type": "Offer",
      name: `Design partner (first ${offer.designPartnerSeats} companies)`,
      price: offer.designPartnerPrice.replace(/[$,]/g, ""),
      priceCurrency: "USD",
      url: `${siteConfig.url}/#offer`,
    },
  ],
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

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://agentblueprint.ai/#howto",
  name: "How to decide whether an AI agent is worth it",
  description:
    "The Agent Blueprint method for one agent: measure the starting point, write the one page, set the target in advance, and decide: in three weeks for an agent already running, at day 90 for a new one.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Measure today's number",
      text: "Pick the one number the agent is meant to move and measure it from your own systems before launch, such as the share of tickets sent to the wrong team.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Write the agent's one page",
      text: "Purpose, authority (and what enforces each rule), proof, owner, cost and promise, on one page. Free template at agentblueprint.ai/agent-one-page-template.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Set the target and date",
      text: "Write down the target, the date, what must not get worse and when to stop, before launch, and don't move them afterwards.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Decide: keep, fix or stop",
      text: "Measure cost (new cash and staff time, kept apart) and results from your systems, then decide: keep, fix or stop.",
    },
  ],
};

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://agentblueprint.ai/#faq",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
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
