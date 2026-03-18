"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.4, 0.25, 1] as const;

export function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="explainer" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="text-center"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            See It In Action
          </span>
          <h2 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
            How Agent Blueprint Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground">
            Watch how we take you from business profile to production-ready AI
            agents in days, not months.
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
        </motion.div>
      </div>
    </section>
  );
}
