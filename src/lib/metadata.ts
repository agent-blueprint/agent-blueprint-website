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
  ],
};
