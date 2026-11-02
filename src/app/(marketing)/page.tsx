import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { breadcrumbSchema, webPageSchema, siteConfig } from "@/lib/metadata";
import { storeListingUrl } from "@/lib/store-app";

const pageTitle = "Agent Blueprint | Know What Your AI Agents Can Actually Do";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { title: pageTitle, description: siteConfig.description },
  twitter: { title: pageTitle, description: siteConfig.description },
};

const homeBreadcrumb = breadcrumbSchema([]);
const homeWebPage = webPageSchema({
  name: pageTitle,
  description: siteConfig.description,
  path: "/",
  datePublished: "2025-09-15",
  dateModified: "2026-11-01",
});

// Illustrative shape only, labeled as a sample on the page.
const sampleRows = [
  { name: "This computer", reads: 30, changes: 70 },
  { name: "Gmail", reads: 62, changes: 38 },
  { name: "GitHub", reads: 55, changes: 45 },
  { name: "Calendar", reads: 50, changes: 50 },
];

const pageParts = [
  ["What it can read", "Everything it can look at without changing anything."],
  ["What it can change", "Anything it can send, edit, delete, run or buy."],
  ["Who has to say yes", "Where a person approves, and where you can't tell."],
  ["What nobody can see", "What the picture can't prove, said out loud."],
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPage) }}
      />

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(var(--blueprint-grid) 1px, transparent 1px), linear-gradient(90deg, var(--blueprint-grid) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(to bottom, black 40%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-12 md:pt-40 md:pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            One plain page for every AI agent
          </p>
          <h1
            className="mt-5 max-w-4xl font-display font-bold text-foreground"
            style={{
              fontSize: "clamp(2.75rem, 6vw + 0.5rem, 5.25rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Know what your agents can actually do.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
            A blueprint shows what an agent can read, what it can change, and
            who has to say yes. Pick the one that fits the agent in front of you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20" aria-label="Blueprint options">
        <div className="grid gap-5 md:grid-cols-5">
          <Link
            href="/personal"
            className="group flex flex-col rounded-lg border border-primary/30 bg-card p-6 transition-shadow hover:shadow-lg md:col-span-3 md:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              01 / Personal
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground">
              The agent on your computer
            </h2>
            <p className="mt-3 max-w-lg font-body leading-relaxed text-muted-foreground">
              Paste one line into your coding agent. It draws itself: every
              tool, what can change things, and what it can&apos;t tell you.
              Then set rules it should follow.
            </p>
            <div className="mt-7 space-y-3" aria-hidden>
              {sampleRows.map((row) => (
                <div key={row.name} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">
                    {row.name}
                  </span>
                  <span className="flex h-3 flex-1 gap-0.5 overflow-hidden rounded-sm">
                    <span className="bg-primary" style={{ width: `${row.reads}%` }} />
                    <span className="bg-accent" style={{ width: `${row.changes}%` }} />
                  </span>
                </div>
              ))}
              <p className="pt-1 font-mono text-xs text-muted-foreground">
                <span className="text-primary">reads</span> /{" "}
                <span className="text-accent">changes</span> (sample)
              </p>
            </div>
            <span className="mt-7 inline-flex items-center gap-2 font-body font-semibold text-primary">
              Draw my agent
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-2 font-body text-sm text-muted-foreground">
              No sign-up. The drawing stays on your computer.
            </span>
          </Link>

          <Link
            href={storeListingUrl ?? "/servicenow"}
            className="group flex flex-col rounded-lg border border-border bg-secondary/50 p-6 transition-shadow hover:shadow-lg md:col-span-2 md:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              02 / ServiceNow
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground">
              The agents your company pays for
            </h2>
            <p className="mt-3 font-body leading-relaxed text-muted-foreground">
              An app for the ServiceNow Store: one renewal view of every agent,
              showing what to keep, fix or rethink.
            </p>
            <div className="mt-7 flex gap-2" aria-hidden>
              {["Keep", "Fix", "Rethink"].map((label) => (
                <span
                  key={label}
                  className="rounded-sm border border-primary/25 px-3 py-1.5 font-mono text-xs text-primary"
                >
                  {label}
                </span>
              ))}
            </div>
            <span className="mt-auto inline-flex items-center gap-2 pt-7 font-body font-semibold text-primary">
              {storeListingUrl ? "Get it on the ServiceNow Store" : "See the app"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            {!storeListingUrl && (
              <span className="mt-2 font-body text-sm text-muted-foreground">
                In development. Not in the Store yet.
              </span>
            )}
          </Link>

          <Link
            href="/agents"
            className="group grid gap-6 rounded-lg p-6 transition-shadow hover:shadow-lg md:col-span-5 md:grid-cols-5 md:p-8"
            style={{ backgroundColor: "var(--hero-bg)", color: "var(--hero-fg)" }}
          >
            <div className="md:col-span-2">
              <p
                className="font-mono text-xs uppercase tracking-[0.14em]"
                style={{ color: "var(--hero-muted)" }}
              >
                03 / For agents
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight">
                A blueprint your agent can use
              </h2>
              <p
                className="mt-3 font-body leading-relaxed"
                style={{ color: "var(--hero-muted)" }}
              >
                Your agent draws itself and takes back the rules you set. Read
                the exact words we give it before you let it follow them.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-body font-semibold">
                See what your agent gets
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <pre
              className="overflow-x-auto rounded-md border border-white/15 p-4 font-mono text-xs leading-relaxed md:col-span-3 md:text-sm"
              aria-label="Excerpt from draw.md"
            >{`# Draw my agent

Only do this if your person asked for it.

- Do not call or load a tool to find out what it does.
- Do not read passwords, API keys or tokens.
- Do not send anything anywhere.
- Do not change any settings.`}</pre>
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {pageParts.map(([title, text]) => (
            <div key={title}>
              <h3 className="font-display text-2xl font-bold text-foreground">{title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <p className="max-w-2xl font-body leading-relaxed text-muted-foreground">
          Rolling agents out across a company? Agent Blueprint is also the method
          behind our delivery work at{" "}
          <a href="https://nowgentic.com" className="text-primary underline underline-offset-4">
            NowGentic
          </a>
          .{" "}
          <Link href="/method" className="text-primary underline underline-offset-4">
            See how the method works
          </Link>
          .
        </p>
      </section>

      <ContactSection />
    </>
  );
}
