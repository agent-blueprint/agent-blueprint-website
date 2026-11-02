# Current Workstream

> This file tracks what's been done, what's next, and open decisions.
> **Keep it updated** as work progresses — it's how the next session picks up where the last left off.

## Active Branch
- **`feat/three-blueprints`** (Oct 31, 2026, Chris-directed, not pushed): home page now offers three blueprints. `/personal` (Draw my agent, hosted at `/draw.md` and `/draw/v0.2/`), `/enterprise` (ServiceNow renewal concept, fictional data, not built), `/agents` (exact agent instructions and fingerprints). The old home moved to `/method`. Versioned files under `public/draw/` must never change: publish a new version.

## Earlier
- **`main`** — phase-1 copy repositioning SHIPPED to production 2026-07-09
- Chris reviewed the Vercel preview and approved ("looks great"); merged `pivot-copy-triage` (fast-forward) and pushed
- `pivot-copy-triage` branch deleted (local + origin) per Chris, 2026-07-09; all commits are on main

## Context: The Pivot (2026-07)

Agent Blueprint is no longer positioned as self-serve SaaS. It is the IP layer behind hands-on engagements: a methodology plus platform, delivered with clients, producing living blueprints. Self-serve signup on the app was closed 2026-07-08. The site's job now: credibility surface for engagement prospects, honest AI-discovery surface, eventual partner front door.

## What Was Done (2026-07-09)

### Phase-1 copy triage: SaaS story out, engagement story in
- Hero: new headline ("AI agents need a blueprint, not another slide deck"), new subhead (methodology + platform behind our engagements), eyebrow now the method beats (Assess, Prioritize, Blueprint, Deploy)
- Nav CTA: "Get Started" -> "Talk to Us", now works from subpages (`/#contact`, Next Link)
- How It Works: 4 steps rewritten to engagement framing; removed the SaaS-era YouTube explainer embed (old pitch, undermined new copy — restore with one revert if wanted)
- Capabilities: "Platform Capabilities" -> "What's in a Blueprint"; all 6 cards rewritten; version-pinned stats (8 MCP tools, 45+ agents, 6 stages) removed
- FAQ + all JSON-LD schemas (metadata.ts): rewritten; added explicit "Is Agent Blueprint self-serve?" (answer: no, engagements only); "vs consulting firms" answer replaced with "vs consulting deliverable" (living blueprint story)
- AEO surfaces rewritten for the new story: `public/llms.txt` (removed "start your free trial"), `llms-full.txt` route, `feed.json`, `public/AGENTS.md`, `agents.json`, `ai-agent.json`, `.well-known/agent.json`
- Use-case page (procurement RFx): both app.agentblueprint.ai CTAs repointed to `/#contact`
- Developers page/section: framed as client-team surface; "API tokens are issued with an engagement"; version pin 0.7.17 removed everywhere
- Sitemap + WebPage dateModified bumped to 2026-07-09 for changed pages

### Verification
- `npx eslint` on changed files: 0 errors (1 pre-existing unused-import warning in navigation.tsx)
- `npm run build`: exit 0 (true exit code, unpiped)
- Browser check on localhost:3100: hero/nav/steps render, zero console errors; llms.txt, llms-full.txt, feed.json all serve new content
- Remaining app.agentblueprint.ai references are intentional (JSON-LD client-access schema + labeled "Platform (client access)" link in llms-full)

## What Needs Doing Next
- [x] Chris review on Vercel preview (approved 2026-07-09)
- [x] Merge to main + push (production deployed 2026-07-09)
- [ ] Verify SENDGRID_API_KEY is set in Vercel with a test contact-form submission (form is now the only conversion path; emails chris@ + amy@)
- [ ] Phase-2 repositioning: decide site role split with Amy alongside the planned nowgentic.com redesign (does NowGentic get named here?); new proof/evidence content
- [ ] Decide fate of the old explainer video (removed from page, still on YouTube) and stale root-level screenshot PNGs (blueprint-*.png, from the March design pass)

## Open Decisions
- Whether agentblueprint.ai names NowGentic or stays "our engagements" (deferred to phase-2 with Amy)
- Whether /use-cases grows into the patterns/method library (recommended direction instead of a blog)

## Key Files
```
CLAUDE.md                                  — project instructions, team info, workflow rules
WORKSTREAM.md                              — this file
src/lib/metadata.ts                        — meta, JSON-LD schemas, FAQ content (single source)
src/components/hero-section.tsx            — hero copy
src/components/how-it-works-section.tsx    — method steps
src/components/capabilities-section.tsx    — what's-in-a-blueprint cards
public/llms.txt + src/app/llms-full.txt/   — AI-crawler content
public/AGENTS.md, agents.json, ai-agent.json, .well-known/agent.json — agent discovery files
```
