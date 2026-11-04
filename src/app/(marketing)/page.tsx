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

const primaryButton =
  "group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-shadow hover:shadow-lg";
const textLink = "group inline-flex items-center gap-2 font-body font-semibold text-primary";
const arrow = <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />;

// Numbers here must match /sample-review exactly.
const heroCard = [
  { label: "Tickets sent to the wrong team", value: "22% → 14%", target: "Target 12%", met: false },
  { label: "Staff hours a month on tickets", value: "206 → 67", target: "Target 90", met: true },
];

const heroFacts = [
  `Fixed price, from ${offer.price}`,
  `Every agent before renewal: ${renewal.weeks}`,
  "New agent: decision at day 90",
  "Any platform",
];

// Two ways in, one offer. Keep these to things we can actually deliver today.
const paths = [
  {
    id: "start",
    eyebrow: "Starting out or in a pilot",
    title: "Set the number before you launch.",
    intro:
      "Most pilots never get a yes or a no, because nobody wrote down what success looked like.",
    steps: [
      "Pick the agent worth trying first, on cost, risk and how easy the result is to measure.",
      "Measure the metric it's meant to move, and write down who owns it, what it may do and what it will cost.",
      "Measure again at day 90 and decide: keep, fix or stop.",
    ],
  },
  {
    id: "review",
    eyebrow: "Already running agents",
    title: "Know what it's worth before you renew.",
    intro:
      "AI is being folded into renewals. We go through every live agent, even where the cost is buried in a bundle, and look hardest at the ones that cost most.",
    steps: [
      "Put a monthly number on each agent: its share of the AI bill, hosting, and the staff time spent checking its work.",
      "Measure what it did from your own systems, not from the agent's account of itself.",
      "Get a keep, fix or stop call on every agent and a renewal summary finance can sign off.",
    ],
  },
];

const renewalIncludes = [
  `Every live agent on one platform, up to ${renewal.agentsCovered}: its share of the AI bill, what it did, who owns it, and a first keep, fix or stop call`,
  `A full review of your ${renewal.deepReviews} most expensive agents: measured baseline, one-page record and a firm decision`,
  "A renewal summary for finance: what to keep, what to drop, and what that does to your pricing tier",
  `Ready ${renewal.weeks} after the data arrives. Best started 60 days or more before the renewal`,
];

const singleIncludes = [
  "A new agent or a pilot, or one running agent that matters most",
  "A measured baseline and a target written down in advance",
  "The agent's one-page record: what it may do, who owns it, what it costs",
  `A keep, fix or stop decision: three weeks after the data arrives for a running agent, at day 90 for a new one`,
];

const offerNeeds = [
  "One owner on your side. Choosing the scope is part of the free call",
  `${renewal.teamHours} of your team's time for a renewal review, about 8 for one agent: a kickoff, short check-ins, and two 1-hour sessions to confirm timings we take from your logs`,
  "Usage records and the history of the systems the agents work in. Read-only access, or we send the queries and your team runs them, so a security review doesn't hold things up",
];

const founders = [
  {
    initials: "CF",
    name: "Chris Faulkner",
    role: "Co-founder, San Diego",
    creds: ["Ex-ServiceNow, 10 years", "Certified Master Architect", "Measured 100 coding-agent runs"],
    bio: "Twenty years in enterprise technology, including ten at ServiceNow through its growth years. Ran our public benchmark of what coding-agent jobs cost.",
    url: "https://www.linkedin.com/in/cifaulkner",
  },
  {
    initials: "AG",
    name: "Amy Glencross",
    role: "Co-founder, Nashville",
    creds: ["Ex-Deloitte partner", "Practices in 3 countries", "20 years advising executives"],
    bio: "Built and led enterprise technology practices across Australia, the United States and Canada.",
    url: "https://www.linkedin.com/in/amyglencross",
  },
];

const freeResources = [
  {
    eyebrow: "Sample",
    title: "A finished review",
    text: "One agent at day 90, for a made-up company: the finance summary, the scorecard and the full page.",
    href: "/sample-review",
    cta: "See the sample",
  },
  {
    eyebrow: "Free blueprint",
    title: "IT ticket triage agent",
    text: "What it needs, what not to let it touch, how to test it, starter instructions and the number to set before launch.",
    href: "/blueprints/it-ticket-triage",
    cta: "Read the blueprint",
  },
  {
    eyebrow: "Free template",
    title: "The one-page agent record",
    text: "Write your own: purpose, authority, proof, owner, cost, promise and result, with a filled example.",
    href: "/agent-one-page-template",
    cta: "Get the template",
  },
];

