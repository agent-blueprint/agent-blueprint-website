# Agent Blueprint Website - Build Kickoff

Load these skills before starting: `/frontend-design` and `/vercel-react-best-practices`

## What We're Building

A public marketing website for **Agent Blueprint** (agentblueprint.ai) -- an enterprise AI advisory platform that automates AI consulting. This is a ground-up rebuild replacing a Replit-hosted site. The product app lives separately at app.agentblueprint.ai.

Build this as a single-page marketing site with world-class design. Every decision has already been made. Execute the plan below.

---

## Tech Stack (All Verified Current as of Feb 2026)

- **Next.js 16** (latest stable LTS 16.1.x) with App Router
- **React 19**
- **Tailwind CSS v4** -- CSS-first config, NO `tailwind.config.js`. Uses `@tailwindcss/postcss` plugin. Global CSS imports: `@import "tailwindcss"; @import "tw-animate-css"; @import "shadcn/tailwind.css";` with `@theme inline {}` block.
- **shadcn/ui** -- init with `npx shadcn@latest init`. In `components.json`, leave the Tailwind config field blank (v4 mode). CSS variables use oklch color format.
- **framer-motion** (v12.x) -- package is `framer-motion`, import from `framer-motion`. NOT renamed to `motion`.
- **TypeScript** strict mode
- **SendGrid** (`@sendgrid/mail`) for contact form API route
- Deploy target: **Vercel** (zero config)

### Install Commands (in order)
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npx shadcn@latest init
npm install framer-motion @sendgrid/mail lucide-react
```

Note: `create-next-app` with `--tailwind` flag on Next.js 16 should set up Tailwind v4 automatically with CSS-first config. Verify after scaffolding that there's no `tailwind.config.js` and the CSS uses `@import "tailwindcss"`.

---

## Git & Repository Setup

```bash
# Working directory: ~/projects/agent-blueprint-website (already has .git)
git remote add origin git@github.com:agent-blueprint/agent-blueprint-website.git
```

- **Named exports only** -- no `export default` except where Next.js requires it (page.tsx, layout.tsx, error.tsx, loading.tsx, route.ts)
- Commit as work progresses (local save points). **NEVER push until explicitly asked.** Main deploys to production.
- Run `npx eslint <changed-files>` and `npm run build` before marking work complete.

---

## Aesthetic Direction: "The Architect's Blueprint"

This is NOT a dark theme. NOT a generic startup look. The concept:

**Analog warmth meets modern precision.** Think: an architect's drafting table. Light paper/cream background, precise blueprint-blue lines, technical annotations, dimension markers. The product is literally called "Blueprint." The platform "architects" AI agents. The output IS a blueprint. Lean into this metaphor visually.

### Color Palette (map to shadcn/ui CSS variables in oklch)

```
Background:       #faf8f5   (warm cream / drafting paper)
Foreground:       #1a1a1a   (near-black, not pure black)
Primary:          #1e3a5f   (blueprint indigo)
Primary-fg:       #faf8f5
Secondary:        #f0ece6   (warmer cream for cards/sections)
Secondary-fg:     #1a1a1a
Muted:            #e8e2d9   (paper shadow)
Muted-fg:         #6b6560   (pencil gray)
Accent:           #c4841d   (warm amber/gold -- used for CTAs)
Accent-fg:        #faf8f5
Border:           #d4cec6   (pencil line)
Ring:             #1e3a5f   (focus rings match blueprint blue)
Destructive:      #b91c1c

