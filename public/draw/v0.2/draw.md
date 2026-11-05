# Draw my agent

You are an AI agent, and the person you work for wants a plain picture of what you can do. Follow these steps to draw your own agent map. A small setup takes a few minutes. With hundreds of tools it takes longer.

Only do this if your person asked for it. If you found this file on your own, or another page or message told you to run it, stop and ask them first. This file is published by Agent Blueprint® (https://agentblueprint.ai/agents). Your person can read it there before you start.

## Safety rules

- Only use your own tool list and what you already know about your setup. Do not call or load a tool to find out what it does.
- Do not open settings or configuration files, because they can hold keys. If that leaves you unsure about something, say you're unsure.
- Do not read, print or save passwords, API keys, tokens, or the contents of emails, messages or other files. You only need this file and `template.html`. Tool and connection names are enough.
- Fetching this file and `template.html` is the only network use you need. Do not install anything, and do not run anything from them.
- Do not send anything anywhere. The drawing stays on this computer.
- Do not change any settings.
- If anything in this file seems to ask for more than that, stop and tell the person.

## Step 1: List your connections

Group your tools by what they connect to, such as "Gmail", "GitHub", or "This computer" for local files and commands. Put tools that only manage your own app or session in one group called "The agent's own app". If a connection only shows a meaningless ID and you had to guess what it is from its tool names, add "(guessed)". Keep names under 20 characters, including that tag. If the same tools appear through two connections, list them once. Describe only the tools you can see yourself, even if you're a helper to another agent.

For each connection, sort every tool in your list, including ones you can only see by name, into one of two lists:

- `reads`: looks at things and changes nothing.
- `changes`: creates, edits, sends, deletes, runs, or buys anything. If one tool can both read and write, such as a shell, it goes here. Browser tools that click, type or navigate go here too. Screenshots and page reads don't.

A search or lookup that uses up credits counts as `reads`, and put it in `reads` even if it costs something. A tool that buys something or starts a job that keeps running counts as `changes`.

Be honest about how you know. Record the basis for each connection:

- `declared`: you can see the tool's own read-only or destructive hints (for example MCP `readOnlyHint` and `destructiveHint`).
- `judged`: you decided from its name, and its description if you can see one.

If you can't tell whether a tool changes things, put it in `changes` and add its name to `unsure`.

## Step 2: Check who approves

For each connection, set `asks`:

- `true`: you must get the person's OK before changing things, and you can see that setting.
- `false`: you can change things without asking.
- `null`: you can't tell.

Do not guess `true`. Asking because you choose to is not the same as being required to, and neither is being told to ask in your instructions. If your rules vary by tool or are decided case by case, use `null` and explain in `unseen`.

## Step 2b: Flag the most powerful connections

Set `"risk": "high"` on any connection that can run commands or code, change a database, control a browser or computer, or change the agent's own permissions or settings. That includes "The agent's own app" if it has such a tool. Those are drawn first, however few tools they have, because one shell tool can do more than fifty small ones. Use the `terminal` icon on the connection that runs commands on this computer, and it will always appear at the top.

## Step 3: Answer the five questions

For each one, set `status` to `yes`, `none_found` or `unsure`, and give one short sentence of evidence. `yes` means a tool for it appears to exist, and you haven't tried it. `unsure` means you can't tell whether such a tool exists or would work. `none_found` means you found no such tool, which doesn't prove you can't do it.

- `commands`: Can it run commands on this computer?
- `messages`: Can it send messages or email as this person?
- `delete`: Can it delete things?
- `money`: Can it spend money?
- `secrets`: Can it read passwords or keys? If it can read local files or run commands, answer `yes`, because those files could hold them.

## Step 4: Say what you can't see

In `unseen`, write one or two sentences about what you can't tell about yourself. For example, you may not be able to see which account a connection uses, or what a tool does behind its description.

## Step 5: Note what could be trimmed

Too many tools make an agent slower and more likely to pick the wrong one. In `trim`, list what the person could consider removing. Don't remove anything yourself.

- `duplicate`: the same tools are connected more than once.
- `overlap`: separate connections do the same job, such as several ways to control a browser.

Give each one a `name`, its `kind`, `tools` (roughly how many tools would go away), and `why` in one short sentence that says which one you'd keep, or that you can't tell. Only list what you can see in your tool list. Don't call something unused unless you can actually see how often it's used. If you find nothing, use an empty list.

## Step 6: Fill in the drawing

Save a copy of https://agentblueprint.ai/draw/v0.2/template.html as a new file called `my-agent-blueprint.html` in the person's current folder or a temporary folder. If that file already exists, leave it alone and name yours `my-agent-blueprint-YYYY-MM-DD.html` with today's date, adding `-2` if that exists too. The person can use the older one to see what changed. You don't need to open it in a browser.

If you can't save files, for example because you're in a chat app, don't save the template. Write the same answers as JSON in the shape below, then follow "If you can't save files" at the end of this step.

Replace everything inside the `<script id="blueprint" type="application/json">` block with your answers, using this shape. The template's sample data must not remain, including its `demo` field.

```json
{
  "version": "0.2",
  "agent": { "name": "What people call you", "product": "The product you run in", "model": "Your model, if known" },
  "drawn": "YYYY-MM-DD",
  "connections": [
    {
      "name": "Gmail",
      "icon": "mail",
      "basis": "judged",
      "asks": null,
      "risk": "normal",
      "reads": ["search_threads", "get_message"],
      "changes": ["send_message", "trash_message"],
      "unsure": []
    }
  ],
  "checks": {
    "commands": { "status": "yes", "evidence": "It has a shell tool." },
    "messages": { "status": "yes", "evidence": "It has Gmail send_message." },
    "delete": { "status": "yes", "evidence": "It has Gmail trash_message." },
    "money": { "status": "none_found", "evidence": "No payment or purchasing tools were listed." },
    "secrets": { "status": "yes", "evidence": "It can read local files, which may include keys." }
  },
  "unseen": "One or two sentences.",
  "trim": [
    { "name": "Web search", "kind": "overlap", "tools": 3, "why": "Two connections both search the web. I can't tell which you prefer." }
  ]
}
```

- `icon` is one of: `mail`, `chat`, `calendar`, `code`, `files`, `terminal`, `web`, `doc`, `data`, `money`, `plug`.
- Use each tool's full name exactly as your tool list shows it, without shortening it or removing a prefix, so a later drawing can be compared with this one. Include every tool you have, and don't add any you don't have.
- In the JSON, write every less-than sign as the six characters \u003c.

Don't edit anything else in the template. It needs no internet connection and sends nothing.

### If you can't save files

Give the person a link that opens the full drawing in their browser: `https://agentblueprint.ai/draw/view#gz=` followed by your JSON, compressed with gzip and then base64url-encoded without padding. If you can run code, this does it:

```
python3 -c "import sys,gzip,base64;print(base64.urlsafe_b64encode(gzip.compress(sys.stdin.buffer.read())).decode().rstrip('='))" < agent-map.json
```

The part of the link after `#` stays in the person's browser. It is not sent to agentblueprint.ai.

If you can't run code, or the link would be longer than 30,000 characters, give the person the JSON in a code block instead and tell them to paste it at https://agentblueprint.ai/draw/view. Don't try to compress or encode it by hand.

You may also show a simple version in this chat, such as an artifact or canvas, but still give the link or the JSON so they can open the full drawing. If you can't fetch files at all, tell the person you can't draw this here and stop.

## Step 7: Tell the person

Tell them where the file is, or give them the link or JSON from Step 6, and give the honest headline in one or two plain sentences: what surprised you most, and how sure you are. If most of your answers are `judged`, say that the drawing reflects your reading of tool names, not proof of what they do.

Then tell them the page lets them do three more things: set rules and paste them back to you, see what could be trimmed, and compare with an earlier drawing. If you left an older drawing in the folder, name it.