function OfferCard({
  label,
  title,
  price,
  unit,
  partner,
  items,
  note,
  featured = false,
}: {
  label: string;
  title: string;
  price: string;
  unit: string;
  partner: string;
  items: string[];
  note: string;
  featured?: boolean;
}) {
  return (
    <div className={`min-w-0 rounded-xl border bg-card px-6 py-6 shadow-sm md:px-8 ${featured ? "border-primary" : "border-border"}`}>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{label}</p>
      <h3 className="mt-2 font-display text-2xl font-bold text-foreground">{title}</h3>
      <p className="mt-3 font-display text-5xl font-bold text-foreground">
        {price}{" "}
        <span className="block font-body text-base font-normal text-muted-foreground sm:ml-1 sm:inline">{unit}</span>
      </p>
      <p className="mt-1 font-body text-sm font-semibold text-accent">{partner}</p>
      <Bullets items={items} />
      <p className="mt-4 font-body text-sm text-muted-foreground">{note}</p>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 font-body leading-relaxed text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="text-accent">/</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPage) }} />
      {[softwareApplicationSchema, faqPageSchema, howToSchema, mcpServerSchema].map((schema) => (
        <script key={schema["@id"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero: the promise, one button, and the deliverable itself */}
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
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-28 pb-14 md:pt-36 lg:grid-cols-12 lg:items-center">
          <div className="min-w-0 lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              For IT directors, platform owners and finance leads
            </p>
            <h1
              className="mt-5 font-display font-bold text-foreground"
              style={{ fontSize: "clamp(2.75rem, 5.5vw + 0.5rem, 4.75rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
            >
              Know whether each AI agent is worth it.
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-muted-foreground">
              We measure what an agent really costs and what it really does,
              against a number set in advance. You get a straight answer: keep
              it, fix it or stop it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/#contact" className={primaryButton}>
                Request a free 30-minute call
                {arrow}
              </Link>
              <Link href="/#offer" className={textLink}>
                Price and what&apos;s included
                {arrow}
              </Link>
            </div>
            <p className="mt-3 font-body text-sm text-muted-foreground">
              We reply within one business day. Run by{" "}
              <Link href="/#team" className="text-primary underline underline-offset-4">
                an ex-ServiceNow Certified Master Architect and an ex-Deloitte partner
              </Link>
              .
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-body text-sm font-semibold text-foreground">
              {heroFacts.map((fact) => (
                <li key={fact} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {fact}
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
              Only 26% of leaders at billion-dollar companies say they can see
              what their AI costs to run, fully and in real time.{" "}
              <a href="https://kpmg.com/us/en/media/news/q2-ai-pulse-2026.html" className="text-primary underline underline-offset-4" rel="noopener">
                KPMG AI Pulse, June 2026, 204 leaders
              </a>
            </p>
          </div>

          <div className="min-w-0 lg:col-span-5">
            <Link
              href="/sample-review"
              className="group block rounded-lg px-6 py-7 shadow-lg transition-shadow hover:shadow-xl"
              style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--hero-muted)" }}>
                  What you get / sample, fictional
                </p>
                <span className="rounded-full bg-amber-300 px-3 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-900">
                  Fix
                </span>
              </div>
              <p className="mt-3 font-display text-3xl font-bold leading-tight">Verdict: Fix.</p>
              <p className="mt-1 font-body text-base" style={{ color: "var(--hero-fg)" }}>
                Ticket Sorter at day 90: one target missed, one beaten. Close one gap, keep it running.
              </p>
              <dl className="mt-5 space-y-3 font-body text-sm">
                {heroCard.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-sm" style={{ color: "var(--hero-fg)", opacity: 0.85 }}>{row.label}</dt>
                    <dd className="text-right">
                      <span className="text-base font-semibold">{row.value}</span>
                      <span className={`block text-sm ${row.met ? "text-emerald-300" : "text-amber-300"}`}>
                        {" "}
                        ({row.target}, {row.met ? "met" : "missed"})
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold">
                See the full sample
                {arrow}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Two ways in */}
      <section className="border-y border-border" aria-label="Two ways to start">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2 md:divide-x md:divide-border">
          {paths.map((path) => (
            <section
              key={path.id}
              id={path.id}
              className="scroll-mt-20 border-b border-border px-6 py-12 last:border-b-0 md:border-b-0 md:px-10"
              aria-labelledby={`${path.id}-heading`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{path.eyebrow}</p>
              <h2 id={`${path.id}-heading`} className="mt-3 font-display text-3xl font-bold leading-tight text-foreground">
                {path.title}
              </h2>
              <p className="mt-3 font-body leading-relaxed text-muted-foreground">{path.intro}</p>
              <ol className="mt-6 space-y-3">
                {path.steps.map((step, i) => (
                  <li key={step} className="flex gap-4 font-body leading-relaxed text-muted-foreground">
                    <span className="pt-1 font-mono text-xs text-accent">0{i + 1}</span>{" "}
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </section>

      {/* The offer: one card with price, contents, inputs and terms */}
      <section id="offer" className="scroll-mt-20 mx-auto max-w-6xl px-6 py-16" aria-labelledby="offer-heading">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">The offer</p>
        <h2 id="offer-heading" className="mt-3 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
          A keep, fix or stop decision, for a fixed fee.
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <OfferCard
            label="Already running agents"
            title={renewal.name}
            price={renewal.price}
            unit="fixed, per platform"
            partner={`${renewal.designPartnerPrice} for design partners`}
            items={renewalIncludes}
            note={`More full reviews: ${renewal.extraDeepReview} each.`}
            featured
          />
          <OfferCard
            label="New agent or pilot"
            title="One agent"
            price={offer.price}
            unit="fixed, per agent"
            partner={`${offer.designPartnerPrice} for design partners`}
            items={singleIncludes}
            note="After a Fix, one recheck is included."
          />
        </div>

        <div className="mt-6 grid gap-6 rounded-xl border border-border bg-card px-6 py-6 md:grid-cols-3 md:px-8">
          <div className="min-w-0 md:col-span-2">
            <h3 className="font-display text-xl font-bold text-foreground">What we need from you</h3>
            <Bullets items={offerNeeds} />
          </div>
          <div className="min-w-0 rounded-lg border border-emerald-700/30 bg-emerald-50 px-5 py-4">
            <p className="font-display text-xl font-bold text-foreground">Refund guarantee</p>
            <p className="mt-1 font-body text-sm leading-relaxed text-foreground">
              Half at kickoff, half with the decision. If your finance lead won&apos;t
              sign off that the numbers were measured the way we agreed, we refund
              all of it.
            </p>
          </div>
          <p className="font-body text-sm leading-relaxed text-muted-foreground md:col-span-3">
            We&apos;re new, so the first {offer.designPartnerSeats} companies pay half in return for letting us use their numbers,
            names removed, and a short case study. Fixing an agent isn&apos;t part of the fee: NowGentic quotes a fix only if you ask
            in writing after the decision is signed off. Independence and data handling are in the{" "}
            <Link href="/#questions" className="text-primary underline underline-offset-4">questions below</Link>.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/#contact" className={primaryButton}>
            Request a free 30-minute call
            {arrow}
          </Link>
          <Link href="/sample-review" className={textLink}>
            See a finished example
            {arrow}
          </Link>
        </div>
      </section>

      {/* Who you'd work with */}
      <section id="team" className="scroll-mt-20 border-y border-border bg-secondary/40" aria-labelledby="team-heading">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 id="team-heading" className="font-display text-3xl font-bold leading-tight text-foreground">
            The founders do the work.
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {founders.map((f) => (
              <div key={f.name} className="flex gap-5">
                <div
                  aria-hidden
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-xl font-bold"
                  style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}
                >
                  {f.initials}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    <a href={f.url} className="hover:text-primary" rel="noopener">
                      {f.name}
                    </a>
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{f.role}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {f.creds.map((c) => (
                      <li key={c} className="rounded-full border border-border bg-background px-3 py-1 font-body text-xs font-medium text-foreground">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-body leading-relaxed text-muted-foreground">{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free resources */}
      <section id="free" className="scroll-mt-20 mx-auto max-w-6xl px-6 py-16" aria-labelledby="free-heading">
        <h2 id="free-heading" className="font-display text-3xl font-bold leading-tight text-foreground">
          See the method before you talk to us. Free, no sign-up.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {freeResources.map((r) => (
            <Link key={r.href} href={r.href} className="group flex min-w-0 flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{r.eyebrow}</p>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground">{r.title}</h3>
              <p className="mt-2 flex-1 font-body leading-relaxed text-muted-foreground">{r.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary">
                {r.cta}
                {arrow}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="questions" className="scroll-mt-20 border-t border-border" aria-labelledby="questions-heading">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 id="questions-heading" className="font-display text-3xl font-bold leading-tight text-foreground">
            Questions people ask first
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {homeFaqs.map((f) => (
              <div key={f.q}>
                <dt className="font-display text-xl font-bold text-foreground">{f.q}</dt>
                <dd className="mt-2 font-body leading-relaxed text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
