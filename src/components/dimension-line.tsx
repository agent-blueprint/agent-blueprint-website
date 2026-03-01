"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DimensionLineProps {
  className?: string;
  label?: string;
  animate?: boolean;
}

export function DimensionLine({
  className = "",
  label,
  animate = false,
}: DimensionLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (label) {
    return (
      <div
        ref={ref}
        className={`flex items-center gap-3 ${className}`}
        aria-hidden="true"
      >
        <div className="h-3 w-px bg-border" />
        <motion.div
          className="h-px flex-1 bg-border"
          initial={animate ? { scaleX: 0 } : undefined}
          animate={animate && isInView ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ transformOrigin: "left" }}
        />
        <span className="font-mono text-[10px] uppercase tracking-widest text-blueprint-annotation shrink-0">
          {label}
        </span>
        <motion.div
          className="h-px flex-1 bg-border"
          initial={animate ? { scaleX: 0 } : undefined}
          animate={animate && isInView ? { scaleX: 1 } : undefined}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
            delay: 0.1,
          }}
          style={{ transformOrigin: "right" }}
        />
        <div className="h-3 w-px bg-border" />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`flex items-center ${className}`}
      aria-hidden="true"
    >
      <div className="h-3 w-px bg-border" />
      <motion.div
        className="h-px flex-1 bg-border"
        initial={animate ? { scaleX: 0 } : undefined}
        animate={animate && isInView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
        style={{ transformOrigin: "left" }}
      />
      <div className="h-3 w-px bg-border" />
    </div>
  );
}
