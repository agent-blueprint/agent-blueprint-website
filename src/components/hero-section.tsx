"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BlueprintGrid } from "@/components/blueprint-grid";
import { siteConfig } from "@/lib/metadata";

const ease = [0.25, 0.4, 0.25, 1] as const;

export function HeroSection() {
  return (
    <BlueprintGrid className="min-h-screen flex items-center">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-32 md:pb-24 w-full">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="font-mono text-sm font-medium uppercase tracking-widest text-blueprint-annotation"
          >
            Stop analyzing. Start deploying.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="mt-4 font-display text-5xl leading-tight text-foreground md:text-7xl md:leading-tight"
          >
            <span className="italic text-primary">Agent Blueprint</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="mx-auto mt-6 max-w-2xl font-body text-lg text-muted-foreground md:text-xl"
          >
            Move from strategy to production ready AI solutions in just days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-base px-8"
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
      </div>
    </BlueprintGrid>
  );
}