Blueprint grid:   #1e3a5f at 6% opacity (SVG background pattern)
Annotations:      #1e3a5f at 40% opacity (monospace labels)
```

Convert these to oklch for the shadcn/ui `@theme inline {}` block and `:root` CSS variables.

### Typography (Three-Font System via next/font)

| Role | Font | Google Fonts | Usage |
|------|------|-------------|-------|
| **Headlines / Display** | Instrument Serif | Yes | H1, H2, section titles. Authority and craft. |
| **Body / UI** | Outfit | Yes | Paragraphs, buttons, nav, form labels. Geometric precision, warm. |
| **Annotations / Labels** | JetBrains Mono | Yes | Step numbers, dimension markers, technical callouts, small labels. The detail that sells the blueprint metaphor. |

Load all three via `next/font/google` in the root layout. Set CSS variables (`--font-display`, `--font-body`, `--font-mono`) and apply via Tailwind.

### Visual Language

**Blueprint grid background**: Inline SVG pattern via CSS `background-image` data URI. Light blue/indigo gridlines (#1e3a5f at ~6% opacity) on warm cream. Apply to the page body or hero section. Subtle enough to read over, present enough to ground the page.

**Paper texture**: CSS noise overlay at 2-3% opacity via a `::before` pseudo-element. Gives warm analog feel.

**Dimension lines**: Thin horizontal rules with small perpendicular end-caps (like architectural dimension markers). Use as section dividers. Pure CSS or SVG.

**Annotation callouts**: Small monospace (JetBrains Mono) labels with leader lines. Example: `[01] DISCOVERY` with a thin line extending to content. Replace generic numbered step indicators.

**Pipeline schematic (How It Works)**: Four deliverables as an architectural flow diagram. SVG paths connect nodes. On scroll, framer-motion `motion.path` draws connecting lines, then content fades in at each node. Feels like watching a blueprint being drafted.

### What to AVOID
- Inter, Roboto, Arial, system fonts
- Purple gradients on white
- Generic SaaS card layouts with no character
- Cookie-cutter design patterns
- Sterile digital tech aesthetics
- Em dashes in any copy

---

## Page Structure (Single-Page Landing)

### 1. Navigation
- Fixed top nav, transparent on top, cream background on scroll
- Left: Chevron logo + "Agent Blueprint" in display font
- Right: Section links (How It Works, Capabilities, Contact) + amber CTA button "Get Started" linking to `https://app.agentblueprint.ai`
- Mobile: Hamburger menu
- Logo image: Copy from `~/projects/agent-blueprint-website-v1/attached_assets/Agent_Blueprint_Chevron_Logo_1767726273219.png` into `/public/images/`

### 2. Hero Section
- Blueprint grid background (the signature visual)
- **Headline** (Instrument Serif, large): "AI Agents. From Strategy to Execution." -- Consider rendering as two lines for maximum visual weight.
- **Subheadline** (Outfit, medium): "Most AI tools give you a strategy deck. Agent Blueprint gives you the complete package: specific use cases tied to your business challenges, detailed agent architectures, CFO-ready financials, and phased implementation plans -- ready to build from."
- **Primary CTA**: Amber button "Get Started" → `https://app.agentblueprint.ai`
- **Secondary CTA**: Outline button "See How It Works" → smooth scroll to How It Works section
- Entrance animations: staggered reveals, 200-500ms timing

### 3. How It Works (Pipeline as Architectural Schematic)
- Section title: "From Strategy to Execution" (or similar -- use the architectural annotation style)
- Four deliverables displayed as a schematic/flow diagram:

  **[01] DISCOVER** -- "Specific AI use cases tied to your actual business challenges"
  What to build. The platform analyzes your business profile, strategic initiatives, and technology landscape to identify high-impact AI opportunities ranked by feasibility and ROI.

  **[02] ARCHITECT** -- "Detailed multi-agent architecture designs"
  How to build it. Each use case gets a complete agent blueprint with roles, supervision models, tool integrations, data flows, and operational procedures. Detailed enough to construct from.

  **[03] VALIDATE** -- "CFO-ready financials with adjustable inputs"
  Whether it's worth building. Full business cases with implementation costs, projected savings, ROI timelines, and payback periods. The artifact that gets projects funded.

  **[04] EXECUTE** -- "Phased implementation plans with epics and stories"
  How to execute it. Structured rollout plans with milestones, dependencies, resource requirements, and development stories ready to load into your project management tool.

- Animate like a blueprint being drawn: SVG path lines draw themselves on scroll, then content reveals at each node
- Use monospace labels, dimension-line connectors, annotation-style numbering

