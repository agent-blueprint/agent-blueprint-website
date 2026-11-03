import { readFileSync } from "node:fs";
import path from "node:path";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { renderAgentMap } from "@/lib/agent-tools/agent-map";
import { benchmark } from "@/lib/agent-tools/benchmark";
import { estimateCost, listJobs } from "@/lib/agent-tools/cost";
import { checkOnePage } from "@/lib/agent-tools/one-page";

// Every tool only computes or formats what it is given: nothing is stored,
// nothing is fetched from elsewhere, and nothing outside the response changes.
const READ_ONLY = { readOnlyHint: true, destructiveHint: false, openWorldHint: false } as const;

const JOB_IDS = benchmark.jobs.map((j) => j.id) as [string, ...string[]];
const agentId = z.enum(["claude", "codex"]);

const drawingTemplate = readFileSync(path.join(process.cwd(), "public/draw/v0.2/template.html"), "utf8");

const shortText = (max: number) => z.string().max(max);
const toolNames = z.array(shortText(200)).max(300);
const check = z.object({
  status: z.enum(["yes", "none_found", "unsure"]),
  evidence: shortText(300),
});
const blueprintSchema = z.object({
  version: z.literal("0.2"),
  agent: z.object({
    name: shortText(80),
    product: shortText(80).optional(),
    model: shortText(80).optional(),
  }),
  drawn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD."),
  connections: z
    .array(
      z.object({
        name: shortText(40),
        icon: z.enum(["mail", "chat", "calendar", "code", "files", "terminal", "web", "doc", "data", "money", "plug"]),
        basis: z.enum(["declared", "judged"]),
        asks: z.boolean().nullable(),
        risk: z.enum(["normal", "high"]),
        reads: toolNames,
        changes: toolNames,
        unsure: toolNames,
      }),
    )
    .min(1)
    .max(60),
  checks: z.object({ commands: check, messages: check, delete: check, money: check, secrets: check }),
  unseen: shortText(600),
  trim: z
    .array(
      z.object({
        name: shortText(40),
        kind: z.enum(["duplicate", "overlap"]),
        tools: z.number().int().min(0).max(1000),
        why: shortText(300),
      }),
    )
    .max(30),
});

const json = (value: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] });
const failure = (error: unknown) => ({
  isError: true,
  content: [{ type: "text" as const, text: error instanceof Error ? error.message : "Something went wrong." }],
});

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_benchmark_jobs",
      {
        title: "List measured agent jobs",
        description:
          "Lists the ten everyday jobs in Agent Blueprint's measured agent cost benchmark (2 November 2026): what each job was, how big its input was, and the typical and worst-case tokens and dollar cost measured over five runs each on Claude Code and Codex. Use it to find the benchmark job closest to a task someone wants an agent to do, before estimating that task's cost.",
        inputSchema: z.object({
          agent: agentId.optional().describe("Only show one agent's measurements. Leave out to show both."),
        }),
        annotations: READ_ONLY,
      },
      async ({ agent }) => json(listJobs(benchmark, agent)),
    );

    server.registerTool(
      "estimate_agent_cost",
      {
        title: "Estimate an agent task's cost",
        description:
          "Estimates the tokens and dollar cost of an AI agent task from the measured benchmark job closest to it. For jobs where cost grows with how much the agent reads, give the size of the real input and it scales the reading part while keeping the agent's fixed overhead. Returns a typical and a budget (worst-case) figure per run and, if runs per month are given, per month. Uses the benchmark-day prices unless current prices are passed. The result is an estimate from small test jobs, not a quote.",
        inputSchema: z.object({
          job: z.enum(JOB_IDS).describe("The closest benchmark job id, from list_benchmark_jobs."),
          agent: agentId.describe("Which measured agent to base the estimate on."),
          your_size: z
            .number()
            .positive()
            .max(1e9)
            .optional()
            .describe("Size of the real input in the job's unit (words, or rows for the clean job). Ignored for jobs that don't scale."),
          runs_per_month: z.number().int().positive().max(1e7).optional().describe("How many times a month the job runs."),
          prices: z
            .object({
              input_per_million: z.number().min(0),
              cached_input_per_million: z.number().min(0),
              output_per_million: z.number().min(0),
            })
            .optional()
            .describe("Current model prices in US dollars per million tokens. Leave out to use the benchmark-day prices."),
        }),
        annotations: READ_ONLY,
      },
      async (input) => {
        try {
          return json(estimateCost(benchmark, input));
        } catch (error) {
          return failure(error);
        }
      },
    );

    server.registerTool(
      "check_agent_one_page",
      {
        title: "Check a one-page agent summary",
        description:
          "Checks the structure of a one-page agent summary written from Agent Blueprint's template (https://agentblueprint.ai/agent-one-page-template): all eight sections present and in order, a stage line, every rule ending in \"Enforced by:\" or \"Not enforced:\", every Open item naming who decides, no template placeholders left, and length within one page. It checks shape only, not whether the answers are right. The text is checked and returned findings only; it is not stored.",
        inputSchema: z.object({
          markdown: z.string().min(1).max(60_000).describe("The full one-page summary as Markdown."),
        }),
        annotations: READ_ONLY,
      },
      async ({ markdown }) => json(checkOnePage(markdown)),
    );

    server.registerTool(
      "render_agent_map",
      {
        title: "Draw an agent's access map",
        description:
          "Turns an agent's own inventory of its connections into Agent Blueprint's one-page access map: a single offline HTML page showing what the agent can read and change, who has to approve, its riskiest powers, and what could be trimmed. The agent supplies the inventory from its own tool list; this tool only draws it. Returns the HTML for the person to save, such as my-agent-blueprint.html. The inventory is not stored. The field guide is at https://agentblueprint.ai/draw.md.",
        inputSchema: blueprintSchema,
        annotations: READ_ONLY,
      },
      async (blueprint) => {
        try {
          return {
            content: [
              {
                type: "text" as const,
                text: "Save the HTML below as my-agent-blueprint.html (or my-agent-blueprint-YYYY-MM-DD.html if that exists) and open it in a browser. It loads nothing from the internet.",
              },
              { type: "text" as const, text: renderAgentMap(drawingTemplate, blueprint) },
            ],
          };
        } catch (error) {
          return failure(error);
        }
      },
    );
  },
  {
    serverInfo: { name: "agent-blueprint", version: "0.2.0" },
    instructions:
      "Agent Blueprint tools for people who run AI agents: measured agent costs, a structural check for one-page agent summaries, and an offline access map an agent draws of itself. All tools are read-only and keep nothing.",
  },
);

export { handler as GET, handler as POST, handler as DELETE };
