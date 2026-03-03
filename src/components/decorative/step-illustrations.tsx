"use client";

import { motion } from "framer-motion";

/* ─── Animation helpers ─── */
const draw = (delay: number, duration = 0.8) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration, ease: "easeInOut" as const },
      opacity: { delay, duration: 0.01 },
    },
  },
});

const fade = (delay: number, duration = 0.4) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay, duration } },
});

/* ─── Colors — muted, construction-line feel ─── */
const blue = "oklch(60% 0.04 250)";
const blueBright = "oklch(55% 0.06 250)";
const mauve = "oklch(60% 0.04 300)";
const mauveBright = "oklch(55% 0.06 310)";
const coral = "oklch(60% 0.04 32)";
const coralBright = "oklch(55% 0.06 25)";
const guide = "oklch(50% 0.02 250 / 0.10)";
const note = "oklch(45% 0.03 250 / 0.40)";

interface Props {
  className?: string;
}

/* ════════════════════════════════════════
   1. DISCOVER — Understand your DNA
   Double helix with base-pair rungs
   ════════════════════════════════════════ */
export function ProfileIllustration({ className }: Props) {
  // Two sine-wave backbone strands (opposite phase)
  const strand1 =
    "M 60,155 C 87,80 123,80 150,155 C 177,230 213,230 240,155 C 267,80 303,80 330,155 C 357,230 393,230 420,155";
  const strand2 =
    "M 60,155 C 87,230 123,230 150,155 C 177,80 213,80 240,155 C 267,230 303,230 330,155 C 357,80 393,80 420,155";

  // Base-pair rungs connecting the strands
  const rungs = [
    { x: 85, y1: 108, y2: 202 },
    { x: 105, y1: 100, y2: 210 },
    { x: 125, y1: 108, y2: 202 },
    { x: 175, y1: 202, y2: 108 },
    { x: 195, y1: 210, y2: 100 },
    { x: 215, y1: 202, y2: 108 },
    { x: 265, y1: 108, y2: 202 },
    { x: 285, y1: 100, y2: 210 },
    { x: 305, y1: 108, y2: 202 },
    { x: 355, y1: 202, y2: 108 },
    { x: 375, y1: 210, y2: 100 },
    { x: 395, y1: 202, y2: 108 },
  ];

  return (
    <motion.svg
      viewBox="0 0 480 310"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Faint center guide */}
      <motion.line x1="40" y1="155" x2="440" y2="155"
        stroke={guide} strokeWidth={0.5} strokeDasharray="4 6"
        variants={fade(0)} />

      {/* Base-pair rungs (draw in first, behind strands) */}
      {rungs.map((rung, i) => (
        <motion.line
          key={`rung-${i}`}
          x1={rung.x} y1={rung.y1} x2={rung.x} y2={rung.y2}
          stroke={blue} strokeWidth={0.8} opacity={0.2}
          variants={draw(0.15 + i * 0.04, 0.3)}
        />
      ))}

      {/* Backbone strand 1 */}
      <motion.path d={strand1}
        stroke={blueBright} strokeWidth={1.5} opacity={0.5}
        variants={draw(0.3, 1.6)} />

      {/* Backbone strand 2 */}
      <motion.path d={strand2}
        stroke={blueBright} strokeWidth={1.5} opacity={0.5}
        variants={draw(0.5, 1.6)} />

      {/* Nucleotide nodes at max-separation rungs */}
      {rungs.filter((_, i) => i % 3 === 1).map((rung, i) => (
        <g key={`nodes-${i}`}>
          <motion.circle cx={rung.x} cy={rung.y1} r={2.5}
            fill={blueBright} opacity={0.45}
            variants={fade(1.4 + i * 0.08)} />
          <motion.circle cx={rung.x} cy={rung.y2} r={2.5}
            fill={blueBright} opacity={0.45}
            variants={fade(1.45 + i * 0.08)} />
        </g>
      ))}

      {/* Dimension line below */}
      <motion.line x1="60" y1="268" x2="420" y2="268"
        stroke={note} strokeWidth={0.5} variants={draw(1.5, 0.5)} />
      <motion.line x1="60" y1="263" x2="60" y2="273"
        stroke={note} strokeWidth={0.5} variants={fade(1.5)} />
      <motion.line x1="420" y1="263" x2="420" y2="273"
        stroke={note} strokeWidth={0.5} variants={fade(1.5)} />

      {/* Annotation */}
      <motion.text x="60" y="290" fontSize="8" fill={note}
        fontFamily="var(--font-mono)" letterSpacing="0.1em"
        variants={fade(1.7)}>
        ORG PROFILE
      </motion.text>
      <motion.line x1="60" y1="294" x2="130" y2="294"
        stroke={note} strokeWidth={0.5} variants={draw(1.7, 0.3)} />
    </motion.svg>
  );
}