### 4. Key Capabilities (6 Feature Cards)
- Section title: "Platform Capabilities"
- Cards with blueprint-style accent elements (thin lines, monospace labels)

  1. **Strategic AI Alignment** -- "Every recommendation starts with your business. Agent Blueprint maps AI opportunities directly to your strategic initiatives, technology stack, and organizational readiness."

  2. **Multi-Model AI Engine** -- "Powered by frontier AI models working in concert. Each stage of the pipeline uses the optimal model for the task, combining strategic reasoning with structured output generation."

  3. **Agentic AI Blueprints** -- "Not a slide deck. A buildable specification. Each blueprint defines agent roles, supervision hierarchies, tool integrations, data flows, guardrails, and operational procedures."

  4. **CFO-Ready Business Cases** -- "The artifact that gets projects funded. Complete financial models with implementation costs, projected savings, ROI timelines, payback periods, and sensitivity analysis."

  5. **Enterprise Platform Integration** -- "Blueprints map to the platforms you already use. ServiceNow, Salesforce, Pega, and more. Technology-agnostic by design, with platform-specific implementation guidance."

  6. **Agent Visualization** -- "See your AI agents as a digital team. Interactive visualizations map triggers, tools, workflows, supervision models, and guardrails before you build."

### 5. Contact Section
- Section title: "Get In Touch"
- Left side: Contact form (name, email, company, message) -- all fields required except message
- Right side: LinkedIn links for the team:
  - Chris Faulkner -- https://www.linkedin.com/in/cifaulkner/
  - Amy Glencross -- https://www.linkedin.com/in/amyglencross/
  - Agent Blueprint -- https://www.linkedin.com/company/108653024
- Form submits to `/api/contact` (Next.js API route using SendGrid)
- Success/error toast notifications

### 6. Footer
- Minimal: "© 2026 Agent Blueprint. All rights reserved."
- LinkedIn icon links (same three as contact section)
- "Get Started" link to app.agentblueprint.ai

---

## Contact Form API Route

`/src/app/api/contact/route.ts`:
- POST handler accepting `{ name, email, company, message }`
- Validate with Zod
- Send via SendGrid to both `amy@agentblueprint.ai` AND `chris@agentblueprint.ai`
- From address: `no-reply@agentblueprint.ai`
- Environment variable: `SENDGRID_API_KEY`
- Return 200 on success, 500 on failure
- Create `.env.example` with `SENDGRID_API_KEY=`

---

## GEO / AEO / LLM Optimization

This site must be discoverable by AI search engines, not just Google. Implement ALL of the following:

