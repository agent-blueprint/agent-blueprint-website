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
    label: "DISCOVER",
    tagline: "Find the right starting point.",
    body: "We audit your existing processes to identify high-impact AI automation opportunities. Our discovery framework maps your workflows and pinpoints where intelligent agents will deliver the greatest return.",
  },
  {
    number: "02",
    label: "ARCHITECT",
    tagline: "Design with precision.",
    body: "We design agent workflows tailored to your specific business context. Every integration point, decision tree, and handoff is mapped before a single line of code is written.",
  },
  {
    number: "03",
    label: "VALIDATE",
    tagline: "Test before you invest.",
    body: "We prototype and stress-test solutions in controlled environments. You see real results with real data before committing to full-scale deployment.",
  },
  {
    number: "04",
    label: "EXECUTE",
    tagline: "Deploy with confidence.",
    body: "We deploy production-ready AI agents that integrate seamlessly with your existing systems. Monitoring, iteration, and optimization are built in from day one.",
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
            From Strategy to Execution
          </h2>
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
