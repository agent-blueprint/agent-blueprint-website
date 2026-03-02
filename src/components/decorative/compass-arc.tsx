"use client";

import { motion } from "framer-motion";
import { useLineDraw } from "@/hooks/use-line-draw";

interface CompassArcProps {
  className?: string;
  variant?: "light" | "dark";
}

export function CompassArc({ className = "", variant = "light" }: CompassArcProps) {
  const { ref, isInView, pathLength } = useLineDraw();
  const opacity = variant === "dark" ? 0.45 : 0.30;
  const colorClass = variant === "dark" ? "text-dark-surface-foreground" : "text-primary";

  return (
    <svg
      ref={ref}
      className={`${colorClass} ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {/* Compass center point */}
      <motion.circle
        cx="100"
        cy="140"
        r="2"
        fill="currentColor"
        opacity={opacity + 0.1}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3 }}
      />

      {/* Compass leg 1 (to center) */}
      <motion.line
        x1="100"
        y1="140"
        x2="100"
        y2="60"
        stroke="currentColor"
        strokeWidth="1"
        opacity={opacity}
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength}
        animate={isInView ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
      />

      {/* Compass leg 2 (angled) */}
      <motion.line
        x1="100"
        y1="140"
        x2="155"
        y2="95"
        stroke="currentColor"
        strokeWidth="1"
        opacity={opacity}
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength}
        animate={isInView ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      />

      {/* Main arc */}
      <motion.path
        d="M 60 60 A 80 80 0 0 1 155 95"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity={opacity}
        strokeDasharray={200}
        strokeDashoffset={200}
        animate={isInView ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 1.5, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      />

      {/* Tick marks along arc */}
      {[0, 15, 30, 45, 60, 75, 90].map((deg, i) => {
        const rad = ((deg - 45) * Math.PI) / 180;
        const cx = 100 + 80 * Math.cos(rad);
        const cy = 140 - 80 * Math.sin(rad);
        const tickLen = deg % 45 === 0 ? 6 : 3;
        const dx = tickLen * Math.cos(rad);
        const dy = -tickLen * Math.sin(rad);
        return (
          <motion.line
            key={deg}
            x1={cx}
            y1={cy}
            x2={cx + dx}
            y2={cy + dy}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity={opacity * 0.8}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: opacity * 0.8 } : {}}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
          />
        );
      })}
    </svg>
  );
}
