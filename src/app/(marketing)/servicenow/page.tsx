import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { SampleFrame } from "@/components/sample-frame";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";
import { storeListingUrl } from "@/lib/store-app";

const description =
  "An app we're building for the ServiceNow Store: one renewal view of every AI agent, showing what to keep, fix or stop and where to put what that frees up.";

export const metadata: Metadata = {
  title: "Agent Blueprint for ServiceNow",
  description,
  alternates: { canonical: "/servicenow", types: { "text/markdown": "/servicenow.md" } },
};

// Live today, in development, planned. Keep this honest: change a status only when it's true.
const roadmap = [
  { status: "Live", title: "The review", text: "One agent at a time, on any platform: cost and results measured against a number set in advance, then keep, fix or stop." },
  { status: "In development", title: "The app, ServiceNow first", text: "Keeps each agent's cost, results and decision current from the platform's own records. Not certified or in the Store yet." },
  { status: "Planned", title: "Partners and benchmarks", text: "Other firms running the method under license, and benchmarks built from anonymized review results." },
];

const breadcrumb = breadcrumbSchema([{ name: "ServiceNow", path: "/servicenow" }]);
const webPage = webPageSchema({
  name: "Agent Blueprint for ServiceNow",
  description,
  path: "/servicenow",
  datePublished: "2026-10-31",
  dateModified: "2026-11-03",
});

const parts = [
  ["The renewal view", "Assists against your yearly pool, then every agent and skill sorted into keep, fix or stop."],
  ["A page for finance", "Totals, recommended changes, and how sure the numbers are, on one page."],
  ["A sheet per agent", "A plain drawing of what each agent reads and changes, where every fact says where it came from."],
];

export default function ServiceNowPage() {
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
          Agent Blueprint for ServiceNow
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
          An app for platform owners with AI agents running and a renewal
          coming. See what to keep, what to fix, what to stop, and where to
          invest what that frees up.
        </p>
        {storeListingUrl ? (
          <a
            href={storeListingUrl}
            className="group mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-body font-semibold text-primary-foreground"
          >
            Get it on the ServiceNow Store
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        ) : (
          <div className="mt-7 flex flex-col gap-4 rounded-lg border border-primary/25 bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="block font-mono text-xs uppercase tracking-[0.14em] text-accent">
                Not in the ServiceNow Store yet
              </span>
              <span className="mt-1 block font-body leading-relaxed text-foreground">
                We&apos;re building it for the Store, and it still has to pass
                ServiceNow&apos;s certification. If this is the view you need,
                tell us.
              </span>
            </span>
            <Link href="#contact" className="group inline-flex shrink-0 items-center gap-2 font-body font-semibold text-primary">
              Tell us you want it
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
        <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground">
          Below is a mockup of where the app is heading. The company and numbers
          are fictional, and this view isn&apos;t built in ServiceNow yet.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <SampleFrame
          src="/samples/servicenow.html"
          title="Mockup of the planned renewal view for a fictional company"
          label="MOCKUP / fictional company"
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

      <section className="border-y border-border bg-secondary/40" aria-labelledby="path-heading">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 id="path-heading" className="font-display text-3xl font-bold text-foreground">How the review and the app fit</h2>
          <p className="mt-3 max-w-3xl font-body leading-relaxed text-muted-foreground">
            The review works on any platform, today. The app starts on ServiceNow
            because ServiceNow already records usage for each agent, so the app
            can keep the review&apos;s numbers current without anyone re-measuring.
            Each review&apos;s one-page record has the same structure the app keeps.
          </p>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {roadmap.map((step) => (
              <li key={step.title} className="rounded-lg border border-border bg-card p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{step.status}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/#offer" className="group mt-8 inline-flex items-center gap-2 font-body font-semibold text-primary">
            See the review: price and terms
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <ContactSection />

      <p className="mx-auto max-w-6xl px-6 pb-8 font-body text-xs text-muted-foreground">
        ServiceNow is a trademark of ServiceNow, Inc. Agent Blueprint isn&apos;t
        affiliated with or endorsed by ServiceNow.
      </p>
    </>
  );
}
