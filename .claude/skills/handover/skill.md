---
name: handover
description: "End-of-session handover when work is continuing. Updates WORKSTREAM.md with what was done/what's next, keeps branch current with main, verifies build, commits, and optionally pushes. Triggers: handover, end of session, wrap up, close out, session end."
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Handover (Mid-Feature)

Use at end of session when work will continue in the next session.

---

## Steps

### 1. Gather session context

Run these commands:
```bash
git branch --show-current
git status --short
git log --oneline -10
git diff --name-only          # unstaged changes
git diff --cached --name-only # staged changes
```

Review the conversation for: decisions made, approaches tried (including failed ones), and what the user said about next steps.

### 2. Update WORKSTREAM.md

Read `WORKSTREAM.md` in full, then update it. Keep the same structure:

```markdown
# Current Workstream

> This file tracks what's been done, what's next, and open decisions.
> **Keep it updated** as work progresses.

## Active Branch
- Branch name, parent branch
- Push/merge status
- Working tree status (clean or uncommitted changes)

## What Was Done (YYYY-MM-DD)
[Current session — concise summary organized by topic]
- What was built/changed and why
- Approaches tried INCLUDING failed ones (saves next session from repeating)
- Key files created/modified/deleted

## [Previous sessions — compress older ones to 1-2 lines]

## What Needs Doing Next
- [ ] Prioritized list, including anything the user explicitly asked for
- [ ] Flag blocked items

## Open Decisions
- Unresolved choices needing user input

## Key Files
[Most important files for current work, with brief descriptions]
```

**Rules for WORKSTREAM.md:**
- **Be concise** — every session reads this file, so brevity matters
- **Include failed approaches** — prevents the next session from retrying them
- **Compress old sessions** — full detail for current, 1-2 lines for older
- **Check off completed items** in "What Needs Doing Next"
- **Add new items** discovered during the session

### 3. Update CLAUDE.md (only if needed)

Only update if something structural changed: new convention, new dependency, new workflow rule. Don't duplicate WORKSTREAM.md content.

### 4. Check relevant docs

Review and update if the session's work affects them:

| If you worked on... | Check these |
|---------------------|-------------|
| Design/theme | `docs/DESIGN-UPGRADE-REPORT.md` |
| GEO/AEO/SEO | `docs/GEO-AEO-GUIDELINES.md`, `public/llms.txt`, `src/app/sitemap.ts` |
| New pages | GEO/AEO checklist in `CLAUDE.md` |
| Skills | `.claude/skills/*/skill.md` |

Don't create new docs unless a gap is clear. Flag outdated info to the user.

### 5. Keep branch current with main

Before committing, minimize drift for the next session:

1. `git fetch origin main`
2. `git merge origin/main` — resolve conflicts if any
3. If the merge is clean or conflicts are resolved, proceed
4. `npm run build` — confirm build still passes after merge

### 6. Clean up

- Delete dead/abandoned files created during the session
- Run `npm run build` to verify clean state (if not already done in step 5)

### 7. Commit

Stage only relevant files (no temp files, no `.playwright-mcp/`, no scratch images). Write a clear commit message summarizing the session's work.

The user has explicitly requested the commit by invoking this skill.

### 8. Push decision

Ask the user whether to push:

> "Commits are local. Push to remote? Feature branches are safe to push — Vercel will create a preview deploy. Pushing `main` deploys to production."

- If yes: `git push`
- If no: leave commits local. Note "Not pushed" in the report.

### 9. Report

Tell the user:
- What was updated in WORKSTREAM.md
- Which docs were updated (and why) or confirmed current
- Build status
- Commit hash
- Push status (pushed / not pushed)
- Any dead files cleaned up
