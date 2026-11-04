import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import {
  breadcrumbSchema,
  webPageSchema,
  siteConfig,
  faqPageSchema,
  howToSchema,
  mcpServerSchema,
  softwareApplicationSchema,
} from "@/lib/metadata";
import { offer, renewal, homeFaqs } from "@/lib/offer";

// Keep this page sparse. One message per section: a headline, a sentence or
// two, and at most one visual or button. No eyebrow labels, pills, badge rows
// or extra captions. If something is added, take something else out.

const pageTitle = "Agent Blueprint | Know Whether Each AI Agent Is Worth It";

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

// Numbers must match /sample-review: costs $2,000 AI share + $80 hosting +
// $820 staff time = $2,900 a month; saves 139 staff hours = $5,560 a month.
const example = [
  { label: "Costs", value: "$2,900 a month" },
  { label: "Saves", value: "$5,560 a month in staff time" },
];

// Like a building: the plan, the as-built record, the inspection. Only claim
// what the two offers in offer.ts deliver today (no monthly refresh yet).
const blueprint = [
  {
    title: "The plan",
    text: "Before you build: what the agent will do, what it can touch, what it will cost, and the saving it has to hit by a set date.",
  },
  {
    title: "The as-built",
    text: "Once it's live: what was actually built, who owns it, and what it costs to run, including its share of a license or credit pool.",
  },
  {
    title: "The inspection",
    text: "At day 90 and before every renewal: what it actually saved, measured from your own systems, and whether to keep, fix or stop it.",
  },
];

const prices = [
  { price: offer.price, title: "One agent", text: "Planned or already running." },
  { price: renewal.price, title: "Every live agent", text: `Before your renewal. Up to ${renewal.agentsCovered} agents, ready in ${renewal.weeks}.` },
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
      {[softwareApplicationSchema, faqPageSchema, howToSchema, mcpServerSchema].map((schema) => (
        <script key={schema["@id"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* 1. What this is */}
      <section className="mx-auto grid max-w-6xl gap-14 px-6 pt-32 pb-24 md:pt-40 lg:grid-cols-12 lg:items-center">
        <div className="min-w-0 lg:col-span-7">
          <h1
            className="font-display font-bold text-foreground"
            style={{ fontSize: "clamp(2.75rem, 5.5vw + 0.5rem, 4.75rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
          >
            Know what every AI agent will cost and save.
          </h1>
          <p className="mt-6 max-w-xl font-body text-xl leading-relaxed text-muted-foreground">
            Before you build it, and after it&apos;s live. One page per agent, in
            dollars, ending in a clear call: keep, fix or stop.
          </p>
          <div className="mt-10">
            <Link href="/#contact" className={primaryButton}>
              Book a free call
              {arrow}
            </Link>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <Link
            href="/sample-review"
            className="group block rounded-xl px-8 py-8 shadow-lg transition-shadow hover:shadow-xl"
            style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}
          >
            <p className="font-body text-sm" style={{ color: "var(--hero-muted)" }}>
              Example: a ticket-sorting agent
            </p>
            <dl className="mt-6 space-y-4">
              {example.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-4">
                  <dt className="font-body text-base" style={{ opacity: 0.8 }}>{row.label}</dt>
                  <dd className="text-right font-display text-2xl font-bold">{row.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6">
                <dt className="font-body text-base" style={{ opacity: 0.8 }}>Verdict</dt>
                <dd className="font-display text-2xl font-bold text-amber-300">Fix</dd>
              </div>
            </dl>
            <span className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold">
              See the full example
              {arrow}
            </span>
          </Link>
        </div>
      </section>

      {/* 2. Why it matters */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
            AI spending grows faster than anyone can explain it.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-xl leading-relaxed text-muted-foreground">
            Agents get approved without a target, the cost hides inside licenses
            and credit pools, and no one owns the result. So no one can say what
            they actually save.
          </p>
        </div>
      </section>

      {/* 3. What you get */}
      <section className="mx-auto max-w-6xl px-6 py-24" aria-labelledby="blueprint-heading">
        <h2 id="blueprint-heading" className="max-w-3xl font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
          A blueprint for every agent, from plan to inspection.
        </h2>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {blueprint.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-2xl font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 font-body text-lg leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Price */}
      <section id="offer" className="scroll-mt-20 border-y border-border bg-secondary/40" aria-labelledby="offer-heading">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 id="offer-heading" className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Fixed prices.
          </h2>
          <div className="mt-12 grid gap-12 sm:grid-cols-2">
            {prices.map((p) => (
              <div key={p.title}>
                <p className="font-display text-6xl font-bold text-foreground">{p.price}</p>
                <h3 className="mt-4 font-display text-2xl font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 font-body text-lg leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl font-body leading-relaxed text-muted-foreground">
            Pay half to start. If the numbers aren&apos;t measured the way we agreed, you get it all back.
            Our first {offer.designPartnerSeats} clients pay half.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link href="/#contact" className={primaryButton}>
              Book a free call
              {arrow}
            </Link>
            <Link href="/sample-review" className={textLink}>
              See the full example
              {arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Who */}
      <section id="team" className="scroll-mt-20 mx-auto max-w-6xl px-6 py-24" aria-labelledby="team-heading">
        <h2 id="team-heading" className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
          The founders do the work.
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
      </section>

      {/* 6. Questions (also the FAQ structured data, so keep them visible) */}
      <section id="questions" className="scroll-mt-20 border-t border-border" aria-labelledby="questions-heading">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h2 id="questions-heading" className="font-display text-4xl font-bold leading-tight text-foreground">
            Questions
          </h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {homeFaqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-bold text-foreground">
                  {f.q}
                  <span aria-hidden className="font-body text-2xl font-normal text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 font-body leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactSection
        eyebrow=""
        heading="Book a free call"
        intro="Tell us which agents you're planning or running, and when your AI renewal is. We'll reply with times for a 30-minute call."
        submitLabel="Book a free call"
      />
    </>
  );
}
