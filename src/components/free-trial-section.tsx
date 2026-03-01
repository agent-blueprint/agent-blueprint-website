"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { BlueprintGrid } from "@/components/blueprint-grid";
import { CircuitDiagram } from "@/components/decorative/circuit-diagram";
import { siteConfig } from "@/lib/metadata";

const trialFeatures = [
  "Full access to AI agent blueprint generation",
  "Custom ROI projections for your business",
  "Technical specifications and implementation roadmaps",
];

export function FreeTrialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <BlueprintGrid variant="dark">
      <section id="free-trial" className="relative py-24 md:py-32">
        {/* Watermark SVG */}
        <div className="absolute left-8 bottom-16 w-56 lg:w-72 opacity-60 pointer-events-none hidden md:block" aria-hidden="true">
          <CircuitDiagram variant="dark" className="w-full h-auto" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-dark-surface-foreground/50">
              Get Started
            </span>
            <h2 className="mt-4 font-display text-4xl text-dark-surface-foreground md:text-5xl">
              Start Your Free Trial
            </h2>
            <p className="mt-4 font-body text-base text-dark-surface-foreground/70">
              Experience Agent Blueprint&apos;s powerful AI strategy to
              deployment platform. Transform your AI ideas into actionable
              blueprints. Get instant access to custom AI agent specifications,
              ROI projections, and implementation roadmaps tailored to your
              business.
            </p>

            <div className="mt-10">
              <h3 className="font-display text-xl text-dark-surface-foreground">
                What&apos;s Included
              </h3>
              <ul className="mt-6 space-y-4">
                {trialFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center justify-center gap-3"
                  >
                    {/* Blueprint-style tick mark */}
                    <svg
                      className="h-4 w-4 shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8L7 12L13 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-accent"
                      />
                    </svg>
                    <span className="font-body text-sm text-dark-surface-foreground/70">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_20px_var(--accent-glow)] font-body font-semibold text-base px-8 transition-all duration-300"
              >
                <a
                  href={siteConfig.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Free Trial
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </BlueprintGrid>
  );
}
