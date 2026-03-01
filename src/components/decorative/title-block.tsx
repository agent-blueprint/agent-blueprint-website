interface TitleBlockProps {
  project?: string;
  revision?: string;
  date?: string;
  scale?: string;
  className?: string;
}

export function TitleBlock({
  project = "AGENT BLUEPRINT",
  revision = "REV. 2.0",
  date = "2026-03-01",
  scale = "1:1",
  className = "",
}: TitleBlockProps) {
  return (
    <div
      className={`inline-block border border-primary/20 ${className}`}
      aria-hidden="true"
    >
      {/* Title row */}
      <div className="border-b border-primary/20 px-4 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-blueprint-annotation">
          {project}
        </span>
      </div>
      {/* Details row */}
      <div className="flex divide-x divide-primary/20">
        <div className="px-3 py-1">
          <span className="font-mono text-[9px] uppercase tracking-wider text-blueprint-annotation/60">
            {revision}
          </span>
        </div>
        <div className="px-3 py-1">
          <span className="font-mono text-[9px] uppercase tracking-wider text-blueprint-annotation/60">
            {date}
          </span>
        </div>
        <div className="px-3 py-1">
          <span className="font-mono text-[9px] uppercase tracking-wider text-blueprint-annotation/60">
            {scale}
          </span>
        </div>
      </div>
    </div>
  );
}
