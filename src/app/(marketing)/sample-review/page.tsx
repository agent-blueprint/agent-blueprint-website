import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DocSection, type DocItem } from "@/components/doc-section";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const title = "Sample: One AI Agent, Reviewed at 90 Days";
const description =
  "A finished example of what an Agent Blueprint review hands back: one IT ticket agent's page at its 90-day check-back, with measured cost, results and a keep, fix or stop decision. Fictional company and numbers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sample-review", types: { "text/markdown": "/sample-review.md" } },
};

const breadcrumb = breadcrumbSchema([{ name: title, path: "/sample-review" }]);
const webPage = webPageSchema({
  name: title,
  description,
  path: "/sample-review",
  datePublished: "2026-11-03",
  dateModified: "2026-11-03",
});

// All numbers are fictional but must add up. Check the math if you change any:
// cost 120 + 80 + 400 + 420 = 1,020; hours freed 200 - 85 = 115; 115 x 40 = 4,600;
// net 4,600 - 1,020 = 3,580; payback 12,000 / 3,580 = 3.4 months.
const finance: DocItem[] = [
  { label: "Decision", text: "Keep, with one fix. Check again in 60 days." },
  {
    label: "What it costs",
    text: "$1,020 a month, measured. That's $120 usage, $80 hosting, $400 for people checking its work and $420 upkeep. It cost $12,000 to build.",
  },
  {
    label: "What it did",
    text: "The service desk spends 115 fewer hours a month sorting tickets (200 before, 85 now). At $40 an hour that's about $4,600 of staff time.",
  },
  {
    label: "Cash or time",
    text: "Spending is up $1,020 a month. It only comes down if the freed hours replace contractor time or a planned hire. That call belongs to Morgan Lee.",
  },
  {
    label: "Payback",
    text: "About 3.4 months on the build cost, counting staff time ($4,600 - $1,020 = $3,580 a month).",
  },
  {
    label: "Confidence",
    text: "Medium. Reassignments come from the ticket history. Sorting time was measured by timing 300 tickets before launch and 300 in week 12.",
  },
];

const sections: { heading: string; note?: string; items: DocItem[] }[] = [
  {
    heading: "1. Purpose",
    items: [
      { label: "Does", text: "Reads each new IT ticket and sets its category, priority and team, with a one-line reason a person can check." },
      { label: "Doesn't do", text: "Answer, resolve or close tickets. It never handles a ticket once a person has picked it up." },
    ],
  },
  {
    heading: "2. Authority",
    items: [
      { label: "Can do on its own", text: "Set category, team, and priority P3 or P4 on new tickets. Enforced by: its ticket system role, which can edit only those three fields." },
      { label: "Needs a person", text: "Anything that looks like P1 or P2. It flags the ticket and the on-call lead decides. Enforced by: the ticket system, which blocks P1 and P2 for its role." },
      { label: "Must never", text: "Close a ticket or lower a priority a person set. Enforced by: its role, which has no close permission and can't edit tickets a person has touched." },
      { label: "Runs as", text: "The service account ticket-sorter, with no admin rights." },
      { label: "Limit on its usage bill", text: "$300 a month. Enforced by: the spending cap on the model vendor account." },
    ],
  },
  {
    heading: "3. Proof",
    items: [
      { label: "Tested with", text: "1,000 past tickets before launch. 88% matched how the team had routed them, and no major incidents were missed. The bar was 85%." },
      { label: "Recorded in", text: "The ticket history, with the agent's reason on every change." },
    ],
  },
  {
    heading: "4. Owner",
    items: [
      { label: "Accountable", text: "Jordan Ellis, service desk manager." },
      { label: "Who can stop it", text: "Jordan or the on-call lead, by switching off the integration. Tickets fall back to the manual queue." },
      { label: "Who checks its work", text: "The service desk checks 1 in 10 tickets it sorts, about 10 hours a month." },
    ],
  },
  {
    heading: "5. Cost",
    note: "Measured, average of months 2 and 3.",
    items: [
      { label: "Volume", text: "4,000 tickets a month." },
      { label: "Monthly cost", text: "$1,020: $120 usage ($0.03 a ticket, from the vendor bill), $80 hosting and connections, $400 review (10 hours x $40), $420 upkeep (6 hours x $70 for category changes and fixes)." },
      { label: "Mistakes", text: "No direct cash cost. Misrouted tickets cost time, and that time is counted in the hours below." },
      { label: "Cost to build", text: "$12,000." },
    ],
  },
  {
    heading: "6. Promise",
    note: "Written before launch. Not edited since.",
    items: [
      { label: "The one number", text: "Tickets reassigned to another team at least once. Today: 22%. Target: 12% by day 90." },
      { label: "Second number", text: "Service desk hours spent sorting tickets. Today: 200 a month. Target: 80." },
      { label: "Must not get worse", text: "Major incidents sent to the wrong team (zero today), and time to first touch on P1 and P2 tickets." },
      { label: "Stop if", text: "Reassignments aren't below 18% by day 90, or it misroutes a P1 twice." },
    ],
  },
  {
    heading: "7. Result",
    note: "Measured at day 90.",
    items: [
      { label: "Reassigned at least once", text: "14%. Down from 22%, but 2 points short of the 12% target." },
      { label: "Hours spent sorting", text: "85 a month, against a target of 80. That's 30 hours sorting the tickets it couldn't, 10 hours checking its work and about 45 hours fixing ones it got wrong." },
      { label: "Handled by the agent", text: "3,400 of 4,000 tickets (85%). The rest had too little text to sort." },
      { label: "Must not get worse", text: "No major incidents misrouted. Time to first touch on P1 and P2 unchanged." },
      { label: "Where it goes wrong", text: "6 in 10 of its misroutes are access requests sent to the network team. The request form has no option for access, so the ticket text is all it has." },
      { label: "Setup still matches this page", text: "Yes. Checked against its ticket system role on day 90." },
      { label: "Decision", text: "Keep. Add an access option to the request form and the category list, then check again in 60 days. If reassignments are at 12% or lower by then, move to monthly spot checks. Decided by Morgan Lee, IT director, on day 92." },
    ],
  },
];

