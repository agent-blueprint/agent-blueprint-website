import { readFileSync } from "node:fs";
import path from "node:path";

// The full reference is llms.txt plus the method in detail, so the two files
// can never describe different offers.
const method = `
## The method in detail

Every agent gets one page: a short summary plus seven sections, written before it goes live and finished at the check-back:

1. Purpose: the job it does, and what's out of scope.
2. Authority: what it can do alone, what needs a person, what it must never do, and what enforces each rule (a permission, a service limit or an approval setting, or "not enforced" if it is only an instruction).
3. Proof: how it was tested, what counts as passing, and where each action is recorded.
4. Owner: who is accountable, who can stop it and how, and who checks its work.
5. Cost: volume, usage per run, monthly cost including people's review time, upkeep and mistakes, and cost to build.
6. Promise: one number with today's value, a target and a date, what must not get worse, when to stop, and the ROI math, keeping freed-up staff time apart from cash.
7. Result: filled in at the check-back with what was measured, whether the setup still matches the page, and the decision: keep, fix or stop.

Every figure is labelled estimated or measured. Targets are written before launch and not moved afterwards.
`;

export function GET() {
  const base = readFileSync(path.join(process.cwd(), "public", "llms.txt"), "utf8");
  const content = base.replace("# Agent Blueprint\n", "# Agent Blueprint: Full Reference\n").replace("\n## Connect", `${method}\n## Connect`);

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
