export function SampleFrame({
  src,
  title,
  label,
  height = 820,
}: {
  src: string;
  title: string;
  label: string;
  height?: number;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-card">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
        <span className="font-mono text-xs text-muted-foreground">{label}</span>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 font-body text-sm font-medium text-primary underline underline-offset-4"
        >
          Open full page
        </a>
      </figcaption>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="block w-full"
        style={{ height }}
      />
    </figure>
  );
}
