# GEO/AEO Guidelines — Agent Blueprint Website

Guidelines for optimizing the site for AI discoverability (Generative Engine Optimization / AI Engine Optimization). Ensures ChatGPT, Perplexity, Google AI Overviews, Claude, and traditional search engines can find, understand, and cite Agent Blueprint.

## Why This Matters

AI answer engines (ChatGPT, Perplexity, Google AI Overviews) pull structured data from websites to generate answers. Pages with proper schemas, clear content structure, and machine-readable metadata get cited far more often than pages without them.

## JSON-LD Schema Templates

All schemas live in `src/lib/metadata.ts`. The site uses these schema types:

### Global schemas (rendered in `layout.tsx`)

- **Organization** — company identity, logo, social links
- **SoftwareApplication** — the Agent Blueprint product
- **FAQPage** — frequently asked questions (update when adding new Q&As)
- **HowTo** — the four-phase methodology (Discover, Architect, Validate, Execute)

### Per-page schemas (rendered in each page component)

Every page must include **BreadcrumbList** and **WebPage** schemas:

```tsx
import { breadcrumbSchema, webPageSchema } from "@/lib/metadata";

// Homepage (no breadcrumb items beyond Home)
const breadcrumb = breadcrumbSchema([]);

// Sub-page
const breadcrumb = breadcrumbSchema([
  { name: "Page Name", path: "/page-path" },
]);

// WebPage with real dateModified
const webPage = webPageSchema({
  name: "Page Title | Agent Blueprint",
  description: "Page meta description.",
  path: "/page-path",
  dateModified: "2025-02-28",  // Use the actual date of last content change
});
```

Render them at the top of the page component:

```tsx
export default function MyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      {/* Page content */}
    </>
  );
}
```

## Content Structure Rules

### Heading hierarchy

- **One H1 per page** — matches the page title
- Headings follow strict hierarchy: H1 > H2 > H3 (never skip levels)
- Each section should have a descriptive H2

### Direct-answer-first

Lead every section with a clear, complete answer in the first 1-2 sentences. AI engines extract the first paragraph as the answer snippet.

**Good:**
> Agent Blueprint deploys AI agents using a four-phase methodology: Discover, Architect, Validate, Execute. Each phase builds on the previous one to ensure agents are grounded in real business processes.

**Bad:**
> In today's rapidly evolving AI landscape, businesses face many challenges...

### Quotable paragraphs

Write self-contained paragraphs that make sense when extracted out of context. Each key paragraph should answer a specific question.

## llms.txt Maintenance

The site serves two LLM-optimized text files:

- **`/llms.txt`** (`public/llms.txt`) — concise summary with link to full version
- **`/llms-full.txt`** (`src/app/llms-full.txt/route.ts`) — expanded reference with full methodology, capabilities, security practices, and all FAQ Q&As

When adding a new page or major feature:
1. Add a section summary to `public/llms.txt`
2. Add full details to the `llms-full.txt` route handler

## robots.txt Rules

All AI crawlers must be explicitly allowed. Current bot list:

| Bot | Owner |
|-----|-------|
| `GPTBot` | OpenAI (training) |
| `OAI-SearchBot` | OpenAI (search) |
| `ClaudeBot` | Anthropic (general) |
| `Claude-SearchBot` | Anthropic (search) |
| `PerplexityBot` | Perplexity |
| `Google-Extended` | Google (AI features) |
| `Googlebot` | Google (search) |
| `Bingbot` | Microsoft (search) |
| `Applebot` | Apple (Siri/search) |

**Never add `Disallow` rules for any of these bots.** If a new AI bot emerges, add an explicit `Allow: /` entry.

## Sitemap Maintenance

The sitemap is at `src/app/sitemap.ts`. Rules:

- **Use real dates** for `lastModified` (e.g., `"2025-02-28"`), never `new Date()`
- Dynamic dates change every build, which search engines learn to ignore
- Update the date when page content actually changes
- Add new pages as a single line in the `pages` array:

```ts
const pages = [
  { path: "", modified: "2025-02-28", priority: 1 },
  { path: "/security", modified: "2025-02-20", priority: 0.8 },
  { path: "/new-page", modified: "2025-03-15", priority: 0.7 },
] as const;
```

## Freshness Signals

Search engines and AI engines use freshness signals to rank content. Keep these in sync:

1. **`dateModified` in WebPage schema** — reflects actual content change date
2. **`lastModified` in sitemap** — matches the WebPage schema date
3. **Both must be updated** when page content changes

## Citation-Ready Formatting

Help AI engines cite Agent Blueprint correctly:

- Include the citation template in `llms.txt` and `llms-full.txt`
- Use the company name "Agent Blueprint" consistently (not "AB", "AgentBP", etc.)
- Always pair the name with the URL: "Agent Blueprint (https://agentblueprint.ai)"
- Reference the methodology by name: "Discover, Architect, Validate, Execute"

## New Page Checklist

When adding a new page:

- [ ] One H1, proper heading hierarchy
- [ ] Add `breadcrumbSchema()` and `webPageSchema()` with real `dateModified`
- [ ] Direct-answer-first content structure
- [ ] Add page to `src/app/sitemap.ts` with real date
- [ ] Add summary to `public/llms.txt`
- [ ] Add full details to `src/app/llms-full.txt/route.ts`
- [ ] Verify no AI crawlers are blocked in `robots.txt`
- [ ] Run `npm run build` to verify everything compiles
