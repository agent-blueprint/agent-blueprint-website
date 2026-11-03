import type { JobSize } from "./cost";

// How much each reading job's agent had to read, measured from the benchmark's
// job files. Jobs not listed here are worked with code, so size barely matters.
export const JOB_SIZES: Record<string, JobSize> = {
  triage200: { unit: "words", amount: 3900, note: "200 support emails of about 20 words each" },
  replies: { unit: "words", amount: 753, note: "14 refund requests plus the policy and account notes" },
  corpus: { unit: "words", amount: 6200, note: "60 meeting notes" },
  longdoc: { unit: "words", amount: 16075, note: "one contract with an amendment" },
  clean: { unit: "rows", amount: 360, note: "messy customer rows with 50 duplicates" },
};

export const BENCHMARK_META = {
  date: "2026-11-02",
  source: "https://agentblueprint.ai/agent-cost-benchmark",
  pricing: {
    claude: "Claude Code's reported cost for claude-opus-5-5 at Anthropic API rates.",
    codex: "gpt-6-astra at OpenAI standard API prices ($10 per million input tokens, $1 cached, $50 output).",
  },
};
