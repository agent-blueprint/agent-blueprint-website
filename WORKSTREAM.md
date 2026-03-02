# Current Workstream

> This file tracks what's been done, what's next, and open decisions.
> **Keep it updated** as work progresses — it's how the next session picks up where the last left off.

## Active Branch
- **`blueprint-theme`** (based on `content-baseline`)
- Pushed to origin, Vercel preview deployed
- Not yet merged to `main`
- Working tree: clean (last pushed 2026-03-01)

## What Was Done (2026-03-01, session 6)

### Project infrastructure for cross-session continuity
- Created `WORKSTREAM.md` in repo root (replaces local-only `.claude/` memory file) so all collaborators share workstream state
- Added "Workstream Tracking" section to `CLAUDE.md` instructing all Claude Code sessions to read/update `WORKSTREAM.md`
- Added "Team" section to `CLAUDE.md` with Amy's context (non-technical, use plain language)
- Rewrote `/handover` skill — now updates `WORKSTREAM.md`, merges main, verifies build, commits
- Created `/ship` skill — for when a feature is complete (updates docs, clears workstream, merges to main, deploys)
- Un-ignored `.claude/skills/` in `.gitignore` so skills travel with the repo (rest of `.claude/` stays local)

### Theme tokenization cleanup
- Added copper/bronze CSS tokens to `:root` (`--copper-base`, `--copper-dark`, `--copper-light`, `--copper-border`, `--vignette-dark`, `--copper-inset-glow`)
- Registered copper tokens in `@theme inline` for Tailwind classes
- `.btn-metallic` gradient anchors → `var(--copper-base/light/border)`
- `.btn-blueprint-outline` background → `var(--background)`
- `.cyanotype-vignette` → `var(--vignette-dark)`
- `.section-dark-borders` box-shadow → `oklch(from var(--copper-base) ... / 15%)`
- blueprint-margins.tsx, compass-arc.tsx, circuit-diagram.tsx, geometric-construction.tsx → `currentColor` + Tailwind token classes
- schematic-path.tsx → `var(--primary)`
- Grid SVG data URIs left as-is (browser limitation — can't use CSS vars inside `url()`)

### Prior uncommitted work (session 4, committed this session)
- Blueprint-outline button variant + cursor-pointer fix + hero line-height tuning

## Previous sessions (2026-03-01, sessions 2-5)
Full blueprint theme visual overhaul (13 commits), metallic button iterations, theme tokenization. All committed and pushed.

## What Needs Doing Next
- [ ] **More button tweaking** — Chris says "still more tweaking to do" (lightness, saturation, highlight position)
- [ ] **Clean up dead file** — delete `src/components/metallic-filter.tsx`
- [ ] **Tokenize scroll-ruler.tsx** — 3 remaining hardcoded `#1e3a5f` refs (low priority)
- [ ] Visual review of the full theme upgrade before merging
- [ ] Merge `blueprint-theme` → `main` once approved
- [ ] DNS cutover from Replit → Vercel (separate from theme work)

## Open Decisions
- Button gradient fine-tuning — exact lightness, saturation, and highlight position
- Blueprint-outline secondary button tint opacity (currently 7%)

## Key Files
```
CLAUDE.md                                          — project instructions, team info, workflow rules
WORKSTREAM.md                                      — this file
SETUP-AMY.md                                       — Amy's onboarding guide
.claude/skills/handover/skill.md                   — /handover skill
.claude/skills/ship/skill.md                       — /ship skill
src/app/globals.css                                — all CSS tokens, button classes, section styles
src/components/ui/button.tsx                       — button variants (metallic, blueprint-outline)
src/components/hero-section.tsx                    — hero with blueprint grid + CTAs
src/components/metallic-filter.tsx                 — DEAD FILE, safe to delete
```