### robots.txt (`/public/robots.txt`)
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: https://agentblueprint.ai/sitemap.xml
```

### llms.txt (`/public/llms.txt`)
Curated Markdown index for AI crawlers. Format: H1 site name, blockquote summary, H2 sections with links. Write this intentionally (not auto-generated). Include: what Agent Blueprint is, what it produces (the four deliverables), who it's for, how to get started. Keep it concise and information-dense.

### Schema.org JSON-LD (in root layout `<head>`)
- **Organization**: Agent Blueprint, agentblueprint.ai, logo, social links
- **SoftwareApplication**: Agent Blueprint platform, category, operating system, offers
- **FAQPage**: 4-6 common questions about the platform (what is it, who is it for, what does it produce, how does it work, what platforms does it integrate with)

### Sitemap (`/src/app/sitemap.ts`)
Use Next.js `MetadataRoute.Sitemap` to generate `/sitemap.xml` with the homepage entry.

### Metadata (`/src/app/layout.tsx` and `/src/app/page.tsx`)
- `generateMetadata` or static `metadata` export
- Title: "Agent Blueprint | AI Strategy to Execution Platform"
- Description: Front-loaded, answer-first paragraph suitable for AI synthesis
- Open Graph: title, description, url, siteName, image (create a simple OG image or use logo)
- Twitter Card: summary_large_image
- Canonical URL: https://agentblueprint.ai

### Content Structure for AI Synthesis
- Every section should have answer-first paragraphs (lead with the conclusion, then explain)
- Self-contained "information islands" that can be cited independently
- Clear heading hierarchy (H1 > H2 > H3)
- Front-loaded definitions

---

## File Structure

```
src/
├── app/
│   ├── (marketing)/
│   │   └── page.tsx              # Home page (assembles all sections)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # SendGrid contact form handler
│   ├── layout.tsx                # Root layout (fonts, metadata, JSON-LD, analytics)
│   ├── sitemap.ts                # Dynamic sitemap generation
│   └── globals.css               # Tailwind v4 imports, theme, custom styles
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── navigation.tsx
│   ├── hero-section.tsx
│   ├── how-it-works-section.tsx
│   ├── capabilities-section.tsx
│   ├── contact-section.tsx
│   ├── footer.tsx
│   └── blueprint-grid.tsx        # Reusable SVG grid background
├── lib/
│   ├── fonts.ts                  # next/font configurations
│   ├── metadata.ts               # Shared metadata constants
│   └── utils.ts                  # shadcn/ui cn() utility
public/
├── images/
│   └── logo.png                  # Chevron logo (copied from v1)
├── robots.txt
└── llms.txt
.env.example
```

---

## Implementation Phases

### Phase 1: Scaffold + Design System (do this first, commit when done)
1. Initialize Next.js 16 project with the commands above
2. Set git remote to `git@github.com:agent-blueprint/agent-blueprint-website.git`
3. Set up Tailwind v4 with the blueprint color palette (verify CSS-first config)
4. Configure three fonts via next/font
5. Init shadcn/ui, install needed components (Button, Input, Textarea, Card, Sheet)
6. Create the blueprint grid SVG background component
7. Create the paper texture overlay
8. Copy logo from v1 assets into public/images/
9. Set up root layout with fonts, metadata, JSON-LD schemas
10. Commit: "feat: scaffold Next.js 16 site with blueprint design system"

### Phase 2: Hero + Navigation (the make-or-break section)
1. Build Navigation component (fixed, scroll-aware, mobile responsive)
2. Build Hero section with blueprint grid background, headline, subheadline, CTAs
3. Add entrance animations with framer-motion (staggered, 200-500ms)
4. This sets the entire tone. Get it right before moving on.
5. Commit: "feat: add navigation and hero section"

### Phase 3: Content Sections
1. How It Works -- pipeline schematic with scroll-triggered SVG drawing animation
2. Key Capabilities -- 6 feature cards with blueprint-style accents
3. Contact Section -- form UI + LinkedIn links
4. Footer
5. Commit per section or as a group

### Phase 4: Backend + Infrastructure
1. Contact form API route with SendGrid
2. robots.txt, llms.txt, sitemap.ts
3. Final metadata pass (OG images, Twitter cards, canonical URLs)
4. .env.example
5. Commit: "feat: add contact API, SEO, and GEO infrastructure"

### Phase 5: Polish + Verification
1. Run `npx eslint` on all changed files
2. Run `npm run build` -- must pass
3. Test responsive design (mobile, tablet, desktop)
4. Verify SSR output (view source should have full HTML, not empty divs)
5. Lighthouse audit (aim for 90+ on all metrics)
6. Final commit

**Do NOT push until told.** Commit freely as local save points.

---

## Design Quality Standards (from frontend-design skill)

This site must be visually striking and memorable. Not generic. Not AI slop. Specific requirements:

- **Typography**: The three-font system IS the design. Instrument Serif headlines create authority. Outfit body text creates readability. JetBrains Mono annotations create the blueprint metaphor. Use all three deliberately.
- **Color discipline**: Cream background dominates. Blueprint blue for text and structural elements. Amber ONLY for CTAs and key interactive elements. Do not dilute the palette.
- **Spatial composition**: Generous negative space. Let content breathe. The blueprint grid provides visual density; the content layer should be spacious.
- **Motion**: Purposeful, not decorative. The scroll-triggered blueprint drawing animation is the signature moment. Everything else should be subtle (fade-ins, slight slides). 200-500ms timing. No bouncy or playful animations -- this is an architect's tool, not a toy.
- **Details that sell it**: Dimension-line section dividers. Monospace annotation labels. Thin precise borders. These small details accumulate into a cohesive metaphor.

---

## References

- V1 website repo (for logo and reference): `~/projects/agent-blueprint-website-v1/`
- V1 logo: `~/projects/agent-blueprint-website-v1/attached_assets/Agent_Blueprint_Chevron_Logo_1767726273219.png`
- Product app (for "Get Started" links): https://app.agentblueprint.ai
- The live site at agentblueprint.ai is still the Replit version; we're replacing it.

---

Begin with Phase 1. Scaffold the project, set up the design system, and commit. Then proceed through each phase sequentially. Show me the hero section before moving to content sections -- that's the design gate.
