import type { ReactNode } from "react";

// One "label: text" line in a one-page agent document. Label is optional.
export type DocItem = { label?: string; text: ReactNode };

interface DocSectionProps {
  heading: string;
  items: DocItem[];
  note?: ReactNode;
}

// A numbered section of a one-page agent document (Purpose, Authority, ...),
// shared by the sample review and the free blueprints so they read the same way.
export function DocSection({ heading, items, note }: DocSectionProps) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{heading}</h2>
      {note && <p className="mt-2 font-body text-sm text-muted-foreground">{note}</p>}
      <ul className="mt-4 space-y-3">
        {items.map((item, i) => (
          <li key={i} className="font-body leading-relaxed text-muted-foreground">
            {item.label && <span className="font-semibold text-foreground">{item.label}: </span>}
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
