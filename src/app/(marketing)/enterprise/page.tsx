import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { SampleFrame } from "@/components/sample-frame";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const description =
  "A concept for ServiceNow platform owners: one renewal view of every AI agent, showing what to keep, fix or rethink and where to put what that frees up.";

export const metadata: Metadata = {
  title: "Enterprise Blueprint for ServiceNow",
  description,
  alternates: { canonical: "/enterprise" },
};

const breadcrumb = breadcrumbSchema([{ name: "Enterprise", path: "/enterprise" }]);
const webPage = webPageSchema({
  name: "Enterprise Blueprint for ServiceNow",
  description,
  path: "/enterprise",
  datePublished: "2026-10-31",
  dateModified: "2026-10-31",
});

const parts = [
  ["The renewal view", "Assists against your yearly pool, then every agent and skill sorted into keep, fix or rethink."],
  ["A page for finance", "Totals, recommended changes, and how sure the numbers are, on one page."],
  ["A sheet per agent", "A plain drawing of what each agent reads and changes, where every fact says where it came from."],
];

export default function EnterprisePage() {
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
      <section className="mx-auto max-w-4xl px-6 pt-28 pb-10 md:pt-36">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Enterprise blueprint / ServiceNow first
        </p>
        <h1
          className="mt-4 font-display font-bold text-foreground"
          style={{
            fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Walk into the renewal knowing what you&apos;re paying for.
        </h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
          For platform owners with AI agents running and a renewal coming. See
          what to keep, what to fix, what to rethink, and where to invest what
          that frees up.
        </p>
        <Link
          href="/assist-check"
          className="group mt-7 flex flex-col gap-4 rounded-lg border border-primary/25 bg-card p-5 transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <span className="block font-mono text-xs uppercase tracking-[0.14em] text-accent">
              Works today / free / no sign-up
            </span>
            <span className="mt-1 block font-display text-2xl font-bold text-foreground">
              Check how long your assists will last
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 font-body font-semibold text-primary">
            Run the assist check
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <p className="mt-6 rounded-md border border-accent/40 bg-card px-4 py-3 font-body text-sm leading-relaxed text-foreground">
          Below is where this is heading, and it&apos;s a concept. It isn&apos;t
          built in ServiceNow yet, it isn&apos;t in the ServiceNow Store, and the
          company and numbers are fictional. If this is the view you need, tell
          us.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <SampleFrame
          src="/samples/servicenow.html"
          title="Concept mockup of a renewal view for a fictional company"
          label="CONCEPT MOCKUP / fictional company"
          height={900}
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 sm:grid-cols-3">
        {parts.map(([title, text]) => (
          <div key={title} className="border-t border-border pt-5">
            <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <ContactSection />

      <p className="mx-auto max-w-6xl px-6 pb-8 font-body text-xs text-muted-foreground">
        ServiceNow is a trademark of ServiceNow, Inc. Agent Blueprint isn&apos;t
        affiliated with or endorsed by ServiceNow.
      </p>
    </>
  );
}
