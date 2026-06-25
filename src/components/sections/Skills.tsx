import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "../layout/Section";
import { inView, riseIn, stagger } from "../../lib/motion";
import { marqueeSkills, skillGroups } from "../../data/skills";
import { expertise } from "../../data/expertise";

/** Infinite marquee (brief §3) — pure CSS transform loop, paused on hover & reduced-motion. */
function Marquee() {
  const reduce = useReducedMotion();
  const row = [...marqueeSkills, ...marqueeSkills];
  return (
    <div
      className="group relative -mx-6 overflow-hidden py-2 md:-mx-10"
      aria-hidden="true"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-cream to-transparent" />
      <div
        className={`flex w-max gap-3 ${reduce ? "" : "animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused]"}`}
      >
        {row.map((s, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-line bg-paper px-5 py-2 font-mono text-sm text-ink/70"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      eyebrow="Compétences"
      title="Une stack orientée production."
      intro="Pas de barres de pourcentage. Voici ce avec quoi je travaille réellement, regroupé par usage."
    >
      <Marquee />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
      >
        {skillGroups.map((group) => (
          <motion.div key={group.category} variants={riseIn} className="bg-cream p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              {group.category}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-ink/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Transverse competencies — framed as serving the cloud positioning, not a pivot. */}
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="mt-12"
      >
        <motion.p variants={riseIn} className="mb-5 text-sm text-muted">
          Au-delà de l'infra, trois compétences transverses qui la servent —{" "}
          <span className="text-ink/70">explorez ce qu'elles couvrent et ce qui les prouve.</span>
        </motion.p>
        <div className="grid gap-4 sm:grid-cols-3">
          {expertise.map((e) => (
            <motion.div key={e.slug} variants={riseIn}>
              <Link
                to={`/expertise/${e.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-accent"
              >
                <span className="inline-flex items-center gap-1.5 font-display text-lg font-semibold text-ink">
                  {e.label}
                  <ArrowUpRight
                    size={16}
                    className="text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted">{e.title}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
