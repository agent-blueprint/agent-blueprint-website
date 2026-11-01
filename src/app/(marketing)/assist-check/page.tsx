import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { AssistCheck } from "@/components/assist-check";
import { ContactSection } from "@/components/contact-section";
import { POOLS_URL, RATE_CARD_URL } from "@/lib/assist-check";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const title = "ServiceNow Assist Check";
const description =
  "A free calculator for ServiceNow platform owners: see when your AI agents and skills use up your assist pool, what overage could cost, and which agents to trim. No sign-up.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/assist-check" },
};

const breadcrumb = breadcrumbSchema([{ name: "Assist check", path: "/assist-check" }]);
const webPage = webPageSchema({
  name: title,
  description,
  path: "/assist-check",
  datePublished: "2026-10-31",
  dateModified: "2026-10-31",
});

const script = readFileSync(
  path.join(process.cwd(), "public/assist-check/v1/assist-check.js"),
  "utf8",
);

const linkClass = "font-medium text-primary underline underline-offset-4";

export default function AssistCheckPage() {
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
      <section className="mx-auto max-w-6xl px-6 pt-28 pb-10 md:pt-36">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Free / no sign-up / ServiceNow
        </p>
        <h1
          className="mt-4 max-w-4xl font-display font-bold text-foreground"
          style={{
            fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          How long will your assists last?
        </h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
          Put in your seats, agents and skills. See when you&apos;d run out, what overage could
          cost, and which agents are one or two tool calls away from a cheaper run.
        </p>
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">
          What you type stays in your browser. We count page views, not your numbers.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <AssistCheck script={script} />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="font-display text-3xl font-bold text-foreground">
          Where the numbers come from
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 font-body text-sm leading-relaxed text-muted-foreground">
          <li>
            <span className="text-foreground">Run sizes and skill rates:</span>{" "}
            <a href={RATE_CARD_URL} className={linkClass}>
              ServiceNow&apos;s Now Assist Overview
            </a>
            , effective August 24, 2026. Small is 25 assists, Medium (5 to 8 tool calls) is 50 and
            Large (9 to 20) is 150. Past 20 calls, the rest bills as a new run. Rates can change, so
            check the current card.
          </li>
          <li>
            <span className="text-foreground">Pool per seat:</span>{" "}
            <a href={POOLS_URL} className={linkClass}>
              reported by the partner Crossfuze
            </a>
            , not published by ServiceNow. Your contract decides your real pool.
          </li>
          <li>
            <span className="text-foreground">$0.20 per assist:</span> an overage figure from a June
            2026 analyst note. ServiceNow doesn&apos;t publish a price, so use your contract rate.
          </li>
        </ul>
        <h2 className="mt-10 font-display text-3xl font-bold text-foreground">What this leaves out</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 font-body text-sm leading-relaxed text-muted-foreground">
          <li>
            This is an estimate. Real runs vary in tool calls, and the script uses the middle run
            for each agent, so a few long runs can cost more than it shows.
          </li>
          <li>
            Your pool is prepaid, so inside it, an assist is capacity rather than extra cash. The
            dollar figures only become invoices above the pool.
          </li>
          <li>
            Use in sub-production instances counts against the same pool. The script only reads the
            instance you run it on.
          </li>
          <li>
            It doesn&apos;t tell you whether an agent is worth what it costs. For that you need what
            each run really saves, measured against work done without it.
          </li>
        </ul>
      </section>

      <ContactSection />

      <p className="mx-auto max-w-6xl px-6 pb-8 font-body text-xs text-muted-foreground">
        ServiceNow is a trademark of ServiceNow, Inc. Agent Blueprint isn&apos;t affiliated with or
        endorsed by ServiceNow. This is an estimate, not billing or contract advice.
      </p>
    </>
  );
}
