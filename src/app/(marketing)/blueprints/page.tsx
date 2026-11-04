import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const title = "Free AI Agent Blueprints";
const description =
  "Free, platform-neutral blueprints for common AI agents: what each needs, what not to let it touch, how to test it, the number to set before launch and when to keep, fix or stop it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blueprints", types: { "text/markdown": "/blueprints.md" } },
};

const breadcrumb = breadcrumbSchema([{ name: title, path: "/blueprints" }]);
const webPage = webPageSchema({ name: title, description, path: "/blueprints", dateModified: "2026-11-03" });

const blueprints = [
  {
    href: "/blueprints/it-ticket-triage",
    title: "IT ticket triage agent",
    text: "Sorts each new IT ticket to the right team. Test plan, starter instructions and output format, the reassignment rate to measure before launch, and the keep, fix or stop rule.",
  },
];

export default function BlueprintsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <section className="mx-auto max-w-4xl px-6 pt-28 pb-24 md:pt-36">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Free, no sign-up</p>
        <h1 className="mt-4 font-display text-5xl font-bold text-foreground">Agent blueprints</h1>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
          Starting points for common agents, on any platform. Each one says what
          the agent needs, what to keep it away from, how to test it and the
          number to set before launch.
        </p>
        <ul className="mt-10 space-y-4">
          {blueprints.map((b) => (
            <li key={b.href}>
              <Link href={b.href} className="group block rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary">
                <h2 className="font-display text-2xl font-bold text-foreground">{b.title}</h2>
                <p className="mt-2 font-body leading-relaxed text-muted-foreground">{b.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary">
                  Read the blueprint
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
