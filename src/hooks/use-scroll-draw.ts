"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

interface UseScrollDrawOptions {
  offset?: [string, string];
}

export function useScrollDraw(
  options: UseScrollDrawOptions = {}
): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  strokeDashoffset: MotionValue<number>;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const { offset = ["start 80%", "end 20%"] } = options;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as ["start 80%", "end 20%"],
  });

  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [1000, 0]
  );

  return { containerRef, progress: scrollYProgress, strokeDashoffset };
}
