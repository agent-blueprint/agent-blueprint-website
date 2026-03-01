import type { Metadata } from "next";

export const siteConfig = {
  name: "Agent Blueprint",
  description:
    "Agent Blueprint moves you from strategy to production ready AI solutions in just days. Analyze your business, generate prioritized AI use cases, create detailed blueprints, and automatically deploy agents.",
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
    "Agent Blueprint's five-step process takes businesses from business profile to production-ready AI agent deployment in minutes.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Analyze",
      text: "Populate your business profile. Provide context and organizational capabilities to tailor your agentic AI recommendations and pinpoint the exact AI use cases that will drive the highest ROI.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Design",
      text: "Generate prioritized AI opportunities. Agent Blueprint analyzes your business and generates AI use cases that solve your specific challenges, each with a detailed blueprint, implementation plan, and business case.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Deploy",
      text: "Get deployment ready AI agent blueprints so detailed that implementation becomes a checklist, not a challenge. Turn your blueprints into production ready agents, built in days, not months.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Visualize",
      text: "See your agent architecture and automatically deploy directly to your agentic platforms.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Monitor",
      text: "Track operational metrics and measure performance against ROI projections in real time to ensure every agent pays for itself.",
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
        text: "Agent Blueprint is a platform that moves you from strategy to production ready AI solutions in just days. It analyzes your business, generates prioritized AI use cases, creates detailed blueprints, and automatically deploys agents to your preferred platforms.",
      },
    },
    {
      "@type": "Question",
      name: "How does Agent Blueprint work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint follows a five-step process: (1) Analyze - populate your business profile to tailor recommendations, (2) Design - generate prioritized AI use cases with detailed blueprints, (3) Deploy - turn blueprints into production ready agents built in days, (4) Visualize - see your agent architecture and deploy to your platforms, (5) Monitor - track performance and ROI in real time.",
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
        text: "Agent Blueprint moves you from strategy to production ready AI solutions in just days, not months. The platform generates actionable blueprints in minutes, and the automated build process drastically reduces implementation time.",
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
