import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { SampleFrame } from "@/components/sample-frame";
import { breadcrumbSchema, webPageSchema, siteConfig } from "@/lib/metadata";
import { storeListingUrl } from "@/lib/store-app";

const pageTitle = "Agent Blueprint | Know What Each AI Agent Costs and Whether to Keep It";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: siteConfig.description,
  alternates: { canonical: "/", types: { "text/markdown": "/index.md" } },
  openGraph: { title: pageTitle, description: siteConfig.description },
  twitter: { title: pageTitle, description: siteConfig.description },
};

const homeBreadcrumb = breadcrumbSchema([]);
const homeWebPage = webPageSchema({
  name: pageTitle,
  description: siteConfig.description,
  path: "/",
  datePublished: "2025-09-15",
  dateModified: "2026-11-03",
});

// What a review hands back. Keep this to things we can actually deliver today.
const reviewSteps = [
  {
    n: "01",
    title: "What each agent costs",
    text: "We read the usage and billing data for every agent you run, including the people who check its work, and put a monthly number on each one.",
  },
  {
    n: "02",
    title: "What it actually did",
    text: "Work your other systems confirm happened, not the agent's own account of it. Where there's no starting number, we say so and set one.",
  },
  {
    n: "03",
    title: "Keep, fix or rethink",
    text: "One page per agent with the call and the reasons, plus a single page for finance. Ready before you sign the renewal.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPage) }}
      />

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(var(--blueprint-grid) 1px, transparent 1px), linear-gradient(90deg, var(--blueprint-grid) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(to bottom, black 40%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-12 md:pt-40 md:pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            For whoever owns the AI budget
          </p>
          <h1
            className="mt-5 max-w-4xl font-display font-bold text-foreground"
            style={{
              fontSize: "clamp(2.75rem, 6vw + 0.5rem, 5.25rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Know what each AI agent costs, and whether it&apos;s worth keeping.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
            AI is being folded into renewals and billed per use, and most teams
            can&apos;t say what a single agent costs or what it has done for
            them. We help you answer that, agent by agent, before you sign again.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-shadow hover:shadow-lg"
            >
              Book a review
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={storeListingUrl ?? "/servicenow"}
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-body font-semibold text-foreground transition-colors hover:border-primary"
            >
              {storeListingUrl ? "Get the ServiceNow app" : "See the ServiceNow app"}
            </Link>
          </div>
          <p className="mt-10 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">
            In a June 2026 survey of 204 leaders at billion-dollar companies, 26%
            said they had full, real-time visibility into what their AI costs to
            run.{" "}
            <a
              href="https://kpmg.com/us/en/media/news/q2-ai-pulse-2026.html"
              className="text-primary underline underline-offset-4"
              rel="noopener"
            >
              KPMG AI Pulse, Q2 2026
            </a>
          </p>
        </div>
      </section>

      <section id="review" className="scroll-mt-20 border-y border-border bg-secondary/40" aria-labelledby="review-heading">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            The review
          </p>
          <h2 id="review-heading" className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-foreground">
            Before your renewal, we go through every agent with you.
          </h2>
          <p className="mt-4 max-w-2xl font-body leading-relaxed text-muted-foreground">
            It works on any platform you run agents on. ServiceNow is where we
            know the platform deepest, and we&apos;ll tell you plainly if yours is
            new ground for us.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {reviewSteps.map((step) => (
              <div key={step.n} className="border-t border-border pt-5">
                <p className="font-mono text-xs text-muted-foreground">{step.n}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
          <Link
            href="/#contact"
            className="group mt-10 inline-flex items-center gap-2 font-body font-semibold text-primary"
          >
            Book a review
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="app-heading">
        <div className="grid gap-6 md:grid-cols-5 md:items-end">
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              The app, on ServiceNow first
            </p>
            <h2 id="app-heading" className="mt-3 font-display text-4xl font-bold leading-tight text-foreground">
              The same view, kept current inside your instance.
            </h2>
            <p className="mt-4 font-body leading-relaxed text-muted-foreground">
              Assists used against your yearly pool, every agent sorted into
              keep, fix or rethink, and a page finance can read. It reads what
              ServiceNow already records about each agent, so the numbers
              aren&apos;t the agent describing itself.
            </p>
          </div>
          <div className="md:col-span-2">
            <Link
              href={storeListingUrl ?? "/servicenow"}
              className="group inline-flex items-center gap-2 font-body font-semibold text-primary"
            >
              {storeListingUrl ? "Get it on the ServiceNow Store" : "See where the app is heading"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {!storeListingUrl && (
              <p className="mt-2 font-body text-sm text-muted-foreground">
                Not in the ServiceNow Store yet. It still has to pass
                ServiceNow&apos;s certification.
              </p>
            )}
          </div>
        </div>
        <div className="mt-8">
          <SampleFrame
            src="/samples/servicenow.html"
            title="Mockup of the planned renewal view for a fictional company"
            label="MOCKUP / fictional company and numbers"
            height={560}
            still
          />
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-6xl px-6" aria-labelledby="method-heading">
        <div
          className="grid gap-6 rounded-lg px-6 py-10 md:grid-cols-5 md:px-10"
          style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}
        >
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: "var(--hero-muted)" }}>
              The method, free
            </p>
            <h2 id="method-heading" className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              One page per agent, written before it goes live.
            </h2>
            <p className="mt-4 font-body leading-relaxed" style={{ color: "var(--hero-muted)" }}>
              What it&apos;s for, what it&apos;s allowed to do, who answers for it,
              what it costs, and the number it has to hit by a set date. Then the
              check-back, where you record what really happened. Use it on any
              platform, with or without us.
            </p>
          </div>
          <div className="flex items-end md:col-span-2">
            <Link
              href="/agent-one-page-template"
              className="group inline-flex items-center gap-2 font-body font-semibold"
            >
              Get the free template
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />

      <p className="mx-auto max-w-6xl px-6 pb-8 font-body text-xs leading-relaxed text-muted-foreground">
        Reviews are delivered by{" "}
        <a href="https://nowgentic.com" className="underline underline-offset-4">
          NowGentic
        </a>
        , a ServiceNow partner. ServiceNow is a trademark of ServiceNow, Inc.
        Agent Blueprint isn&apos;t affiliated with or endorsed by ServiceNow.
      </p>
    </>
  );
}
