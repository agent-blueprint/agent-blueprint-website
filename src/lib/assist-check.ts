import { z } from "zod";

// Run sizes and skill rates: ServiceNow "Now Assist Overview" rate card, effective August 24, 2026.
export const RATE_CARD_URL =
  "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/legal/sn-assist-overview.pdf";
// Yearly pools per ITSM fulfiller, as reported by the ServiceNow partner Crossfuze.
export const POOLS_URL = "https://www.crossfuze.com/campaigns/servicenow-pricing-changes-2026";

export const TIERS = {
  Foundation: 1500,
  Advanced: 3000,
  Prime: 6000,
} as const;
export type Tier = keyof typeof TIERS;

export const SMALL = 25;
export const MEDIUM = 50;
export const LARGE = 150;
export const MANAGED_ASSET_PER_MONTH = 200;

export const SKILL_RATES = [
  { name: "Summarization (case, incident, change)", rate: 1 },
  { name: "Resolution notes", rate: 1 },
  { name: "Now Assist panel conversation", rate: 5 },
  { name: "Email response", rate: 5 },
  { name: "Virtual Agent topic", rate: 10 },
  { name: "Knowledge article generation", rate: 10 },
  { name: "L1 IT Service Desk AI Specialist (per incident)", rate: 15 },
  { name: "Suggested steps", rate: 25 },
  { name: "Other, one assist per use", rate: 1 },
] as const;

export type AgentRow = { name: string; runsPerMonth: number; toolCalls: number };
export type SkillRow = { name: string; rate: number; usesPerMonth: number };

export type CheckInput = {
  pool: number;
  usedSoFar: number;
  monthsLeft: number;
  price: number;
  hourlyRate: number;
  managedAssets: number;
  agents: AgentRow[];
  skills: SkillRow[];
};

export type RunSize = "Small" | "Medium" | "Large" | "Over 20";

export function sizeOf(toolCalls: number): RunSize {
  if (toolCalls > 20) return "Over 20";
  if (toolCalls <= 4) return "Small";
  return toolCalls <= 8 ? "Medium" : "Large";
}

function chunkAssists(toolCalls: number): number {
  if (toolCalls <= 4) return SMALL;
  return toolCalls <= 8 ? MEDIUM : LARGE;
}

// A run ends at 20 tool calls, and anything past that bills as a new run.
export function assistsPerRun(toolCalls: number): number {
  const calls = Math.max(0, Math.floor(toolCalls));
  if (calls <= 20) return chunkAssists(calls);
  const rest = calls % 20;
  return Math.floor(calls / 20) * LARGE + (rest ? chunkAssists(rest) : 0);
}

// The rate card says Small is "less than 4" and Medium is "5-8", so exactly 4 is unstated.
export function isUnstatedSize(toolCalls: number): boolean {
  return Math.floor(toolCalls) === 4;
}

function trimTarget(toolCalls: number): number | null {
  if (toolCalls > 20) return 20;
  if (toolCalls >= 9) return 8;
  if (toolCalls >= 5) return 3;
  return null;
}

export type AgentResult = AgentRow & {
  size: RunSize;
  perRun: number;
  perMonth: number;
  breakEvenMinutes: number | null;
};

export type Trim = {
  name: string;
  from: number;
  to: number;
  fewer: number;
  assistsPerYear: number;
  dollarsPerYear: number;
};

export type CheckResult = {
  agents: AgentResult[];
  agentAssists: number;
  skillAssists: number;
  assetAssists: number;
  monthly: number;
  projected: number;
  gap: number;
  overageDollars: number;
  monthsUntilEmpty: number | null;
  trims: Trim[];
  trimAssistsPerYear: number;
  projectedAfterTrims: number;
};

