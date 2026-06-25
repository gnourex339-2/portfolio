import { motion } from "framer-motion";
import { inView, riseIn, stagger } from "../../lib/motion";
import { now } from "../../data/site";

/**
 * "En ce moment" (addendum §3.3) — a slim, factual band: what I'm doing right now.
 * Deliberately NOT a numbered Section: it's an accent, not a pillar. Kept short and true.
 */
export function Now() {
  return (
    <section id="now" aria-label="En ce moment" className="scroll-mt-20 pb-8 md:pb-12">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="container-content"
      >
        <motion.div
          variants={riseIn}
          className="grid gap-x-10 gap-y-4 rounded-2xl border border-line bg-paper p-6 md:grid-cols-[auto_1fr] md:p-8"
        >
          <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent" />
            </span>
            En ce moment
          </span>

          <dl className="space-y-2.5">
            {now.map((item) => (
              <div key={item.label} className="flex flex-wrap items-baseline gap-x-3">
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  {item.label}
                </dt>
                <dd className="text-ink/85">{item.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}
