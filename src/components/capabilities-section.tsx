"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const capabilities = [
  {
    number: "01",
    title: "Process Discovery",
    body: "AI-powered analysis of your existing workflows to identify automation opportunities with the highest ROI potential.",
  },
  {
    number: "02",
    title: "Agent Architecture",
    body: "Blueprint-grade design of multi-agent systems with clear responsibilities, communication patterns, and failsafe mechanisms.",
  },
  {
    number: "03",
    title: "Workflow Orchestration",
    body: "Intelligent coordination of multiple AI agents working in concert to execute complex business processes end-to-end.",
  },
  {
    number: "04",
    title: "Integration Framework",
    body: "Seamless connection with your existing tools and platforms. Our agents work with your stack, not against it.",
  },
  {
    number: "05",
    title: "Validation & Testing",
    body: "Rigorous prototype testing with real data in sandboxed environments before any production deployment.",
  },
  {
    number: "06",
    title: "Performance Monitoring",
    body: "Continuous tracking and optimization of agent performance with actionable insights and automated alerting.",
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
    >
      <Card className="h-full border-t-2 border-t-primary border-border bg-background/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <span className="font-mono text-xs font-medium tracking-wider text-blueprint-annotation">
            {capability.number}
          </span>
          <h3 className="mt-3 font-display text-xl text-foreground">
            {capability.title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
            {capability.body}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-blueprint-annotation">
            What We Deliver
          </span>
          <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
            Platform Capabilities
          </h2>
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
  );
}
