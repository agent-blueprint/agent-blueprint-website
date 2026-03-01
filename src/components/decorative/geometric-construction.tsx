"use client";

import { motion } from "framer-motion";
import { useLineDraw } from "@/hooks/use-line-draw";

interface GeometricConstructionProps {
  className?: string;
  variant?: "light" | "dark";
}

export function GeometricConstruction({
  className = "",
  variant = "light",
}: GeometricConstructionProps) {
  const { ref, isInView } = useLineDraw();
  const stroke = variant === "dark" ? "#e8dfd0" : "#1e3a5f";
  const opacity = variant === "dark" ? 0.35 : 0.30;

  const drawTransition = (delay: number) => ({
    duration: 1.2,
    delay,
    ease: [0.25, 0.4, 0.25, 1] as const,
  });

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {/* Circle 1 — large */}
      <motion.circle
        cx="90"
        cy="100"
        r="60"
        stroke={stroke}
        strokeWidth="0.6"
        opacity={opacity}
        strokeDasharray={377}
        strokeDashoffset={377}
        animate={isInView ? { strokeDashoffset: 0 } : {}}
        transition={drawTransition(0)}
      />

      {/* Circle 2 — overlapping */}
      <motion.circle
        cx="120"
        cy="90"
        r="45"
        stroke={stroke}
        strokeWidth="0.6"
        opacity={opacity}
        strokeDasharray={283}
        strokeDashoffset={283}
        animate={isInView ? { strokeDashoffset: 0 } : {}}
        transition={drawTransition(0.3)}
      />

      {/* Circle 3 — small */}
      <motion.circle
        cx="75"
        cy="80"
        r="25"
        stroke={stroke}
        strokeWidth="0.6"
        opacity={opacity}
        strokeDasharray={157}
        strokeDashoffset={157}
        animate={isInView ? { strokeDashoffset: 0 } : {}}
        transition={drawTransition(0.5)}
      />

      {/* Bisecting horizontal line */}
      <motion.line
        x1="20"
        y1="100"
        x2="180"
        y2="100"
        stroke={stroke}
        strokeWidth="0.4"
        opacity={opacity * 0.8}
        strokeDasharray={160}
        strokeDashoffset={160}
        animate={isInView ? { strokeDashoffset: 0 } : {}}
        transition={drawTransition(0.7)}
      />

      {/* Bisecting diagonal line */}
      <motion.line
        x1="40"
        y1="160"
        x2="160"
        y2="40"
        stroke={stroke}
        strokeWidth="0.4"
        opacity={opacity * 0.8}
        strokeDasharray={180}
        strokeDashoffset={180}
        animate={isInView ? { strokeDashoffset: 0 } : {}}
        transition={drawTransition(0.9)}
      />

      {/* Construction points at intersections */}
      {[
        [90, 40],
        [150, 100],
        [90, 160],
        [30, 100],
        [120, 45],
        [75, 55],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="1.5"
          fill={stroke}
          opacity={opacity + 0.1}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.2, delay: 1.1 + i * 0.05 }}
        />
      ))}
    </svg>
  );
}
