"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GradientMeshProps {
  className?: string;
}

/**
 * Soft organic gradient shapes using the logo's blue-coral-mauve palette.
 * Decorative background element — blurred, subtle, and warm.
 */
export function GradientMesh({ className = "" }: GradientMeshProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Large blue orb — upper left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{
          duration: prefersReducedMotion ? 0.01 : 2,
          delay: 0.3,
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(65% 0.12 250 / 40%) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Coral orb — center right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{
          duration: prefersReducedMotion ? 0.01 : 2.5,
          delay: 0.6,
        }}
        className="absolute top-[10%] -right-[5%] w-[45%] h-[55%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(70% 0.14 32 / 35%) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Mauve orb — lower center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{
          duration: prefersReducedMotion ? 0.01 : 3,
          delay: 0.9,
        }}
        className="absolute bottom-[0%] left-[20%] w-[50%] h-[45%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(60% 0.12 300 / 30%) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
    </div>
  );
}
