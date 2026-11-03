import type { Metadata } from "next";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const UPDATED = "2026-11-03";
const title = "Terms of Service";
const description =
  "The terms for using agentblueprint.ai, the Agent Blueprint plugin and the Agent Blueprint tools server: free to use, provided as-is, and estimates are estimates.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
};

const breadcrumb = breadcrumbSchema([{ name: title, path: "/terms" }]);
const webPage = webPageSchema({ name: title, description, path: "/terms", datePublished: UPDATED, dateModified: UPDATED });

const link = "text-primary underline underline-offset-4";

const sections: { heading: string; points: React.ReactNode[] }[] = [
  {
    heading: "Who we are and what this covers",
    points: [
      "Agent Blueprint, Inc. runs agentblueprint.ai. These terms cover this website, the Agent Blueprint plugin, the files we publish for agents (such as the drawing instructions and the one-page template), and the Agent Blueprint tools server at agentblueprint.ai/mcp.",
      "By using any of them you agree to these terms. If you use them for an organization, you confirm you're allowed to accept these terms for it.",
    ],
  },
  {
    heading: "Using them",
    points: [
      "They're free. You may use them for personal or business work.",
      <>
        The plugin&apos;s code and skills are open source under the{" "}
        <a href="https://github.com/agent-blueprint/agent-blueprint-skills/blob/main/LICENSE" className={link}>
          Apache License 2.0
        </a>
        , which governs your use of that code. The Agent Blueprint name and logo are trademarks and aren&apos;t licensed by
        it.
      </>,
      "Don't use the tools server to break the law, to attack or overload it, or to get around its limits. We may limit or block traffic that does.",
    ],
  },
  {
    heading: "Estimates are estimates",
    points: [
      "Cost figures come from a small benchmark of made-up jobs run on one day with specific agents and models. Your real costs will differ. Check current prices with your provider before you rely on a number.",
      "The one-page check looks at a page's structure, not at whether its answers are right. A drawing of an agent shows what the agent reports about itself, which may be incomplete.",
      "Nothing here is legal, financial or security advice. Decisions about your agents stay yours.",
    ],
  },
  {
    heading: "Your content",
    points: [
      <>
        What you or your agent send to the tools stays yours. We use it only to return the result, and we don&apos;t keep it.
        The{" "}
        <a href="/privacy" className={link}>
          privacy page
        </a>{" "}
        has the details.
      </>,
    ],
  },
  {
    heading: "No warranty, limited liability",
    points: [
      'Everything here is provided "as is" and "as available," without warranties of any kind, to the extent the law allows. We may change, pause or stop any part of it at any time.',
      "To the extent the law allows, Agent Blueprint, Inc. isn't liable for indirect or consequential losses, or for any loss from relying on an estimate, check or drawing. Because the service is free, our total liability for any claim is limited to US$100.",
    ],
  },
  {
    heading: "Changes and contact",
    points: [
      "If these terms change, the date at the top changes with it. Using the service after a change means you accept the new terms.",
      "These terms are governed by the laws of the State of Delaware.",
      <>
        Questions:{" "}
        <a href="mailto:info@agentblueprint.ai" className={link}>
          info@agentblueprint.ai
        </a>
        .
      </>,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <section className="mx-auto max-w-3xl px-6 pt-28 pb-10 md:pt-36">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Updated {UPDATED}</p>
        <h1
          className="mt-4 font-display font-bold text-foreground"
          style={{ fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          Terms of Service
        </h1>
        <p className="mt-5 font-body text-lg leading-relaxed text-muted-foreground">
          The short version: it&apos;s free, it&apos;s provided as-is, and cost figures are estimates you should check
          against your own runs.
        </p>
      </section>
      <section className="mx-auto max-w-3xl space-y-10 px-6 pb-24">
        {sections.map(({ heading, points }) => (
          <div key={heading}>
            <h2 className="font-display text-2xl font-bold text-foreground">{heading}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 font-body leading-relaxed text-muted-foreground">
              {points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
