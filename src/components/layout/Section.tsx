import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { inView, riseIn, stagger } from "../../lib/motion";

/**
 * Section wrapper with a consistent eyebrow + generous vertical rhythm (brief §3).
 * `tone="dark"` switches to the navy palette for the Experience moment.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  tone = "light",
  backdrop,
  children,
  className = "",
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  /** Full-bleed layer rendered behind the content (e.g. the cloud field). */
  backdrop?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 py-24 md:py-32 ${backdrop ? "overflow-hidden" : ""} ${
        dark ? "bg-navy text-cream" : "text-ink"
      } ${className}`}
    >
      {backdrop}
      <div className="container-content relative z-10">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mb-12 md:mb-16"
        >
          <motion.div variants={riseIn} className="mb-4 flex items-center gap-3">
            <span
              className={`font-mono text-xs ${dark ? "text-accent" : "text-accent"}`}
            >
              {index}
            </span>
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span
              className={`font-mono text-xs uppercase tracking-[0.18em] ${
                dark ? "text-cream/60" : "text-muted"
              }`}
            >
              {eyebrow}
            </span>
          </motion.div>

          <motion.h2
            variants={riseIn}
            className={`max-w-3xl text-4xl font-semibold md:text-5xl ${
              dark ? "text-cream" : "text-ink"
            }`}
          >
            {title}
          </motion.h2>

          {intro && (
            <motion.div
              variants={riseIn}
              className={`mt-5 max-w-2xl text-balance ${
                dark ? "text-cream/70" : "text-muted"
              }`}
            >
              {intro}
            </motion.div>
          )}
        </motion.div>

        {children}
      </div>
    </section>
  );
}
