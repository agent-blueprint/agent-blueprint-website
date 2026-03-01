"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useInView,
} from "framer-motion";
import { CornerBrackets } from "@/components/decorative/corner-brackets";
import { AnnotationLabel } from "@/components/decorative/annotation-label";
import { DimensionLine } from "@/components/dimension-line";
import { SchematicPath } from "@/components/schematic-path";

const steps = [
  {
    number: "01",
    label: "ANALYZE",
    tagline: "Populate your business profile.",
    body: "Provide context and organizational capabilities to tailor your agentic AI recommendations. Pinpoint the exact AI use cases that will drive the highest ROI for your specific profile.",
    image: "/images/screenshots/business-profile.png",
    imageAlt: "Populate your business profile",
    fig: "FIG. 01",
  },
  {
    number: "02",
    label: "DESIGN",
    tagline: "Generate prioritized AI opportunities.",
    body: "Agent Blueprint analyzes your business and generates AI use cases that solve your specific challenges. Each use case comes with a detailed blueprint with agent designs, an implementation plan, and a business case.",
    image: "/images/screenshots/ai-use-cases.png",
    imageAlt: "Generate prioritized AI opportunities",
    fig: "FIG. 02",
  },
  {
    number: "03",
    label: "DEPLOY",
    tagline: "Get deployment ready AI agent blueprints.",
    body: "Generate blueprints so detailed that implementation becomes a checklist, not a challenge. Turn your blueprints into production ready agents, built in days, not months.",
    image: "/images/screenshots/blueprint.png",
    imageAlt: "Get deployment ready AI agent blueprints",
    fig: "FIG. 03",
  },
  {
    number: "04",
    label: "VISUALIZE",
    tagline: "Visualize your agents and automatically deploy them.",
    body: "See your agent architecture and automatically deploy directly to your agentic platforms.",
    image: "/images/screenshots/deployment.png",
    imageAlt: "Visualize your agents and automatically deploy them",
    fig: "FIG. 04",
  },
  {
    number: "05",
    label: "MONITOR",
    tagline: "Monitor your agents and track their performance.",
    body: "Track operational metrics and measure performance against ROI projections in real time. Track live performance to ensure every agent pays for itself.",
    image: "/images/screenshots/roi-monitor.png",
    imageAlt: "Monitor your agents and track their performance",
    fig: "FIG. 05",
  },
];

const ease = [0.25, 0.4, 0.25, 1] as const;

function StepRow({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isReversed = index % 2 !== 0;

  return (
    <>
      {index > 0 && (
        <DimensionLine
          label={`PHASE ${step.number}`}
          animate
          className="my-4 hidden md:flex"
        />
      )}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className={`flex flex-col gap-8 md:gap-12 ${
          isReversed ? "md:flex-row-reverse" : "md:flex-row"
        } items-center`}
      >
        {/* Text */}
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground">
              {index + 1}
            </span>
            <span className="font-mono text-xs font-medium tracking-wider text-blueprint-annotation">
              {step.label}
            </span>
          </div>
          <h3 className="mt-4 font-display text-2xl italic text-foreground md:text-3xl">
            {step.tagline}
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            {step.body}
          </p>
        </div>

        {/* Screenshot with corner brackets and annotation */}
        <div className="flex-1">
          <div className="relative">
            <AnnotationLabel
              label={step.fig}
              position={isReversed ? "top-right" : "top-left"}
            />
            <CornerBrackets>
              <div className="overflow-hidden rounded-lg border border-border shadow-lg">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={600}
                  height={400}
                  className="h-auto w-full"
                />
              </div>
            </CornerBrackets>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

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

        {/* Schematic connecting path behind steps - desktop only */}
        <div className="relative">
          <SchematicPath
            scrollProgress={scrollYProgress}
            stepCount={steps.length}
          />

          <div className="relative z-10 flex flex-col gap-16 md:gap-12">
            {steps.map((step, index) => (
              <StepRow key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
