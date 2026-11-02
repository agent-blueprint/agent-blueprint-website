import type { Metadata } from "next";
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

const UPDATED = "2026-11-02";
const title = "Privacy";
const description =
  "What agentblueprint.ai and the Agent Blueprint plugin collect: the plugin collects nothing, the site counts visits without cookies, and the contact form emails us what you type.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
};

const breadcrumb = breadcrumbSchema([{ name: title, path: "/privacy" }]);
const webPage = webPageSchema({ name: title, description, path: "/privacy", datePublished: UPDATED, dateModified: UPDATED });

const sections: { heading: string; points: React.ReactNode[] }[] = [
  {
    heading: "The Agent Blueprint plugin and agent files",
    points: [
      "The plugin runs entirely inside your own agent. It has no server, makes no network requests, and collects, stores or sends no data.",
      "The same goes for the files we publish for agents, such as the drawing instructions and the one-page template. A drawing your agent makes is saved on your computer and never sent to us.",
    ],
  },
  {
    heading: "Visiting this website",
    points: [
      <>
        We count visits with Vercel Web Analytics. It sets no cookies. It records the page, the referring site, rough
        location, and device, browser and operating system, and it recognizes a visitor only by a hash that is
        discarded after 24 hours, not tied to your IP address.{" "}
        <a href="https://vercel.com/docs/analytics/privacy-policy" className="text-primary underline underline-offset-4">
          Vercel&apos;s details
        </a>
        .
      </>,
      "The site is hosted by Vercel, which handles requests and keeps standard server logs to run and secure the service.",
      "Our fonts are served from this site, so your browser doesn't contact Google for them.",
      "One exception: the sample view on the ServiceNow page loads its fonts from Google Fonts, and remembers whether you chose light or dark mode in your own browser.",
    ],
  },
  {
    heading: "The contact form",
    points: [
      "If you use the contact form, the name, email, company and message you type are emailed to us through SendGrid. The site doesn't store them anywhere else.",
      "We use them only to reply and follow up about your enquiry, and we keep them in our email for as long as that takes. We don't sell them or add you to a mailing list.",
    ],
  },
  {
    heading: "Your choices",
    points: [
      <>
        To ask what we hold about you, or to have it deleted, email{" "}
        <a href="mailto:info@agentblueprint.ai" className="text-primary underline underline-offset-4">
          info@agentblueprint.ai
        </a>
        .
      </>,
      "If this page changes, the date at the top changes with it.",
    ],
  },
];

export default function PrivacyPage() {
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
          Privacy
        </h1>
        <p className="mt-5 font-body text-lg leading-relaxed text-muted-foreground">
          The short version: the Agent Blueprint plugin collects nothing, this website counts visits without cookies,
          and the contact form emails us whatever you type into it.
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
