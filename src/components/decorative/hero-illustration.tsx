"use client";

import { motion, useReducedMotion } from "framer-motion";

interface HeroIllustrationProps {
  className?: string;
}

/**
 * Geometric construction illustration: an architect's compass sits over
 * Blueprint while construction lines, arcs, dimension annotations, and
 * ruler ticks connect Discover → Blueprint → Launch.
 */
export function HeroIllustration({ className = "" }: HeroIllustrationProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0.01 : 1; // base draw duration
  const t0 = prefersReducedMotion ? 0 : 0.6; // base delay

  const lineColor = "oklch(40% 0.06 250)";
  const blueArc = "oklch(50% 0.10 250)";
  const mauveArc = "oklch(55% 0.12 300)";
  const coralArc = "oklch(62% 0.14 32)";
  const faint = "oklch(40% 0.05 250)";

  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 760 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* ==== FAINT CONSTRUCTION GRID (appears first) ==== */}
        {/* Horizontal guide — primary */}
        <motion.line
          x1="40" y1="130" x2="720" y2="130"
          stroke={faint} strokeWidth="0.5"
          strokeDasharray="5 10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ delay: t0 + 0.3, duration: d * 0.8 }}
        />
        {/* Second horizontal guide — lower */}
        <motion.line
          x1="60" y1="160" x2="700" y2="160"
          stroke={faint} strokeWidth="0.3"
          strokeDasharray="3 12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ delay: t0 + 0.5, duration: d * 0.6 }}
        />
        {/* Vertical construction line at Discover */}
        <motion.line
          x1="130" y1="40" x2="130" y2="210"
          stroke={faint} strokeWidth="0.4"
          strokeDasharray="4 9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.10 }}
          transition={{ delay: t0 + 0.6, duration: d * 0.5 }}
        />
        {/* Vertical construction line at Blueprint */}
        <motion.line
          x1="380" y1="25" x2="380" y2="220"
          stroke={faint} strokeWidth="0.4"
          strokeDasharray="4 9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.10 }}
          transition={{ delay: t0 + 0.8, duration: d * 0.5 }}
        />
        {/* Vertical construction line at angle turn 1 */}
        <motion.line
          x1="310" y1="50" x2="310" y2="160"
          stroke={faint} strokeWidth="0.3"
          strokeDasharray="3 10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ delay: t0 + 1.3, duration: d * 0.4 }}
        />
        {/* Vertical construction line at Launch */}
        <motion.line
          x1="630" y1="40" x2="630" y2="210"
          stroke={faint} strokeWidth="0.4"
          strokeDasharray="4 9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.10 }}
          transition={{ delay: t0 + 2.2, duration: d * 0.5 }}
        />
        {/* Diagonal construction line at first turn */}
        <motion.line
          x1="280" y1="155" x2="400" y2="45"
          stroke={faint} strokeWidth="0.3"
          strokeDasharray="3 10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          transition={{ delay: t0 + 1.5, duration: d * 0.4 }}
        />
        {/* Diagonal construction line at second turn */}
        <motion.line
          x1="440" y1="45" x2="550" y2="145"
          stroke={faint} strokeWidth="0.3"
          strokeDasharray="3 10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          transition={{ delay: t0 + 2.4, duration: d * 0.4 }}
        />

        {/* ==== ARC 1 — DISCOVER (blue) ==== */}
        <motion.path
          d="M 160 100 A 42 42 0 0 1 100 155"
          stroke={blueArc} strokeWidth="1.8" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: d * 0.8, delay: t0 + 0.7 }}
        />
        {/* Re-traced arc — lighter */}
        <motion.path
          d="M 162 102 A 44 44 0 0 1 101 158"
          stroke={blueArc} strokeWidth="0.7" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: d * 0.6, delay: t0 + 1.0 }}
        />
        {/* Compass pivot mark at Discover */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: t0 + 0.7 }}>
          <line x1="127" y1="128" x2="133" y2="128" stroke={blueArc} strokeWidth="0.6" />
          <line x1="130" y1="125" x2="130" y2="131" stroke={blueArc} strokeWidth="0.6" />
        </motion.g>

        {/* Discover label */}
        <motion.text
          x="130" y="198" textAnchor="middle" className="font-body"
          fill={blueArc} fontSize="17" fontWeight="600" letterSpacing="0.05em"
          initial={{ opacity: 0 }} animate={{ opacity: 0.75 }}
          transition={{ delay: t0 + 1.4 }}
        >
          Discover
        </motion.text>

        {/* ==== STRAIGHT LINE: Discover → turn → Blueprint ==== */}
        {/* Horizontal ruled line from Discover */}
        <motion.line
          x1="160" y1="130" x2="310" y2="130"
          stroke={lineColor} strokeWidth="1.2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: d * 0.7, delay: t0 + 1.3 }}
        />
        {/* Tick marks along horizontal line */}
        {[190, 220, 250, 280].map((x, i) => (
          <motion.line
            key={`tick-a-${i}`}
            x1={x} y1="127" x2={x} y2="133"
            stroke={faint} strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: t0 + 1.4 + i * 0.05 }}
          />
        ))}

        {/* Angled line — turns upward toward Blueprint */}
        <motion.line
          x1="310" y1="130" x2="368" y2="72"
          stroke={lineColor} strokeWidth="1.2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: d * 0.5, delay: t0 + 1.8 }}
        />
        {/* Right-angle marker at first turn */}
        <motion.path
          d="M 310 120 L 320 120 L 320 130"
          stroke={faint} strokeWidth="0.8" fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: t0 + 2.0 }}
        />
        {/* Small angle arc at the turn */}
        <motion.path
          d="M 310 121 A 9 9 0 0 1 319 130"
          stroke={faint} strokeWidth="0.5" fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: t0 + 2.05 }}
        />

        {/* ==== COMPASS (centered over Blueprint) ==== */}
        <motion.g
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: t0 + 0.2 }}
        >
          {/* Hinge point */}
          <circle cx="380" cy="28" r="3" fill={lineColor} opacity="0.45" />
          <circle cx="380" cy="28" r="5.5" stroke={lineColor} strokeWidth="0.8" opacity="0.25" />
          {/* Tiny hinge screw detail */}
          <circle cx="380" cy="28" r="1" fill={lineColor} opacity="0.25" />

          {/* Left leg — anchor */}
          <motion.line
            x1="380" y1="33" x2="360" y2="110"
            stroke={lineColor} strokeWidth="1.8" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{ duration: d * 0.5, delay: t0 + 0.3 }}
          />
          {/* Anchor point (small filled dot) */}
          <motion.circle
            cx="360" cy="112" r="1.8"
            fill={lineColor} opacity="0.35"
            initial={{ opacity: 0 }} animate={{ opacity: 0.35 }}
            transition={{ delay: t0 + 0.55 }}
          />

          {/* Right leg — pencil */}
          <motion.line
            x1="380" y1="33" x2="400" y2="108"
            stroke={lineColor} strokeWidth="1.8" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{ duration: d * 0.5, delay: t0 + 0.35 }}
          />
          {/* Pencil tip — tapered triangle */}
          <motion.path
            d="M 397 102 L 400 114 L 403 102"
            stroke={lineColor} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: t0 + 0.55 }}
          />
          {/* Pencil tip fill — subtle */}
          <motion.path
            d="M 398 104 L 400 112 L 402 104 Z"
            fill={lineColor}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ delay: t0 + 0.55 }}
          />

          {/* Adjustment arc between legs */}
          <motion.path
            d="M 372 58 C 374 52, 386 52, 388 58"
            stroke={lineColor} strokeWidth="0.8" strokeLinecap="round" fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: t0 + 0.6 }}
          />
          {/* Second adjustment arc — detail */}
          <motion.path
            d="M 374 62 C 376 57, 384 57, 386 62"
            stroke={lineColor} strokeWidth="0.4" strokeLinecap="round" fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: t0 + 0.65 }}
          />

          {/* Knurled grip marks on right leg */}
          {[68, 72, 76, 80].map((offset, i) => (
            <motion.line
              key={`grip-${i}`}
              x1={386 + (offset - 68) * 0.26} y1={offset - 1}
              x2={389 + (offset - 68) * 0.26} y2={offset + 1}
              stroke={lineColor} strokeWidth="0.4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: t0 + 0.6 + i * 0.03 }}
            />
          ))}
        </motion.g>

        {/* ==== BLUEPRINT — full circle with angled line through it ==== */}
        {/* Full circle drawn by compass */}
        <motion.circle
          cx="380" cy="85" r="38"
          stroke={mauveArc} strokeWidth="1.8" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.45 }}
          transition={{ duration: d * 1.2, delay: t0 + 2.1 }}
        />
        {/* Re-traced circle — lighter, slightly offset */}
        <motion.circle
          cx="380" cy="85" r="40"
          stroke={mauveArc} strokeWidth="0.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.15 }}
          transition={{ duration: d * 0.9, delay: t0 + 2.6 }}
        />
        {/* Angled line through the circle — like a diameter/section line */}
        <motion.line
          x1="352" y1="112" x2="408" y2="58"
          stroke={mauveArc} strokeWidth="1.2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: d * 0.6, delay: t0 + 2.8 }}
        />
        {/* Pivot crosshair at Blueprint center */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: t0 + 2.1 }}>
          <line x1="375" y1="85" x2="385" y2="85" stroke={mauveArc} strokeWidth="0.6" />
          <line x1="380" y1="80" x2="380" y2="90" stroke={mauveArc} strokeWidth="0.6" />
        </motion.g>

        {/* Blueprint label */}
        <motion.text
          x="380" y="152" textAnchor="middle" className="font-body"
          fill={mauveArc} fontSize="17" fontWeight="600" letterSpacing="0.05em"
          initial={{ opacity: 0 }} animate={{ opacity: 0.75 }}
          transition={{ delay: t0 + 2.8 }}
        >
          Blueprint
        </motion.text>

        {/* ==== STRAIGHT LINE: Blueprint → turn → Launch ==== */}
        {/* Angled line out from Blueprint */}
        <motion.line
          x1="420" y1="72" x2="500" y2="120"
          stroke={lineColor} strokeWidth="1.2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: d * 0.5, delay: t0 + 2.7 }}
        />
        {/* Horizontal to Launch */}
        <motion.line
          x1="500" y1="120" x2="630" y2="120"
          stroke={lineColor} strokeWidth="1.2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: d * 0.6, delay: t0 + 3.0 }}
        />
        {/* Tick marks along horizontal to Launch */}
        {[530, 560, 590].map((x, i) => (
          <motion.line
            key={`tick-b-${i}`}
            x1={x} y1="117" x2={x} y2="123"
            stroke={faint} strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: t0 + 3.1 + i * 0.05 }}
          />
        ))}
        {/* Right-angle marker at second turn */}
        <motion.path
          d="M 500 110 L 510 110 L 510 120"
          stroke={faint} strokeWidth="0.8" fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: t0 + 3.2 }}
        />
        {/* Small angle arc at second turn */}
        <motion.path
          d="M 500 111 A 9 9 0 0 1 509 120"
          stroke={faint} strokeWidth="0.5" fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: t0 + 3.25 }}
        />

        {/* ==== LAUNCH — concentric ripple arcs (radiating outward) ==== */}
        {/* Inner ripple */}
        <motion.path
          d="M 645 105 A 18 18 0 0 1 645 135"
          stroke={coralArc} strokeWidth="1.8" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: d * 0.5, delay: t0 + 3.4 }}
        />
        {/* Middle ripple */}
        <motion.path
          d="M 655 95 A 30 30 0 0 1 655 145"
          stroke={coralArc} strokeWidth="1.3" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: d * 0.6, delay: t0 + 3.7 }}
        />
        {/* Outer ripple */}
        <motion.path
          d="M 665 87 A 40 40 0 0 1 665 153"
          stroke={coralArc} strokeWidth="0.8" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.22 }}
          transition={{ duration: d * 0.7, delay: t0 + 4.0 }}
        />
        {/* Center dot at Launch */}
        <motion.circle
          cx="630" cy="120" r="2.5"
          fill={coralArc}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ delay: t0 + 3.3, duration: 0.3 }}
        />
        {/* Crosshair at Launch */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: t0 + 3.3 }}>
          <line x1="625" y1="120" x2="635" y2="120" stroke={coralArc} strokeWidth="0.6" />
          <line x1="630" y1="115" x2="630" y2="125" stroke={coralArc} strokeWidth="0.6" />
        </motion.g>

        {/* Launch label */}
        <motion.text
          x="630" y="188" textAnchor="middle" className="font-body"
          fill={coralArc} fontSize="17" fontWeight="600" letterSpacing="0.05em"
          initial={{ opacity: 0 }} animate={{ opacity: 0.75 }}
          transition={{ delay: t0 + 4.0 }}
        >
          Launch
        </motion.text>

        {/* ==== DIMENSION ANNOTATIONS ==== */}
        {/* Dimension line: Discover to Blueprint */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: t0 + 3.5, duration: d * 0.5 }}
        >
          {/* Line */}
          <line x1="130" y1="215" x2="380" y2="215" stroke={faint} strokeWidth="0.6" />
          {/* Left arrow */}
          <path d="M 130 215 L 136 212 L 136 218 Z" fill={faint} />
          {/* Right arrow */}
          <path d="M 380 215 L 374 212 L 374 218 Z" fill={faint} />
          {/* End ticks */}
          <line x1="130" y1="208" x2="130" y2="222" stroke={faint} strokeWidth="0.5" />
          <line x1="380" y1="208" x2="380" y2="222" stroke={faint} strokeWidth="0.5" />
        </motion.g>

        {/* Dimension line: Blueprint to Launch */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: t0 + 3.8, duration: d * 0.5 }}
        >
          {/* Line */}
          <line x1="380" y1="215" x2="630" y2="215" stroke={faint} strokeWidth="0.6" />
          {/* Left arrow */}
          <path d="M 380 215 L 386 212 L 386 218 Z" fill={faint} />
          {/* Right arrow */}
          <path d="M 630 215 L 624 212 L 624 218 Z" fill={faint} />
          {/* End tick */}
          <line x1="630" y1="208" x2="630" y2="222" stroke={faint} strokeWidth="0.5" />
        </motion.g>

        {/* ==== SMALL DRAFTING DETAILS ==== */}
        {/* Small center mark at Discover node */}
        <motion.circle
          cx="130" cy="130" r="3"
          stroke={blueArc} strokeWidth="0.6" fill="none"
          initial={{ opacity: 0 }} animate={{ opacity: 0.2 }}
          transition={{ delay: t0 + 1.2 }}
        />
        {/* Small center mark at Blueprint node */}
        <motion.circle
          cx="380" cy="85" r="3"
          stroke={mauveArc} strokeWidth="0.6" fill="none"
          initial={{ opacity: 0 }} animate={{ opacity: 0.2 }}
          transition={{ delay: t0 + 2.3 }}
        />
        {/* Small center mark at Launch node */}
        <motion.circle
          cx="630" cy="120" r="3"
          stroke={coralArc} strokeWidth="0.6" fill="none"
          initial={{ opacity: 0 }} animate={{ opacity: 0.2 }}
          transition={{ delay: t0 + 3.6 }}
        />

        {/* Corner registration marks — top-left and bottom-right */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ delay: t0 + 0.2, duration: d * 0.4 }}
        >
          <line x1="55" y1="35" x2="55" y2="50" stroke={faint} strokeWidth="0.5" />
          <line x1="55" y1="35" x2="70" y2="35" stroke={faint} strokeWidth="0.5" />
          <line x1="690" y1="225" x2="705" y2="225" stroke={faint} strokeWidth="0.5" />
          <line x1="705" y1="210" x2="705" y2="225" stroke={faint} strokeWidth="0.5" />
        </motion.g>
      </svg>
    </div>
  );
}
