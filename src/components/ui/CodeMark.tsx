import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "../../lib/motion";

/**
 * The `</>` signature from the CV, rebuilt as a graphic element (not text next to a name).
 * The brackets draw in; the slash settles a beat later. Used in the hero and footer.
 */
export function CodeMark({
  size = 64,
  className,
  animate = true,
}: {
  size?: number;
  className?: string;
  animate?: boolean;
}) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 + i * 0.12 },
        opacity: { duration: 0.2, delay: 0.2 + i * 0.12 },
      },
    }),
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      initial={animate ? "hidden" : false}
      animate={animate ? "visible" : false}
    >
      {/* < */}
      <motion.path d="M16 14 L6 24 L16 34" variants={draw} custom={0} />
      {/* / */}
      <motion.path d="M28 12 L20 36" variants={draw} custom={2} />
      {/* > */}
      <motion.path d="M32 14 L42 24 L32 34" variants={draw} custom={1} />
    </motion.svg>
  );
}
