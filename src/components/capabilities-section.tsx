"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BlueprintGrid } from "@/components/blueprint-grid";
import { CornerBrackets } from "@/components/decorative/corner-brackets";
import { CompassArc } from "@/components/decorative/compass-arc";

const capabilities = [
  {
    number: "01",
    title: "Tailored to Your Business",
    body: "Agent Blueprint starts with your company profile, strategy, and technology stack, so every recommendation is aligned to your unique priorities and challenges.",
  },
  {
    number: "02",
    title: "Complete Blueprints for Every Use Case",
    body: "Each blueprint includes a business case to facilitate funding approval, an implementation plan, agent designs, and technology recommendations, everything you need to move agents into production.",
  },
  {
    number: "03",
    title: "Interactive Agent Visualizer",
    body: "See your AI agents as a digital team. Our visualizer maps out triggers, tools, workflows, and guardrails so you understand how agents will actually work before you build them.",
  },
  {
    number: "04",
    title: "Build Automation",
    body: "Agent Blueprint doesn't stop at recommendations — it automatically builds agents in your preferred agentic platform, reducing build time and cost.",
  },
  {
    number: "05",
    title: "Technology Agnostic by Design",
    body: "We don't lock you into a vendor. Blueprints adapt to the platforms you already use, ensuring fast adoption and maximum ROI.",
  },
  {
    number: "06",
    title: "Always On",
    body: "Unlike static consulting reports, our adaptive platform continuously integrates the latest AI advancements. It monitors your agents in real time to track their performance and provide real time validation of your ROI.",
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
      className={isWide ? "sm:col-span-2 lg:col-span-1" : ""}
    >
      <CornerBrackets className="h-full">
        <div className="h-full bg-white/5 border border-white/10 p-6 transition-colors duration-300 hover:border-accent/40 hover:shadow-[0_0_20px_var(--accent-glow)]">
          <span className="font-mono text-xs font-medium tracking-wider text-dark-surface-foreground/50">
            {capability.number}
          </span>
          <h3 className="mt-3 font-display text-xl text-dark-surface-foreground">
            {capability.title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-dark-surface-foreground/70">
            {capability.body}
          </p>
        </div>
      </CornerBrackets>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  return (
    <BlueprintGrid variant="dark">
      <section id="capabilities" className="relative py-24 md:py-32">
        {/* Watermark SVG */}
        <div className="absolute right-8 top-16 w-64 lg:w-80 opacity-60 pointer-events-none hidden md:block" aria-hidden="true">
          <CompassArc variant="dark" className="w-full h-auto" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-dark-surface-foreground/50">
              What We Deliver
            </span>
            <h2 className="mt-4 font-display text-4xl text-dark-surface-foreground md:text-5xl">
              Platform Capabilities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base text-dark-surface-foreground/70">
              Discover how Agent Blueprint transforms your business strategy
              into intelligent AI solutions
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
