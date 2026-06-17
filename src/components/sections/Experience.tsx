import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { ArchitectureDiagram } from "@/components/sections/ArchitectureDiagram";
import { CloudField } from "@/components/sections/CloudField";
import { inView, riseIn, stagger } from "@/lib/motion";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Expérience"
      tone="dark"
      backdrop={<CloudField />}
      title={
        <>
          {experience.role.split("—")[0].trim()} chez{" "}
          <span className="text-accent">{experience.company}</span>
        </>
      }
      intro={experience.context}
    >
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-cream/50">
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
          <motion.li
            key={r.title}
            variants={riseIn}
            className="bg-navy p-6"
          >
            <span className="font-mono text-xs text-accent">0{i + 1}</span>
            <h3 className="mt-2 font-display text-lg font-semibold text-cream">
              {r.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/65">{r.detail}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
