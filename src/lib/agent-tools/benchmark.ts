import summary from "../../../public/benchmarks/agent-jobs/2026-11-02/summary.json";
import jobs from "../../../public/benchmarks/agent-jobs/2026-11-02/jobs.json";
import type { Benchmark, RunStats } from "./cost";
import { BENCHMARK_META, JOB_SIZES } from "./sizes";

export const benchmark: Benchmark = {
  ...BENCHMARK_META,
  jobs: jobs.map((j) => ({ ...j, size: JOB_SIZES[j.id] })),
  stats: summary as Record<string, RunStats>,
};
