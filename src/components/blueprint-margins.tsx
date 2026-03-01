"use client";

import { useEffect, useState } from "react";

const ZONE_LETTERS = ["A", "B", "C", "D", "E", "F"];

/** Registration cross SVG */
function RegCross({ y }: { y: number }) {
  return (
    <svg
      className="absolute left-0 w-3 h-3"
      style={{ top: y }}
      viewBox="0 0 12 12"
      fill="none"
    >
      <line x1="6" y1="0" x2="6" y2="12" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.3" />
      <line x1="0" y1="6" x2="12" y2="6" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function BlueprintMargins() {
  const [sectionTops, setSectionTops] = useState<number[]>([]);

  useEffect(() => {
    function measure() {
      const sections = document.querySelectorAll("section[id]");
      const tops: number[] = [];
      sections.forEach((el) => {
        tops.push((el as HTMLElement).offsetTop);
      });
      setSectionTops(tops);
    }

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  // Generate registration crosses at regular intervals
  const docHeight = typeof document !== "undefined" ? document.body.scrollHeight : 4000;
  const crossInterval = 320;
  const crossCount = Math.floor(docHeight / crossInterval);

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none hidden md:block"
      aria-hidden="true"
    >
      {/* Left margin — zone letters at section boundaries */}
      <div className="absolute left-3 top-0 bottom-0 w-6">
        {sectionTops.map((top, i) => {
          if (i >= ZONE_LETTERS.length) return null;
          return (
            <span
              key={i}
              className="absolute left-0 font-mono text-[10px] text-[#1e3a5f]/25 tracking-wider"
              style={{ top: top + 20 }}
            >
              {ZONE_LETTERS[i]}
            </span>
          );
        })}

        {/* Registration crosses along left edge */}
        {Array.from({ length: crossCount }, (_, i) => (
          <RegCross key={`l-${i}`} y={i * crossInterval + 160} />
        ))}
      </div>

      {/* Right margin — registration crosses */}
      <div className="absolute right-3 top-0 bottom-0 w-3">
        {Array.from({ length: crossCount }, (_, i) => (
          <RegCross key={`r-${i}`} y={i * crossInterval + 160} />
        ))}
      </div>

      {/* Fold marks at 1/3 and 2/3 viewport height */}
      <div
        className="absolute left-0 w-4 border-t border-dashed border-[#1e3a5f]/15"
        style={{ top: "33.333vh" }}
      />
      <div
        className="absolute right-0 w-4 border-t border-dashed border-[#1e3a5f]/15"
        style={{ top: "33.333vh" }}
      />
      <div
        className="absolute left-0 w-4 border-t border-dashed border-[#1e3a5f]/15"
        style={{ top: "66.666vh" }}
      />
      <div
        className="absolute right-0 w-4 border-t border-dashed border-[#1e3a5f]/15"
        style={{ top: "66.666vh" }}
      />

      {/* Scale indicator bottom-left */}
      <div className="fixed bottom-4 left-3 font-mono text-[9px] tracking-widest text-[#1e3a5f]/20 uppercase">
        Scale 1:1
      </div>
    </div>
  );
}
