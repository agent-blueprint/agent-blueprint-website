"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnnotationLabelProps {
  label: string;
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function AnnotationLabel({
  label,
  className = "",
  position = "top-left",
}: AnnotationLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const positionClasses = {
    "top-left": "-top-6 left-0",
    "top-right": "-top-6 right-0",
    "bottom-left": "-bottom-6 left-0",
    "bottom-right": "-bottom-6 right-0",
  };

  return (
    <motion.div
      ref={ref}
      className={`absolute ${positionClasses[position]} ${className}`}
      initial={{ opacity: 0, y: 4 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-blueprint-annotation">
        [{label}]
      </span>
    </motion.div>
  );
}
