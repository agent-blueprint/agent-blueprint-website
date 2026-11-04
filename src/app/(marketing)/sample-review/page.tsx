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

// All numbers are fictional but must add up. Check the math if you change any.
// Minutes per ticket: sorting 2, fixing a misroute 5 (from ticket log timestamps,
// confirmed by timing 300 tickets by hand).
// Before: 4,000 x 2 = 133 h sorting + 880 misroutes (22%) x 5 = 73 h fixing = 206 h.
// Day 90: 600 left for people x 2 = 20 h + 560 misroutes (14% of all 4,000) x 5 = 47 h = 67 h.
// Freed 139 h x $40 = $5,560.
// Costs a month: AI usage $2,000 = its share of the AI add-on ($144,000 a year =
// $12,000 a month for 120,000 credits; it uses 4,000 x 5 = 20,000 credits = 1/6);
// hosting $80 (new cash); staff time $820 (review 10 h x $40 = 400, upkeep
// 6 h x $70 = 420). Review hours are NOT inside the 67, so nothing is counted twice.
// Net = 5,560 - 820 - 2,000 - 80 = $2,660 a month.
// Payback on build plus our fee: (12,000 + 7,500) / 2,660 = 7.3 months.
const scorecard = [
  { measure: "Tickets sent to the wrong team first", before: 22, target: 12, actual: 14, unit: "%", met: false },
  { measure: "Staff hours a month sorting and fixing tickets", before: 206, target: 90, actual: 67, unit: "", met: true },
];
const guardrails = [
  "Major incidents sent to the wrong team: 0 before, 0 at day 90. Held.",
  "Time to first touch on P1 and P2 tickets: unchanged. Held.",
];

// The finance statement: monthly lines, then the two numbers that matter.
const costLines = [
  { label: "AI usage", note: "Allocated: a sixth of the $144,000-a-year AI add-on (20,000 of 120,000 credits a month). Saved only if the add-on shrinks at renewal.", value: "$2,000" },
  { label: "Hosting", note: "New cash.", value: "$80" },
  { label: "Staff time running it", note: "Checking its work 10 h x $40, upkeep 6 h x $70.", value: "$820" },
];
const savingLine = { label: "Staff time saved", note: "139 hours a month sorting and fixing tickets, at $40 an hour fully loaded.", value: "$5,560" };
const financeNotes = [
  "Cash only: today the agent costs $80 a month in new cash and saves none. The savings become cash only if the freed hours replace contractor time or a planned hire, or the AI add-on is cut at renewal. That call belongs to Morgan Lee.",
  "Confidence: medium. Reassignments come from the full ticket history. Hours come from ticket log timestamps, checked by timing 300 tickets by hand before launch and in week 12: 2 minutes to sort one, 5 to fix a misroute.",
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
      { label: "Must never", text: "Close a ticket or change one a person has touched. Enforced by: its role, which has no close permission and is locked out once a person is assigned." },
      { label: "Runs as", text: "The service account ticket-sorter, with no admin rights." },
      { label: "Limit on its usage", text: "25,000 credits a month. Enforced by: a monthly credit limit on its account, which stops it and alerts Jordan." },
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
      { label: "AI usage", text: "$2,000 a month: 5 credits a ticket x 4,000 tickets = 20,000 of the 120,000 monthly credits in the $144,000-a-year AI add-on, so a sixth of its cost. From the platform's usage log." },
      { label: "New cash", text: "$80 a month for hosting and connections." },
      { label: "Internal time", text: "$820 a month: $400 checking its work (10 hours x $40) and $420 upkeep (6 hours x $70 for category changes and fixes)." },
      { label: "Mistakes", text: "No direct cash cost. Fixing misrouted tickets takes time, and that time is inside the sorting and fixing hours." },
      { label: "Cost to build", text: "$12,000, one-off." },
    ],
  },
  {
    heading: "6. Promise",
    note: "Written before launch. Not edited since.",
    items: [
      { label: "The one number", text: "Tickets reassigned to another team at least once. Today: 22%. Target: 12% by day 90." },
      { label: "Second number", text: "Service desk hours a month spent sorting and fixing tickets, not counting checking the agent's work. Today: 206 (133 sorting at 2 minutes a ticket, 73 fixing 880 misroutes at 5 minutes). Target: 90." },
      { label: "Must not get worse", text: "Major incidents sent to the wrong team (zero today), and time to first touch on P1 and P2 tickets." },
      { label: "The rule at day 90", text: "Keep if both targets are met. Fix if it's clearly better than today but short of a target. Stop if reassignments aren't below 18%, or it misroutes a major incident twice. Planned escalations from first-line to second-line support don't count as reassignments." },
    ],
  },
];

