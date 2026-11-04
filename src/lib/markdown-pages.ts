// Pages that agents can read as Markdown, either at <path>.md (home: /index.md)
// or by sending "Accept: text/markdown" to the normal URL. The Markdown is
// converted from each page's rendered <main>, so it never drifts from the page.
export const MARKDOWN_PAGES = ["/", "/personal", "/agents", "/sample-review", "/blueprints", "/blueprints/it-ticket-triage", "/servicenow"];

export function markdownUrlFor(path: string) {
  return path === "/" ? "/index.md" : `${path}.md`;
}

export function pageForMarkdownUrl(pathname: string) {
  if (!pathname.endsWith(".md")) return null;
  const page = pathname === "/index.md" ? "/" : pathname.slice(0, -3);
  return MARKDOWN_PAGES.includes(page) ? page : null;
}

// True only when the client names text/markdown and prefers it to HTML.
// Browsers and "*/*" clients keep getting HTML.
export function prefersMarkdown(accept: string | null) {
  if (!accept) return false;
  const quality = (type: string) => {
    for (const part of accept.split(",")) {
      const [mediaType, ...params] = part.trim().split(";");
      if (mediaType.trim().toLowerCase() !== type) continue;
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return q ? Number(q.slice(2)) || 0 : 1;
    }
    return 0;
  };
  const markdown = quality("text/markdown");
  return markdown > 0 && markdown >= quality("text/html");
}
