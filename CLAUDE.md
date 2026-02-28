# Agent Blueprint Website

Marketing site for [agentblueprint.ai](https://agentblueprint.ai).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Language**: TypeScript
- **Deployment**: Vercel (auto-deploys on push to `main`)

## Project Structure

```
src/
  app/           # Next.js App Router pages and API routes
  components/    # React components (ui/ for shadcn, sections/ for page sections)
  lib/           # Utilities and helpers
```

## Development

```bash
npm install      # Install dependencies
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Git Workflow

This repo uses a **branch → preview → main** workflow. Vercel auto-deploys:
- **Push to `main`** → production deploy (live at agentblueprint.ai)
- **Push to any other branch** → preview deploy (unique `.vercel.app` URL)

### How to make changes

1. Create a branch for your work:
   ```bash
   git checkout -b my-changes
   ```
2. Make changes, commit early and often with clear messages
3. Run `npm run build` to verify nothing is broken
4. Push the branch:
   ```bash
   git push -u origin my-changes
   ```
5. Vercel will auto-generate a preview URL. Find it by running:
   ```bash
   gh pr list   # or check the Vercel dashboard
   ```
   The preview URL will look like: `agent-blueprint-website-<hash>.vercel.app`
6. Review the preview to confirm everything looks good
7. When ready to go live, merge to main and push:
   ```bash
   git checkout main
   git merge my-changes
   git push origin main
   ```

### Rules

- Never push directly to `main` without previewing first
- Always run `npm run build` before pushing
- Commit early and often with descriptive messages
- If a build fails on Vercel, the previous working version stays live (no downtime)

## Environment Variables

Environment variables are configured in Vercel (Project Settings > Environment Variables). Do not commit `.env` files.

- `SENDGRID_API_KEY` - Used by the contact form API route

## Key Conventions

- Components use shadcn/ui patterns (see `src/components/ui/`)
- Use Tailwind utility classes for styling, not CSS files
- Follow existing file and naming patterns in the codebase
