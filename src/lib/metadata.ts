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
    "Agent Blueprint's Discover, Blueprint, Launch methodology takes businesses from strategy to production-ready AI agent deployment in days, not months.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Discover — Understand Your DNA",
      text: "We capture what makes your organization unique, from your capabilities and challenges to your goals, so every AI recommendation is tailored to your specific context.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Discover — Find Your AI Opportunities",
      text: "Agent Blueprint analyzes your business and surfaces the AI use cases with the highest impact potential. No guesswork, just prioritized opportunities that make sense for you.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Blueprint — Get a Complete Build Plan",
      text: "Every opportunity gets a detailed technical blueprint: what to build, how to measure value, and ROI projections that prove it's worth doing. No ambiguity, just a clear path forward.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Launch — Deploy with Confidence",
      text: "Your blueprints become ready-to-build skills for modern dev tools. Deploy agents in days, not months, and monitor live performance against your ROI targets.",
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
        text: "Agent Blueprint is a platform that moves you from strategy to production-ready AI agents in days. It discovers your best AI opportunities, creates detailed blueprints with ROI projections, and deploys agents to your preferred platforms.",
      },
    },
    {
      "@type": "Question",
      name: "How does Agent Blueprint work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint follows a Discover, Blueprint, Launch methodology: (1) Discover — we capture your business context and surface AI use cases with the highest impact potential, (2) Blueprint — every opportunity gets a detailed technical blueprint with ROI projections, (3) Launch — your blueprints become ready-to-build skills so you can deploy agents in days, not months, and monitor performance against ROI targets.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Agent Blueprint for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint is designed for businesses looking to leverage AI agents to automate and optimize their operations. Whether you're a startup or enterprise, our platform helps you discover, blueprint, and launch AI-powered workflows.",
      },
    },
    {
      "@type": "Question",
      name: "How long does deployment take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agent Blueprint moves you from strategy to production-ready AI agents in days, not months. The platform generates actionable blueprints in minutes, and the automated build process drastically reduces implementation time.",
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
        text: "Agent Blueprint provides a structured, end-to-end methodology for AI agent deployment — not just tools. Our Discover, Blueprint, Launch approach ensures every AI agent is grounded in real business context, backed by ROI projections, and optimized for measurable results.",
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
