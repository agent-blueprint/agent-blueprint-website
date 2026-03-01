"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MINOR_TICK_INTERVAL = 100; // px between minor ticks
const RULER_WIDTH = 16;

export function ScrollRuler() {
  const { scrollYProgress } = useScroll();
  const [docHeight, setDocHeight] = useState(4000);
  const [sectionPositions, setSectionPositions] = useState<number[]>([]);

  // Fade in after hero (5-15%), fade out near footer (85-95%)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.15, 0.85, 0.95, 1],
    [0, 0, 1, 1, 0, 0]
  );

  // Copper indicator position tracks scroll
  const indicatorTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    function measure() {
      setDocHeight(document.body.scrollHeight);
      const sections = document.querySelectorAll("section[id]");
      const positions: number[] = [];
      sections.forEach((el) => {
        const ratio = (el as HTMLElement).offsetTop / document.body.scrollHeight;
        positions.push(ratio);
      });
      setSectionPositions(positions);
    }

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  const minorTickCount = Math.floor(docHeight / MINOR_TICK_INTERVAL);

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 z-40 pointer-events-none hidden md:block"
      style={{ width: RULER_WIDTH, opacity }}
      aria-hidden="true"
    >
      {/* Ruler background line */}
      <div className="absolute left-[14px] top-0 bottom-0 w-px bg-[#1e3a5f]/10" />

      {/* Minor ticks */}
      {Array.from({ length: minorTickCount }, (_, i) => {
        const pct = ((i * MINOR_TICK_INTERVAL) / docHeight) * 100;
        return (
          <div
            key={`minor-${i}`}
            className="absolute right-0 h-px bg-[#1e3a5f]/15"
            style={{ top: `${pct}%`, width: 6 }}
          />
        );
      })}

      {/* Major ticks at section boundaries */}
      {sectionPositions.map((ratio, i) => (
        <div
          key={`major-${i}`}
          className="absolute right-0 h-px bg-[#1e3a5f]/30"
          style={{ top: `${ratio * 100}%`, width: 12 }}
        />
      ))}

      {/* Copper scroll indicator */}
      <motion.div
        className="absolute left-1 w-2.5 h-2.5 rounded-full"
        style={{
          top: indicatorTop,
          backgroundColor: "var(--accent)",
          boxShadow: "0 0 6px var(--accent-glow)",
          marginTop: -5,
        }}
      />
    </motion.div>
  );
}
