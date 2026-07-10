"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BlueprintGrid } from "@/components/blueprint-grid";

const capabilities = [
  {
    number: "01",
    title: "Business Context First",
    body: "Everything starts from a structured profile of your organization: systems, processes, constraints, and goals. If a recommendation is in the blueprint, it traces back to your context, not a template.",
  },
  {
    number: "02",
    title: "Readiness, Measured",
    body: "AI readiness scored across data, process, technology, people, and governance. Recommendations link back to this evidence, so you can see why each use case made the cut.",
  },
  {
    number: "03",
    title: "A Ranked Use-Case Portfolio",
    body: "Use cases scored by impact and feasibility, then force-ranked. Priorities are explicit, and so is the reasoning. Not everything gets to be high priority.",
  },
  {
    number: "04",
    title: "Agent Team Designs",
    body: "Team composition, orchestration pattern, tools, triggers, guardrails, and human approval gates for every use case. An interactive visualizer maps how the team works before anything gets built.",
  },
  {
    number: "05",
    title: "Deterministic Business Cases",
    body: "Costs, savings, and payback computed from your own numbers. No fudge factors, no invented multipliers. If the math doesn't work, the blueprint says so.",
  },
  {
    number: "06",
    title: "Machine-Readable Delivery",
    body: "Blueprints export as Agent Skills and serve over MCP, so coding agents build from them directly, on whatever platform you run. After deployment, performance flows back in and the blueprint stays current.",
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
              What&apos;s in a Blueprint
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base text-dark-surface-foreground/70">
              Every engagement produces a working blueprint: evidence, priorities, designs, economics, and files your coding agents build from
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
