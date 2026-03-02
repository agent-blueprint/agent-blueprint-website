"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

interface SchematicPathProps {
  scrollProgress: MotionValue<number>;
  stepCount: number;
}

/**
 * SVG right-angle connecting path for How It Works steps.
 * Draws progressively as the user scrolls through the section.
 */
export function SchematicPath({ scrollProgress, stepCount }: SchematicPathProps) {
  const pathLength = useTransform(scrollProgress, [0, 1], [0, 1]);

  // Node positions — evenly spaced vertically
  const nodeSpacing = 100 / (stepCount + 1);
  const nodes = Array.from({ length: stepCount }, (_, i) => ({
    y: nodeSpacing * (i + 1),
  }));

  // Threshold for each node to fill — evenly divided across scroll range
  const nodeThresholds = nodes.map((_, i) => (i + 0.5) / stepCount);

  return (
    <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block w-8">
      <svg
        className="h-full w-full"
        viewBox="0 0 32 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      >
        {/* Background track line */}
        <line
          x1="16"
          y1="0"
          x2="16"
          y2="100"
          stroke="var(--primary)"
          strokeWidth="0.3"
          opacity="0.15"
        />

        {/* Animated progress line */}
        <motion.line
          x1="16"
          y1="0"
          x2="16"
          y2="100"
          stroke="var(--accent)"
          strokeWidth="0.5"
          opacity="0.6"
          pathLength={1}
          style={{ pathLength }}
        />

        {/* Right-angle connecting segments between nodes */}
        {nodes.map((node, i) => {
          if (i === 0) return null;
          const prevY = nodes[i - 1].y;
          const midY = (prevY + node.y) / 2;
          return (
            <motion.path
              key={`seg-${i}`}
              d={`M 16 ${prevY} L 22 ${prevY} L 22 ${midY} L 10 ${midY} L 10 ${node.y} L 16 ${node.y}`}
              stroke="var(--accent)"
              strokeWidth="0.3"
              opacity="0.25"
              fill="none"
              pathLength={1}
              style={{ pathLength }}
            />
          );
        })}

        {/* Arrowhead markers at start and end */}
        <polygon points="13,1 16,0 19,1" fill="var(--primary)" opacity="0.2" />
        <polygon points="13,99 16,100 19,99" fill="var(--primary)" opacity="0.2" />

        {/* Node circles */}
        {nodes.map((node, i) => (
          <NodeCircle
            key={`node-${i}`}
            cy={node.y}
            progress={scrollProgress}
            threshold={nodeThresholds[i]}
          />
        ))}
      </svg>
    </div>
  );
}

function NodeCircle({
  cy,
  progress,
  threshold,
}: {
  cy: number;
  progress: MotionValue<number>;
  threshold: number;
}) {
  const fillOpacity = useTransform(
    progress,
    [threshold - 0.05, threshold + 0.05],
    [0, 1]
  );
  const strokeOpacity = useTransform(
    progress,
    [threshold - 0.1, threshold],
    [0.2, 0.6]
  );

  return (
    <g>
      {/* Outer ring */}
      <motion.circle
        cx="16"
        cy={cy}
        r="2"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.4"
        style={{ opacity: strokeOpacity }}
      />
      {/* Fill dot */}
      <motion.circle
        cx="16"
        cy={cy}
        r="1.2"
        fill="var(--accent)"
        style={{ opacity: fillOpacity }}
      />
    </g>
  );
}
