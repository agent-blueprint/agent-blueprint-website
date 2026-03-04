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
            Stop Guessing. Start Shipping.
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
            Deploy AI agents with
            <br />
            <span className="text-primary">total confidence</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease }}
            className="mx-auto mt-4 md:mt-6 max-w-lg font-body text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Agent Blueprint finds your best AI opportunities, architects
            exactly what to build, and proves the ROI so you move fast and
            build the right thing.
          </motion.p>
        </div>

        {/* Mobile-only step flow text — replaces the illustration SVG on small screens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
          className="mt-6 flex items-center justify-center gap-2 text-muted-foreground sm:hidden"
        >
          <span className="font-mono text-xs tracking-wider text-primary/70">Discover</span>
          <span className="text-border">&middot;</span>
          <span className="font-mono text-xs tracking-wider text-accent-mauve/70">Blueprint</span>
          <span className="text-border">&middot;</span>
          <span className="font-mono text-xs tracking-wider text-accent/70">Launch</span>
        </motion.div>

        {/* Architect construction illustration with graph paper */}
        <div className="relative mt-6 md:mt-16 hidden sm:block">
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
