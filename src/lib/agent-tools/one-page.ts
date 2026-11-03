// Structural check for a one-page agent summary written from
// /templates/agent-one-page/v1/template.md. It checks shape only, never
// whether an answer is right.

export interface Finding {
  severity: "missing" | "warning";
  section: string;
  message: string;
}

export interface OnePageCheck {
  passed: boolean;
  findings: Finding[];
  counts: {
    words: number;
    enforced: number;
    not_enforced: number;
    open_items: number;
    unfilled_placeholders: number;
  };
}

const SECTIONS = ["Summary", "Purpose", "Authority", "Proof", "Owner", "Cost", "Promise", "Result"];

// Template lines that state a rule and so must say what enforces it.
const RULE_LABELS: Record<string, string[]> = {
  Authority: [
    "can do on its own",
    "needs human approval",
    "must never",
    "limit on what it can spend or move",
    "limit on its own usage bill",
  ],
  Owner: ["who can stop it"],
};

// The template's own guidance: a page longer than this won't fit on one page.
const ONE_PAGE_WORDS = 700;

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/^#+\s*/, "")
    .replace(/^\d+\.\s*/, "")
    .trim();

function splitSections(markdown: string) {
  const sections = new Map<string, string[]>();
  const order: string[] = [];
  let current: string | null = null;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^##\s+/.test(line)) {
      const name = SECTIONS.find((s) => normalize(line) === s.toLowerCase()) ?? null;
      current = name;
      if (name && !sections.has(name)) {
        sections.set(name, []);
        order.push(name);
      }
      continue;
    }
    if (current) sections.get(current)!.push(line);
  }
  return { sections, order };
}

export function checkOnePage(markdown: string): OnePageCheck {
  const findings: Finding[] = [];
  const { sections, order } = splitSections(markdown);

  for (const s of SECTIONS) {
    if (!sections.has(s)) findings.push({ severity: "missing", section: s, message: `No "${s}" section.` });
  }
  const expected = SECTIONS.filter((s) => sections.has(s));
  if (order.join("|") !== expected.join("|")) {
    findings.push({ severity: "warning", section: "Page", message: `Sections are out of order. Expected: ${expected.join(", ")}.` });
  }

  if (!/stage:\s*(proposed|approved|live|measured)\b/i.test(markdown)) {
    findings.push({ severity: "missing", section: "Header", message: "No stage line (Proposed, Approved, Live or Measured)." });
  }
  if (!/approved by:/i.test(markdown)) {
    findings.push({ severity: "missing", section: "Page", message: 'No "Approved by:" line at the end.' });
  }

  let enforced = 0;
  let notEnforced = 0;
  for (const [section, labels] of Object.entries(RULE_LABELS)) {
    const lines = sections.get(section) ?? [];
    for (const label of labels) {
      const line = lines.find((l) => l.replace(/^[-*]\s*/, "").toLowerCase().startsWith(label));
      if (!line) {
        findings.push({ severity: "missing", section, message: `No "${label}" line.` });
        continue;
      }
      const hasEnforced = /enforced by:/i.test(line);
      const hasNot = /not enforced:/i.test(line);
      if (hasEnforced) enforced++;
      if (hasNot) notEnforced++;
      if (!hasEnforced && !hasNot) {
        findings.push({ severity: "missing", section, message: `"${label}" doesn't end with "Enforced by:" or "Not enforced:".` });
      }
    }
  }

  let openItems = 0;
  let placeholders = 0;
  for (const [section, lines] of sections) {
    for (const line of lines) {
      if (/\[open\]/i.test(line)) {
        openItems++;
        if (!/decid/i.test(line)) {
          findings.push({ severity: "warning", section, message: `Open item doesn't say who decides: "${line.trim().slice(0, 100)}"` });
        }
      }
      // Leftover template brackets, ignoring [Open] and Markdown links.
      const leftovers = line.match(/\[(?!open\])[^\]]+\](?!\()/gi) ?? [];
      placeholders += leftovers.length;
      if (leftovers.length && section !== "Result") {
        findings.push({ severity: "warning", section, message: `Unfilled placeholder: ${leftovers.join(" ")}` });
      }
    }
  }

  const words = markdown.split(/\s+/).filter(Boolean).length;
  if (words > ONE_PAGE_WORDS) {
    findings.push({ severity: "warning", section: "Page", message: `${words} words; one page is about ${ONE_PAGE_WORDS}. Cut detail or move it to linked notes.` });
  }

  return {
    passed: !findings.some((f) => f.severity === "missing"),
    findings,
    counts: { words, enforced, not_enforced: notEnforced, open_items: openItems, unfilled_placeholders: placeholders },
  };
}
