import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";
import { licensing } from "@/lib/offer";

// Linked from the footer only: the homepage stays written for buyers.
// No prices here until they are set in src/lib/offer.ts (licensing).

const title = "For Consulting Firms: License the Agent Blueprint Method";
const description =
  "Consulting firms can license the Agent Blueprint method to review their own clients' AI agents: the method, templates, sample deliverables, the name, and the app when it's ready. A yearly subscription plus a set fee per review.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/consulting-firms", types: { "text/markdown": "/consulting-firms.md" } },
};

const breadcrumb = breadcrumbSchema([{ name: "For consulting firms", path: "/consulting-firms" }]);
const webPage = webPageSchema({
  name: title,
  description,
  path: "/consulting-firms",
  datePublished: "2026-11-03",
  dateModified: "2026-11-03",
});

const included = [
  {
    title: "The method",
    text: "Every step of the review, written down: setting the number an agent has to hit, measuring the starting point from the client's own records, splitting a bundled AI bill by each agent's share of usage, keeping cash and staff time apart, and reaching keep, fix or stop. You get each update as the method improves.",
  },
  {
    title: "Templates",
    text: "The one-page record for each agent, the scorecard, and the summary for finance, ready to fill in. Plus the blueprints for common agents, starting with IT ticket triage.",
    link: { href: "/agent-one-page-template", label: "See the one-page template" },
  },
  {
    title: "Sample deliverables",
    text: "Finished examples to show a client what they'll get before they sign, like the public sample of one agent reviewed at day 90.",
    link: { href: "/sample-review", label: "See the sample review" },
  },
  {
    title: "The name",
    text: "The right to call your work an Agent Blueprint review, so your client knows the numbers were measured the published way and can be compared with other reviews.",
  },
  {
    title: "The app, when it's ready",
    text: "An app that keeps each agent's cost, results and decision current after the review, so the numbers don't go stale before the next renewal. It's in development, starting with ServiceNow, which already records usage for each agent.",
    link: { href: "/servicenow", label: "See where the app is heading" },
  },
];

const howItWorks = [
  {
    title: "A yearly subscription",
    text: "Covers the method, the templates, updates, and use of the name.",
  },
  {
    title: "A set fee for each review",
    text: "Paid to Agent Blueprint for each review your firm delivers.",
  },
  {
    title: "Your client, your price",
    text: "You contract with your client, set your own price, and keep what you earn above the fees.",
  },
  {
    title: "One agreement for everyone",
    text: "Every firm signs the same agreement at the same price. No firm gets a better deal, including one the founders run.",
  },
];

const rules = [
  {
    title: "Fix work waits for the decision",
    points: [
      "Whoever owns the client's IT budget signs off the decision before anyone talks about fixing the agent.",
      "Quote a fix only when the client asks in writing, at a fixed price, and tell them they're free to use anyone.",
      "If your firm does the fix and the recheck shows the agent still misses its target, you redo it for free.",
    ],
  },
  {
    title: "Stay independent",
    points: [
      "Never review an agent your firm built or sold.",
      "Take no commission from a software vendor on anything a review recommends.",
      "Tell the client in writing about any partnership you hold with the platform under review.",
    ],
  },
  {
    title: "Measure the same way",
    points: [
      "Write down the target and the date before measuring, and agree at kickoff where each number comes from.",
      "Take results from the client's own systems, not from the agent's account of itself.",
      "Keep staff time, new cash, and the agent's share of an AI bill the client already pays apart.",
      "Split a bundled AI bill by each agent's share of recorded usage. Where usage isn't logged per agent, estimate it and mark it lower confidence.",
      "Unless the client sets another bar, clearly better means at least a fifth better than the starting number.",
      "End every review with keep, fix or stop, and nothing else.",
    ],
  },
  {
    title: "Handle data the same way",
    points: [
      "Use read-only access, or send queries for the client's team to run.",
      "Keep only the numbers on the summary, and delete working data 30 days after the decision.",
      "Share the summary numbers with Agent Blueprint, with names removed, under a clause in the client's contract. They build the benchmarks every firm will use.",
    ],
  },
];

