# Website security audit, 2026-11-03

Scope: agentblueprint.ai as deployed from `main` at `b04052c`, plus this repository and its git history. Fixes are in commit `2f710c8`.

## Fixed in 2f710c8

1. **Contact form email took raw HTML (medium).** `/api/contact` pasted visitor input straight into the notification email's HTML, so anyone could put links or markup into the email Chris and Amy receive (an easy way to make a convincing phishing email look like a site enquiry). Every field is now escaped, the name is kept to one line in the subject, and field lengths are capped (name and company 200, email 254, message 5,000).
2. **Next.js 16.1.6 had critical advisories (critical per npm).** These included request smuggling through rewrites (this site uses rewrites), DoS issues and a Server Actions CSRF bypass. Upgraded to 16.4.5 (same major version), with `eslint-config-next` to match. Not verified: whether Vercel's edge actually exposed the smuggling issue. Upgrading makes the question moot.
3. **High-severity transitive packages (high).** axios (SSRF and an auth bypass, through SendGrid), form-data (CRLF injection), follow-redirects, nanoid, source-map-js, plus postcss and sharp through Next. Fixed with `npm audit fix` and the Next upgrade.
4. **No baseline security headers (low).** Only HSTS was sent. Every response now also sends `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` (the sample frames are same-site and still load), `Referrer-Policy: strict-origin-when-cross-origin` and a `Permissions-Policy` that turns off camera, microphone, location, payment and USB.
5. **Contact form spam (low).** Added a hidden "website" field. People never see it; bots that fill it get a normal success reply and nothing is sent.

Verified locally before commit: eslint on changed files, `npm test` (11 pass), `npm run build`, the four headers, sample iframe loading, the spam trap hidden and out of tab order, and the API answers (trap filled 200 with nothing sent, oversize or bad input 400). MCP tools/list, the Markdown pages, feed, catalog and server card all still answer.

## Still open

1. **No rate limit on `/api/contact` or `/api/benchmark` (medium).** Both send email through SendGrid with no limit, so a script could flood Chris's and Amy's inboxes and use up the SendGrid quota. The spam trap stops simple bots only. Recommended: a Vercel Firewall rate-limit rule on `/api/*` (for example 5 requests a minute per IP). Not checked: whether the current Vercel plan includes rate-limit rules.
2. **No Content-Security-Policy (low, defense in depth).** No script injection was found, so this is backup protection. It needs care: Next inlines scripts, and `/draw/view` uses `document.write`. Start with `Content-Security-Policy-Report-Only` and tighten from the reports.
3. **SendGrid's `deepmerge` advisory (low).** Prototype poisoning in a helper SendGrid uses internally. npm's only fix is downgrading SendGrid to v6, which is worse. Our input reaches SendGrid only after strict validation. Wait for a SendGrid release.
4. **HSTS without `includeSubDomains` (low).** Add it only after confirming every subdomain serves HTTPS.
5. **Development-only advisories.** 26 remain in ESLint, typescript-eslint and the shadcn CLI. None ship to the site. The site's own Zod (4.6.7+) already has the memory fix.

## Checked and fine

- **Secrets:** gitleaks over all 92 commits found one hit, the OpenAI plugin domain-verification token in `.well-known/openai-apps-challenge`. It has to be public to work. `.env.example` holds no values.
- **Email domain:** SPF, SendGrid DKIM (s1 and s2) and DMARC `p=reject` are all set, so others can't easily send mail as agentblueprint.ai.
- **`/draw/view`:** live test on production with script and image-tag payloads in every field of a link. All of it showed as plain text and nothing ran. The page builds everything with `textContent`, and embedded JSON escapes `<`.
- **MCP server (`/mcp`):** read-only tools, input size caps on every field, nothing stored or fetched elsewhere. The access-map HTML embeds data with `<` escaped.
- **`/api/benchmark`:** strict schema of counts and fixed values only, sent as a plain-text email.
- **Markdown route:** fetches only pages on a fixed allowlist, from the site's own origin.
- **`dangerouslySetInnerHTML`:** used only for JSON-LD built from the site's own static data.
- **Preview deployments:** behind the Vercel login for the chris@nowgentic.com team, according to the Nov 3 handoff (not re-checked here).