const result: DocItem[] = [
  { label: "Where it goes wrong", text: "6 in 10 of its misroutes are access requests sent to the network team. The request form has no option for access, so the ticket text is all it has to go on." },
  { label: "Hours", text: "67 a month: 20 sorting the 600 tickets it left for people (too little text) and 47 fixing 560 misroutes (14% of all tickets). Checking its work is extra and counted under cost." },
  { label: "Must not get worse", text: "No major incidents misrouted. Time to first touch on P1 and P2 unchanged." },
  { label: "Setup still matches this page", text: "Yes. Checked against its ticket system role on day 90." },
  {
    label: "Decision",
    text: "Fix, following the rule above: reassignments are well below today's 22% but short of the 12% target. Add an access option to the request form and the category list, and check again in 60 days. At 12% or lower it becomes a Keep and moves to monthly spot checks. Because it uses a sixth of the AI add-on, the result also goes into the renewal decision. Decided by Morgan Lee, IT director, on day 92.",
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
          measured where they stood and wrote down the numbers it had to hit.
          At 90 days we measured again. Below: the summary for finance, the
          scorecard, then the agent&apos;s full page.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-6">
        <div className="rounded-lg px-6 py-8 md:px-10" style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}>
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: "var(--hero-muted)" }}>
              For finance
            </p>
            <span className="rounded-full bg-amber-300 px-3 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-900">
              Fix
            </span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold">Ticket Sorter: fix one gap, keep it running.</h2>
          <p className="mt-2 font-body text-sm" style={{ color: "var(--hero-muted)" }}>
            Calder Freight, IT service desk, 4,000 tickets a month. Reviewed at day 90.
          </p>
          <dl className="mt-6 font-body text-sm">
            {costLines.map((line) => (
              <div key={line.label} className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-white/10 py-3">
                <dt>
                  <span className="font-semibold">{line.label}</span>
                  <span data-note className="mt-0.5 block text-xs" style={{ color: "var(--hero-muted)" }}>{line.note}</span>
                </dt>
                <dd className="text-right text-lg font-semibold tabular-nums">{line.value}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-white/30 py-3">
              <dt className="font-semibold">Monthly cost</dt>
              <dd className="text-right text-lg font-semibold tabular-nums">$2,900</dd>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-white/10 py-3">
              <dt>
                <span className="font-semibold">{savingLine.label}</span>
                <span data-note className="mt-0.5 block text-xs" style={{ color: "var(--hero-muted)" }}>{savingLine.note}</span>
              </dt>
              <dd className="text-right text-lg font-semibold tabular-nums">{savingLine.value}</dd>
            </div>
          </dl>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-white/5 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--hero-muted)" }}>Net value</p>
              <p className="mt-1 font-display text-4xl font-bold tabular-nums">$2,660<span className="font-body text-base font-normal"> a month</span></p>
              <p className="mt-1 text-xs" style={{ color: "var(--hero-muted)" }}>$5,560 saved - $2,900 cost, in staff time</p>
            </div>
            <div className="rounded-md bg-white/5 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--hero-muted)" }}>Payback</p>
              <p className="mt-1 font-display text-4xl font-bold tabular-nums">7.3<span className="font-body text-base font-normal"> months</span></p>
              <p className="mt-1 text-xs" style={{ color: "var(--hero-muted)" }}>$12,000 build + $7,500 review, in staff time. In cash alone: none yet.</p>
            </div>
          </div>
          <p className="mt-5 font-body text-sm">
            <span className="font-semibold">Decision: </span>
            <span style={{ color: "var(--hero-muted)" }}>Fix. Keep it running, close one gap, and check again in 60 days (the recheck is included).</span>
          </p>
          <ul className="mt-3 space-y-2 font-body text-xs leading-relaxed" style={{ color: "var(--hero-muted)" }}>
            {financeNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pt-8 pb-2" aria-labelledby="scorecard-heading">
        <h2 id="scorecard-heading" className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Scorecard at day 90
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {scorecard.map((row) => {
            const max = Math.max(row.before, row.target, row.actual, 1);
            const bars = [
              { label: "Before", value: row.before, tone: "bg-neutral-300" },
              { label: "Target", value: row.target, tone: "bg-neutral-500" },
              { label: "Day 90", value: row.actual, tone: row.met ? "bg-emerald-600" : "bg-amber-500" },
            ];
            return (
              <div key={row.measure} className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-body text-sm font-semibold leading-snug text-foreground">{row.measure}</p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                      row.met ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {row.met ? "Met" : "Missed"}
                  </span>
                </div>
                <dl className="mt-4 space-y-2">
                  {bars.map((b) => (
                    <div key={b.label} className="grid grid-cols-[52px_1fr_44px] items-center gap-2 font-body text-xs">
                      <dt className="col-start-1 row-start-1 text-muted-foreground">{b.label}</dt>
                      <dd className="col-start-3 row-start-1 text-right font-semibold text-foreground">
                        {b.value}
                        {row.unit}
                      </dd>
                      <div className="col-start-2 row-start-1 h-2 rounded-full bg-secondary" aria-hidden>
                        <div className={`h-2 rounded-full ${b.tone}`} style={{ width: `${Math.max((b.value / max) * 100, b.value === 0 ? 0 : 4)}%` }} />
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
        <ul className="mt-4 space-y-1 font-body text-sm text-muted-foreground">
          {guardrails.map((g) => (
            <li key={g}>
              <span className="font-semibold text-emerald-700">Held: </span>
              {g.replace(/ Held\.$/, "")}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-shadow hover:shadow-lg"
          >
            Get this for one of your agents
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/#offer" className="group inline-flex items-center gap-2 font-body font-semibold text-primary">
            Price and what&apos;s included
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pt-10" aria-labelledby="running-heading">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 id="running-heading" className="font-display text-2xl font-bold text-foreground">If your agent is already running</h2>
          <p className="mt-2 font-body leading-relaxed text-muted-foreground">
            There&apos;s no pre-launch timing study, so the &quot;before&quot; number comes from history, and the decision comes in three weeks, not 90 days.
          </p>
          <ul className="mt-4 space-y-2 font-body leading-relaxed text-muted-foreground">
            <li><span className="font-semibold text-foreground">Before: </span>the same measures from your ticket history for the 90 days before the agent went live.</li>
            <li><span className="font-semibold text-foreground">No clean history: </span>for two weeks, send a random 1 in 10 tickets around the agent and compare the two groups.</li>
            <li><span className="font-semibold text-foreground">Cost: </span>its share of the AI bill from the usage log, plus hosting and staff time, split into what you&apos;d save by stopping it and what you&apos;d only save at renewal.</li>
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-10">
        <p className="pt-10 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          The agent&apos;s page / stage: measured
        </p>
        {sections.map((s) => (
          <DocSection key={s.heading} heading={s.heading} note={s.note} items={s.items} />
        ))}
        <DocSection heading="7. Result" note="Measured at day 90. The numbers are in the scorecard above." items={result} />
      </div>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="border-t border-border pt-10">
          <h2 className="font-display text-3xl font-bold text-foreground">Want this for one of your agents?</h2>
          <p className="mt-3 max-w-2xl font-body leading-relaxed text-muted-foreground">
            It works the same whether the agent is still an idea or already
            running. Start with a free 30-minute call, or with our{" "}
            <Link href="/blueprints/it-ticket-triage" className="text-primary underline underline-offset-4">
              free IT ticket triage blueprint
            </Link>{" "}
            or the{" "}
            <Link href="/agent-one-page-template" className="text-primary underline underline-offset-4">
              blank one-page template
            </Link>
            .
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-shadow hover:shadow-lg"
            >
              Book a free 30-minute call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/#offer" className="group inline-flex items-center gap-2 font-body font-semibold text-primary">
              See the price and terms
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
