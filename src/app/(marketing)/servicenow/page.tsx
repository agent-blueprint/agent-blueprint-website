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
  alternates: { canonical: "/servicenow" },
};

const breadcrumb = breadcrumbSchema([{ name: "ServiceNow", path: "/servicenow" }]);
const webPage = webPageSchema({
  name: "Agent Blueprint for ServiceNow",
  description,
  path: "/servicenow",
  datePublished: "2026-10-31",
  dateModified: "2026-11-01",
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
          <Link
            href="#contact"
            className="group mt-7 flex flex-col gap-4 rounded-lg border border-primary/25 bg-card p-5 transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
          >
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
            <span className="inline-flex shrink-0 items-center gap-2 font-body font-semibold text-primary">
              Tell us you want it
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
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

      <ContactSection />

      <p className="mx-auto max-w-6xl px-6 pb-8 font-body text-xs text-muted-foreground">
        ServiceNow is a trademark of ServiceNow, Inc. Agent Blueprint isn&apos;t
        affiliated with or endorsed by ServiceNow.
      </p>
    </>
  );
}
