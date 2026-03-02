"use client";

import { motion } from "framer-motion";
import { useLineDraw } from "@/hooks/use-line-draw";

interface CircuitDiagramProps {
  className?: string;
  variant?: "light" | "dark";
}

export function CircuitDiagram({
  className = "",
  variant = "light",
}: CircuitDiagramProps) {
  const { ref, isInView } = useLineDraw();
  const opacity = variant === "dark" ? 0.40 : 0.30;
  const colorClass = variant === "dark" ? "text-dark-surface-foreground" : "text-primary";

  const drawTransition = (delay: number) => ({
    duration: 0.8,
    delay,
    ease: [0.25, 0.4, 0.25, 1] as const,
  });

  // Node positions for the circuit
  const nodes = [
    { x: 30, y: 40 },
    { x: 100, y: 40 },
    { x: 170, y: 40 },
    { x: 30, y: 100 },
    { x: 100, y: 100 },
    { x: 170, y: 100 },
    { x: 65, y: 160 },
    { x: 135, y: 160 },
  ];

  // Right-angle connecting paths between nodes
  const paths = [
    "M 30 40 L 100 40",
    "M 100 40 L 170 40",
    "M 30 40 L 30 100",
    "M 170 40 L 170 100",
    "M 100 40 L 100 100",
    "M 30 100 L 100 100",
    "M 100 100 L 170 100",
    "M 30 100 L 30 160 L 65 160",
    "M 170 100 L 170 160 L 135 160",
    "M 65 160 L 100 160 L 100 100",
  ];

  return (
    <svg
      ref={ref}
      className={`${colorClass} ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {/* Connection paths */}
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="0.6"
          opacity={opacity}
          strokeDasharray={200}
          strokeDashoffset={200}
          animate={isInView ? { strokeDashoffset: 0 } : {}}
          transition={drawTransition(i * 0.1)}
        />
      ))}

      {/* Circuit nodes */}
      {nodes.map((node, i) => (
        <motion.g key={i}>
          <motion.rect
            x={node.x - 6}
            y={node.y - 6}
            width={12}
            height={12}
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
            opacity={opacity}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="1.5"
            fill="currentColor"
            opacity={opacity + 0.1}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.2, delay: 0.7 + i * 0.06 }}
          />
        </motion.g>
      ))}
    </svg>
  );
}
