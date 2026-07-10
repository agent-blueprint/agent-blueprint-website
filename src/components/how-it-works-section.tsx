"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DimensionLine } from "@/components/dimension-line";
import {
  ProfileIllustration,
  OpportunitiesIllustration,
  BlueprintIllustration,
  LaunchIllustration,
} from "@/components/decorative/step-illustrations";

const steps = [
  {
    number: "01",
    label: "ASSESS",
    tagline: "Start from your operating reality.",
    body: "We build a structured profile of the organization: industry, systems, processes, constraints, goals. Then we score AI readiness across the dimensions that decide whether agents will actually work. Every later recommendation cites this evidence.",
  },
  {
    number: "02",
    label: "PRIORITIZE",
    tagline: "Rank the use cases worth doing.",
    body: "Candidate agent use cases get scored by impact and feasibility, then force-ranked. You get a portfolio with clear priorities and honest reasoning, not a list where everything is marked high.",
  },
  {
    number: "03",
    label: "BLUEPRINT",
    tagline: "Design the agent team, with the economics attached.",
    body: "Each approved use case gets a full design: agent roles, orchestration pattern, tools, integration points, guardrails, and human approval gates. The business case is deterministic, computed from your numbers, with costs and payback stated plainly.",
  },
  {
    number: "04",
    label: "DEPLOY",
    tagline: "Build with coding agents. Measure against the plan.",
    body: "Blueprints export as Agent Skills directories that coding agents like Claude Code, Codex, and Cursor build from. Rollout is phased with test gates. Deployed agents report performance back, and the blueprint stays current instead of aging in a drawer.",
  },
];

/* Map step numbers to their illustration component */
const illustrations: Record<string, React.ComponentType<{ className?: string }>> = {
  "01": ProfileIllustration,
  "02": OpportunitiesIllustration,
  "03": BlueprintIllustration,
  "04": LaunchIllustration,
};

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
  const Illustration = illustrations[step.number];

  return (
    <>
      {index > 0 && (
        <DimensionLine
          animate
          className="my-4 hidden md:flex"
        />
      )}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className={`flex flex-col gap-4 md:gap-12 ${
          isReversed ? "md:flex-row-reverse" : "md:flex-row"
        } items-center`}
      >
        {/* Text */}
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground">
              {index + 1}
            </span>
            <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground">
              {step.label}
            </span>
          </div>
          <h3 className="mt-4 font-display text-2xl text-foreground md:text-3xl">
            {step.tagline}
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            {step.body}
          </p>
        </div>

        {/* Illustration */}
        <div className="flex-1 max-w-[280px] mx-auto md:max-w-none">
          {Illustration && <Illustration className="w-full h-auto" />}
        </div>
      </motion.div>
    </>
  );
}

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-16 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 md:mb-16 text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Assess &middot; Prioritize &middot; Blueprint &middot; Deploy
          </span>
          <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground">
            How an engagement runs, from first assessment to agents in production
          </p>
        </div>

        <div className="flex flex-col gap-10 md:gap-12">
          {steps.map((step, index) => (
            <StepRow key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
