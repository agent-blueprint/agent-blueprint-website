"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BlueprintGrid } from "@/components/blueprint-grid";
import { CompassArc } from "@/components/decorative/compass-arc";
import { GeometricConstruction } from "@/components/decorative/geometric-construction";
import { CircuitDiagram } from "@/components/decorative/circuit-diagram";
import { CircledNumber } from "@/components/decorative/redline-annotation";
import { siteConfig } from "@/lib/metadata";

const ease = [0.25, 0.4, 0.25, 1] as const;

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <BlueprintGrid className="min-h-screen flex items-center overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-32 md:pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(auto,720px)_1fr] items-center gap-8">
          {/* Left decorative column */}
          <div className="hidden md:block relative h-full" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.1, ease }}
              className="absolute top-1/2 -translate-y-1/2 -right-12 w-80 lg:w-96"
            >
              <CompassArc className="w-full h-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease }}
              className="absolute bottom-0 -left-8 w-64 lg:w-72"
            >
              <GeometricConstruction className="w-full h-auto" />
            </motion.div>
          </div>

          {/* Center content */}
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="font-mono text-sm font-medium uppercase tracking-widest text-blueprint-annotation"
            >
              Stop analyzing. Start deploying.
            </motion.p>

            <motion.h1
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { clipPath: "inset(0 0% 0 0)", opacity: 1 }
              }
              transition={{ duration: prefersReducedMotion ? 0.01 : 1, delay: 0.45, ease }}
              className="mt-4 font-display italic text-primary"
              style={{
                fontSize: "clamp(3rem, 6vw + 1rem, 7rem)",
                lineHeight: 1.05,
              }}
            >
              Agent Blueprint
            </motion.h1>

            {/* Title block annotation — desktop only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2, ease }}
              className="mt-3 hidden md:flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-blueprint-annotation/50"
              aria-hidden="true"
            >
              <span>Agent Blueprint</span>
              <span className="text-blueprint-annotation/30">|</span>
              <span>DWG. No. AB-001</span>
              <span className="text-blueprint-annotation/30">|</span>
              <span>Rev 2.0</span>
              <span className="text-blueprint-annotation/30">|</span>
              <span>NTS</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease }}
              className="mx-auto mt-6 max-w-2xl font-body text-base text-muted-foreground md:text-lg"
              style={{ letterSpacing: "0.2em" }}
            >
              Move from strategy to production ready AI solutions in just days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row relative"
            >
              <CircledNumber number={1} className="absolute -left-10 -top-2" rotate={-3} />
              <Button
                asChild
                size="lg"
                className="btn-metallic rounded-none text-accent-foreground font-body font-semibold text-base px-8 "
              >
                <a
                  href={siteConfig.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-body font-medium text-base px-8 border-primary text-primary hover:bg-primary/5"
                onClick={() => {
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Right decorative column */}
          <div className="hidden md:block relative h-full" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6, ease }}
              className="absolute top-1/2 -translate-y-1/2 -left-12 w-80 lg:w-96"
            >
              <CircuitDiagram className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </div>
    </BlueprintGrid>
  );
}
