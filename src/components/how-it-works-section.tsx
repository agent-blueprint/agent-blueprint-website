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
    label: "DISCOVER",
    tagline: "Capture business context in a structured profile.",
    body: "Industry, org size, tech stack, current processes, strategic goals. This grounds all pipeline output in your operational reality. Takes minutes, not the weeks a consulting engagement requires.",
  },
  {
    number: "02",
    label: "DISCOVER",
    tagline: "Surface 5-12 prioritized AI agent opportunities.",
    body: "LLM pipeline scores each opportunity by impact, feasibility, and strategic alignment. No guesswork. You see exactly which workflows benefit most from multi-agent automation and why.",
  },
  {
    number: "03",
    label: "BLUEPRINT",
    tagline: "Generate architecture with 5-year ROI projections.",
    body: "Each use case gets a full blueprint: agent team (3-15 agents), orchestration pattern, integration points, tool definitions, and a deterministic business case with implementation costs and payback period.",
  },
  {
    number: "04",
    label: "LAUNCH",
    tagline: "Export as Agent Skills. Deploy to any platform.",
    body: "Download blueprints as Agent Skills directories (SKILL.md + 8 reference files). Your coding agent (Claude Code, Codex, Cursor) reads the skill and handles vendor-specific implementation. Monitor live performance against ROI targets.",
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
            Discover &middot; Blueprint &middot; Launch
          </span>
          <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground">
            From understanding your business to deploying AI agents in production
          </p>

          <div className="mt-10 md:mt-14">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg border border-border/50 shadow-lg aspect-video">
              <iframe
                src="https://www.youtube-nocookie.com/embed/yo84pmPzXt0"
                title="Agent Blueprint Explainer Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
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