export function runCheck(input: CheckInput): CheckResult {
  const agents = input.agents.map((agent) => {
    const perRun = assistsPerRun(agent.toolCalls);
    return {
      ...agent,
      size: sizeOf(agent.toolCalls),
      perRun,
      perMonth: perRun * agent.runsPerMonth,
      breakEvenMinutes:
        input.hourlyRate > 0 ? ((perRun * input.price) / input.hourlyRate) * 60 : null,
    };
  });

  const agentAssists = agents.reduce((sum, agent) => sum + agent.perMonth, 0);
  const skillAssists = input.skills.reduce((sum, skill) => sum + skill.rate * skill.usesPerMonth, 0);
  const assetAssists = input.managedAssets * MANAGED_ASSET_PER_MONTH;
  const monthly = agentAssists + skillAssists + assetAssists;

  const projected = input.usedSoFar + monthly * input.monthsLeft;
  const gap = projected - input.pool;
  const remaining = input.pool - input.usedSoFar;

  const trims = agents
    .flatMap((agent) => {
      const to = trimTarget(agent.toolCalls);
      if (to === null || agent.runsPerMonth === 0) return [];
      const saved = (agent.perRun - assistsPerRun(to)) * agent.runsPerMonth * 12;
      return [
        {
          name: agent.name,
          from: agent.toolCalls,
          to,
          fewer: agent.toolCalls - to,
          assistsPerYear: saved,
          dollarsPerYear: saved * input.price,
        },
      ];
    })
    .sort((a, b) => b.assistsPerYear - a.assistsPerYear);

  const trimAssistsPerYear = trims.reduce((sum, trim) => sum + trim.assistsPerYear, 0);

  return {
    agents,
    agentAssists,
    skillAssists,
    assetAssists,
    monthly,
    projected,
    gap,
    overageDollars: Math.max(0, gap) * input.price,
    monthsUntilEmpty: monthly > 0 ? Math.max(0, remaining) / monthly : null,
    trims,
    trimAssistsPerYear,
    projectedAfterTrims: projected - (trimAssistsPerYear / 12) * input.monthsLeft,
  };
}

const pasteSchema = z.object({
  v: z.literal(1),
  days: z.number().int().positive().max(366),
  agents: z
    .array(
      z.object({
        name: z.string().max(200),
        runs: z.number().int().nonnegative(),
        toolCalls: z.number().int().nonnegative(),
      }),
    )
    .max(500),
  assists: z.number().int().nonnegative().nullable(),
  trialAssists: z.number().int().nonnegative().nullable(),
  capped: z.boolean(),
});

export type PastedCheck = {
  agents: AgentRow[];
  skills: SkillRow[];
  loggedPerMonth: number | null;
  estimatedPerMonth: number;
  trialShare: number;
  days: number;
  capped: boolean;
};

const OTHER_LOGGED = "Everything else ServiceNow logged";

// Script output is the customer's own data. It's parsed here in the browser and never sent anywhere.
export function parsePaste(text: string): PastedCheck | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;

  let raw: unknown;
  try {
    raw = JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }

  const parsed = pasteSchema.safeParse(raw);
  if (!parsed.success) return null;
  const { days, agents: rows, assists, trialAssists, capped } = parsed.data;

  const toMonthly = (count: number) => Math.round((count * 30) / days);
  const agents = rows.map((row) => ({
    name: row.name,
    runsPerMonth: toMonthly(row.runs),
    toolCalls: row.toolCalls,
  }));
  const estimatedPerMonth = agents.reduce(
    (sum, agent) => sum + assistsPerRun(agent.toolCalls) * agent.runsPerMonth,
    0,
  );

  const logged = assists === null ? null : assists + (trialAssists ?? 0);
  const loggedPerMonth = logged === null ? null : toMonthly(logged);
  const other = loggedPerMonth === null ? 0 : Math.max(0, loggedPerMonth - estimatedPerMonth);

  return {
    agents,
    skills: other > 0 ? [{ name: OTHER_LOGGED, rate: 1, usesPerMonth: other }] : [],
    loggedPerMonth,
    estimatedPerMonth,
    trialShare: logged ? (trialAssists ?? 0) / logged : 0,
    days,
    capped,
  };
}

export function toNumber(value: string): number {
  const parsed = Number(value.replace(/[$,\s]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}
