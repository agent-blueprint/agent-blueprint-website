import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const RUN_DATE = "2026-11-02";
const DATA = `/benchmarks/agent-jobs/${RUN_DATE}`;

const title = "AI Agent Cost Per Task: Measured Token Usage";
const description =
  "Measured token usage and cost for ten everyday AI agent jobs, five runs each on Claude Code and Codex. Typical cost $0.09 to $0.35 per job, with worst cases, method and raw data.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/agent-cost-benchmark" },
};

const breadcrumb = breadcrumbSchema([{ name: title, path: "/agent-cost-benchmark" }]);
const webPage = webPageSchema({
  name: title,
  description,
  path: "/agent-cost-benchmark",
  datePublished: RUN_DATE,
  dateModified: RUN_DATE,
});

type Stat = { median: number; min: number; max: number };
type JobSummary = {
  runs: number;
  passed: number;
  input_total: Stat;
  output: Stat;
  tool_calls: Stat;
  seconds: Stat;
  cost_usd?: Stat;
  est_api_cost_usd?: Stat;
};
type Job = { id: string; title: string; description: string };

function readData<T>(name: string): T {
  return JSON.parse(
    readFileSync(path.join(process.cwd(), "public", "benchmarks", "agent-jobs", RUN_DATE, name), "utf8")
  ) as T;
}

const tokens = (n: number) => `${Math.round(n / 1000).toLocaleString("en-US")}k`;
const usd = (n: number) => `$${n.toFixed(2)}`;

function AgentLine({ name, s, estimated }: { name: string; s?: JobSummary; estimated?: boolean }) {
  if (!s) return null;
  const cost = estimated ? s.est_api_cost_usd : s.cost_usd;
  return (
    <p className="font-body text-sm leading-relaxed text-muted-foreground">
      <span className="font-semibold text-foreground">{name}:</span> {cost ? usd(cost.median) : "n/a"}
      {estimated ? " est." : ""} (worst {cost ? usd(cost.max) : "n/a"}). {tokens(s.input_total.median)} input tokens
      (worst {tokens(s.input_total.max)}), {Math.round(s.output.median).toLocaleString("en-US")} output,{" "}
      {s.tool_calls.median} tool calls, {Math.round(s.seconds.median)} s. Passed {s.passed} of {s.runs}.
    </p>
  );
}

const faqs = [
  {
    question: "How much does an AI agent cost per task?",
    answer:
      "In these runs, $0.09 to $0.35 per job at API prices, for jobs that took an agent 20 to 45 seconds. The biggest driver was how much the agent had to read: a 16,000-word contract cost about four times as much as a code change. Your own cost depends on your model, your prices and how much your agent reads.",
  },
  {
    question: "Why does a tiny task still use tens of thousands of tokens?",
    answer:
      "Every step, the agent re-reads its own instructions, its tool descriptions and the conversation so far. Here that floor was about 29k input tokens for Claude Code and 60k for Codex, even for the smallest jobs. Most of it is cached, which providers charge far less for.",
  },
  {
    question: "Is Claude Code or Codex cheaper?",
    answer:
      "On these jobs Claude Code was cheaper on most small jobs and the two were about even on the longest documents. Codex read more input but wrote about a third as much output. Over all 50 runs each, that was $7.80 for Claude Code and an estimated $11.17 for Codex. Different models, settings or prices would change this, and both got every job right.",
  },
  {
    question: "Can I use these numbers in a business case?",
    answer: (
      <>
        As a starting estimate, yes, with the limits below. Measure your own agent once it runs, because real work is
        larger and messier. The{" "}
        <Link href="/agent-one-page-template" className="text-primary underline underline-offset-4">
          one-page agent summary template
        </Link>{" "}
        has a cost section where these numbers fit.
      </>
    ),
  },
];

