import { NextResponse, type NextRequest } from "next/server";
import { MARKDOWN_PAGES, pageForMarkdownUrl, prefersMarkdown } from "@/lib/markdown-pages";

// Serves Markdown versions of the main pages to agents: /personal.md always,
// and /personal itself when the request asks for text/markdown. Everything
// else passes through untouched.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const mdPage = pageForMarkdownUrl(pathname);
  if (mdPage) {
    return NextResponse.rewrite(new URL(`/md${mdPage === "/" ? "" : mdPage}`, request.url));
  }

  if (MARKDOWN_PAGES.includes(pathname) && prefersMarkdown(request.headers.get("accept"))) {
    const url = new URL(`/md${pathname === "/" ? "" : pathname}`, request.url);
    url.searchParams.set("negotiated", "1");
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/personal",
    "/agents",
    "/sample-review",
    "/blueprints",
    "/blueprints/it-ticket-triage",
    "/servicenow",
    "/index.md",
    "/personal.md",
    "/agents.md",
    "/sample-review.md",
    "/blueprints.md",
    "/blueprints/it-ticket-triage.md",
    "/servicenow.md",
  ],
};
