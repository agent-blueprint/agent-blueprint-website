# Current Workstream

> This file tracks what's been done, what's next, and open decisions.
> **Keep it updated** as work progresses — it's how the next session picks up where the last left off.

## Active Branch
- **`blueprint-theme`** (based on `content-baseline`)
- Pushed to origin, Vercel preview deployed
- Not yet merged to `main`
- Working tree: clean (last pushed 2026-03-01)

## What Was Done (2026-03-01)

### Theme tokenization (session 5)
Routed hardcoded hex/oklch/rgba color values through CSS custom properties. Future theme color changes are now a one-file edit in `globals.css`. No visual changes.

### Button redesign (session 4)
Polished metal gradient + nameplate approach for primary CTA. Blueprint-outline secondary button with line-draw hover animation. Cursor-tracking mouse reflection on metallic buttons. Hero line-height tuning.

### Blueprint theme character upgrade (sessions 2-3)
Full visual overhaul: 3-tier engineering grid, paper texture, compass arcs, circuit diagrams, geometric constructions, schematic paths, corner brackets, copper underline hovers, redline annotations, scroll ruler, cyanotype vignette on dark sections. 13 commits total.

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
src/app/globals.css                                — all CSS tokens, button classes, section styles
src/components/ui/button.tsx                       — button variants (metallic, blueprint-outline)
src/components/hero-section.tsx                    — hero with blueprint grid + CTAs
src/components/blueprint-margins.tsx               — margin decorations (zone letters, reg crosses)
src/components/decorative/compass-arc.tsx          — decorative SVG
src/components/decorative/circuit-diagram.tsx      — decorative SVG
src/components/decorative/geometric-construction.tsx — decorative SVG
src/components/schematic-path.tsx                  — how-it-works connector path
src/components/metallic-filter.tsx                 — DEAD FILE, safe to delete
```
