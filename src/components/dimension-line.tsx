"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DimensionLineProps {
  className?: string;
  label?: string;
  animate?: boolean;
  accent?: boolean;
}

export function DimensionLine({
  className = "",
  label,
  animate = false,
  accent = false,
}: DimensionLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const tickClass = accent
    ? "h-5 w-0.5 bg-accent/60"
    : "h-5 w-0.5 bg-border";
  const lineClass = accent
    ? "h-0.5 flex-1 bg-accent/40"
    : "h-0.5 flex-1 bg-border";
  const labelClass = accent
    ? "font-mono text-[10px] uppercase tracking-widest text-accent/70 shrink-0"
    : "font-mono text-[10px] uppercase tracking-widest text-blueprint-annotation shrink-0";

  if (label) {
    return (
      <div
        ref={ref}
        className={`flex items-center gap-3 ${className}`}
        aria-hidden="true"
      >
        <div className={tickClass} />
        <motion.div
          className={lineClass}
          initial={animate ? { scaleX: 0 } : undefined}
          animate={animate && isInView ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ transformOrigin: "left" }}
        />
        <span className={labelClass}>
          {label}
        </span>
        <motion.div
          className={lineClass}
          initial={animate ? { scaleX: 0 } : undefined}
          animate={animate && isInView ? { scaleX: 1 } : undefined}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
            delay: 0.1,
          }}
          style={{ transformOrigin: "right" }}
        />
        <div className={tickClass} />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`flex items-center ${className}`}
      aria-hidden="true"
    >
      <div className={tickClass} />
      <motion.div
        className={lineClass}
        initial={animate ? { scaleX: 0 } : undefined}
        animate={animate && isInView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
        style={{ transformOrigin: "left" }}
      />
      <div className={tickClass} />
    </div>
  );
}
