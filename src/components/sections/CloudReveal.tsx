import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Signature moment — the cloud reveal overlay. A bank of hand-engraved clouds is
 * pinned over the start of the Experience section and disperses organically as you
 * scroll (each cloud drifts off on its own vector/pace), uncovering the section's
 * real content beneath it, while an engraved swallow flaps across.
 *
 * This component only renders the clouds + bird; the section content lives in
 * normal flow underneath (so it stays put and doesn't scroll off into a void).
 * Returns null under prefers-reduced-motion.
 */

// Base path for public assets (matches Vite base: "/portfolio/" on Pages, "/" in dev).
const BASE = import.meta.env.BASE_URL;

type RevealCloud = {
  src: string;
  top: string;
  left: string;
  w: number;
  flip?: boolean;
  ex: number;
  ey: number;
  move: [number, number];
  fade: [number, number];
  scaleTo: number;
};

const CLOUDS: RevealCloud[] = [
  { src: `${BASE}cloud2.webp`, top: "-12%", left: "-10%", w: 520, ex: -760, ey: -320, move: [0, 0.55], fade: [0.42, 0.6], scaleTo: 1.2 },
  { src: `${BASE}cloud1.webp`, top: "0%", left: "30%", w: 420, flip: true, ex: 120, ey: -780, move: [0.02, 0.62], fade: [0.46, 0.66], scaleTo: 1.18 },
  { src: `${BASE}cloud2.webp`, top: "-6%", left: "60%", w: 540, ex: 800, ey: -300, move: [0, 0.5], fade: [0.38, 0.56], scaleTo: 1.24 },
  { src: `${BASE}cloud1.webp`, top: "30%", left: "-12%", w: 460, ex: -860, ey: 70, move: [0.04, 0.6], fade: [0.46, 0.66], scaleTo: 1.18 },
  { src: `${BASE}cloud2.webp`, top: "26%", left: "38%", w: 560, flip: true, ex: 160, ey: -220, move: [0.06, 0.72], fade: [0.54, 0.74], scaleTo: 1.12 },
  { src: `${BASE}cloud1.webp`, top: "34%", left: "70%", w: 440, ex: 860, ey: 130, move: [0, 0.52], fade: [0.4, 0.58], scaleTo: 1.22 },
];

function FloatingCloud({ c, p }: { c: RevealCloud; p: MotionValue<number> }) {
  const x = useTransform(p, c.move, [0, c.ex]);
  const y = useTransform(p, c.move, [0, c.ey]);
  const scale = useTransform(p, c.move, [1, c.scaleTo]);
  const opacity = useTransform(p, [c.fade[0], c.fade[1]], [1, 0]);
  return (
    <motion.div
      className="absolute will-change-transform"
      style={{ top: c.top, left: c.left, x, y, scale, opacity }}
    >
      <img
        src={c.src}
        alt=""
        aria-hidden="true"
        draggable={false}
        loading="lazy"
        decoding="async"
        className="max-w-none select-none"
        style={{ width: c.w, height: "auto", transform: c.flip ? "scaleX(-1)" : undefined }}
      />
    </motion.div>
  );
}

function Bird() {
  return (
    <div className="relative h-20 w-20">
      <img
        src={`${BASE}bird1.webp`}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute inset-0 h-full w-full animate-[bird-frame-a_0.42s_linear_infinite] object-contain"
      />
      <img
        src={`${BASE}bird2.webp`}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute inset-0 h-full w-full animate-[bird-frame-b_0.42s_linear_infinite] object-contain"
      />
    </div>
  );
}

/** Height of the reveal scroll-zone; the section content is pulled up under it. */
export const REVEAL_VH = 160;

export function CloudReveal() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Progress runs 0→1 over the pinned range (while the sticky child is stuck).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const birdX = useTransform(scrollYProgress, [0.1, 0.84], ["-12%", "114%"]);
  const birdY = useTransform(scrollYProgress, [0.1, 0.45, 0.84], [300, 150, 250]);

  if (reduce) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none relative z-20"
      style={{ height: `${REVEAL_VH}vh` }}
      aria-hidden="true"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {CLOUDS.map((c, i) => (
          <FloatingCloud key={i} c={c} p={scrollYProgress} />
        ))}
        <motion.div
          style={{ x: birdX, y: birdY }}
          className="absolute inset-x-0 top-0"
          aria-hidden="true"
        >
          <Bird />
        </motion.div>
      </div>
    </div>
  );
}
