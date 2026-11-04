import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { breadcrumbSchema, webPageSchema, siteConfig } from "@/lib/metadata";

const pageTitle = "Agent Blueprint | Know Whether Each AI Agent Is Worth It";

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

// Two ways in, one method. Keep these to things we can actually deliver today.
const paths = [
  {
    id: "start",
    eyebrow: "Starting out or in a pilot",
    title: "Set the number before you launch.",
    intro:
      "Most pilots never get a yes or a no because nobody wrote down what success looked like. We fix that before the first agent goes live.",
    steps: [
      {
        title: "Pick the first agents",
        text: "The one or two worth trying first, chosen on cost, risk and how easy the result is to measure.",
      },
      {
        title: "One page each",
        text: "What it's for, what it may do, who owns it, what it will cost, and today's number it has to beat by a set date.",
      },
      {
        title: "The 90-day call",
        text: "We measure what really happened and you get a plain answer: scale it, fix it or stop it.",
      },
    ],
    cta: "Start with one agent",
  },
  {
    id: "review",
    eyebrow: "Already running agents",
    title: "Know what you're paying for before you renew.",
    intro:
      "Start with the agent that costs you most, on whatever platform it runs. You come out with a clear answer and a page finance can sign off on, and we can do the rest before you renew.",
    steps: [
      {
        title: "What each agent costs",
        text: "Usage and billing for every agent, plus the people who check its work, turned into a monthly number.",
      },
      {
        title: "What it actually did",
        text: "Work your other systems confirm happened, not the agent's own account of it.",
      },
      {
        title: "Keep, fix or stop",
        text: "One page per agent with the call and the reasons, ready before you sign again.",
      },
    ],
    cta: "Review one agent",
  },
];

// What the one paid offer hands back.
const offerItems = [
  "Where you stand today, measured, not guessed",
  "The agent's one page: what it may do, who owns it, what it costs",
  "The number it has to hit, and the date",
  "A 90-day check-back with keep, fix or stop",
  "One summary finance can read",
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
            For whoever answers for the AI spend
          </p>
          <h1
            className="mt-5 max-w-4xl font-display font-bold text-foreground"
            style={{
              fontSize: "clamp(2.75rem, 6vw + 0.5rem, 5.25rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Know whether each AI agent is worth it.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
            Before you launch one, we set the number it has to hit. Once it&apos;s
            running, we show what it costs and what it really did. Either way you
            get a straight answer for each agent: keep it, fix it or stop it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#start"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-shadow hover:shadow-lg"
            >
              We&apos;re starting out
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#review"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-shadow hover:shadow-lg"
            >
              We already run agents
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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

      <section className="border-y border-border bg-secondary/40" aria-label="Two ways to start">
        <div className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-2">
          {paths.map((path) => (
            <section
              key={path.id}
              id={path.id}
              className="scroll-mt-20 bg-background px-6 py-14 md:px-10"
              aria-labelledby={`${path.id}-heading`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                {path.eyebrow}
              </p>
              <h2
                id={`${path.id}-heading`}
                className="mt-3 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl"
              >
                {path.title}
              </h2>
              <p className="mt-4 font-body leading-relaxed text-muted-foreground">{path.intro}</p>
              <ol className="mt-8 space-y-6">
                {path.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4 border-t border-border pt-5">
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">{step.title}</h3>
                      <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                href="/#offer"
                className="group mt-8 inline-flex items-center gap-2 font-body font-semibold text-primary"
              >
                {path.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </section>
          ))}
        </div>
        <p className="mx-auto max-w-6xl px-6 py-6 font-body text-sm text-muted-foreground">
          Not sure which one you are? The first call is free, and we&apos;ll tell you.
        </p>
      </section>

      <section id="offer" className="scroll-mt-20 mx-auto max-w-6xl px-6 pt-16" aria-labelledby="offer-heading">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">The offer</p>
            <h2 id="offer-heading" className="mt-3 font-display text-4xl font-bold leading-tight text-foreground">
              One agent, done properly.
            </h2>
            <p className="mt-4 font-body leading-relaxed text-muted-foreground">
              Pick the agent that matters most, planned or already running. We
              measure where you are today, set the number it has to hit, and come
              back at 90 days with a straight answer. Fixed price, agreed before
              we start.
            </p>
            <ul className="mt-6 space-y-2 font-body text-muted-foreground">
              {offerItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="text-accent">/</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-shadow hover:shadow-lg"
              >
                Book the free first call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/sample-review" className="group inline-flex items-center gap-2 font-body font-semibold text-primary">
                See a finished example
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                First five companies
              </p>
              <p className="mt-3 font-display text-2xl font-bold leading-snug text-foreground">
                Design partner pricing.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                A lower price in exchange for two things: we can use your numbers
                with your name removed, and you&apos;ll do a short case study
                with us.
              </p>
            </div>
            <div className="mt-4 rounded-lg border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Free blueprint
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                What an IT ticket triage agent needs, what not to let it touch,
                and the number to set before launch.
              </p>
              <Link
                href="/blueprints/it-ticket-triage"
                className="group mt-3 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary"
              >
                Read the blueprint
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="app-heading">
        <div className="grid gap-6 md:grid-cols-5 md:items-end">
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              The app
            </p>
            <h2 id="app-heading" className="mt-3 font-display text-4xl font-bold leading-tight text-foreground">
              Keep the answer current after day one.
            </h2>
            <p className="mt-4 font-body leading-relaxed text-muted-foreground">
              The app tracks every agent against the number it was set to hit,
              and keeps its cost, results and keep, fix or stop call up to date. It reads the platform&apos;s own records
              of what every agent did, so the numbers never come from the agent
              describing itself.
            </p>
          </div>
          <div className="md:col-span-2">
            <Link
              href="/servicenow"
              className="group inline-flex items-center gap-2 font-body font-semibold text-primary"
            >
              Available first for ServiceNow
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-6xl px-6" aria-labelledby="method-heading">
        <div
          className="grid gap-6 rounded-lg px-6 py-10 md:grid-cols-5 md:px-10"
          style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}
        >
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: "var(--hero-muted)" }}>
              Do it yourself, free
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
        . ServiceNow is a trademark of ServiceNow, Inc.
      </p>
    </>
  );
}
