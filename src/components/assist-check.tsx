"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Plus, X } from "lucide-react";
import {
  SKILL_RATES,
  TIERS,
  isUnstatedSize,
  parsePaste,
  runCheck,
  toNumber,
  type CheckInput,
  type CheckResult,
  type PastedCheck,
  type Tier,
} from "@/lib/assist-check";

type AgentDraft = { id: number; name: string; runs: string; calls: string };
type SkillDraft = { id: number; name: string; rate: number; uses: string };

const EXAMPLE_AGENTS: AgentDraft[] = [
  { id: 1, name: "Incident triage", runs: "3,000", calls: "3" },
  { id: 2, name: "Software access", runs: "1,200", calls: "6" },
  { id: 3, name: "New hire setup", runs: "200", calls: "11" },
];
const EXAMPLE_SKILLS: SkillDraft[] = [
  { id: 4, name: SKILL_RATES[0].name, rate: SKILL_RATES[0].rate, uses: "20,000" },
  { id: 5, name: SKILL_RATES[2].name, rate: SKILL_RATES[2].rate, uses: "8,000" },
  { id: 6, name: SKILL_RATES[7].name, rate: SKILL_RATES[7].rate, uses: "1,500" },
];

const fieldClass =
  "h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 font-body text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40";
const labelClass = "font-body text-sm font-medium text-foreground";
const hintClass = "mt-1 font-body text-xs leading-relaxed text-muted-foreground";
const headingClass = "font-display text-2xl font-bold text-foreground";

const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const count = (value: number) => whole.format(Math.round(value));
const money = (value: number) => `$${whole.format(Math.round(value))}`;

function minutes(value: number): string {
  if (value < 1) return "under a minute";
  const rounded = Math.round(value);
  return `${rounded} minute${rounded === 1 ? "" : "s"}`;
}

function runOut(months: number, monthsLeft: number): string {
  if (months < 1) return "in under a month";
  if (months >= monthsLeft) return "after this contract year";
  const rounded = Math.floor(months * 10) / 10;
  return `in ${rounded} month${rounded === 1 ? "" : "s"}`;
}

function buildSummary(input: CheckInput, result: CheckResult): string {
  const lines = [
    "ServiceNow assist check (estimate from agentblueprint.ai/assist-check)",
    `Yearly pool: ${count(input.pool)} assists`,
    `Projected this contract year: ${count(result.projected)} assists`,
    result.gap > 0
      ? `Over the pool by ${count(result.gap)} assists, about ${money(result.overageDollars)} at $${input.price.toFixed(2)} each`
      : `Under the pool by ${count(-result.gap)} assists`,
    `Monthly use: ${count(result.monthly)} assists (agents ${count(result.agentAssists)}, skills and other use ${count(result.skillAssists)}, managed AI assets ${count(result.assetAssists)})`,
    "",
    "Agents:",
    ...result.agents.map(
      (agent) =>
        `- ${agent.name}: ${count(agent.runsPerMonth)} runs a month, ${agent.toolCalls} tool calls, ${agent.perRun} assists a run, ${count(agent.perMonth)} a month`,
    ),
  ];
  if (result.trims.length > 0) {
    lines.push(
      "",
      "Possible trims, if each agent still does its job:",
      ...result.trims.map(
        (trim) =>
          `- ${trim.name}: ${trim.from} to ${trim.to} tool calls saves ${count(trim.assistsPerYear)} assists a year`,
      ),
    );
  }
  lines.push(
    "",
    "Run sizes come from ServiceNow's public rate card. The pool and the price per assist are estimates until checked against your contract.",
  );
  return lines.join("\n");
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-primary/30 px-4 py-2.5 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </button>
  );
}

function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <X className="h-4 w-4" />
    </button>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 inline-flex cursor-pointer items-center gap-2 font-body text-sm font-semibold text-primary hover:underline"
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}