/* ════════════════════════════════════════
   2. DISCOVER — Find your AI opportunities
   Network graph with highlighted priority nodes
   ════════════════════════════════════════ */
export function OpportunitiesIllustration({ className }: Props) {
  // Regular (background) nodes
  const bgNodes = [
    [130, 95], [175, 195], [370, 80], [150, 245],
    [325, 245], [100, 165], [395, 205], [260, 260],
  ];

  // Highlighted nodes (top opportunities)
  const hiNodes = [
    { x: 210, y: 130, label: "01" },
    { x: 295, y: 100, label: "02" },
    { x: 355, y: 160, label: "03" },
  ];

  return (
    <motion.svg
      viewBox="0 0 480 310"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Faint guide crosshair */}
      <motion.line x1="60" y1="155" x2="420" y2="155"
        stroke={guide} strokeWidth={0.5} variants={fade(0)} />
      <motion.line x1="240" y1="30" x2="240" y2="280"
        stroke={guide} strokeWidth={0.5} variants={fade(0)} />

      {/* Large sweep arc (search/scan) */}
      <motion.path d="M 90,50 A 220,220 0 0 1 410,170"
        stroke={blue} strokeWidth={0.75} opacity={0.15} strokeDasharray="4 6"
        variants={draw(0.1, 1.2)} />

      {/* Network connection lines (faint) */}
      <motion.line x1="130" y1="95" x2="210" y2="130" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.3, 0.5)} />
      <motion.line x1="210" y1="130" x2="295" y2="100" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.35, 0.5)} />
      <motion.line x1="295" y1="100" x2="355" y2="160" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.4, 0.5)} />
      <motion.line x1="210" y1="130" x2="175" y2="195" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.38, 0.5)} />
      <motion.line x1="175" y1="195" x2="295" y2="100" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.42, 0.5)} />
      <motion.line x1="355" y1="160" x2="395" y2="205" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.44, 0.5)} />
      <motion.line x1="295" y1="100" x2="370" y2="80" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.46, 0.5)} />
      <motion.line x1="175" y1="195" x2="150" y2="245" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.48, 0.5)} />
      <motion.line x1="355" y1="160" x2="325" y2="245" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.50, 0.5)} />
      <motion.line x1="130" y1="95" x2="100" y2="165" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.36, 0.5)} />
      <motion.line x1="210" y1="130" x2="260" y2="260" stroke={blue} strokeWidth={0.5} opacity={0.15} variants={draw(0.52, 0.5)} />

      {/* Background nodes (small, faint) */}
      {bgNodes.map(([x, y], i) => (
        <motion.circle
          key={`bg-${i}`}
          cx={x} cy={y} r={2.5}
          fill={blue} opacity={0.25}
          variants={fade(0.5 + i * 0.04)}
        />
      ))}

      {/* Highlighted nodes (bigger, with rings) */}
      {hiNodes.map((node, i) => (
        <g key={`hi-${i}`}>
          <motion.circle cx={node.x} cy={node.y} r={9}
            stroke={blueBright} strokeWidth={1} opacity={0.3}
            variants={draw(0.9 + i * 0.05, 0.4)} />
          <motion.circle cx={node.x} cy={node.y} r={4}
            fill={blueBright} opacity={0.8}
            variants={fade(0.75 + i * 0.05)} />
          <motion.text
            x={node.x + 13} y={node.y - 5}
            fontSize="8" fill={blueBright} opacity={0.7}
            fontFamily="var(--font-mono)" fontWeight="600"
            variants={fade(1.1 + i * 0.05)}>
            {node.label}
          </motion.text>
        </g>
      ))}

      {/* Annotation */}
      <motion.text x="62" y="286" fontSize="8" fill={note}
        fontFamily="var(--font-mono)" letterSpacing="0.1em"
        variants={fade(1.3)}>
        OPPORTUNITIES
      </motion.text>
      <motion.line x1="62" y1="290" x2="155" y2="290"
        stroke={note} strokeWidth={0.5} variants={draw(1.3, 0.3)} />
    </motion.svg>
  );
}

