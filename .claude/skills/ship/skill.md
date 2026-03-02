---
name: ship
description: "End-of-session wrap-up when the feature is complete. Updates docs, clears completed work from WORKSTREAM.md, merges to main, and pushes to production. Triggers: ship, ship it, go live, deploy, merge to main, feature complete."
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Ship (Feature Complete)

Use at end of session when the feature is done and ready to go live.

---

## Steps

### 1. Verify the build

```bash
npm run build
npm run lint
```

Both must pass before shipping. If either fails, fix the issues first.

### 2. Update relevant docs

Review and update if the feature's work affects them:

| If you worked on... | Check these |
|---------------------|-------------|
| Design/theme | `docs/DESIGN-UPGRADE-REPORT.md` |
| GEO/AEO/SEO | `docs/GEO-AEO-GUIDELINES.md`, `public/llms.txt`, `public/llms-full.txt`, `src/app/sitemap.ts` |
| New pages | GEO/AEO checklist in `CLAUDE.md` |
| Skills | `.claude/skills/*/skill.md` |
| Project structure | `CLAUDE.md` |

Don't create new docs unless a gap is clear. Update docs to reflect current state, not aspirational state.

### 3. Update WORKSTREAM.md — clear completed work

Read `WORKSTREAM.md` in full. Since the feature is complete:

1. Move current "What Was Done" to a brief summary line (e.g., "Blueprint theme: full visual overhaul with tokenized CSS, shipped 2026-03-01")
2. Remove completed items from "What Needs Doing Next"
3. Clear resolved items from "Open Decisions"
4. If ALL work is done and no items remain, replace contents with:
   ```markdown
   # Current Workstream

   > This file tracks what's been done, what's next, and open decisions.
   > **Keep it updated** as work progresses.

   No active workstreams. Last shipped: [brief description] on [date].
   ```
5. If some items remain (e.g., follow-up work on a different branch), keep those and update the Active Branch section

### 4. Verify branch is mergeable

```bash
git fetch origin main
git merge origin/main
```

Resolve any conflicts. Run `npm run build` again after merging to confirm nothing broke.

### 5. Commit

Stage all relevant files. Write a clear commit message covering the full scope of the feature (not just the last session). The user has explicitly requested the commit by invoking this skill.

### 6. Push and merge to main

```bash
# Push the feature branch
git push origin {branch-name}

# Merge to main
git checkout main
git merge {branch-name}
git push origin main
```

**Important:** Pushing `main` deploys to production via Vercel. Confirm with the user before the final `git push origin main` if there's any doubt.

After pushing, Vercel will build and deploy. The deploy typically takes 1-2 minutes.

### 7. Clean up

Ask the user if they want to delete the feature branch:

```bash
git branch -d {branch-name}           # local
git push origin --delete {branch-name} # remote
```

### 8. Report

Tell the user:
- What was shipped (brief summary of the feature)
- Which docs were updated
- Build/lint status
- Commit hash on main
- Vercel production deploy status (check with `vercel` CLI if available, otherwise note that it auto-deploys)
- Branch cleanup status
- Any remaining items in WORKSTREAM.md (follow-up work for future sessions)
