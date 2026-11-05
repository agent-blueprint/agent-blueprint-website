import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";
import { licensing } from "@/lib/offer";

// Firms run the Agent Blueprint software for their clients (how Agiro uses it).
// Software only: no review rules, review pricing or "licensed partner" claims.
// Keep it sparse, like the homepage.

const title = "For Consulting Firms";
const description =
  "Consulting firms use Agent Blueprint software to profile each client, rank the AI agents worth building, and produce an agent design and business case for each, with every client kept separate under one firm account.";

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
  dateModified: "2026-11-04",
});

const included = [
  {
    title: "One account, every client",
    text: "Add each client as its own organization. Your team works across all of them, and each client's data stays separate from the others.",
  },
  {
    title: "The full workflow for each client",
    text: "A profile, ranked use cases, and an agent design with a business case for each use case the client picks.",
  },
  {
    title: "Output clients can build from",
    text: "Each design exports as Agent Skills files and through our MCP server, for whichever coding agent and platform the client uses.",
  },
];

const faqs = [
  {
    q: "Do you compete with the firms that use it?",
    a: "Agent Blueprint, Inc. sells software and doesn't do consulting work. NowGentic, the founders' services company, is a separate firm.",
  },
  {
    q: "Do our clients need to be on a particular platform?",
    a: "No. The designs are platform-neutral, and coding agents can build them on whatever the client runs.",
  },
];

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

      <section className="mx-auto max-w-4xl px-6 pt-32 pb-16 md:pt-40">
        <h1
          className="font-display font-bold text-foreground"
          style={{
            fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Run Agent Blueprint&reg; for your clients.
        </h1>
        <p className="mt-6 max-w-2xl font-body text-xl leading-relaxed text-muted-foreground">
          Your firm gets one account, and each client gets its own space. You
          work with the client; the software does the analysis.
        </p>
        <Link
          href="#contact"
          className="group mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-body text-lg font-semibold text-primary-foreground transition-shadow hover:shadow-lg"
        >
          Request access
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      <section className="border-y border-border bg-secondary/40" aria-labelledby="included-heading">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 id="included-heading" className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
            What your firm gets
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {included.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-2xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 font-body text-lg leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
            {licensing.subscription
              ? `${licensing.subscription}. Every firm signs the same agreement at the same price.`
              : "Pricing isn't published yet. We're starting with a small number of firms, and every firm signs the same agreement at the same price."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24" aria-labelledby="questions-heading">
        <h2 id="questions-heading" className="font-display text-4xl font-bold leading-tight text-foreground">
          Questions
        </h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-6">
              <h3 className="font-display text-xl font-bold text-foreground">{faq.q}</h3>
              <p className="mt-2 font-body text-lg leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactSection
        heading="Request access for your firm"
        intro="Tell us about your firm: who your clients are and which platforms they run. We'll set up a call and walk you through the software and the terms."
        messagePlaceholder="Your clients and the platforms they run"
      />
    </>
  );
}
