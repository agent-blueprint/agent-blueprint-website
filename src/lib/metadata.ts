import type { Metadata } from "next";

export const siteConfig = {
  name: "Agent Blueprint",
  description:
    "Agent Blueprint transforms your business processes into intelligent AI agent workflows. From strategy to execution, we architect AI solutions that deliver measurable results.",
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
  name: "Agent Blueprint",
  url: siteConfig.url,
  logo: siteConfig.ogImage,
  description: siteConfig.description,
  sameAs: [
    "https://www.linkedin.com/company/agent-blueprint",
  ],
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Agent Blueprint",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteConfig.appUrl,
  description: siteConfig.description,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
  },
};

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to deploy AI agents with Agent Blueprint",
  description:
    "Agent Blueprint's four-phase methodology takes businesses from initial process discovery through to production-ready AI agent deployment.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Discover",
      text: "We audit your existing processes to identify high-impact AI automation opportunities. Our discovery framework maps your workflows and pinpoints where intelligent agents will deliver the greatest return.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Architect",
      text: "We design agent workflows tailored to your specific business context. Every integration point, decision tree, and handoff is mapped before a single line of code is written.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Validate",
      text: "We prototype and stress-test solutions in controlled environments. You see real results with real data before committing to full-scale deployment.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Execute",
      text: "We deploy production-ready AI agents that integrate seamlessly with your existing systems. Monitoring, iteration, and optimization are built in from day one.",
    },
  ],
};

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Agent Blueprint?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint is a platform that transforms your business processes into intelligent AI agent workflows. We take you from strategy to execution with a structured, four-phase approach: Discover, Architect, Validate, and Execute.",
      },
    },
    {
      "@type": "Question",
      name: "How does Agent Blueprint work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint follows a four-phase methodology: (1) Discover - we audit your existing processes to find AI automation opportunities, (2) Architect - we design agent workflows tailored to your business, (3) Validate - we prototype and test solutions before full deployment, (4) Execute - we deploy production-ready AI agents that integrate with your systems.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Agent Blueprint for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint is designed for businesses looking to leverage AI agents to automate and optimize their operations. Whether you're a startup or enterprise, our platform helps you identify, design, and deploy AI-powered workflows.",
      },
    },
    {
      "@type": "Question",
      name: "How long does deployment take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Deployment timelines vary based on complexity. A typical engagement moves through all four phases — Discover, Architect, Validate, and Execute — with initial prototypes delivered during the Validate phase so you see results before full-scale rollout.",
      },
    },
    {
      "@type": "Question",
      name: "Is Agent Blueprint secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Agent Blueprint follows security best practices including authentication via trusted identity providers, encryption of data in transit and at rest, AI-specific safety guardrails, and infrastructure hardening through Vercel's enterprise-grade platform.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Agent Blueprint different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint provides a structured, end-to-end methodology for AI agent deployment — not just tools. Our four-phase approach (Discover, Architect, Validate, Execute) ensures every AI agent is grounded in real business processes, tested before deployment, and optimized for measurable results.",
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
  dateModified,
}: {
  name: string;
  description: string;
  path: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    dateModified,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
