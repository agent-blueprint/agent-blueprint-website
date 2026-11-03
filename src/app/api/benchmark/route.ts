import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { z } from "zod";

// Opt-in benchmark counts from the drawing page (/draw/view). The schema is strict, so only
// counts and fixed category values get through: no tool, connection, agent or account names.
// Each submission is emailed to us; nothing is stored on this site.
const count = z.number().int().min(0).max(100_000);
const status = z.enum(["yes", "none_found", "unsure"]);
const kind = z.enum(["mail", "chat", "calendar", "code", "files", "terminal", "web", "doc", "data", "money", "plug"]);

const benchmarkSchema = z
  .object({
    version: z.literal("0.2"),
    product: z.enum(["claude-code", "codex", "cursor", "copilot", "gemini", "chatgpt", "claude-app", "other"]),
    connections: count,
    tools: count,
    reads: count,
    changes: count,
    unsure: count,
    highRisk: count,
    mustAsk: count,
    noNeedToAsk: count,
    askUnknown: count,
    declared: count,
    trims: count,
    kinds: z.partialRecord(kind, count),
    checks: z
      .object({ commands: status, messages: status, delete: status, money: status, secrets: status })
      .strict(),
  })
  .strict();

export async function POST(request: Request) {
  let data: z.infer<typeof benchmarkSchema>;
  try {
    data = benchmarkSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid counts" }, { status: 400 });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error("SENDGRID_API_KEY is not configured");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  try {
    sgMail.setApiKey(apiKey);
    const body = JSON.stringify({ receivedAt: new Date().toISOString(), ...data }, null, 2);
    await sgMail.send({
      to: "chris@agentblueprint.ai",
      from: "no-reply@agentblueprint.ai",
      subject: `Benchmark counts: ${data.product}, ${data.tools} tools`,
      text: body,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Benchmark email failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
