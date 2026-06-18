import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { CloudReveal, REVEAL_VH } from "./CloudReveal";
import { inView, riseIn, stagger } from "../../lib/motion";
import { experience } from "../../data/experience";

export function Experience() {
  const reduce = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 overflow-hidden bg-navy text-cream"
    >
      {/* Clouds disperse over this section's start to reveal the header beneath */}
      {!reduce && <CloudReveal />}

      <div
        className="container-content relative z-10 pb-24 md:pb-32"
        style={
          reduce
            ? { paddingTop: "6rem" }
            : { marginTop: `-${REVEAL_VH}vh`, paddingTop: "64vh" }
        }
      >
        {/* Section header — persistent content the clouds reveal */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="font-mono text-xs text-accent">02</span>
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-cream/60">
              Expérience
            </span>
          </div>
          <h2 className="font-display text-4xl font-semibold md:text-6xl">
            {experience.role.split("—")[0].trim()} chez{" "}
            <span className="text-accent">{experience.company}</span>
          </h2>
          <p className="mt-5 text-balance text-cream/70">{experience.context}</p>
        </div>

        <div className="mb-10 mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-cream/50">
          <span>{experience.period}</span>
          <span className="text-cream/25">/</span>
          <span>{experience.location}</span>
          <span className="text-cream/25">/</span>
          <a
            href={experience.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            batinnov63.fr <ArrowUpRight size={13} />
          </a>
        </div>

        {/* The animated architecture — the peak of the portfolio */}
        <ArchitectureDiagram />

        {/* Responsibilities */}
        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark sm:grid-cols-2"
        >
          {experience.responsibilities.map((r, i) => (
            <motion.li key={r.title} variants={riseIn} className="bg-navy p-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-cream">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">{r.detail}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
