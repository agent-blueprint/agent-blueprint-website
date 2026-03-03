"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.25, 0.4, 0.25, 1] as const;

const phases = [
  {
    number: "01",
    title: "Discover",
    description: "Capture your Digital DNA and uncover AI opportunities",
    accentColor: "text-primary",
    borderHover: "hover:border-primary/30",
    dotColor: "bg-primary",
  },
  {
    number: "02",
    title: "Blueprint",
    description: "Fully architected AI solutions with proven ROI",
    accentColor: "text-accent-mauve",
    borderHover: "hover:border-accent-mauve/30",
    dotColor: "bg-accent-mauve",
  },
  {
    number: "03",
    title: "Launch",
    description: "Ship AI agents and prove the value",
    accentColor: "text-accent",
    borderHover: "hover:border-accent/30",
    dotColor: "bg-accent",
  },
];

export function PhaseFramework() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.number}
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 1.1 + index * 0.12,
              ease,
            }}
            className="relative"
          >
            <div
              className={`relative bg-white/60 backdrop-blur-sm p-5 h-full border border-border/60 rounded-lg transition-all duration-200 ${phase.borderHover} hover:shadow-sm`}
            >
              {/* Phase number + dot */}
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-1.5 h-1.5 rounded-full ${phase.dotColor}`} />
                <span className="font-body text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Phase {phase.number}
                </span>
              </div>

              {/* Title */}
              <h3 className={`font-body text-lg font-semibold ${phase.accentColor}`}>
                {phase.title}
              </h3>

              {/* Description */}
              <p className="mt-1 font-body text-sm text-muted-foreground leading-relaxed">
                {phase.description}
              </p>
            </div>

            {/* Arrow connector — desktop only */}
            {index < phases.length - 1 && (
              <div
                className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10"
                aria-hidden="true"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-border"
                >
                  <path
                    d="M2 6H10M10 6L7 3M10 6L7 9"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