/* ════════════════════════════════════════
   3. BLUEPRINT — Complete build plan
   Schematic diagram with component boxes,
   connections, dimension lines, and ROI trend
   ════════════════════════════════════════ */
export function BlueprintIllustration({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 480 310"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Faint construction guides */}
      <motion.line x1="60" y1="120" x2="420" y2="120"
        stroke={guide} strokeWidth={0.5} strokeDasharray="4 6"
        variants={fade(0)} />
      <motion.line x1="240" y1="30" x2="240" y2="280"
        stroke={guide} strokeWidth={0.5} strokeDasharray="4 6"
        variants={fade(0)} />

      {/* Component box: DATA */}
      <motion.rect x="60" y="70" width="95" height="48" rx="2"
        stroke={mauve} strokeWidth={1.2} opacity={0.5}
        variants={draw(0.2, 0.6)} />
      <motion.text x="82" y="99" fontSize="9" fill={mauve}
        fontFamily="var(--font-mono)" opacity={0.7}
        variants={fade(0.6)}>
        DATA
      </motion.text>

      {/* Component box: AGENT (larger, center) */}
      <motion.rect x="200" y="55" width="130" height="65" rx="2"
        stroke={mauveBright} strokeWidth={1.5} opacity={0.7}
        variants={draw(0.3, 0.7)} />
      <motion.text x="236" y="93" fontSize="11" fill={mauveBright}
        fontFamily="var(--font-mono)" fontWeight="600" opacity={0.8}
        variants={fade(0.7)}>
        AGENT
      </motion.text>
      {/* Sub-label inside agent box */}
      <motion.line x1="215" y1="102" x2="315" y2="102"
        stroke={mauve} strokeWidth={0.5} opacity={0.2}
        variants={fade(0.8)} />
      <motion.text x="218" y="113" fontSize="7" fill={mauve}
        fontFamily="var(--font-mono)" opacity={0.4}
        variants={fade(0.85)}>
        skills · tools · memory
      </motion.text>

      {/* Component box: OUTPUT */}
      <motion.rect x="375" y="70" width="80" height="48" rx="2"
        stroke={mauve} strokeWidth={1.2} opacity={0.5}
        variants={draw(0.4, 0.6)} />
      <motion.text x="389" y="99" fontSize="9" fill={mauve}
        fontFamily="var(--font-mono)" opacity={0.7}
        variants={fade(0.8)}>
        OUTPUT
      </motion.text>

      {/* Connection: DATA → AGENT */}
      <motion.line x1="155" y1="94" x2="200" y2="88"
        stroke={mauve} strokeWidth={1} opacity={0.5}
        variants={draw(0.5, 0.4)} />
      <motion.path d="M 197,88.5 L 200,88 L 198,91"
        stroke={mauve} strokeWidth={1} opacity={0.5}
        variants={draw(0.55, 0.2)} />

      {/* Connection: AGENT → OUTPUT */}
      <motion.line x1="330" y1="88" x2="375" y2="94"
        stroke={mauve} strokeWidth={1} opacity={0.5}
        variants={draw(0.6, 0.4)} />
      <motion.path d="M 372,93 L 375,94 L 372,96"
        stroke={mauve} strokeWidth={1} opacity={0.5}
        variants={draw(0.65, 0.2)} />

      {/* Dimension annotation line across top */}
      <motion.line x1="60" y1="145" x2="455" y2="145"
        stroke={note} strokeWidth={0.5} variants={draw(0.7, 0.6)} />
      <motion.line x1="60" y1="140" x2="60" y2="150"
        stroke={note} strokeWidth={0.5} variants={fade(0.7)} />
      <motion.line x1="455" y1="140" x2="455" y2="150"
        stroke={note} strokeWidth={0.5} variants={fade(0.7)} />

      {/* ROI projection section */}
      <motion.text x="60" y="178" fontSize="8" fill={note}
        fontFamily="var(--font-mono)" letterSpacing="0.08em"
        variants={fade(0.9)}>
        PROJECTED ROI
      </motion.text>

      {/* ROI baseline */}
      <motion.line x1="60" y1="260" x2="310" y2="260"
        stroke={note} strokeWidth={0.5} variants={fade(0.95)} />
      <motion.line x1="60" y1="190" x2="60" y2="265"
        stroke={note} strokeWidth={0.5} variants={fade(0.95)} />

      {/* Target line */}
      <motion.line x1="60" y1="220" x2="310" y2="220"
        stroke={note} strokeWidth={0.5} strokeDasharray="3 4"
        variants={fade(1.0)} />
      <motion.text x="315" y="223" fontSize="6" fill={note}
        fontFamily="var(--font-mono)" variants={fade(1.1)}>
        TARGET
      </motion.text>

      {/* ROI trend line (rising curve) */}
      <motion.path
        d="M 60,258 Q 100,255 130,250 Q 170,240 200,225 Q 240,205 280,195 L 310,188"
        stroke={mauveBright} strokeWidth={1.5} opacity={0.6}
        variants={draw(1.0, 0.9)} />

      {/* Data points on ROI line */}
      <motion.circle cx="130" cy="250" r="2" fill={mauveBright} opacity={0.5} variants={fade(1.2)} />
      <motion.circle cx="200" cy="225" r="2" fill={mauveBright} opacity={0.5} variants={fade(1.25)} />
      <motion.circle cx="280" cy="195" r="2" fill={mauveBright} opacity={0.5} variants={fade(1.3)} />
      <motion.circle cx="310" cy="188" r="2.5" fill={mauveBright} opacity={0.7} variants={fade(1.35)} />

      <motion.text x="318" y="191" fontSize="8" fill={mauveBright}
        fontFamily="var(--font-mono)" fontWeight="600" opacity={0.6}
        variants={fade(1.4)}>
        ↑ 340%
      </motion.text>

      {/* Compass arcs (bottom-right corner) */}
      <motion.path d="M 390,210 A 35,35 0 0 1 425,245"
        stroke={mauve} strokeWidth={0.75} opacity={0.2}
        variants={draw(1.1, 0.5)} />
      <motion.path d="M 390,210 A 55,55 0 0 1 445,265"
        stroke={mauve} strokeWidth={0.5} opacity={0.12}
        variants={draw(1.15, 0.5)} />
    </motion.svg>
  );
}

