"use client";

interface CircledNumberProps {
  number: number;
  className?: string;
  rotate?: number;
}

/** Hand-drawn copper circle with number inside */
export function CircledNumber({
  number,
  className = "",
  rotate = -3,
}: CircledNumberProps) {
  return (
    <div
      className={`hidden md:inline-flex items-center justify-center pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        {/* Slightly imperfect circle for hand-drawn feel */}
        <path
          d="M16 3C9 3 3 8.5 3.5 16C4 23.5 9.5 29 16.5 28.5C23.5 28 29 22.5 28.5 15.5C28 8.5 23 3 16 3Z"
          stroke="var(--accent)"
          strokeWidth="1.2"
          opacity="0.7"
          fill="none"
        />
        <text
          x="16"
          y="17"
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--accent)"
          opacity="0.7"
          fontSize="12"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontWeight="600"
        >
          {number}
        </text>
      </svg>
    </div>
  );
}

interface PointerAnnotationProps {
  label: string;
  className?: string;
  rotate?: number;
  direction?: "left" | "right";
}

/** "SEE FIG. XX" text with a leader line */
export function PointerAnnotation({
  label,
  className = "",
  rotate = 2,
  direction = "left",
}: PointerAnnotationProps) {
  return (
    <div
      className={`hidden md:flex items-center gap-1 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {direction === "right" && (
        <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
          <line x1="0" y1="4" x2="20" y2="4" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />
          <polygon points="20,2 24,4 20,6" fill="var(--accent)" opacity="0.7" />
        </svg>
      )}
      <span
        className="font-mono text-[10px] uppercase tracking-wider whitespace-nowrap"
        style={{ color: "var(--accent)", opacity: 0.7 }}
      >
        {label}
      </span>
      {direction === "left" && (
        <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
          <line x1="4" y1="4" x2="24" y2="4" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />
          <polygon points="4,2 0,4 4,6" fill="var(--accent)" opacity="0.7" />
        </svg>
      )}
    </div>
  );
}

interface WavyUnderlineProps {
  className?: string;
  width?: number;
}

/** SVG wavy line — placed below text */
export function WavyUnderline({ className = "", width = 200 }: WavyUnderlineProps) {
  // Generate a wavy path across the width
  const segments = Math.ceil(width / 20);
  let d = "M 0 4";
  for (let i = 0; i < segments; i++) {
    const x1 = i * 20 + 10;
    const y1 = i % 2 === 0 ? 1 : 7;
    const x2 = (i + 1) * 20;
    const y2 = 4;
    d += ` Q ${x1} ${y1}, ${x2} ${y2}`;
  }

  return (
    <svg
      className={`hidden md:block pointer-events-none ${className}`}
      aria-hidden="true"
      width={width}
      height="8"
      viewBox={`0 0 ${width} 8`}
      fill="none"
    >
      <path
        d={d}
        stroke="var(--accent)"
        strokeWidth="1"
        opacity="0.6"
        fill="none"
      />
    </svg>
  );
}

interface NoteAnnotationProps {
  className?: string;
  rotate?: number;
}

/** "NOTE:" label with a bracket line */
export function NoteAnnotation({ className = "", rotate = -2 }: NoteAnnotationProps) {
  return (
    <div
      className={`hidden md:flex items-start gap-1.5 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span
        className="font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
        style={{ color: "var(--accent)", opacity: 0.7 }}
      >
        Note:
      </span>
      <svg width="4" height="24" viewBox="0 0 4 24" fill="none">
        <path d="M 2 0 L 2 24" stroke="var(--accent)" strokeWidth="0.8" opacity="0.5" />
        <path d="M 0 0 L 4 0" stroke="var(--accent)" strokeWidth="0.8" opacity="0.5" />
        <path d="M 0 24 L 4 24" stroke="var(--accent)" strokeWidth="0.8" opacity="0.5" />
      </svg>
    </div>
  );
}
