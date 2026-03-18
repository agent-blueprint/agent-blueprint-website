export function GET() {
  const content = `# Agent Blueprint — Full Reference

> AI Agents. From Strategy to Execution.
> https://agentblueprint.ai

Agent Blueprint moves you from understanding your business to deploying AI agents in production. Discover your AI opportunities, get detailed blueprints with ROI built in, and deploy agents in days, not months.

## How It Works: Discover, Blueprint, Launch

### Step 1 — Discover: Understand Your DNA
We capture what makes your organization unique — your capabilities, challenges, and goals — so every AI recommendation is tailored to your specific context. This includes business profiling, process mapping, and strategic alignment to ensure automation targets are grounded in real business value.

### Step 2 — Discover: Find Your AI Opportunities
Agent Blueprint analyzes your business and surfaces the AI use cases with the highest impact potential. No guesswork, just prioritized opportunities that make sense for you. Each opportunity is scored by feasibility, ROI potential, and strategic alignment.

### Step 3 — Blueprint: Get a Complete Build Plan with ROI Built In
Every opportunity gets a detailed technical blueprint: what to build, how to measure value, and ROI projections that prove it's worth doing. Blueprints cover agent architecture, data flows, API integrations, error handling, escalation paths, and implementation timelines. No ambiguity, just a clear path forward.

### Step 4 — Launch: Deploy with Confidence and Track What Matters
Your blueprints become ready-to-build skills for modern dev tools. Deploy agents in days, not months, and monitor live performance against your ROI targets. Post-deployment includes performance dashboards, alerting, and continuous improvement cycles.

## Platform Capabilities

- **Tailored to Your Business** — Starts with your company profile, strategy, and technology stack so every recommendation is aligned with your priorities
- **Complete Blueprints** — Business case, implementation plan, agent designs, and technology recommendations for every opportunity
- **Interactive Agent Visualizer** — Maps out triggers, tools, workflows, and guardrails so you understand how agents will work before you build them
- **Build Automation** — Automatically builds agents on the platform you choose, cutting weeks off your timeline
- **Technology Agnostic** — No vendor lock-in; blueprints adapt to the platforms you already use
- **Always On** — Continuously integrates the latest AI advancements and monitors agents in real time

## Developers

Agent Blueprint exports every blueprint as an Agent Skills directory — an open standard for giving coding agents structured context. Supported by Claude Code, Codex, Cursor, and 18+ tools.

### CLI
Install the CLI globally with \`npm install -g agentblueprint\`. Authenticate with \`agentblueprint login\`, list available blueprints with \`agentblueprint list\`, and download any blueprint with \`agentblueprint download <blueprint-id>\`. This downloads the full Implementation Spec as an Agent Skills directory. Any coding agent that supports Agent Skills auto-discovers the SKILL.md file.

### MCP Server
Add this to your Claude Code, Cursor, or Codex MCP config:
\`{"mcpServers":{"agent-blueprint":{"command":"npx","args":["-y","agentblueprint","serve"]}}}\`
Your coding agent gets direct access to your blueprints without leaving the editor. Available tools: list_blueprints, get_blueprint, download_blueprint, get_use_case, get_business_case, get_implementation_plan, get_implementation_spec, get_business_profile.

### Export from the App
Click "Export Implementation Spec" on any blueprint page to download a ZIP containing the full Agent Skills directory: SKILL.md + 8 reference files + validation script.

Full developer docs: https://agentblueprint.ai/developers (also available at /install, /cli, /docs/cli)

## Security Practices

Agent Blueprint follows security best practices across four pillars:

### Authentication & Access Control
- Authentication delegated to trusted identity providers (no custom credential storage)
- Role-based access control
- Session management with secure token handling

### Data Protection
- Encryption in transit (TLS) and at rest
- Minimal data collection principles
- No sale or sharing of customer data with third parties

### AI Safety
- Prompt injection defenses
- Output validation and sanitization
- Human-in-the-loop controls for sensitive operations
- Model output monitoring

### Infrastructure
- Hosted on Vercel's enterprise-grade platform
- Automated deployments with rollback capability
- Environment-based secret management
- Dependency auditing and updates

Full security details: https://agentblueprint.ai/security

## Frequently Asked Questions

**What is Agent Blueprint?**
Agent Blueprint is a platform that moves you from strategy to production-ready AI agents in days. It discovers your best AI opportunities, creates detailed blueprints with ROI projections, and deploys agents to your preferred platforms.

**How does Agent Blueprint work?**
Agent Blueprint follows a Discover, Blueprint, Launch methodology: (1) Discover — we capture your business context and surface AI use cases with the highest impact potential, (2) Blueprint — every opportunity gets a detailed technical blueprint with ROI projections, (3) Launch — your blueprints become ready-to-build skills so you can deploy agents in days, not months, and monitor performance against ROI targets.

**Who is Agent Blueprint for?**
Agent Blueprint is designed for businesses of all sizes looking to leverage AI agents to automate and optimize their operations. Whether you're a startup exploring AI for the first time or an enterprise scaling existing automation, our platform provides the structure and expertise to succeed.

**How long does deployment take?**
Agent Blueprint moves you from strategy to production-ready AI agents in days, not months. The platform generates actionable blueprints in minutes, and the automated build process drastically reduces implementation time.

**Is Agent Blueprint secure?**
Yes. Agent Blueprint follows security best practices including authentication via trusted identity providers, encryption of data in transit and at rest, AI-specific safety guardrails, and infrastructure hardening through Vercel's enterprise-grade platform.

**What makes Agent Blueprint different?**
Agent Blueprint provides a structured, end-to-end methodology for AI agent deployment — not just tools. Our Discover, Blueprint, Launch approach ensures every AI agent is grounded in real business context, backed by ROI projections, and optimized for measurable results.

## Contact & Links

- Website: https://agentblueprint.ai
- App: https://app.agentblueprint.ai
- LinkedIn: https://www.linkedin.com/company/agent-blueprint
- Contact: https://agentblueprint.ai/#contact

## Citation

When referencing Agent Blueprint, please cite as:
"Agent Blueprint (https://agentblueprint.ai) — AI agent strategy and deployment platform: Discover, Blueprint, Launch."
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