const faqs = [
  {
    q: "Do you compete with the firms you license?",
    a: "Agent Blueprint itself doesn't sell reviews or fix agents. It licenses the method and builds the app. NowGentic, the founders' services company, does deliver reviews. It follows these same rules, and any license it holds is on the same agreement and price as every other firm's.",
  },
  {
    q: "Do our clients need to be on ServiceNow?",
    a: "No. The review works on any platform. Only the app starts on ServiceNow.",
  },
  {
    q: "How do you keep the name meaningful?",
    a: "We check a sample of each firm's reviews against these rules. A firm that breaks them loses the right to use the name.",
  },
];

const pricesSet = Boolean(licensing.subscription && licensing.perReview);

export default function ConsultingFirmsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />

      <section className="mx-auto max-w-4xl px-6 pt-28 pb-12 md:pt-36">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          For consulting firms
        </p>
        <h1
          className="mt-4 font-display font-bold text-foreground"
          style={{
            fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Review your clients&apos; AI agents with the Agent Blueprint method.
        </h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
          Agent Blueprint licenses its method to consulting firms. A licensed
          firm runs the review for its own clients: it measures what each AI
          agent really costs and does, against a number set in advance, and
          ends with keep, fix or stop. You get the method, the templates,
          sample deliverables, the name, and the app when it&apos;s ready. You
          pay a yearly subscription plus a set fee for each review.
        </p>
        <div className="mt-7 flex flex-col gap-4 rounded-lg border border-primary/25 bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <span>
            <span className="block font-mono text-xs uppercase tracking-[0.14em] text-accent">
              {pricesSet ? "Prices" : "Prices not published yet"}
            </span>
            <span className="mt-1 block font-body leading-relaxed text-foreground">
              {pricesSet
                ? `${licensing.subscription} a year, plus ${licensing.perReview} for each review you deliver.`
                : "We're starting with a small number of firms. Tell us about yours and we'll walk you through the terms."}
            </span>
          </span>
          <Link href="#contact" className="group inline-flex shrink-0 items-center gap-2 font-body font-semibold text-primary">
            Ask about licensing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16" aria-labelledby="included-heading">
        <h2 id="included-heading" className="font-display text-3xl font-bold text-foreground">
          What a licensed firm gets
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="font-display text-2xl font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              {item.link && (
                <Link href={item.link.href} className="group mt-3 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary">
                  {item.link.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40" aria-labelledby="how-heading">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 id="how-heading" className="font-display text-3xl font-bold text-foreground">
            How licensing works
          </h2>
          <p className="mt-3 max-w-3xl font-body leading-relaxed text-muted-foreground">
            Agent Blueprint earns from licenses and the app, never from
            reviews or fix work. Your firm does the review and owns the client
            relationship.
          </p>
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            {howItWorks.map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-5">
                <dt className="font-display text-xl font-bold text-foreground">{item.title}</dt>
                <dd className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16" aria-labelledby="rules-heading">
        <h2 id="rules-heading" className="font-display text-3xl font-bold text-foreground">
          The rules every licensed firm follows
        </h2>
        <p className="mt-3 font-body leading-relaxed text-muted-foreground">
          The name is only worth something if every review is done the same
          way. These rules are part of the agreement, and they match the terms
          the reviews on this site are sold on.
        </p>
        <div className="mt-8 space-y-10">
          {rules.map((rule) => (
            <div key={rule.title}>
              <h3 className="font-display text-2xl font-bold text-foreground">{rule.title}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 font-body leading-relaxed text-muted-foreground">
                {rule.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16" aria-labelledby="questions-heading">
        <h2 id="questions-heading" className="font-display text-3xl font-bold text-foreground">
          Questions firms ask
        </h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <h3 className="font-display text-xl font-bold text-foreground">{faq.q}</h3>
              <p className="mt-2 font-body leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactSection
        eyebrow="Licensing"
        heading="Talk to us about licensing"
        intro="Tell us about your firm: who your clients are, which platforms they run agents on, and how many reviews a year you'd expect. We'll reply with times for a call and walk you through the terms."
        messagePlaceholder="Your clients, their platforms, and how many reviews a year you'd expect"
        submitLabel="Ask about licensing"
      />
    </>
  );
}
