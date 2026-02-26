# Agent Blueprint Website - Current State

## What This Is
Marketing website for Agent Blueprint (agentblueprint.ai). Single-page site with "Architect's Blueprint" aesthetic: warm cream backgrounds, blueprint-blue structural elements, amber CTAs, three fonts (Instrument Serif, Outfit, JetBrains Mono).

The product app lives at app.agentblueprint.ai (separate repo/deployment).

## Stack
- **Next.js 16.1.6** (App Router, Turbopack)
- **Tailwind CSS v4** (CSS-first, no tailwind.config.js)
- **shadcn/ui** (new-york style, neutral base)
- **Framer Motion** (hero entrance animations, scroll-driven How It Works timeline)
- **react-hook-form + zod** (contact form validation)
- **SendGrid** (contact form email delivery)
- **TypeScript**, ESLint

## Repo
- **GitHub**: git@github.com:agent-blueprint/agent-blueprint-website.git
- **Branch**: main (single commit so far: `d54c1b8`)
- **Build**: `npm run build` passes clean, `npx eslint src/` passes clean

## What's Done
- Full single-page marketing site with all sections:
  - **Navigation**: Fixed top, transparent -> cream on scroll, mobile hamburger (shadcn Sheet)
  - **Hero**: Centered headline with staggered framer-motion entrance, blueprint grid background
  - **How It Works**: 4-step alternating grid with scroll-driven vertical timeline line + connector dots
  - **Capabilities**: 6 cards in responsive 3-column grid with staggered reveal
  - **Contact**: react-hook-form with zod validation, LinkedIn links, posts to /api/contact
  - **Footer**: Dimension-line divider, copyright, LinkedIn icons, Get Started link
- **API**: POST /api/contact -> SendGrid (needs SENDGRID_API_KEY env var)
- **SEO/GEO**: JSON-LD schemas (Organization, SoftwareApplication, FAQPage), sitemap.ts, robots.txt (allows AI bots), llms.txt
- **Design system**: oklch color variables, blueprint grid CSS, paper texture, font variable mappings

## What's NOT Done (Next Session)

### Priority 1: Vercel Deployment
- Connect repo to Vercel
- Set up custom domain: agentblueprint.ai
- Configure environment variable: SENDGRID_API_KEY
- Verify build deploys successfully

### Priority 2: Cleanup
- Remove leftover Next.js scaffold SVGs from public/ (file.svg, globe.svg, next.svg, vercel.svg, window.svg)
- Consider adding a proper favicon (currently using Next.js default)
- Consider adding an OG image (currently pointing to the logo)

### Priority 3: Nice to Have
- Test contact form end-to-end with real SendGrid key
- Add loading/disabled states polish on contact form
- Consider adding `prefetch` on scroll-to-section links
- Responsive fine-tuning if needed at specific breakpoints

## Key Files
```
src/lib/fonts.ts                        # Font config (Instrument Serif, Outfit, JetBrains Mono)
src/lib/metadata.ts                     # Site constants, JSON-LD schemas
src/lib/schemas.ts                      # Zod contact form schema
src/app/globals.css                     # Full design system (colors, grid, texture)
src/app/layout.tsx                      # Root layout (fonts, metadata, JSON-LD, Toaster)
src/app/(marketing)/layout.tsx          # Marketing route group (Nav + Footer wrapper)
src/app/(marketing)/page.tsx            # Home page (composes all sections)
src/app/api/contact/route.ts            # SendGrid email endpoint
src/components/blueprint-grid.tsx       # Blueprint grid + paper texture wrapper
src/components/navigation.tsx           # Fixed nav with scroll behavior + mobile Sheet
src/components/hero-section.tsx         # Hero with framer-motion entrance
src/components/how-it-works-section.tsx # 4-step timeline with scroll-driven animation
src/components/capabilities-section.tsx # 6-card grid with staggered reveal
src/components/contact-section.tsx      # Contact form + LinkedIn links
src/components/footer.tsx               # Footer with dimension-line divider
```

## Gotchas Discovered
- **BlueprintGrid inner div needs `w-full`** — without it, flex children can't center via `mx-auto` because the wrapper shrinks to content width
- **Framer Motion `ease` arrays need `as const`** — TypeScript won't accept `number[]` for the Easing type
- **`motion.line` with `pathLength` doesn't work** for SVG line drawing — use `motion.div` with `scaleY` + repeating-linear-gradient for dashed line effect instead
- **How It Works uses CSS Grid (not flex)** — `md:grid-cols-2` with `gridRow: index + 1` ensures cards align perfectly with the center line
- **shadcn Sheet needs SheetDescription** — otherwise console warns about missing aria-describedby
- **Tailwind v4**: no tailwind.config.js, all config in globals.css via `@theme inline {}`
- **`.env*` gitignore pattern**: had to change to `.env` + `.env.*` + `!.env.example` to allow committing the example file

## Environment
- Node.js on macOS
- Dev server: `npm run dev` (port 3000)
- Playwright MCP is configured for this project for browser-based visual review
