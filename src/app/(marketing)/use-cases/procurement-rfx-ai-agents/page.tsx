import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, Network, ShieldCheck } from "lucide-react";

import { BlueprintGrid } from "@/components/blueprint-grid";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const pagePath = "/use-cases/procurement-rfx-ai-agents";
const pageDescription =
  "Design procurement RFx AI agents for RFP, RFQ, and RFI workflows with a 6-agent blueprint pattern, ROI model, and implementation plan.";

export const metadata: Metadata = {
  title: "Procurement RFx AI Agents | 6-Agent Blueprint Pattern",
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  keywords: [
    "procurement AI agents",
    "RFP automation",
    "RFQ automation",
    "RFI automation",
    "vendor evaluation AI",
    "strategic sourcing agents",
    "procurement workflow automation",
  ],
  openGraph: {
    title: "Procurement RFx AI Agents | Agent Blueprint",
    description: pageDescription,
  },
  twitter: {
    title: "Procurement RFx AI Agents | Agent Blueprint",
    description: pageDescription,
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Procurement RFx AI Agents", path: pagePath },
]);

const webPage = webPageSchema({
  name: "Procurement RFx AI Agents | Agent Blueprint",
  description: pageDescription,
  path: pagePath,
  datePublished: "2026-05-01",
  dateModified: "2026-05-01",
});

const agentTeam = [
  {
    name: "Intake Agent",
    role: "Extracts RFx requirements from RFP, RFQ, RFI, email, forms, and attachments.",
  },
  {
    name: "Requirements Agent",
    role: "Normalizes requirements, flags gaps, and creates a scoring rubric procurement can audit.",
  },
  {
    name: "Vendor Matching Agent",
    role: "Shortlists qualified vendors from supplier data, past performance, and constraint filters.",
  },
  {
    name: "Compliance Agent",
    role: "Checks policy, regulatory, security, and sourcing requirements before decisions move forward.",
  },
  {
    name: "Evaluation Agent",
    role: "Scores responses, compares tradeoffs, and prepares an award recommendation for review.",
  },
  {
    name: "Communication Agent",
    role: "Drafts clarification requests, status updates, vendor messages, and stakeholder summaries.",
  },
];

const signals = [
  "RFP cycles take weeks because requirements, scoring, and communications are manually coordinated.",
  "Vendor scoring is inconsistent across buyers, categories, or regions.",
  "Compliance checks happen late, creating rework near award decisions.",
  "Procurement wants automation but still needs human approval over sourcing outcomes.",
];

export default function ProcurementRfxAiAgentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPage),
        }}
      />
      <BlueprintGrid>
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-4xl">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Procurement RFx Automation
              </span>
              <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
                Procurement RFx AI agents for RFP, RFQ, and RFI workflows
              </h1>
              <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
                Agent Blueprint designs a 6-agent procurement RFx team that
                handles intake, requirements, vendor matching, compliance,
                evaluation, and communication. The output is not a slide deck;
                it becomes a business case, implementation plan, and Agent
                Skills package that coding agents can use to build.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="https://app.agentblueprint.ai"
                  className="btn-metallic inline-flex h-10 items-center justify-center gap-2 px-6 font-body text-sm font-semibold text-accent-foreground transition-all duration-200"
                >
                  Generate a blueprint <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/developers"
                  className="btn-blueprint-outline inline-flex h-10 items-center justify-center px-6 font-body text-sm font-medium transition-all duration-200"
                >
                  Connect the MCP server
                </Link>
              </div>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: FileSearch,
                  label: "Scope",
                  text: "RFP, RFQ, and RFI workflows from intake through award recommendation.",
                },
                {
                  icon: Network,
                  label: "Pattern",
                  text: "Orchestrator-workers with parallel vendor matching and compliance checks.",
                },
                {
                  icon: ShieldCheck,
                  label: "Controls",
                  text: "Human approval gates for scoring, compliance exceptions, and award decisions.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-border bg-background/80 p-6 backdrop-blur-sm"
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  <h2 className="mt-4 font-display text-2xl text-foreground">
                    {item.label}
                  </h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-background/70 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Agent Team
              </span>
              <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
                The 6-agent RFx architecture
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                The RFx pattern gives each procurement task a clear owner while
                keeping sourcing decisions under human control. Agent Blueprint
                customizes these roles to your supplier data, approval policy,
                scoring model, and target platform.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {agentTeam.map((agent, index) => (
                <div
                  key={agent.name}
                  className="border border-border bg-background p-5"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-foreground">
                    {agent.name}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                    {agent.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
            <div>
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                When to Use It
              </span>
              <h2 className="mt-4 font-display text-3xl text-foreground md:text-4xl">
                Use this pattern when RFx work is slow, inconsistent, or hard to audit
              </h2>
            </div>
            <div className="space-y-4">
              {signals.map((signal) => (
                <div key={signal} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">
                    {signal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="border border-border bg-[var(--navy)]/[0.03] p-6 md:p-10">
              <h2 className="font-display text-3xl text-foreground md:text-4xl">
                From pattern to implementation
              </h2>
              <p className="mt-4 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground md:text-base">
                The public pattern is the starting point. Agent Blueprint turns
                it into a tailored blueprint with ROI, pilot scope, success
                metrics, integration assumptions, deployment phases, and files a
                coding agent can read directly.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="https://app.agentblueprint.ai"
                  className="btn-metallic inline-flex h-10 items-center justify-center gap-2 px-6 font-body text-sm font-semibold text-accent-foreground transition-all duration-200"
                >
                  Start in Agent Blueprint <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="https://github.com/agent-blueprint/agent-blueprint-skills"
                  className="btn-blueprint-outline inline-flex h-10 items-center justify-center px-6 font-body text-sm font-medium transition-all duration-200"
                >
                  View open-source skills
                </Link>
              </div>
            </div>
          </div>
        </section>
      </BlueprintGrid>
    </>
  );
}
