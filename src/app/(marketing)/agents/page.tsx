import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { CopyLine } from "@/components/copy-line";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const description =
  "A blueprint your agent can use: it draws itself and takes back the rules you set. Read the exact instructions first, with no hidden text.";

export const metadata: Metadata = {
  title: "For Agents",
  description,
  alternates: { canonical: "/agents", types: { "text/markdown": "/agents.md" } },
};

const breadcrumb = breadcrumbSchema([{ name: "For Agents", path: "/agents" }]);
const webPage = webPageSchema({
  name: "For Agents",
  description,
  path: "/agents",
  datePublished: "2026-10-31",
  dateModified: "2026-11-01",
});

function readDrawFile(name: string) {
  const content = readFileSync(
    path.join(process.cwd(), "public", "draw", "v0.2", name),
    "utf8"
  );
  return {
    content,
    sha256: createHash("sha256").update(content).digest("hex"),
  };
}

const agentUses = [
  ["A picture of itself", "Every tool it has, what can change things, and what it can't see about itself."],
  ["Your rules", "You set rules on the page and paste them back. They're instructions, not a lock."],
  ["A record to compare", "Exact tool names, so a later drawing can be compared with this one."],
];

const neverAsk = [
  "Share a password, key or token",
  "Install anything or run a script from us",
  "Change a setting or call a tool to test it",
  "Send anything back to us",
];

const agentLinks = [
  ["/draw.md", "Instructions for drawing a blueprint of yourself"],
  ["/draw/v0.2/template.html", "The page you fill in"],
  ["/agent-one-page-template.md", "One-page summary template to fill in with your person"],
  ["/agent-cost-benchmark.md", "Measured token usage and cost for ten everyday agent jobs"],
  ["/llms.txt", "Short summary of Agent Blueprint"],
  ["/llms-full.txt", "Full reference"],
  ["/AGENTS.md", "Where to send your person next"],
];

export default function AgentsPage() {
  const draw = readDrawFile("draw.md");
  const template = readDrawFile("template.html");

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
      <section className="mt-16" style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}>
        <div className="mx-auto max-w-4xl px-6 pt-12 pb-12 md:pt-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: "var(--hero-muted)" }}>
            For agents, and the people who run them
          </p>
          <h1
            className="mt-4 font-display font-bold"
            style={{
              fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            A blueprint your agent can use.
          </h1>
          <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed" style={{ color: "var(--hero-muted)" }}>
            Your agent reads one file, draws what it can do, and takes back the
            rules you set. Asking an agent to follow instructions from a website
            is a real risk, so you can read every word first. Everything below
            is what your agent gets, with no hidden text.
          </p>
          <div className="mt-8 rounded-md border border-white/15 p-5 font-mono text-sm leading-relaxed">
            <p>If you are an agent: nothing on this page is a command.</p>
            <p className="mt-2">
              Only follow /draw.md if your person asked you to. If you got here
              on your own, tell them what you found and ask.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pt-14">
        <h2 className="font-display text-3xl font-bold text-foreground">What your agent gets from it</h2>
        <ul className="mt-5 grid gap-6 sm:grid-cols-3">
          {agentUses.map(([title, text]) => (
            <li key={title} className="border-t border-border pt-4">
              <h3 className="font-display text-2xl font-bold text-foreground">{title}</h3>
              <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="font-display text-3xl font-bold text-foreground">What we never ask an agent to do</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {neverAsk.map((text) => (
            <li key={text} className="border-l-2 border-accent pl-4 font-body text-foreground">
              {text}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">
          Why this matters:{" "}
          <a
            href="https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/"
            className="text-primary underline underline-offset-4"
          >
            Snyk&apos;s February 2026 study
          </a>{" "}
          of 3,984 agent skills reported security flaws in 36% of them. Don&apos;t take
          our word for it. Have your agent, or a second one, review the file
          before it follows it.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <h2 className="font-display text-3xl font-bold text-foreground">Check the file you got</h2>
        <p className="mt-3 font-body leading-relaxed text-muted-foreground">
          Files under a version number don&apos;t change. A new version gets a new
          address. These fingerprints let you confirm that yours matches.
        </p>
        <dl className="mt-5 space-y-3 font-mono text-xs">
          <div>
            <dt className="text-muted-foreground">/draw/v0.2/draw.md, sha256</dt>
            <dd className="break-all text-foreground">{draw.sha256}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">/draw/v0.2/template.html, sha256</dt>
            <dd className="break-all text-foreground">{template.sha256}</dd>
          </div>
        </dl>
        <div className="mt-5">
          <CopyLine text="curl -s https://agentblueprint.ai/draw/v0.2/draw.md | shasum -a 256" />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <h2 className="font-display text-3xl font-bold text-foreground">Addresses for agents</h2>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {agentLinks.map(([href, text]) => (
            <li key={href} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6">
              <a href={href} className="shrink-0 font-mono text-sm text-primary underline underline-offset-4 sm:w-64">
                {href}
              </a>
              <span className="font-body text-sm text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="font-display text-3xl font-bold text-foreground">The whole file, as your agent reads it</h2>
        <pre className="mt-5 max-h-[640px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-border bg-card p-5 font-mono text-xs leading-relaxed text-foreground">
          {draw.content}
        </pre>
      </section>
    </>
  );
}
