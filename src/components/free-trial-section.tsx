"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section id="free-trial" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-blueprint-annotation">
            Get Started
          </span>
          <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
            Start Your Free Trial
          </h2>
          <p className="mt-4 font-body text-base text-muted-foreground">
            Experience Agent Blueprint&apos;s powerful AI strategy to deployment
            platform. Transform your AI ideas into actionable blueprints. Get
            instant access to custom AI agent specifications, ROI projections,
            and implementation roadmaps tailored to your business.
          </p>

          <div className="mt-10">
            <h3 className="font-display text-xl text-foreground">
              What&apos;s Included
            </h3>
            <ul className="mt-6 space-y-4">
              {trialFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center justify-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-body text-sm text-muted-foreground">
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
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold text-base px-8"
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
  );
}