export default function SampleReviewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />

      <section className="mx-auto max-w-4xl px-6 pt-28 pb-10 md:pt-36">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Sample / fictional company and numbers
        </p>
        <h1
          className="mt-4 font-display font-bold text-foreground"
          style={{ fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.25rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          One agent, 90 days later.
        </h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
          This is what you get back from us. Calder Freight, a made-up company,
          launched an agent that sorts incoming IT tickets. Before launch we
          measured where they stood and set the numbers it had to hit. At 90
          days we measured again. The page below is the result: one summary
          for finance, then the agent&apos;s full page.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-6">
        <div className="rounded-lg px-6 py-8 md:px-10" style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}>
          <p className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: "var(--hero-muted)" }}>
            For finance
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold">Ticket Sorter: keep, with one fix.</h2>
          <ul className="mt-5 space-y-3">
            {finance.map((item) => (
              <li key={item.label} className="font-body leading-relaxed" style={{ color: "var(--hero-muted)" }}>
                <span className="font-semibold" style={{ color: "var(--hero-fg)" }}>
                  {item.label}:{" "}
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-10">
        <p className="pt-8 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          The agent&apos;s page / stage: measured
        </p>
        {sections.map((s) => (
          <DocSection key={s.heading} heading={s.heading} note={s.note} items={s.items} />
        ))}
      </div>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="border-t border-border pt-10">
          <h2 className="font-display text-3xl font-bold text-foreground">Want this for one of your agents?</h2>
          <p className="mt-3 max-w-2xl font-body leading-relaxed text-muted-foreground">
            It works the same whether the agent is still an idea or already
            running. The first call is free. You can also start from our{" "}
            <Link href="/blueprints/it-ticket-triage" className="text-primary underline underline-offset-4">
              free IT ticket triage blueprint
            </Link>{" "}
            or the{" "}
            <Link href="/agent-one-page-template" className="text-primary underline underline-offset-4">
              blank one-page template
            </Link>
            .
          </p>
          <Link
            href="/#contact"
            className="group mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-shadow hover:shadow-lg"
          >
            Book the free first call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
