import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DocSection, type DocItem } from "@/components/doc-section";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const path = "/blueprints/it-ticket-triage";
const title = "IT Ticket Triage AI Agent: Free Blueprint";
const description =
  "Free blueprint for an AI agent that sorts IT tickets: what it needs, what not to let it touch, the number to measure before launch, how to work out its cost, and when to keep, fix or stop it. Works on any ticket system.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, types: { "text/markdown": `${path}.md` } },
};

const breadcrumb = breadcrumbSchema([{ name: title, path }]);
const webPage = webPageSchema({
  name: title,
  description,
  path,
  datePublished: "2026-11-03",
  dateModified: "2026-11-03",
});

// Every figure on this page is an estimate until check-backs replace it.
// When one is measured, say so on that line and give the sample size.
const sections: { heading: string; note?: string; items: DocItem[] }[] = [
  {
    heading: "What it does",
    items: [
      { label: "Does", text: "Reads each new IT ticket and sets its category, priority and team, with a one-line reason a person can check." },
      { label: "Doesn't do", text: "Answer, resolve or close tickets. Keep those for a later agent, once this one has proved itself." },
      { label: "Why start here", text: "It's low risk, it touches a few fields rather than customers or money, and your ticket history already holds the starting number." },
    ],
  },
  {
    heading: "What it needs",
    items: [
      { label: "Ticket system", text: "An account that can read new tickets and edit only category, priority and team." },
      { label: "Your team list", text: "Every team that takes tickets, with a sentence on what each one handles. This matters more than the model you choose." },
      { label: "Your category list", text: "The one your service desk actually uses, not a generic one." },
      { label: "Optional", text: "Read access to the knowledge base, the asset list and the staff directory. Each one helps it route better, and each is one more thing it can read." },
      { label: "Skills", text: "Sort into your categories. Spot a possible major incident and hand it to a person. Write a reason on every ticket. Say it isn't sure and leave the ticket in the manual queue." },
    ],
  },
  {
    heading: "What not to let it touch",
    note: "Enforce these with permissions, not with instructions to the agent. An instruction can be talked around; a permission can't.",
    items: [
      { label: "Closing or resolving", text: "Don't grant the permission at all." },
      { label: "P1 and P2", text: "Block its role from setting them. It flags, and a person decides." },
      { label: "Tickets a person has touched", text: "Once someone picks a ticket up, the agent is done with it." },
      { label: "Anything the requester sees", text: "No comments or emails to staff from this agent." },
      { label: "Admin rights", text: "Never. Give it its own service account with no admin role." },
    ],
  },
  {
    heading: "The number to set before launch",
    items: [
      { label: "The one number", text: "Share of tickets reassigned to another team at least once. Every reassignment is a ticket that went to the wrong place first." },
      { label: "How to measure today", text: "Export the last 90 days of tickets. Count the ones whose team changed after the first assignment, and divide by the total." },
      { label: "Second number", text: "Hours spent sorting. Time 200 to 300 tickets over two weeks before launch, then the same again near day 90." },
      { label: "Must not get worse", text: "Major incidents sent to the wrong team, and time to first touch on P1 and P2 tickets." },
      { label: "Set the target before launch", text: "Write it down with a date, and don't move it afterwards. That's the difference between a measurement and a story." },
    ],
  },
  {
    heading: "What it will cost",
    note: "Estimated. Replace each input with your own and measure usage in the first week.",
    items: [
      { label: "The formula", text: "Monthly cost = tickets x usage per ticket + hosting + review hours x hourly rate + upkeep hours x hourly rate." },
      { label: "Usage per ticket", text: "Sorting a short ticket is a small model call, so expect cents rather than dollars. Read the real figure off your vendor bill after week one." },
      { label: "Review", text: "Check 1 in 5 of its tickets in the first month, then 1 in 10. This is usually the biggest cost, and the one people forget." },
      { label: "Upkeep", text: "A few hours a month, mostly when teams or categories change." },
      { label: "Mistakes", text: "A misrouted ticket costs time, not cash. Count it in your hours rather than as a separate line." },
      { label: "Worked example", text: (
        <>
          See the{" "}
          <Link href="/sample-review" className="text-primary underline underline-offset-4">
            sample review
          </Link>{" "}
          for a fictional 4,000-ticket service desk, with every line added up.
        </>
      ) },
    ],
  },
  {
    heading: "The 90-day call",
    items: [
      { label: "Scale it", text: "Reassignments hit the target and no major incident went to the wrong team." },
      { label: "Fix it", text: "Clearly better than the starting number but short of the target. Look for the pattern in its mistakes. It's usually one category or one missing form option." },
      { label: "Stop it", text: "Not clearly better than where you started, or it misroutes a major incident twice." },
    ],
  },
  {
    heading: "Where these usually go wrong",
    note: "Our working view from building agents, not yet backed by measured check-backs.",
    items: [
      { text: "The team list is out of date, so it routes correctly to a team that no longer handles that work." },
      { text: "An \"Other\" category swallows everything it isn't sure about." },
      { text: "One-line tickets give it nothing to go on. Fix the request form, not the agent." },
      { text: "People stop checking its work after week two, and nobody notices when it drifts." },
      { text: "Nobody wrote down the starting number, so at 90 days there's nothing to compare against." },
    ],
  },
];

export default function ItTicketTriageBlueprintPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />

      <section className="mx-auto max-w-4xl px-6 pt-28 pb-10 md:pt-36">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Free blueprint, no sign-up
        </p>
        <h1
          className="mt-4 font-display font-bold text-foreground"
          style={{ fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.25rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          IT ticket triage agent
        </h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
          An agent that reads each new IT ticket and sends it to the right team.
          It&apos;s one of the most common first agents and one of the easiest
          to measure. This is our working blueprint for it, on any ticket
          system. It covers what the agent needs, what to keep it away from,
          the number to set before launch and when to keep, fix or stop it.
        </p>
        <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">
          Version 1, November 3, 2026. Every figure here is an estimate until
          real check-backs replace it, and each one will say when it&apos;s
          measured. Free to copy and use, including at work. Your coding agent
          can read it at{" "}
          <a href={`${path}.md`} className="text-primary underline underline-offset-4">
            {path}.md
          </a>
          .
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-10">
        {sections.map((s) => (
          <DocSection key={s.heading} heading={s.heading} note={s.note} items={s.items} />
        ))}
      </div>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="border-t border-border pt-10">
          <h2 className="font-display text-3xl font-bold text-foreground">Want help setting the number and checking it at 90 days?</h2>
          <p className="mt-3 max-w-2xl font-body leading-relaxed text-muted-foreground">
            That&apos;s what we do: one agent, done properly. We measure where
            you are today, set the target with you and come back at 90 days with
            a straight answer.{" "}
            <Link href="/sample-review" className="text-primary underline underline-offset-4">
              See what that looks like
            </Link>
            , or write your own page with the{" "}
            <Link href="/agent-one-page-template" className="text-primary underline underline-offset-4">
              free one-page template
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
