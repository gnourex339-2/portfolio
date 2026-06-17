import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language for the whole site.
 * One easing, disciplined durations — so movement feels composed, not random.
 * Reference easing: out-expo soft [0.22, 1, 0.36, 1].
 */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_SOFT = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  micro: 0.25, // hovers, taps (200–400ms band)
  base: 0.45,
  section: 0.75, // section entrances (600–900ms band)
} as const;

/** Section-entry container: orchestrates children with a measured stagger. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** A single line/word that rises into place. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.section, ease: EASE_OUT_EXPO },
  },
};

/** Subtle fade for supporting elements. */
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT_SOFT },
  },
};

/** Default viewport config for scroll-reveals — fire once, a bit before fully in view. */
export const inView = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -10% 0px",
} as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.9,
};
