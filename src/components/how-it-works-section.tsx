"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

const steps = [
  {
    number: "01",
    label: "ANALYZE",
    tagline: "Populate your business profile.",
    body: "Provide context and organizational capabilities to tailor your agentic AI recommendations. Pinpoint the exact AI use cases that will drive the highest ROI for your specific profile.",
  },
  {
    number: "02",
    label: "DESIGN",
    tagline: "Generate prioritized AI opportunities.",
    body: "Agent Blueprint analyzes your business and generates AI use cases that solve your specific challenges. Each use case comes with a detailed blueprint with agent designs, an implementation plan, and a business case.",
  },
  {
    number: "03",
    label: "DEPLOY",
    tagline: "Get deployment ready AI agent blueprints.",
    body: "Generate blueprints so detailed that implementation becomes a checklist, not a challenge. Turn your blueprints into production ready agents, built in days, not months.",
  },
  {
    number: "04",
    label: "VISUALIZE",
    tagline: "Visualize your agents and automatically deploy them.",
    body: "See your agent architecture and automatically deploy directly to your agentic platforms.",
  },
  {
    number: "05",
    label: "MONITOR",
    tagline: "Monitor your agents and track their performance.",
    body: "Track operational metrics and measure performance against ROI projections in real time. Track live performance to ensure every agent pays for itself.",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className={`relative md:col-span-1 ${
        isLeft
          ? "md:col-start-1 md:pr-12"
          : "md:col-start-2 md:pl-12"
      }`}
      style={{ gridRow: index + 1 }}
    >
      {/* Connector dot on the center line (desktop only) */}
      <div
        className={`absolute top-8 hidden h-3 w-3 rounded-full border-2 border-primary bg-background md:block ${
          isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
        }`}
      />
      <div className="rounded-lg border border-border bg-background/80 p-6 backdrop-blur-sm">
        <span className="font-mono text-xs font-medium tracking-wider text-blueprint-annotation">
          [{step.number}] {step.label}
        </span>
        <h3 className="mt-2 font-display text-2xl italic text-foreground">
          {step.tagline}
        </h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-blueprint-annotation">
            Our Process
          </span>
          <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground">
            From business insights to actionable AI agent blueprints in minutes
          </p>
        </div>

        <div className="relative">
          {/* Vertical connecting line - desktop only */}
          <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
            <div className="h-full w-px bg-border" />
            <motion.div
              className="absolute inset-0 w-px origin-top"
              style={{
                scaleY,
                background:
                  "repeating-linear-gradient(to bottom, var(--primary) 0px, var(--primary) 4px, transparent 4px, transparent 8px)",
                opacity: 0.3,
              }}
            />
          </div>

          <div className="relative z-10 grid gap-12 md:grid-cols-2 md:gap-y-20">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
