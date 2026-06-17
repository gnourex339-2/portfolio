import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Signature scroll moment — "l'ascension". Between About and Experience the page
 * flies up through a layer of clouds: clouds rush toward the camera and part, the
 * sky shifts from cream (ground) → blue → navy (above the clouds), landing in the
 * Cloud section. A pinned scene driven entirely by scroll progress.
 * Reduced-motion users get a short static gradient divider instead.
 */

function CloudSvg({ width }: { width: number }) {
  return (
    <svg
      width={width}
      height={width * 0.54}
      viewBox="0 0 240 130"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="72" cy="74" r="34" />
      <circle cx="112" cy="54" r="44" />
      <circle cx="156" cy="68" r="33" />
      <circle cx="190" cy="82" r="26" />
      <rect x="54" y="78" width="150" height="42" rx="21" />
    </svg>
  );
}

type FlyCloud = {
  left: string;
  top: string;
  w: number;
  /** Scale at progress 0 → 1 (nearer clouds grow more = rush past). */
  s0: number;
  s1: number;
  /** Vertical travel (px) as we ascend (clouds slide off as the camera rises). */
  yTo: number;
  /** Opacity keyframe stops [hold-until, gone-at]. */
  fade: [number, number];
  color: string;
  blur: number;
};

const CLOUDS: FlyCloud[] = [
  { left: "38%", top: "66%", w: 500, s0: 1.0, s1: 4.2, yTo: 620, fade: [0.42, 0.66], color: "#ffffff", blur: 1 },
  { left: "58%", top: "58%", w: 600, s0: 0.9, s1: 3.6, yTo: 540, fade: [0.46, 0.7], color: "#eaf2fb", blur: 3 },
  { left: "-6%", top: "54%", w: 520, s0: 0.85, s1: 3.2, yTo: 460, fade: [0.5, 0.72], color: "#ffffff", blur: 2 },
  { left: "80%", top: "46%", w: 380, s0: 0.7, s1: 2.7, yTo: 380, fade: [0.52, 0.75], color: "#ffffff", blur: 2 },
  { left: "20%", top: "30%", w: 420, s0: 0.6, s1: 2.3, yTo: 300, fade: [0.56, 0.78], color: "#dbe7f5", blur: 2 },
  { left: "68%", top: "20%", w: 340, s0: 0.5, s1: 1.9, yTo: 240, fade: [0.6, 0.82], color: "#cfe1ff", blur: 3 },
  { left: "6%", top: "12%", w: 300, s0: 0.45, s1: 1.6, yTo: 180, fade: [0.64, 0.85], color: "#cfe1ff", blur: 3 },
];

function Cloud({ c, p }: { c: FlyCloud; p: MotionValue<number> }) {
  const scale = useTransform(p, [0, 1], [c.s0, c.s1]);
  const y = useTransform(p, [0, 1], [0, c.yTo]);
  const opacity = useTransform(p, [0, c.fade[0], c.fade[1]], [0.96, 0.96, 0]);
  return (
    <motion.div
      className="absolute will-change-transform"
      style={{ left: c.left, top: c.top, scale, y, opacity, color: c.color, filter: `blur(${c.blur}px)` }}
    >
      <CloudSvg width={c.w} />
    </motion.div>
  );
}

export function Ascension() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const bg = useTransform(
    scrollYProgress,
    [0, 0.4, 0.72, 1],
    ["#FAF8F5", "#aacdef", "#3f6fa5", "#0F1B2D"],
  );
  const sunOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [0.0, 0.7, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.62, 0.82, 0.98], [0, 1, 0.85]);
  const labelY = useTransform(scrollYProgress, [0.62, 0.82], [24, 0]);

  if (reduce) {
    return (
      <div
        aria-hidden="true"
        className="h-32 w-full bg-gradient-to-b from-cream to-navy"
      />
    );
  }

  return (
    <section id="ascension" ref={ref} aria-hidden="true" className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Sky gradient that warms then deepens to navy */}
        <motion.div className="absolute inset-0" style={{ backgroundColor: bg }} />

        {/* Soft sun/light glow that blooms mid-ascent */}
        <motion.div
          className="absolute left-1/2 top-[34%] h-[520px] w-[520px] -translate-x-1/2 rounded-full"
          style={{
            opacity: sunOpacity,
            background:
              "radial-gradient(circle, rgba(255,251,235,0.95) 0%, rgba(255,240,200,0.4) 40%, transparent 70%)",
          }}
        />

        {/* The cloud layer we fly through */}
        {CLOUDS.map((c, i) => (
          <Cloud key={i} c={c} p={scrollYProgress} />
        ))}

        {/* Caption that surfaces once we're above the clouds */}
        <motion.div
          style={{ opacity: labelOpacity, y: labelY }}
          className="absolute inset-x-0 bottom-28 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-[0.32em] text-cream/80">
            Dans le cloud
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-cream/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
