import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import {
  breadcrumbSchema,
  webPageSchema,
  siteConfig,
  mcpServerSchema,
  softwareApplicationSchema,
} from "@/lib/metadata";

// Product-first and trademark-safe (Nov 4 2026 handover, docs/brand in the
// agent-blueprint repo). Describe only what the app at app.agentblueprint.ai
// does today. Never use "blueprint" as an ordinary word. Reviews, prices and
// keep/fix/stop belong to NowGentic, not this page.
// Keep it sparse: one message per section, no eyebrows, pills or taglines.

const pageTitle = "Agent Blueprint | Know What Each AI Agent Will Cost and Save";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: siteConfig.description,
  alternates: { canonical: "/", types: { "text/markdown": "/index.md" } },
};

const homeBreadcrumb = breadcrumbSchema([]);
const homeWebPage = webPageSchema({
  name: pageTitle,
  description: siteConfig.description,
  path: "/",
  datePublished: "2025-09-15",
  dateModified: "2026-11-04",
});

const primaryButton =
  "group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-body text-lg font-semibold text-primary-foreground transition-shadow hover:shadow-lg";
const textLink = "group inline-flex items-center gap-2 font-body font-semibold text-primary";
const arrow = <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />;

// Real app output for the fictional org Meridian Technology Solutions:
// business_cases afa5e722-87cc-4535-9eae-b0923642b453 (updated 2026-03-30),
// data.benefits.quantifiedROI: implementation $347,900, annualOpex $72,692,
// annualSavings $24,300, paybackPeriod "Not achievable". Quote as stored.
// Chosen because it's real output and shows the software saying "don't build".
const example = {
  label: "Example: agents to keep a help-desk knowledge base current",
  rows: [
    { label: "Costs to build", value: "$347,900" },
    { label: "Costs to run", value: "$72,692 a year" },
    { label: "Saves", value: "$24,300 a year" },
    { label: "Pays back", value: "Not achievable" },
  ],
  note: "Fictional company, real output. Better to learn that before you build it.",
};

// Verified against the app on Nov 4 2026. Don't claim AI readiness (not in
// the main journey; production flag unconfirmed), autofill (flag unconfirmed),
// "approved" use cases, or performance tracking (not built).
const steps = [
  {
    title: "Profile",
    text: "Describe your business: what you do, the systems you run and what you're aiming for.",
  },
  {
    title: "Ranked use cases",
    text: "It ranks the agents worth building by value and complexity, and only one or two come out as high priority, so you know where to start.",
  },
  {
    title: "Agent design and business case",
    text: "For each use case you pick: the agents, their tools, their guardrails and where a person signs off. Cost, savings and payback are calculated in code, and every figure shows where it came from.",
  },
  {
    title: "Hand it to your coding agents",
    text: "Each design exports as Agent Skills files and through our MCP server, so Claude Code, Codex or Cursor can build it on the platform you already run.",
  },
];

const founders = [
  {
    name: "Chris Faulkner",
    text: "Ten years at ServiceNow. Certified Master Architect.",
    url: "https://www.linkedin.com/in/cifaulkner",
  },
  {
    name: "Amy Glencross",
    text: "Former Deloitte partner. Built technology practices in three countries.",
    url: "https://www.linkedin.com/in/amyglencross",
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPage) }} />
      {[softwareApplicationSchema, mcpServerSchema].map((schema) => (
        <script key={schema["@id"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* 1. What this is */}
      <section className="mx-auto grid max-w-6xl gap-14 px-6 pt-32 pb-24 md:pt-40 lg:grid-cols-12 lg:items-center">
        <div className="min-w-0 lg:col-span-7">
          <h1
            className="font-display font-bold text-foreground"
            style={{ fontSize: "clamp(2.75rem, 5.5vw + 0.5rem, 4.75rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
          >
            Know what every AI agent will cost and save, before you build it.
          </h1>
          <p className="mt-6 max-w-xl font-body text-xl leading-relaxed text-muted-foreground">
            Agent Blueprint&reg; is software that turns a profile of your business
            into a ranked list of the AI agents worth building, each with a design
            and a business case.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/#contact" className={primaryButton}>
              Request access
              {arrow}
            </Link>
            <Link href="/#how" className={textLink}>
              See how it works
              {arrow}
            </Link>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <div
            className="rounded-xl px-8 py-8 shadow-lg"
            style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}
          >
            <p className="font-body text-sm" style={{ color: "var(--hero-muted)" }}>
              {example.label}
            </p>
            <dl className="mt-6 space-y-4">
              {example.rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-baseline justify-between gap-6 ${i < example.rows.length - 1 ? "border-b border-white/10 pb-4" : ""}`}
                >
                  <dt className="font-body text-base" style={{ opacity: 0.8 }}>{row.label}</dt>
                  <dd className="text-right font-display text-xl font-bold">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-body text-xs" style={{ color: "var(--hero-muted)" }}>
              {example.note}
            </p>
          </div>
        </div>
      </section>

      {/* 2. How it works */}
      <section id="how" className="scroll-mt-20 border-y border-border bg-secondary/40" aria-labelledby="how-heading">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 id="how-heading" className="max-w-3xl font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
            From a profile of your business to an agent your coding tools can build.
          </h2>
          <ol className="mt-14 grid gap-12 md:grid-cols-2">
            {steps.map((step, i) => (
              <li key={step.title}>
                <p className="font-display text-2xl font-bold text-muted-foreground">{i + 1}</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-3 font-body text-lg leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Firms and done-for-you */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground">For consulting firms</h2>
          <p className="mt-3 font-body text-lg leading-relaxed text-muted-foreground">
            Run it for your clients, with each client kept separate under one account.
          </p>
          <Link href="/consulting-firms" className={`${textLink} mt-5`}>
            How it works for firms
            {arrow}
          </Link>
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground">Rather have it done for you?</h2>
          <p className="mt-3 font-body text-lg leading-relaxed text-muted-foreground">
            NowGentic, the founders&apos; services company, runs fixed-price engagements using the software.
          </p>
          <a href="https://nowgentic.com" className={`${textLink} mt-5`} rel="noopener">
            See NowGentic
            {arrow}
          </a>
        </div>
      </section>

      {/* 4. Who */}
      <section id="team" className="scroll-mt-20 border-t border-border" aria-labelledby="team-heading">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 id="team-heading" className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Who&apos;s behind it
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {founders.map((f) => (
              <div key={f.name}>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  <a href={f.url} className="hover:text-primary" rel="noopener">
                    {f.name}
                  </a>
                </h3>
                <p className="mt-2 font-body text-lg leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
