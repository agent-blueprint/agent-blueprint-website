# Getting Set Up - Agent Blueprint Website

This guide gets you set up to make changes to the Agent Blueprint marketing site using the Claude Code desktop app on your Windows PC.

## What You'll Need

- Your GitHub account (aglencross) - you already have write access
- A Claude Pro, Max, or Teams subscription
- Git for Windows (required for Claude Code to work locally)

## Step 1: Install Git for Windows

This is required before Claude Code can work with local files.

1. Download from https://git-scm.com/download/win
2. Run the installer - use all the default options
3. After installing, open PowerShell (search "PowerShell" in the Start menu) and run:
   ```
   git config --global user.name "Amy Glencross"
   git config --global user.email "your-email@example.com"
   ```
   (Replace with your actual email)

## Step 2: Install the Claude Desktop App

1. Download from https://claude.com/download (pick the Windows version)
2. Run the installer and launch Claude from the Start menu
3. Sign in with your Anthropic account

## Step 3: Clone the Website Repo

Open PowerShell and run:
```
mkdir ~\projects
cd ~\projects
git clone https://github.com/agent-blueprint/agent-blueprint-website.git
```

If Windows pops up a GitHub login window, sign in with your `aglencross` account. If it asks for a username/password in the terminal instead, ask Chris for help.

## Step 4: Open the Project in Claude Code

1. Open the Claude desktop app
2. Click the **Code** tab at the top center
3. Select **Local** as the environment
4. Click **Select folder** and navigate to `C:\Users\Amy\projects\agent-blueprint-website` (or wherever you cloned it in Step 3)
5. Start chatting!

Claude Code reads the project's instructions automatically and knows the workflow.

## What You Can Ask Claude to Do

Just describe what you want in plain English:

- "Update the hero section headline to say X"
- "Change the color of the Get Started button"
- "Add a new section about our team"
- "Fix the typo on the security page"
- "Show me what the contact form looks like"

## How Changes Get Live

Claude handles all the technical git stuff for you. Here's the process:

1. **You describe what you want** - Claude makes the code changes
2. **You review the changes** - Claude shows you a visual diff of what changed. Accept or reject each change.
3. **Claude pushes to a preview** - Vercel creates a preview URL you can open in your browser to see exactly how it'll look on the real site
4. **You confirm it looks good** - tell Claude to make it live
5. **Claude merges to main** - the change goes live on agentblueprint.ai within a couple minutes

The live site is never affected until you explicitly say go. If the preview doesn't look right, just tell Claude to fix it.

## Tips

- **Permission mode**: The app starts in "Ask permissions" mode by default, meaning Claude will ask before making changes. This is good - you get to review everything.
- **Preview your app**: Click the **Preview** dropdown in the app to run the website locally and see changes before pushing.
- **Multiple sessions**: You can open parallel sessions from the sidebar to work on different things at once.
- **Interrupt anytime**: If Claude is going in the wrong direction, just type your correction and hit Enter. You don't have to wait for it to finish.

## Troubleshooting

**"Code tab asks me to upgrade"**: You need a Claude Pro, Max, or Teams subscription. Go to https://claude.com/pricing to subscribe.

**"Permission denied" or auth errors when pushing**: Your GitHub login may have expired. Ask Chris for help.

**Something broke on the live site**: Don't panic. Tell Claude what's wrong and it can fix and push a correction. Vercel keeps the previous working version live until a new build succeeds, so a bad push won't take the site down.

**Claude says it can't find git**: Make sure you completed Step 1 (Git for Windows). You may need to restart the Claude app after installing git.