/* ════════════════════════════════════════
   4. LAUNCH — Deploy and track
   Connected system: agent hub with signal
   flow to production endpoints + heartbeat
   ════════════════════════════════════════ */
export function LaunchIllustration({ className }: Props) {
  const hub = { x: 135, y: 140 };

  const endpoints = [
    { x: 345, y: 60, label: "SYS 01" },
    { x: 380, y: 140, label: "SYS 02" },
    { x: 345, y: 220, label: "SYS 03" },
  ];

  // Signal dots evenly spaced along each connection
  const dots = (x1: number, y1: number, x2: number, y2: number) =>
    [0.28, 0.5, 0.72].map((t) => ({
      x: x1 + (x2 - x1) * t,
      y: y1 + (y2 - y1) * t,
    }));

  return (
    <motion.svg
      viewBox="0 0 480 310"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Faint guide */}
      <motion.line x1="60" y1="140" x2="440" y2="140"
        stroke={guide} strokeWidth={0.5} strokeDasharray="4 6"
        variants={fade(0)} />

      {/* Connection lines: hub → endpoints */}
      {endpoints.map((ep, i) => (
        <motion.line key={`conn-${i}`}
          x1={hub.x} y1={hub.y} x2={ep.x} y2={ep.y}
          stroke={blue} strokeWidth={0.8} opacity={0.2}
          variants={draw(0.3 + i * 0.1, 0.6)} />
      ))}

      {/* Signal dots traveling along each connection */}
      {endpoints.map((ep, i) => {
        const d = dots(hub.x, hub.y, ep.x, ep.y);
        return d.map((pt, j) => (
          <motion.circle key={`sig-${i}-${j}`}
            cx={pt.x} cy={pt.y} r={1.8}
            fill={blueBright} opacity={0.3}
            variants={fade(0.8 + i * 0.1 + j * 0.06)}
          />
        ));
      })}

      {/* Hub: outer ring */}
      <motion.circle cx={hub.x} cy={hub.y} r={28}
        stroke={blueBright} strokeWidth={1.2} opacity={0.4}
        variants={draw(0.15, 0.7)} />
      {/* Hub: inner ring */}
      <motion.circle cx={hub.x} cy={hub.y} r={16}
        stroke={blue} strokeWidth={0.75} opacity={0.2}
        variants={draw(0.25, 0.5)} />
      {/* Hub: center dot */}
      <motion.circle cx={hub.x} cy={hub.y} r={4}
        fill={blueBright} opacity={0.5}
        variants={fade(0.4)} />
      {/* Hub label */}
      <motion.text x={hub.x} y={hub.y + 42} fontSize="9"
        fill={note} fontFamily="var(--font-mono)" fontWeight="600"
        textAnchor="middle"
        variants={fade(0.5)}>
        AGENT
      </motion.text>

      {/* Endpoint nodes */}
      {endpoints.map((ep, i) => (
        <g key={`ep-${i}`}>
          <motion.circle cx={ep.x} cy={ep.y} r={14}
            stroke={blue} strokeWidth={1} opacity={0.25}
            variants={draw(0.6 + i * 0.1, 0.4)} />
          <motion.circle cx={ep.x} cy={ep.y} r={3}
            fill={blue} opacity={0.35}
            variants={fade(0.7 + i * 0.1)} />
          <motion.text x={ep.x + 20} y={ep.y + 3} fontSize="7"
            fill={note} fontFamily="var(--font-mono)"
            variants={fade(1.0 + i * 0.08)}>
            {ep.label}
          </motion.text>
        </g>
      ))}

      {/* Pulse ring — faint outer glow around hub */}
      <motion.circle cx={hub.x} cy={hub.y} r={38}
        stroke={blue} strokeWidth={0.5} opacity={0.1}
        variants={draw(1.1, 0.5)} />

      {/* Heartbeat / monitoring line across bottom */}
      <motion.path
        d="M 70,275 L 145,275 L 155,275 L 160,262 L 166,288 L 172,268 L 178,275 L 260,275 L 270,275 L 275,262 L 281,288 L 287,268 L 293,275 L 380,275"
        stroke={blueBright} strokeWidth={0.8} opacity={0.25}
        variants={draw(1.2, 1.0)} />

      {/* LIVE indicator */}
      <motion.circle cx="60" cy="275" r={3}
        fill={blueBright} opacity={0.45}
        variants={fade(1.4)} />
      <motion.text x="48" y="265" fontSize="7" fill={blue}
        fontFamily="var(--font-mono)" opacity={0.45}
        variants={fade(1.45)}>
        LIVE
      </motion.text>

      {/* Annotation */}
      <motion.text x="345" y="275" fontSize="8" fill={note}
        fontFamily="var(--font-mono)" letterSpacing="0.1em"
        variants={fade(1.5)}>
        DEPLOYED
      </motion.text>
      <motion.line x1="345" y1="279" x2="412" y2="279"
        stroke={note} strokeWidth={0.5} variants={draw(1.5, 0.3)} />
    </motion.svg>
  );
}
