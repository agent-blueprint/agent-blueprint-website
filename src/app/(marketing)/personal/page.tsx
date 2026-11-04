import type { Metadata } from "next";
import Link from "next/link";
import { CopyLine } from "@/components/copy-line";
import { SampleFrame } from "@/components/sample-frame";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const description =
  "Paste one line into your coding agent and it draws a plain picture of what it can read, change and do, on your computer, with no sign-up.";

export const metadata: Metadata = {
  title: "Draw My Agent",
  description,
  alternates: { canonical: "/personal", types: { "text/markdown": "/personal.md" } },
  // Frozen: online for the plugin listings, kept out of search results.
  robots: { index: false, follow: true },
};

const breadcrumb = breadcrumbSchema([{ name: "Draw My Agent", path: "/personal" }]);
const webPage = webPageSchema({
  name: "Draw My Agent",
  description,
  path: "/personal",
  datePublished: "2026-10-31",
  dateModified: "2026-11-01",
});

const steps = [
  ["Paste the line", "Your agent reads our instructions and its own tool list."],
  ["It draws itself", "It writes one file on your computer. Open it in a browser."],
  ["Decide what's next", "Set rules to paste back, see what could be trimmed, and compare with an earlier drawing."],
];

const limits = [
  "The picture comes from your agent reading its own tool names and descriptions. It isn't proof of what a tool does.",
  "Rules are instructions, not a lock. In our small test, one saved rule stopped both agents from deleting files. That was one run each on one simple task.",
  "Coding agents like Claude Code and Codex save the drawing as a file. A chat app can't, so it gives you a link or a block of text that opens the same drawing in your browser.",
  "We never receive your drawing. Your agent fetches its instructions from us, and its own provider handles the session as it handles anything else you do there. If you choose to add your numbers to our benchmark, we get counts only, never names.",
];

export default function PersonalPage() {
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
          Personal blueprint
        </p>
        <h1
          className="mt-4 font-display font-bold text-foreground"
          style={{
            fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Ask your agent to draw itself.
        </h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
          Agents pile up tools fast. Paste this line and you get one page
          showing what yours can read, what it can change, and what it
          can&apos;t tell you.
        </p>
        <div className="mt-8">
          <CopyLine text="Read agentblueprint.ai/draw.md and draw me a blueprint of yourself." />
        </div>
        <p className="mt-3 font-body text-sm text-muted-foreground">
          No sign-up. Want to read it first?{" "}
          <Link href="/agents" className="text-primary underline underline-offset-4">
            Here&apos;s exactly what it tells your agent
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <ol className="grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
          {steps.map(([title, text], index) => (
            <li key={title}>
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              <h2 className="mt-1 font-display text-2xl font-bold text-foreground">{title}</h2>
              <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-14">
        <SampleFrame
          src="/samples/personal.html"
          title="Sample drawing of a made-up agent"
          label="SAMPLE / a made-up agent"
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-14">
        <div className="rounded-lg border border-border bg-secondary/50 p-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Planning an agent you haven&apos;t built yet?
          </h2>
          <p className="mt-2 font-body leading-relaxed text-muted-foreground">
            That&apos;s coming next. Today this only draws an agent that already
            exists.{" "}
            <Link href="/#contact" className="text-primary underline underline-offset-4">
              Tell us what you&apos;d want from it
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="font-display text-3xl font-bold text-foreground">What to know first</h2>
        <ul className="mt-5 space-y-4">
          {limits.map((text) => (
            <li key={text} className="border-l-2 border-primary/30 pl-4 font-body leading-relaxed text-muted-foreground">
              {text}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
