import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Pin, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "../layout/Section";
import { inView, riseIn, spring, stagger } from "../../lib/motion";
import { projects, type Project } from "../../data/projects";

/** Asymmetric bento placement (brief §4, Moment 3) — keyed by slug for precise control. */
const SPAN: Record<string, string> = {
  batinnov: "lg:col-span-2 lg:row-span-2",
  "api-parking": "lg:col-span-1",
  agoraedate: "lg:col-span-1",
  vlauvegestion: "lg:col-span-3",
};

function StackRow({ stack, dark = false }: { stack: readonly string[]; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <li
          key={s}
          className={`rounded-full px-2.5 py-1 font-mono text-[0.7rem] ${
            dark
              ? "bg-white/10 text-cream/80"
              : "border border-line bg-cream text-ink/70"
          }`}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function Card({ p, onOpen }: { p: Project; onOpen: (slug: string) => void }) {
  const feature = p.size === "lg";
  // Spotlight: only the featured (navy) card, per the brief ("not everywhere").
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      variants={riseIn}
      layoutId={`card-${p.slug}`}
      onMouseMove={feature ? onMove : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-colors duration-300 ${SPAN[p.slug] ?? ""} ${
        feature
          ? "border-line-dark bg-navy text-cream"
          : "border-line bg-paper text-ink hover:border-ink/20 hover:shadow-[0_10px_40px_-12px_rgba(26,26,26,0.12)]"
      }`}
    >
      {feature && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.16), transparent 62%)",
          }}
        />
      )}
      {p.pinned && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-accent">
          <Pin size={11} /> Épinglé
        </span>
      )}

      <motion.span layout="position" className={`font-mono text-xs ${feature ? "text-cream/50" : "text-muted"}`}>
        {p.year}
      </motion.span>

      <motion.h3
        layout="position"
        className={`mt-2 font-display font-semibold ${feature ? "text-3xl md:text-4xl" : "text-xl"}`}
      >
        {p.title}
      </motion.h3>

      <motion.p
        layout="position"
        className={`mt-2 ${feature ? "max-w-md text-cream/70" : "text-sm text-muted"}`}
      >
        {p.tagline}
      </motion.p>

      <div className={`mt-auto pt-6 ${feature ? "" : ""}`}>
        <motion.div layout="position" className="mb-4">
          <StackRow stack={p.stack} dark={feature} />
        </motion.div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpen(p.slug)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${
              feature ? "bg-accent text-white" : "bg-navy text-cream"
            }`}
          >
            <Plus size={15} /> Voir plus
          </button>
          {p.detail && (
            <Link
              to={`/projects/${p.slug}`}
              className={`inline-flex items-center gap-1 text-sm font-medium ${
                feature ? "text-cream/80 hover:text-cream" : "text-muted hover:text-ink"
              }`}
            >
              Étude de cas <ArrowUpRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ExpandedCard({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <motion.div
      layoutId={`card-${p.slug}`}
      className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl border border-line-dark bg-navy p-8 text-cream md:p-10"
      transition={spring}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-white/20"
        aria-label="Fermer"
      >
        <X size={18} />
      </button>

      <motion.span layout="position" className="font-mono text-xs text-cream/50">
        {p.year}
      </motion.span>
      <motion.h3 layout="position" className="mt-2 font-display text-4xl font-semibold">
        {p.title}
      </motion.h3>
      <motion.p layout="position" className="mt-2 text-cream/70">
        {p.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-6 space-y-6"
      >
        <p className="leading-relaxed text-cream/85">{p.description}</p>

        <div>
          <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Points clés
          </h4>
          <ul className="space-y-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-cream/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Stack
          </h4>
          <StackRow stack={p.stack} dark />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {p.detail && (
            <Link
              to={`/projects/${p.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white"
            >
              Étude de cas complète <ArrowUpRight size={15} />
            </Link>
          )}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-cream hover:border-accent"
            >
              <Github size={15} /> Code
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = projects.find((p) => p.slug === openSlug) ?? null;

  useEffect(() => {
    document.body.style.overflow = openSlug ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenSlug(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openSlug]);

  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Projets"
      title="Ce que j'ai construit."
      intro="Classés par pertinence pour le cloud. Cliquez pour déplier, ou ouvrez l'étude de cas."
    >
      <motion.div
        variants={stagger(0.09)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
        className="grid auto-rows-[minmax(200px,auto)] gap-4 lg:grid-cols-3"
      >
        {projects.map((p) => (
          <Card key={p.slug} p={p} onOpen={setOpenSlug} />
        ))}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
              onClick={() => setOpenSlug(null)}
            />
            <div className="relative z-10 w-full max-w-2xl">
              <ExpandedCard p={open} onClose={() => setOpenSlug(null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
