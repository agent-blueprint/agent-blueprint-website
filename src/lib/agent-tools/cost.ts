// Cost estimate from the measured agent-job benchmark. Pure functions: the
// benchmark data is passed in, so the same inputs always give the same answer.

export type AgentId = "claude" | "codex";

export interface Spread {
  median: number;
  min: number;
  max: number;
}

export interface RunStats {
  runs: number;
  passed: number;
  model: string;
  input_total: Spread;
  cache_read: Spread;
  output: Spread;
  cost_usd?: Spread;
  est_api_cost_usd?: Spread;
}

export interface JobSize {
  unit: string;
  amount: number;
  note: string;
}

export interface BenchmarkJob {
  id: string;
  title: string;
  description: string;
  // Present when cost grows with how much the agent reads; absent when the
  // agent works through the data with code, so its size barely matters.
  size?: JobSize;
}

export interface Benchmark {
  date: string;
  source: string;
  pricing: Record<AgentId, string>;
  jobs: BenchmarkJob[];
  stats: Record<string, RunStats>;
}

export interface Prices {
  input_per_million: number;
  cached_input_per_million: number;
  output_per_million: number;
}

export interface CostInput {
  job: string;
  agent: AgentId;
  your_size?: number;
  runs_per_month?: number;
  prices?: Prices;
}

export interface CostEstimate {
  job: string;
  agent: AgentId;
  benchmark_model: string;
  scaling: string;
  per_run: {
    input_tokens: number;
    output_tokens: number;
    cached_share: number;
    typical_usd: number;
    budget_usd: number;
  };
  per_month?: { runs: number; typical_usd: number; budget_usd: number };
  priced_with: string;
  worst_case_factor: number;
  notes: string[];
}

// Budget at least this multiple of typical, as the benchmark page advises.
const MIN_BUDGET_FACTOR = 1.5;
// Above this, one session is unlikely to hold the input; the job would be split.
const ONE_SESSION_INPUT_LIMIT = 1_000_000;

function runCost(stats: RunStats): Spread {
  const cost = stats.cost_usd ?? stats.est_api_cost_usd;
  if (!cost) throw new Error("benchmark entry has no cost figures");
  return cost;
}

// The smallest typical input across all jobs for one agent: what the agent
// spends re-reading its own instructions and tools, whatever the job.
export function inputFloor(bench: Benchmark, agent: AgentId): number {
  const medians = bench.jobs
    .map((j) => bench.stats[`${agent}/${j.id}`]?.input_total.median)
    .filter((n): n is number => typeof n === "number");
  return Math.min(...medians);
}

function outputFloor(bench: Benchmark, agent: AgentId): number {
  const medians = bench.jobs
    .map((j) => bench.stats[`${agent}/${j.id}`]?.output.median)
    .filter((n): n is number => typeof n === "number");
  return Math.min(...medians);
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const round4 = (n: number) => Math.round(n * 10000) / 10000;

export function estimateCost(bench: Benchmark, input: CostInput): CostEstimate {
  const job = bench.jobs.find((j) => j.id === input.job);
  if (!job) {
    throw new Error(`Unknown job "${input.job}". Known jobs: ${bench.jobs.map((j) => j.id).join(", ")}.`);
  }
  const stats = bench.stats[`${input.agent}/${job.id}`];
  if (!stats) throw new Error(`No measured runs for ${input.agent} on ${job.id}.`);

  const notes: string[] = [];
  let ratio = 1;
  let scaling: string;
  if (job.size && input.your_size !== undefined) {
    ratio = input.your_size / job.size.amount;
    scaling = `Scaled by your ${input.your_size.toLocaleString("en-US")} ${job.size.unit} against the benchmark's ${job.size.amount.toLocaleString("en-US")} (${job.size.note}): x${round2(ratio)} on the part of the input that comes from reading.`;
    if (ratio > 20) notes.push("Your input is more than 20 times the benchmark's, so this is a long extrapolation. Measure a real run as soon as you can.");
  } else if (job.size) {
    scaling = `Not scaled: no size given. The benchmark's input was ${job.size.amount.toLocaleString("en-US")} ${job.size.unit} (${job.size.note}).`;
    notes.push(`Real inputs are usually bigger than the benchmark's. Pass your_size in ${job.size.unit} to scale.`);
  } else {
    scaling = "Not scaled: in this job the agent works through the data with code, so its cost barely depends on data size.";
    if (input.your_size !== undefined) notes.push("your_size was ignored because this job doesn't scale with input size.");
  }

  const floor = inputFloor(bench, input.agent);
  const reading = Math.max(0, stats.input_total.median - floor);
  const inputTokens = Math.round(floor + reading * ratio);
  const outputTokens = Math.round(Math.max(outputFloor(bench, input.agent), stats.output.median * ratio));
  const cachedShare = stats.cache_read.median / stats.input_total.median;
  const worst = Math.max(stats.input_total.max / stats.input_total.median, MIN_BUDGET_FACTOR);

  let typical: number;
  let pricedWith: string;
  if (input.prices) {
    const p = input.prices;
    typical =
      (inputTokens * (1 - cachedShare) * p.input_per_million +
        inputTokens * cachedShare * p.cached_input_per_million +
        outputTokens * p.output_per_million) /
      1_000_000;
    pricedWith = `Your prices: $${p.input_per_million} per million input tokens, $${p.cached_input_per_million} cached, $${p.output_per_million} output, with ${Math.round(cachedShare * 100)}% of input cached as in the benchmark. Cache-write charges are not included.`;
  } else {
    typical = runCost(stats).median * (inputTokens / stats.input_total.median);
    pricedWith = `Benchmark prices on ${bench.date}: ${bench.pricing[input.agent]} Pass prices to use current rates.`;
  }

  if (inputTokens > ONE_SESSION_INPUT_LIMIT) {
    notes.push("This is more input than one agent session is likely to hold. Expect the work to be split into batches, each paying the fixed overhead again.");
  }
  notes.push("People's time reviewing the agent's work is usually a bigger cost than tokens.");

  const estimate: CostEstimate = {
    job: job.id,
    agent: input.agent,
    benchmark_model: stats.model,
    scaling,
    per_run: {
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cached_share: round2(cachedShare),
      typical_usd: round4(typical),
      budget_usd: round4(typical * worst),
    },
    priced_with: pricedWith,
    worst_case_factor: round2(worst),
    notes,
  };
  if (input.runs_per_month !== undefined) {
    estimate.per_month = {
      runs: input.runs_per_month,
      typical_usd: round2(typical * input.runs_per_month),
      budget_usd: round2(typical * worst * input.runs_per_month),
    };
  }
  return estimate;
}

export function listJobs(bench: Benchmark, agent?: AgentId) {
  const agents: AgentId[] = agent ? [agent] : ["claude", "codex"];
  return {
    date: bench.date,
    source: bench.source,
    jobs: bench.jobs.map((j) => ({
      id: j.id,
      title: j.title,
      description: j.description,
      scales_with: j.size ? `${j.size.unit} read (${j.size.amount.toLocaleString("en-US")} in the benchmark, ${j.size.note})` : "barely scales: the agent works through the data with code",
      measured: Object.fromEntries(
        agents.map((a) => {
          const s = bench.stats[`${a}/${j.id}`];
          const c = runCost(s);
          return [
            a,
            {
              model: s.model,
              passed: `${s.passed}/${s.runs}`,
              input_tokens: { typical: s.input_total.median, worst: s.input_total.max },
              output_tokens: s.output.median,
              usd: { typical: round4(c.median), worst: round4(c.max) },
            },
          ];
        }),
      ),
    })),
  };
}
