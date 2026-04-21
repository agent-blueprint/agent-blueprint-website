"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GradientMesh } from "@/components/decorative/gradient-mesh";
import { HeroIllustration } from "@/components/decorative/hero-illustration";

const ease = [0.25, 0.4, 0.25, 1] as const;

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Soft gradient mesh background */}
      <GradientMesh />

      <div className="mx-auto max-w-5xl px-6 pt-20 pb-10 md:pt-40 md:pb-24 w-full relative z-10">
        <div className="text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-accent"
          >
            8 MCP Tools &middot; 45+ Coding Agents &middot; Any Platform
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.7,
              delay: 0.35,
              ease,
            }}
            className="mt-4 md:mt-6 font-display font-bold tracking-tight text-foreground"
            style={{
              fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            AI agent architecture
            <br />
            <span className="text-primary">from strategy to production</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease }}
            className="mx-auto mt-4 md:mt-6 max-w-xl font-body text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Generate multi-agent blueprints with 5-year ROI projections in
            minutes. Export as Agent Skills for Claude Code, Codex, Cursor,
            and 40+ other coding agents. Deploy to ServiceNow, Salesforce,
            or any enterprise platform.
          </motion.p>
        </div>

        {/* Architect construction illustration with graph paper */}
        <div className="relative mt-8 md:mt-16">
          {/* Graph paper background — fades out at edges */}
          <div
            className="absolute inset-0 -inset-x-8 -inset-y-4"
            style={{
              backgroundImage: `
                linear-gradient(oklch(40% 0.05 250 / 0.07) 1px, transparent 1px),
                linear-gradient(90deg, oklch(40% 0.05 250 / 0.07) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
              maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)",
            }}
          />
          <HeroIllustration className="relative z-10 mx-auto w-full" />
        </div>
      </div>
    </section>
  );
}
