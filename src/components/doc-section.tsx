import type { ReactNode } from "react";

// One "label: text" line in a one-page agent document. Label is optional.
export type DocItem = { label?: string; text: ReactNode };

interface DocSectionProps {
  heading: string;
  items: DocItem[];
  note?: ReactNode;
}

// A section of a one-page agent document (Purpose, Authority, ...), shared by
// the sample review and the free blueprints so they read the same way. On wide
// screens labels sit in their own column so the page scans like a spec sheet.
export function DocSection({ heading, items, note }: DocSectionProps) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{heading}</h2>
      {note && <p className="mt-2 font-body text-sm text-muted-foreground">{note}</p>}
      <dl className="mt-5 space-y-4">
        {items.map((item, i) =>
          item.label ? (
            <div key={i} className="grid gap-1 md:grid-cols-[190px_1fr] md:gap-6">
              <dt className="font-body text-sm font-semibold text-foreground md:pt-0.5">
                {item.label}
                <span className="md:hidden">:</span>
              </dt>
              <dd className="font-body leading-relaxed text-muted-foreground">{item.text}</dd>
            </div>
          ) : (
            <div key={i} className="flex gap-3 font-body leading-relaxed text-muted-foreground">
              <span aria-hidden className="text-accent">/</span>
              <span>{item.text}</span>
            </div>
          )
        )}
      </dl>
    </section>
  );
}
