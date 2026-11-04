import TurndownService from "turndown";
import { siteConfig } from "@/lib/metadata";
import { MARKDOWN_PAGES } from "@/lib/markdown-pages";

// Markdown version of a page, converted from its rendered <main>. Reached
// through src/proxy.ts, never linked directly.
const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });
turndown.remove(["script", "style", "noscript", "iframe", "button"]);
// Label/value lists (DocSection, scorecards) read best as "**Label:** value".
turndown.addRule("definitionTerm", {
  filter: "dt",
  replacement: (content, node) => {
    // A term may carry an explanatory note (marked data-note); show it in brackets.
    const el = node as HTMLElement;
    const note = el.querySelector?.("[data-note]")?.textContent?.trim();
    const full = (el.textContent ?? content).trim();
    const label = (note ? full.replace(note, "") : full).trim().replace(/:$/, "");
    return `\n\n**${label}**${note ? ` (${note})` : ""}: `;
  },
});
turndown.addRule("definitionDescription", {
  filter: "dd",
  // A code block must start on its own line to stay a fenced block.
  replacement: (content) => {
    const text = content.trim();
    return text.startsWith("```") ? `\n\n${text}\n\n` : `${text}\n\n`;
  },
});
// Cards that wrap a whole block in one link read better as the block followed
// by its link than as a single giant [link](url).
turndown.addRule("blockLink", {
  filter: (node) => node.nodeName === "A" && !!node.querySelector("h2, h3, p, div"),
  replacement: (content, node) => `\n\n${content.trim()}\n\nLink: ${(node as HTMLAnchorElement).getAttribute("href")}\n\n`,
});

export async function GET(request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const page = slug?.length ? `/${slug.join("/")}` : "/";
  if (!MARKDOWN_PAGES.includes(page)) return new Response("Not found", { status: 404 });

  const origin = new URL(request.url).origin;
  const res = await fetch(new URL(page, origin), { headers: { Accept: "text/html" } });
  if (!res.ok) return new Response("Page unavailable", { status: 502 });

  const html = await res.text();
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, "&") ?? siteConfig.name;
  const mainMatch = html.match(/<main[^>]*>([\s\S]*)<\/main>/);
  // No <main> means we fetched something other than our page (such as a
  // preview deploy's login wall), so fail rather than convert it.
  if (!mainMatch) return new Response("Page unavailable", { status: 502 });
  const canonical = `${siteConfig.url}${page === "/" ? "/" : page}`;
  // Drop drawings, decorative glyphs (aria-hidden) and the contact form, which
  // mean nothing in Markdown, then make every link absolute.
  const main = mainMatch[1]
    .replace(/<svg[\s\S]*?<\/svg>/g, "")
    .replace(/<span[^>]*aria-hidden="true"[^>]*>[^<]*<\/span>/g, "")
    .replace(/<form[\s\S]*?<\/form>/g, "");
  const absolute = main
    .replace(/(href|src)="\/(?!\/)/g, `$1="${siteConfig.url}/`)
    .replace(/href="#/g, `href="${canonical}#`);
  const markdown = `# ${title}\n\nSource: ${canonical}\n\n${turndown.turndown(absolute).trim()}\n`;

  const negotiated = new URL(request.url).searchParams.has("negotiated");
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      // A negotiated reply shares its URL with the HTML page, so keep shared
      // caches from storing it and handing Markdown to a browser.
      "Cache-Control": negotiated ? "private, max-age=300" : "public, max-age=300, s-maxage=3600",
      Link: `<${canonical}>; rel="canonical"`,
      "X-Robots-Tag": "noindex",
    },
  });
}
