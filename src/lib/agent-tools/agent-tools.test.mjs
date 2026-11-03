// Run with: npm test (node --test; Node 22.6+ strips the TypeScript types).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { estimateCost, inputFloor, listJobs } from "./cost.ts";
import { checkOnePage } from "./one-page.ts";
import { renderAgentMap } from "./agent-map.ts";
import { BENCHMARK_META, JOB_SIZES } from "./sizes.ts";

const root = new URL("../../../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const dir = "public/benchmarks/agent-jobs/2026-11-02/";
const bench = {
  ...BENCHMARK_META,
  jobs: JSON.parse(read(dir + "jobs.json")).map((j) => ({ ...j, size: JOB_SIZES[j.id] })),
  stats: JSON.parse(read(dir + "summary.json")),
};

test("unscaled estimate reproduces the measured median", () => {
  const e = estimateCost(bench, { job: "longdoc", agent: "claude" });
  const s = bench.stats["claude/longdoc"];
  assert.equal(e.per_run.input_tokens, s.input_total.median);
  assert.equal(e.per_run.typical_usd, Math.round(s.cost_usd.median * 10000) / 10000);
  assert.ok(e.worst_case_factor >= 1.5);
});

test("doubling a reading job's size roughly doubles the reading part only", () => {
  const base = estimateCost(bench, { job: "corpus", agent: "codex", your_size: 6200 });
  const twice = estimateCost(bench, { job: "corpus", agent: "codex", your_size: 12400 });
  const floor = inputFloor(bench, "codex");
  assert.equal(twice.per_run.input_tokens - floor, 2 * (base.per_run.input_tokens - floor));
});

test("code jobs ignore size and say so", () => {
  const e = estimateCost(bench, { job: "sql", agent: "claude", your_size: 1e6 });
  assert.equal(e.per_run.input_tokens, bench.stats["claude/sql"].input_total.median);
  assert.ok(e.notes.some((n) => n.includes("ignored")));
});

test("same inputs give the same answer, and monthly is per run times runs", () => {
  const input = { job: "triage200", agent: "claude", your_size: 30000, runs_per_month: 300 };
  const a = estimateCost(bench, input);
  assert.deepEqual(a, estimateCost(bench, input));
  // per_run is rounded to 4 places, so allow a cent of difference.
  assert.ok(Math.abs(a.per_month.typical_usd - a.per_run.typical_usd * 300) <= 0.01);
});

test("explicit prices are used", () => {
  const e = estimateCost(bench, {
    job: "refactor",
    agent: "codex",
    prices: { input_per_million: 0, cached_input_per_million: 0, output_per_million: 1_000_000 },
  });
  assert.equal(e.per_run.typical_usd, e.per_run.output_tokens);
});

test("unknown job is a clear error", () => {
  assert.throws(() => estimateCost(bench, { job: "nope", agent: "claude" }), /Known jobs/);
});

test("job list covers all ten jobs for both agents", () => {
  const l = listJobs(bench);
  assert.equal(l.jobs.length, 10);
  assert.ok(l.jobs.every((j) => j.measured.claude && j.measured.codex));
});

test("the blank template fails the one-page check", () => {
  const r = checkOnePage(read("public/templates/agent-one-page/v1/template.md"));
  assert.equal(r.passed, false);
  assert.ok(r.findings.some((f) => /stage line/.test(f.message)));
  assert.ok(r.counts.unfilled_placeholders > 10);
});

test("the published example passes the one-page check", () => {
  const r = checkOnePage(read("public/templates/agent-one-page/v1/example.md"));
  assert.equal(r.passed, true, JSON.stringify(r.findings, null, 1));
  assert.ok(r.counts.enforced + r.counts.not_enforced >= 6);
});

test("a rule without enforcement is flagged", () => {
  const page = read("public/templates/agent-one-page/v1/example.md").replace(/(- Must never:[^\n]*?)(Enforced by:|Not enforced:)[^\n]*/i, "$1");
  const r = checkOnePage(page);
  assert.ok(r.findings.some((f) => /must never/.test(f.message)));
});

test("agent map fills the template and can't break out of the script tag", () => {
  const template = read("public/draw/v0.2/template.html");
  const html = renderAgentMap(template, { version: "0.2", agent: { name: "</script><b>x" }, connections: [] });
  assert.ok(html.includes('\\u003c/script>\\u003cb>x'));
  assert.equal(html.match(/<script id="blueprint"/g).length, 1);
  assert.ok(!html.includes('"demo"'));
});
