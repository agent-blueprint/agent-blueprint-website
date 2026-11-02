import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const title = "One-Page AI Agent Summary Template";
const description =
  "Free one-page template for an AI agent card or charter: what the agent is allowed to do, what it costs and its ROI, with a filled example and a Markdown copy.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/agent-one-page-template" },
};

const breadcrumb = breadcrumbSchema([{ name: title, path: "/agent-one-page-template" }]);
const webPage = webPageSchema({
  name: title,
  description,
  path: "/agent-one-page-template",
  datePublished: "2026-11-01",
  dateModified: "2026-11-01",
});

const sections = [
  ["Summary", "The decision, what it's allowed to do, what it costs and whether it's worth it, for a reader who stops here."],
  ["Purpose", "The job it does, and what's out of scope."],
  ["Authority", "What it can do alone, what needs approval, what it must never do, its tools and data, the model and data handling, whose account it runs as, its limits on money and usage, and how mistakes get undone."],
  ["Proof", "How it was tested, what counts as passing, and where each action is recorded."],
  ["Owner", "Who's accountable, who can stop it and how, who gets told when it acts, and who reviews its work."],
  ["Cost", "Volume, usage per run in tokens, credits or dollars, monthly cost including human time and mistakes, and cost to build."],
  ["Promise", "One number with a baseline, target and date, the failure that must not get worse, when to stop, the alternative, the ROI math, and how much of it is real cash."],
  ["Result", "Filled in at the check-back: what was measured, whether its setup still matches this page, and the decision."],
];

const faqs = [
  {
    question: "Is there a standard format for this?",
    answer: (
      <>
        Not that we know of, and this template isn&apos;t one either.{" "}
        <a href="https://research.google/pubs/model-cards-for-model-reporting/" className="text-primary underline underline-offset-4">
          Model cards
        </a>{" "}
        describe a model rather than one deployed agent. The{" "}
        <a href="https://www.nist.gov/itl/ai-risk-management-framework" className="text-primary underline underline-offset-4">
          NIST AI Risk Management Framework
        </a>{" "}
        is broad risk guidance. If your company has its own review form, use that and borrow what&apos;s missing from here.
      </>
    ),
  },
  {
    question: "Is this the same as an A2A Agent Card?",
    answer:
      "No. In the Agent2Agent protocol, an Agent Card is a machine-readable file agents use to find and talk to each other. This page is for the people deciding whether an agent should be allowed to run. Some teams call this kind of document an agent card, charter or scope document.",
  },
  {
    question: "How do I show that a rule is real?",
    answer:
      "End each rule with what enforces it, such as a permission, a service limit or an approval setting. If it's only an instruction to the agent, write that it's not enforced. A reader can then see which limits would hold if the agent got something wrong.",
  },
  {
    question: "How is ROI calculated?",
    answer:
      "Runs handled x minutes saved per run / 60 x hourly cost gives monthly value. Subtract monthly cost, including human review, upkeep and the expected cost of mistakes, to get monthly net. Divide the cost to build by that to get payback. Freed-up staff time is capacity, and it only becomes cash if spending drops, so the page keeps the two apart. If time saved doesn't capture the value, use a different formula and show the math. The inputs are estimates until measured, and section 7 records what really happened.",
  },
];

function readTemplateFile(name: string) {
  return readFileSync(
    path.join(process.cwd(), "public", "templates", "agent-one-page", "v1", name),
    "utf8"
  );
}

export default function AgentOnePageTemplatePage() {
  const blank = readTemplateFile("template.md");
  const example = readTemplateFile("example.md");

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
          Free template, no sign-up
        </p>
        <h1
          className="mt-4 font-display font-bold text-foreground"
          style={{
            fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          One-page AI agent summary template
        </h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
          One page for a boss, a security reviewer or a finance approver,
          covering what an AI agent is allowed to do, what it costs and whether
          it&apos;s worth it. You might know this as an agent card, agent charter
          or scope document. A filled-in copy can run to about two printed pages, so send the summary on its own if your reader wants one page and keep the rest as backup. The template is free to copy, change and use, including at work.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-body">
          <li>
            <a href="/templates/agent-one-page/v1/template.md" className="text-primary underline underline-offset-4">
              Blank template (Markdown)
            </a>
          </li>
          <li>
            <a href="/templates/agent-one-page/v1/example.md" className="text-primary underline underline-offset-4">
              Filled example (Markdown)
            </a>
          </li>
        </ul>
        <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground">
          By Chris Faulkner, Agent Blueprint. Version 1, published November 1,
          2026. Agent Blueprint is the method{" "}
          <a href="https://nowgentic.com" className="text-primary underline underline-offset-4">
            NowGentic
          </a>{" "}
          uses in its paid agent delivery work, so we have a stake in this format. It&apos;s new and hasn&apos;t been widely used yet.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <h2 className="font-display text-3xl font-bold text-foreground">What goes on the page</h2>
        <ol className="mt-4 divide-y divide-border border-y border-border">
          {sections.map(([name, text], index) => (
            <li key={name} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6">
              <h3 className="shrink-0 font-display text-xl font-bold text-foreground sm:w-40">
                {index === 0 ? name : `${index}. ${name}`}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <h2 className="font-display text-3xl font-bold text-foreground">The blank template</h2>
        <pre className="mt-5 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-border bg-card p-5 font-mono text-xs leading-relaxed text-foreground">
          {blank}
        </pre>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <h2 className="font-display text-3xl font-bold text-foreground">A filled example</h2>
        <pre className="mt-5 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-border bg-card p-5 font-mono text-xs leading-relaxed text-foreground">
          {example}
        </pre>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <h2 className="font-display text-3xl font-bold text-foreground">Common questions</h2>
        <div className="mt-5 space-y-6">
          {faqs.map(({ question, answer }) => (
            <div key={question}>
              <h3 className="font-display text-xl font-bold text-foreground">{question}</h3>
              <p className="mt-1 max-w-2xl font-body leading-relaxed text-muted-foreground">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="font-display text-3xl font-bold text-foreground">Want the agent to fill in part of it?</h2>
        <p className="mt-3 max-w-2xl font-body leading-relaxed text-muted-foreground">
          If the agent can read its own tool list, you can have it{" "}
          <Link href="/personal" className="text-primary underline underline-offset-4">
            draw what it can read and change
          </Link>
          . That gives you a starting point for section 2, in the agent&apos;s own
          words, so check it before you rely on it.
        </p>
      </section>
    </>
  );
}
