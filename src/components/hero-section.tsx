"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BlueprintGrid } from "@/components/blueprint-grid";
import { CompassArc } from "@/components/decorative/compass-arc";
import { GeometricConstruction } from "@/components/decorative/geometric-construction";
import { CircuitDiagram } from "@/components/decorative/circuit-diagram";
import { siteConfig } from "@/lib/metadata";

const ease = [0.25, 0.4, 0.25, 1] as const;

export function HeroSection() {
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
              className="absolute top-1/2 -translate-y-1/2 right-0 w-48 lg:w-56"
            >
              <CompassArc className="w-full h-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease }}
              className="absolute bottom-8 left-0 w-36 lg:w-44"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease }}
              className="mt-4 font-display text-6xl leading-tight text-foreground md:text-8xl md:leading-tight"
            >
              <span className="italic text-primary">Agent Blueprint</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease }}
              className="mx-auto mt-6 max-w-2xl font-body text-lg text-muted-foreground md:text-xl"
            >
              Move from strategy to production ready AI solutions in just days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
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
              className="absolute top-1/2 -translate-y-1/2 left-0 w-48 lg:w-56"
            >
              <CircuitDiagram className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </div>
    </BlueprintGrid>
  );
}
