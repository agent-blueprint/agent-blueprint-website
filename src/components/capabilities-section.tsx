"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BlueprintGrid } from "@/components/blueprint-grid";

const capabilities = [
  {
    number: "01",
    title: "6-Stage LLM Pipeline",
    body: "Automated generation across 6 stages: Business Profile, AI Readiness (6 dimensions), Use Cases (5-12 per org), Technical Blueprint, Business Case (5-year ROI), and Implementation Plan. Minutes, not months.",
  },
  {
    number: "02",
    title: "8 MCP Tools for Coding Agents",
    body: "MCP server with 8 tools: list_blueprints, get_blueprint, get_business_case, get_implementation_plan, get_use_case, get_implementation_spec, get_business_profile, download_blueprint. Install via npx agentblueprint.",
  },
  {
    number: "03",
    title: "Agent Team Visualization",
    body: "Interactive visualizer maps 3-15 agent teams with triggers, tools, workflows, guardrails, and orchestration patterns (routing, pipeline, orchestrator-workers). Understand the architecture before you build it.",
  },
  {
    number: "04",
    title: "Agent Skills Export",
    body: "Export blueprints as Agent Skills directories (SKILL.md + references/). Open standard consumed by Claude Code, Codex, Cursor, Copilot, Windsurf, and 40+ other coding agents. The agent handles implementation.",
  },
  {
    number: "05",
    title: "Vendor-Agnostic Output",
    body: "Deploy to ServiceNow, Salesforce, or any enterprise platform. No lock-in. Blueprints define agent teams, integration points, and data flows independent of vendor. Your coding agent translates to platform-specific config.",
  },
  {
    number: "06",
    title: "Living Blueprints, Not Reports",
    body: "Blueprints update as your business context changes. Performance monitoring tracks agents against ROI targets post-deployment. Coding agents write back operational data, keeping the blueprint current.",
  },
];

function CapabilityCard({
  capability,
  index,
}: {
  capability: (typeof capabilities)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // First 2 cards span wider for bento layout
  const isWide = index < 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={`group ${isWide ? "sm:col-span-2 lg:col-span-1" : ""}`}
    >
      <div className="h-full bg-white/5 border border-white/10 p-6 transition-colors duration-300 hover:border-accent/40">
        <span className="font-mono text-xs font-medium tracking-wider text-dark-surface-foreground/40">
          {capability.number}
        </span>
        <h3 className="mt-3 font-display text-xl text-dark-surface-foreground">
          {capability.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-dark-surface-foreground/70">
          {capability.body}
        </p>
      </div>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  return (
    <BlueprintGrid variant="dark">
      <section id="capabilities" className="relative py-16 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 md:mb-16 text-center">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-dark-surface-foreground/50">
              What We Deliver
            </span>
            <h2 className="mt-4 font-display text-3xl text-dark-surface-foreground md:text-5xl">
              Platform Capabilities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base text-dark-surface-foreground/70">
              6-stage pipeline, 8 MCP tools, 45+ agent compatibility, vendor-agnostic export
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability, index) => (
              <CapabilityCard
                key={capability.number}
                capability={capability}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </BlueprintGrid>
  );
}
