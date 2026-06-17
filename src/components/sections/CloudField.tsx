import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Atmospheric clouds for the navy "Expérience" section — a thematic nod to Cloud
 * Engineering. Recognizable soft cloud silhouettes drift across the sky and rise
 * with scroll (parallax), so descending feels like climbing into the cloud.
 * Decorative → aria-hidden; frozen (static, still visible) under reduced-motion.
 */

type Cloud = {
  /** Vertical band (% of section height). */
  top: string;
  /** Width in px. */
  size: number;
  opacity: number;
  blur: number;
  /** Drift duration (s) and negative delay to pre-distribute across the sky. */
  duration: number;
  delay: number;
  /** Parallax travel (px); larger = nearer/faster. */
  depth: number;
  /** Resting horizontal position used when motion is reduced (% of width). */
  restLeft: string;
};

const CLOUDS: Cloud[] = [
  { top: "5%", size: 360, opacity: 0.28, blur: 5, duration: 65, delay: -4, depth: 90, restLeft: "4%" },
  { top: "16%", size: 250, opacity: 0.34, blur: 3, duration: 52, delay: -30, depth: 150, restLeft: "68%" },
  { top: "30%", size: 440, opacity: 0.3, blur: 6, duration: 82, delay: -55, depth: 120, restLeft: "28%" },
  { top: "56%", size: 320, opacity: 0.36, blur: 4, duration: 60, delay: -12, depth: 200, restLeft: "76%" },
  { top: "74%", size: 400, opacity: 0.26, blur: 6, duration: 74, delay: -40, depth: 240, restLeft: "10%" },
];

/** A recognizable cloud silhouette (overlapping lobes + base, single fill). */
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

function CloudShape({
  cloud,
  progress,
  reduce,
}: {
  cloud: Cloud;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  // Parallax: lift the cloud as the section scrolls through the viewport.
  const y = useTransform(progress, [0, 1], [cloud.depth, -cloud.depth]);

  return (
    <motion.div
      className="absolute left-0 w-full text-[#cfe1ff]"
      style={{ top: cloud.top, y: reduce ? 0 : y }}
    >
      <div
        className="w-fit"
        style={{
          opacity: cloud.opacity,
          filter: `blur(${cloud.blur}px)`,
          ...(reduce
            ? { transform: `translateX(0)`, marginLeft: cloud.restLeft }
            : {
                animation: `cloud-cross ${cloud.duration}s linear ${cloud.delay}s infinite`,
              }),
        }}
      >
        <CloudSvg width={cloud.size} />
      </div>
    </motion.div>
  );
}

export function CloudField() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {CLOUDS.map((cloud, i) => (
        <CloudShape key={i} cloud={cloud} progress={scrollYProgress} reduce={reduce} />
      ))}
    </div>
  );
}