export function AssistCheck({ script }: { script: string }) {
  const [isExample, setIsExample] = useState(true);
  const [seats, setSeats] = useState("800");
  const [tier, setTier] = useState<Tier>("Advanced");
  const [poolOverride, setPoolOverride] = useState("");
  const [used, setUsed] = useState("");
  const [monthsLeft, setMonthsLeft] = useState("12");
  const [price, setPrice] = useState("0.20");
  const [hourly, setHourly] = useState("60");
  const [assets, setAssets] = useState("");
  const [agents, setAgents] = useState<AgentDraft[]>(EXAMPLE_AGENTS);
  const [skills, setSkills] = useState<SkillDraft[]>(EXAMPLE_SKILLS);
  const [nextId, setNextId] = useState(100);
  const [paste, setPaste] = useState("");
  const [pasteError, setPasteError] = useState(false);
  const [loaded, setLoaded] = useState<PastedCheck | null>(null);

  const months = Math.min(12, toNumber(monthsLeft));
  const input: CheckInput = useMemo(
    () => ({
      pool: toNumber(poolOverride) || toNumber(seats) * TIERS[tier],
      usedSoFar: toNumber(used),
      monthsLeft: months,
      price: toNumber(price),
      hourlyRate: toNumber(hourly),
      managedAssets: toNumber(assets),
      agents: agents.map((agent, index) => ({
        name: agent.name.trim() || `Agent ${index + 1}`,
        runsPerMonth: toNumber(agent.runs),
        toolCalls: Math.floor(toNumber(agent.calls)),
      })),
      skills: skills.map((skill) => ({
        name: skill.name,
        rate: skill.rate,
        usesPerMonth: toNumber(skill.uses),
      })),
    }),
    [poolOverride, seats, tier, used, months, price, hourly, assets, agents, skills],
  );
  const result = useMemo(() => runCheck(input), [input]);

  function takeId() {
    const id = nextId;
    setNextId(id + 1);
    return id;
  }

  function clearAll() {
    setIsExample(false);
    setLoaded(null);
    setAgents([{ id: takeId(), name: "", runs: "", calls: "" }]);
    setSkills([]);
    setSeats("");
    setPoolOverride("");
    setUsed("");
    setAssets("");
  }

  function loadPaste() {
    const parsed = parsePaste(paste);
    if (!parsed) {
      setPasteError(true);
      return;
    }
    let id = nextId;
    setAgents(
      parsed.agents.map((agent) => ({
        id: id++,
        name: agent.name,
        runs: String(agent.runsPerMonth),
        calls: String(agent.toolCalls),
      })),
    );
    setSkills(
      parsed.skills.map((skill) => ({
        id: id++,
        name: skill.name,
        rate: skill.rate,
        uses: String(skill.usesPerMonth),
      })),
    );
    setNextId(id);
    setIsExample(false);
    setLoaded(parsed);
    setPasteError(false);
    setPaste("");
    document.getElementById("your-usage")?.scrollIntoView({ behavior: "smooth" });
  }

  const hasUse = result.monthly > 0 || input.usedSoFar > 0;
  const over = result.gap > 0;
  const barMax = Math.max(input.pool, result.projected, 1);
  const unstated = input.agents.some((agent) => isUnstatedSize(agent.toolCalls));

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start">
      <div className="min-w-0 space-y-10">
        <section id="your-usage" className="scroll-mt-28">
          {isExample && (
            <div className="mb-6 flex flex-col gap-3 rounded-md border border-accent/40 bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-body text-sm text-foreground">
                These are made-up example numbers. Replace them with yours.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="shrink-0 cursor-pointer text-left font-body text-sm font-semibold text-primary underline underline-offset-4"
              >
                Clear the example
              </button>
            </div>
          )}

          {loaded && (
            <div className="mb-6 rounded-md border border-primary/25 bg-card px-4 py-3 font-body text-sm leading-relaxed text-foreground">
              <p>
                Loaded {loaded.agents.length} agents and workflows from your last {loaded.days}{" "}
                days. Their run sizes come to about {count(loaded.estimatedPerMonth)} assists a
                month
                {loaded.loggedPerMonth !== null &&
                  `, and ServiceNow logged ${count(loaded.loggedPerMonth)} in total`}
                .
              </p>
              {loaded.trialShare > 0 && (
                <p className="mt-2 text-muted-foreground">
                  {Math.round(loaded.trialShare * 100)}% of what it logged is marked as trial
                  assists. Trial assists may not count against your pool, so check your contract.
                </p>
              )}
              {loaded.capped && (
                <p className="mt-2 text-muted-foreground">
                  The script stopped at its limit of 50,000 runs, so the real numbers are higher.
                </p>
              )}
              {loaded.agents.length === 0 && (
                <p className="mt-2 text-muted-foreground">
                  It found no agent runs in that window. Scheduled and chat runs show up here;
                  test runs don&apos;t.
                </p>
              )}
            </div>
          )}

          <h2 className={headingClass}>Your pool</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ac-seats" className={labelClass}>
                ITSM fulfiller seats
              </label>
              <input
                id="ac-seats"
                inputMode="numeric"
                className={`mt-1.5 ${fieldClass}`}
                value={seats}
                onChange={(event) => setSeats(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ac-tier" className={labelClass}>
                Tier
              </label>
              <select
                id="ac-tier"
                className={`mt-1.5 ${fieldClass}`}
                value={tier}
                onChange={(event) => setTier(event.target.value as Tier)}
              >
                {(Object.keys(TIERS) as Tier[]).map((name) => (
                  <option key={name} value={name}>
                    {name} ({count(TIERS[name])} a seat, reported)
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="ac-pool" className={labelClass}>
                Your contract&apos;s yearly pool, if you know it
              </label>
              <input
                id="ac-pool"
                inputMode="numeric"
                placeholder={`Estimated: ${count(toNumber(seats) * TIERS[tier])}`}
                className={`mt-1.5 ${fieldClass}`}
                value={poolOverride}
                onChange={(event) => setPoolOverride(event.target.value)}
              />
              <p className={hintClass}>
                Use this if you hold other products, such as CSM or HRSD, since their seats add
                different amounts.
              </p>
            </div>
            <div>
              <label htmlFor="ac-used" className={labelClass}>
                Assists used so far this contract year
              </label>
              <input
                id="ac-used"
                inputMode="numeric"
                placeholder="0"
                className={`mt-1.5 ${fieldClass}`}
                value={used}
                onChange={(event) => setUsed(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ac-months" className={labelClass}>
                Months left in the contract year
              </label>
              <input
                id="ac-months"
                inputMode="numeric"
                className={`mt-1.5 ${fieldClass}`}
                value={monthsLeft}
                onChange={(event) => setMonthsLeft(event.target.value)}
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className={headingClass}>Agents and workflows</h2>
          <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
            ServiceNow bills each run by how many tools it calls. Each row is one agent or
            workflow.
          </p>
          <div className="mt-4 space-y-4">
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                className="grid grid-cols-2 items-end gap-3 border-b border-border pb-4 sm:grid-cols-[minmax(0,1fr)_7rem_6rem_2.5rem]"
              >
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor={`ac-a-${agent.id}`} className={labelClass}>
                    Name
                  </label>
                  <input
                    id={`ac-a-${agent.id}`}
                    placeholder={`Agent ${index + 1}`}
                    className={`mt-1.5 ${fieldClass}`}
                    value={agent.name}
                    onChange={(event) =>
                      setAgents(
                        agents.map((row) =>
                          row.id === agent.id ? { ...row, name: event.target.value } : row,
                        ),
                      )
                    }
                  />
                </div>
                <div>
                  <label htmlFor={`ac-r-${agent.id}`} className={labelClass}>
                    Runs a month
                  </label>
                  <input
                    id={`ac-r-${agent.id}`}
                    inputMode="numeric"
                    className={`mt-1.5 ${fieldClass}`}
                    value={agent.runs}
                    onChange={(event) =>
                      setAgents(
                        agents.map((row) =>
                          row.id === agent.id ? { ...row, runs: event.target.value } : row,
                        ),
                      )
                    }
                  />
                </div>
                <div>
                  <label htmlFor={`ac-c-${agent.id}`} className={labelClass}>
                    Tool calls
                  </label>
                  <input
                    id={`ac-c-${agent.id}`}
                    inputMode="numeric"
                    className={`mt-1.5 ${fieldClass}`}
                    value={agent.calls}
                    onChange={(event) =>
                      setAgents(
                        agents.map((row) =>
                          row.id === agent.id ? { ...row, calls: event.target.value } : row,
                        ),
                      )
                    }
                  />
                </div>
                <div className="col-span-2 flex justify-end sm:col-span-1">
                  <RemoveButton
                    label={`Remove ${agent.name || `agent ${index + 1}`}`}
                    onClick={() => setAgents(agents.filter((row) => row.id !== agent.id))}
                  />
                </div>
              </div>
            ))}
          </div>
          <AddButton
            label="Add an agent"
            onClick={() =>
              setAgents([...agents, { id: takeId(), name: "", runs: "", calls: "" }])
            }
          />
        </section>

        <section>
          <h2 className={headingClass}>Skills and everything else</h2>
          <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
            Rates come from ServiceNow&apos;s rate card. Add the ones you use most.
          </p>
          <div className="mt-4 space-y-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="grid grid-cols-[minmax(0,1fr)_2.5rem] items-end gap-3 border-b border-border pb-4 sm:grid-cols-[minmax(0,1fr)_7rem_2.5rem]"
              >
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor={`ac-s-${skill.id}`} className={labelClass}>
                    Skill
                  </label>
                  <select
                    id={`ac-s-${skill.id}`}
                    className={`mt-1.5 ${fieldClass}`}
                    value={skill.name}
                    onChange={(event) => {
                      const picked = SKILL_RATES.find((rate) => rate.name === event.target.value);
                      if (!picked) return;
                      setSkills(
                        skills.map((row) =>
                          row.id === skill.id
                            ? { ...row, name: picked.name, rate: picked.rate }
                            : row,
                        ),
                      );
                    }}
                  >
                    {!SKILL_RATES.some((rate) => rate.name === skill.name) && (
                      <option value={skill.name}>{skill.name}</option>
                    )}
                    {SKILL_RATES.map((rate) => (
                      <option key={rate.name} value={rate.name}>
                        {rate.name}: {rate.rate}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`ac-u-${skill.id}`} className={labelClass}>
                    Uses a month
                  </label>
                  <input
                    id={`ac-u-${skill.id}`}
                    inputMode="numeric"
                    className={`mt-1.5 ${fieldClass}`}
                    value={skill.uses}
                    onChange={(event) =>
                      setSkills(
                        skills.map((row) =>
                          row.id === skill.id ? { ...row, uses: event.target.value } : row,
                        ),
                      )
                    }
                  />
                </div>
                <RemoveButton
                  label={`Remove ${skill.name}`}
                  onClick={() => setSkills(skills.filter((row) => row.id !== skill.id))}
                />
              </div>
            ))}
          </div>
          <AddButton
            label="Add a skill"
            onClick={() =>
              setSkills([
                ...skills,
                { id: takeId(), name: SKILL_RATES[0].name, rate: SKILL_RATES[0].rate, uses: "" },
              ])
            }
          />
          <div className="mt-6 sm:max-w-xs">
            <label htmlFor="ac-assets" className={labelClass}>
              AI assets managed in AI Control Tower
            </label>
            <input
              id="ac-assets"
              inputMode="numeric"
              placeholder="0"
              className={`mt-1.5 ${fieldClass}`}
              value={assets}
              onChange={(event) => setAssets(event.target.value)}
            />
            <p className={hintClass}>Each one costs 200 assists a month on the rate card.</p>
          </div>
        </section>

        <section>
          <h2 className={headingClass}>Dollars</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ac-price" className={labelClass}>
                Price per assist
              </label>
              <input
                id="ac-price"
                inputMode="decimal"
                className={`mt-1.5 ${fieldClass}`}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
              <p className={hintClass}>
                $0.20 is a reported overage figure, not a ServiceNow price. Use your contract rate.
              </p>
            </div>
            <div>
              <label htmlFor="ac-hourly" className={labelClass}>
                Hourly cost of the people doing this work
              </label>
              <input
                id="ac-hourly"
                inputMode="decimal"
                className={`mt-1.5 ${fieldClass}`}
                value={hourly}
                onChange={(event) => setHourly(event.target.value)}
              />
              <p className={hintClass}>Our placeholder. Use your own number.</p>
            </div>
          </div>
        </section>

        <section className="border-t border-border pt-8">
          <h2 className={headingClass}>Fill this in from your instance</h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
            A short script reads your last 30 days of agent runs and assist totals. It changes
            nothing, reads no ticket content, prompts or user names, and sends nothing anywhere.
            Read it first, or hand it to your security team. It needs admin access to Scripts -
            Background, and we&apos;ve tested it on one instance of our own so far.
          </p>
          <details className="mt-4 rounded-md border border-border">
            <summary className="cursor-pointer px-4 py-3 font-body text-sm font-semibold text-foreground">
              Show the script
            </summary>
            <pre className="max-h-96 overflow-auto border-t border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground">
              {script}
            </pre>
          </details>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <CopyButton text={script} label="Copy the script" />
            <a
              href="/assist-check/v1/assist-check.js"
              className="font-body text-sm font-medium text-primary underline underline-offset-4"
            >
              Open as a file
            </a>
          </div>
          <label htmlFor="ac-paste" className={`mt-6 block ${labelClass}`}>
            Paste the line that starts with ASSIST_CHECK
          </label>
          <textarea
            id="ac-paste"
            rows={3}
            className="mt-1.5 w-full rounded-md border border-input bg-background p-3 font-mono text-xs text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            value={paste}
            onChange={(event) => {
              setPaste(event.target.value);
              setPasteError(false);
            }}
          />
          {pasteError && (
            <p role="alert" className="mt-1 font-body text-sm text-destructive">
              That doesn&apos;t look like the script&apos;s output. Copy the whole line that starts
              with ASSIST_CHECK.
            </p>
          )}
          <button
            type="button"
            onClick={loadPaste}
            disabled={!paste.trim()}
            className="mt-3 cursor-pointer rounded-md bg-primary px-4 py-2.5 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Fill in my numbers
          </button>
          <p className={hintClass}>This stays in your browser. Replaces the agents and skills above.</p>
        </section>
      </div>

      <aside
        aria-live="polite"
        className="order-first min-w-0 rounded-lg border border-primary/25 bg-card p-5 md:p-6 lg:order-last lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
      >
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {isExample ? "Result / example numbers" : "Your result / estimate"}
        </p>

        {!hasUse || input.pool === 0 ? (
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
            Enter your seats and at least one agent or skill to see where you land.
          </p>
        ) : (
          <>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-foreground">
              {input.usedSoFar >= input.pool
                ? "You've already used your pool."
                : over
                  ? `You'd run out ${runOut(result.monthsUntilEmpty ?? 0, months)}.`
                  : `You'd finish with ${count(-result.gap)} assists unused.`}
            </h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
              {over
                ? `ServiceNow may invoice the extra ${count(result.gap)} assists. That's about ${money(result.overageDollars)} at $${input.price.toFixed(2)} each.`
                : `That's ${Math.round((-result.gap / input.pool) * 100)}% of your pool, already paid for. You have room to run more, or a reason to look at the pool size at renewal.`}
            </p>

            <div className="mt-5 space-y-3">
              {[
                ["Projected this year", result.projected, over ? "bg-destructive" : "bg-primary"],
                ["Your pool", input.pool, "bg-muted-foreground/50"],
              ].map(([label, value, color]) => (
                <div key={label as string}>
                  <div className="flex justify-between gap-3 font-body text-xs text-muted-foreground">
                    <span>{label}</span>
                    <span className="font-mono">{count(value as number)}</span>
                  </div>
                  <div className="mt-1 h-2.5 rounded-sm bg-muted">
                    <div
                      className={`h-full rounded-sm ${color}`}
                      style={{ width: `${((value as number) / barMax) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 font-body text-xs leading-relaxed text-muted-foreground">
              {count(result.monthly)} assists a month: {count(result.agentAssists)} on agents,{" "}
              {count(result.skillAssists)} on skills and other use
              {result.assetAssists > 0 && `, ${count(result.assetAssists)} on managed AI assets`}.
            </p>

            {result.agents.some((agent) => agent.runsPerMonth > 0) && (
              <div className="mt-6 border-t border-border pt-5">
                <h3 className="font-body text-sm font-semibold text-foreground">
                  What each agent has to earn
                </h3>
                <ul className="mt-3 space-y-3">
                  {result.agents
                    .filter((agent) => agent.runsPerMonth > 0)
                    .slice(0, 8)
                    .map((agent, index) => (
                      <li key={`${agent.name}-${index}`} className="font-body text-sm">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="min-w-0 break-words font-medium text-foreground">
                            {agent.name}
                          </span>
                          <span className="shrink-0 rounded-sm border border-primary/25 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                            {agent.size === "Over 20" ? "Over 20 calls" : agent.size} {agent.perRun}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {count(agent.perMonth)} assists a month
                          {input.price > 0 && `, worth ${money(agent.perMonth * input.price)} at that price`}
                          {agent.breakEvenMinutes !== null &&
                            input.price > 0 &&
                            `. Each run must save ${minutes(agent.breakEvenMinutes)} to pay for itself.`}
                        </p>
                      </li>
                    ))}
                </ul>
                {result.agents.filter((agent) => agent.runsPerMonth > 0).length > 8 && (
                  <p className={hintClass}>Showing the first 8. Copy the summary for all of them.</p>
                )}
              </div>
            )}

            {result.trims.length > 0 && (
              <div className="mt-6 border-t border-border pt-5">
                <h3 className="font-body text-sm font-semibold text-foreground">
                  Where a smaller run size would save the most
                </h3>
                <ul className="mt-3 space-y-3">
                  {result.trims.slice(0, 3).map((trim, index) => (
                    <li key={`${trim.name}-${index}`} className="font-body text-sm text-foreground">
                      <span className="font-medium">{trim.name}:</span> {trim.from} to {trim.to}{" "}
                      tool calls saves {count(trim.assistsPerYear)} assists a year
                      {input.price > 0 && ` (${money(trim.dollarsPerYear)})`}.
                    </li>
                  ))}
                </ul>
                <p className={hintClass}>
                  All trims together bring you to {count(result.projectedAfterTrims)} this contract
                  year. This only helps if the agent still does its job with fewer calls, so test
                  that first.
                </p>
              </div>
            )}

            {unstated && (
              <p className={`mt-4 ${hintClass}`}>
                ServiceNow&apos;s rate card doesn&apos;t say how a run of exactly 4 tool calls is
                billed. We count it as Small, as a ServiceNow Community guide does. It could be
                Medium.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5">
              <a
                href="#contact"
                className="rounded-md bg-primary px-4 py-2.5 text-center font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Talk it through before your renewal
              </a>
              <CopyButton text={buildSummary(input, result)} label="Copy a summary for finance" />
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