export default function AgentCostBenchmarkPage() {
  const summary = readData<Record<string, JobSummary>>("summary.json");
  const jobs = readData<Job[]>("jobs.json");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <section className="mx-auto max-w-4xl px-6 pt-28 pb-12 md:pt-36">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Measured runs, {RUN_DATE}</p>
        <h1
          className="mt-4 font-display font-bold text-foreground"
          style={{ fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          What everyday AI agent jobs cost
        </h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
          We gave Claude Code and Codex ten realistic jobs and ran each one five times. All 100 runs got the job
          right. A typical job cost $0.09 to $0.35 at API prices. Cost followed how much the agent had to read, not
          how hard the job was.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-body">
          <li>
            <a href={`${DATA}/results.md`} className="text-primary underline underline-offset-4">
              Results (Markdown)
            </a>
          </li>
          <li>
            <a href={`${DATA}/summary.json`} className="text-primary underline underline-offset-4">
              Summary (JSON)
            </a>
          </li>
          <li>
            <a href={`${DATA}/runs.json`} className="text-primary underline underline-offset-4">
              Every run (JSON)
            </a>
          </li>
        </ul>
        <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground">
          By Chris Faulkner, Agent Blueprint. Runs on {RUN_DATE} with Claude Code 2.1.307 (claude-opus-5-5) and Codex
          CLI 0.154.0 (gpt-6-astra). Agent Blueprint is the method{" "}
          <a href="https://nowgentic.com" className="text-primary underline underline-offset-4">
            NowGentic
          </a>{" "}
          uses in its paid agent delivery work.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <h2 className="font-display text-3xl font-bold text-foreground">How to estimate your own job</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 font-body leading-relaxed text-muted-foreground">
          <li>
            Pick the closest job below and scale by how much more or less your agent has to read. Each job says how
            big its input was, and they&apos;re small: real emails, threads and documents are usually longer.
          </li>
          <li>
            Multiply its typical input and output tokens by your model&apos;s current prices. Most input is cached,
            about 81% for Claude Code and 88% for Codex here, and cached input costs far less.
          </li>
          <li>
            Allow for a worst case. Most jobs&apos; most expensive run was within 1.3x of typical, but one data-cleanup
            run used 2.3x.
          </li>
          <li>
            Expect a floor even for tiny jobs, about 29k input tokens for Claude Code and 60k for Codex, because the
            agent re-reads its own instructions and tools at every step.
          </li>
        </ol>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <h2 className="font-display text-3xl font-bold text-foreground">Results per job</h2>
        <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">
          Typical (median) of five runs, with the worst run in brackets. Claude Code cost is what it reports at
          Anthropic API rates. Codex reports no dollars on a ChatGPT plan, so its cost is estimated from its tokens
          at OpenAI&apos;s standard API prices for gpt-6-astra on {RUN_DATE}: $10 per million input tokens, $1 cached,
          $50 output.
        </p>
        <ol className="mt-5 divide-y divide-border border-y border-border">
          {jobs.map((job) => (
            <li key={job.id} className="py-4">
              <h3 className="font-display text-xl font-bold text-foreground">{job.title}</h3>
              <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{job.description}</p>
              <div className="mt-2 space-y-1">
                <AgentLine name="Claude Code" s={summary[`claude/${job.id}`]} />
                <AgentLine name="Codex" s={summary[`codex/${job.id}`]} estimated />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <h2 className="font-display text-3xl font-bold text-foreground">How it was measured</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 font-body leading-relaxed text-muted-foreground">
          <li>
            Every job uses made-up data and has a fixed pass check. Code jobs also run hidden tests the agent never
            sees. A reference solution passes every check, and an untouched copy fails them.
          </li>
          <li>
            Each run starts from a fresh copy of the job. Both agents ran without personal settings, memory, skills or
            extra connectors, with only their built-in file and shell tools and no web access.
          </li>
          <li>Default reasoning effort, one Mac, one day.</li>
        </ul>
        <h3 className="mt-6 font-display text-xl font-bold text-foreground">Limits</h3>
        <ul className="mt-2 list-disc space-y-2 pl-5 font-body leading-relaxed text-muted-foreground">
          <li>The jobs are small and synthetic. Real work is larger and messier.</li>
          <li>Both agents passed everything, so this shows the cost of work done right, not where agents fail.</li>
          <li>One model per agent and five runs per job. Prices and models change, so tokens are the lasting measure.</li>
        </ul>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
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
    </>
  );
}
