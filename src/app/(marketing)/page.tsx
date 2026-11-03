import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { breadcrumbSchema, webPageSchema, siteConfig } from "@/lib/metadata";
import { storeListingUrl } from "@/lib/store-app";

const pageTitle = "Agent Blueprint | What Your AI Agents Can Do, and Whether They're Worth It";

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

// The four questions the page answers for each agent. "today" says honestly
// which free piece answers it now.
const questions = [
  {
    q: "What can it do?",
    a: "What it can read, what it can change, and where a person has to say yes first.",
    today: "The agent draws this itself.",
  },
  {
    q: "Who answers for it?",
    a: "One named person, and the exact way to stop it if it does something it shouldn't.",
    today: "The one-page template has a place for both.",
  },
  {
    q: "Is it worth it?",
    a: "What it costs to run, including the people checking its work, and the number it has to hit by a set date.",
    today: "The one-page template walks through it.",
  },
  {
    q: "Has it changed?",
    a: "Agents pick up new tools and settings. Compare today's drawing with the one you approved.",
    today: "Redraw it and the page shows what's new.",
  },
];

const steps = [
  {
    n: "01",
    title: "Draw one agent",
    text: "Paste one line into the agent. It lists every tool it has, sorts what reads from what changes things, and says what it can't tell about itself. No sign-up, and the drawing stays on your computer.",
    href: "/personal",
    cta: "Draw an agent",
  },
  {
    n: "02",
    title: "Write its one page",
    text: "Add who owns it, what it costs, and the result it has to show, so a boss, a security reviewer or finance can say yes or no.",
    href: "/agent-one-page-template",
    cta: "Get the free template",
  },
  {
    n: "03",
    title: "Check it again",
    text: "Redraw it after a model update or a new connection. New tools, and anything that stopped asking first, show up on the page.",
    href: "/personal",
    cta: "See how comparing works",
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
            For companies running AI agents
          </p>
          <h1
            className="mt-5 max-w-4xl font-display font-bold text-foreground"
            style={{
              fontSize: "clamp(2.75rem, 6vw + 0.5rem, 5.25rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Know what your agents can do, and whether they&apos;re worth it.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
            Most teams can&apos;t say what each of their agents can touch, who
            answers for it, or whether it pays for itself. A blueprint puts that
            on one plain page per agent, and you can start with one agent today
            for free.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/personal"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-shadow hover:shadow-lg"
            >
              Start with one agent
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-body font-semibold text-foreground transition-colors hover:border-primary"
            >
              Talk to us about a team
            </Link>
          </div>
          <p className="mt-3 font-body text-sm text-muted-foreground">
            No sign-up. The drawing stays on your computer.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40" aria-labelledby="questions-heading">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 id="questions-heading" className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Four questions for every agent
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {questions.map((item) => (
              <div key={item.q}>
                <h3 className="font-display text-2xl font-bold text-foreground">{item.q}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
                <p className="mt-3 font-mono text-xs text-primary">{item.today}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">
            In an April 2026 survey of 750 technology leaders, 7.2% said one named
            person was formally accountable for what their AI agents do.{" "}
            <a
              href="https://www.gravitee.io/state-of-ai-agent-security"
              className="text-primary underline underline-offset-4"
              rel="noopener"
            >
              Gravitee, State of AI Agent Security
            </a>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Start with one agent
        </h2>
        <p className="mt-3 max-w-2xl font-body leading-relaxed text-muted-foreground">
          Every step is free and works on any agent that can read its own tool
          list. Do it for the one you worry about most, then the next.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <Link
              key={step.n}
              href={step.href}
              className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {step.n}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 font-body font-semibold text-primary">
                {step.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-6xl px-6" aria-labelledby="team-heading">
        <div
          className="rounded-lg px-6 py-10 md:px-10"
          style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}
        >
          <h2 id="team-heading" className="font-display text-3xl font-bold md:text-4xl">
            More than a few agents?
          </h2>
          <p className="mt-3 max-w-2xl font-body leading-relaxed" style={{ color: "var(--hero-muted)" }}>
            We can help you draw the agents your teams already run, write the pages
            for the ones that matter, and set a date to check the numbers. Tell us
            what you&apos;re running and we&apos;ll take it from there.
          </p>
          <Link
            href="/#contact"
            className="group mt-6 inline-flex items-center gap-2 font-body font-semibold"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
          <Link href={storeListingUrl ?? "/servicenow"} className="group block">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              On ServiceNow
            </p>
            <p className="mt-2 font-body leading-relaxed text-foreground">
              We&apos;re building an app for the ServiceNow Store that shows every
              agent you pay for, and what to keep, fix or rethink at renewal.{" "}
              <span className="font-semibold text-primary">
                {storeListingUrl ? "Get it on the Store" : "See the app"}
              </span>
            </p>
          </Link>
          <Link href="/agents" className="group block">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Before your agent reads anything from us
            </p>
            <p className="mt-2 font-body leading-relaxed text-foreground">
              Read every word we give it, with fingerprints so you can check
              nothing changed.{" "}
              <span className="font-semibold text-primary">See what your agent gets</span>
            </p>
          </Link>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
