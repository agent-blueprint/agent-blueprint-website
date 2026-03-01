"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

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
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground">
            Discover how Agent Blueprint transforms your business strategy into intelligent AI solutions
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
  );
}
