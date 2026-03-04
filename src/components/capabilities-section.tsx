"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BlueprintGrid } from "@/components/blueprint-grid";

const capabilities = [
  {
    number: "01",
    title: "Tailored to Your Business",
    body: "Agent Blueprint starts with your company profile, strategy, and technology stack so every recommendation is aligned with your priorities and challenges.",
  },
  {
    number: "02",
    title: "Ready to Fund, Ready to Build",
    body: "Each blueprint includes a business case, an implementation plan, agent designs, and technology recommendations. Everything you need to move agents into production.",
  },
  {
    number: "03",
    title: "See It Before You Build It",
    body: "See your AI agents as a digital team. The visualizer maps out triggers, tools, workflows, and guardrails so you understand how agents will actually work before you build them.",
  },
  {
    number: "04",
    title: "From Blueprint to Production",
    body: "Agent Blueprint doesn't stop at recommendations. It automatically builds agents on the platform you choose, cutting weeks off your timeline.",
  },
  {
    number: "05",
    title: "Works with Your Stack",
    body: "No vendor lock-in. Blueprints adapt to the platforms you already use, so adoption is fast and ROI stays high.",
  },
  {
    number: "06",
    title: "Evolves with AI",
    body: "Unlike static consulting reports, Agent Blueprint evolves with the AI landscape. It monitors your agents in real time and tracks performance against your ROI targets.",
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
              Everything you need to go from AI strategy to production
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
