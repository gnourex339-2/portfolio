import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ArchitectureDiagram } from "@/components/sections/ArchitectureDiagram";
import { CodeMark } from "@/components/ui/CodeMark";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";
import { DUR, EASE_OUT_EXPO } from "@/lib/motion";

export function ProjectDetail() {
  const { slug = "" } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const study = caseStudies[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project || !study) return <Navigate to="/" replace />;

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.section, ease: EASE_OUT_EXPO, delay },
  });

  return (
    <>
      <header className="border-b border-line">
        <div className="container-content flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-2.5 text-ink">
            <CodeMark size={24} animate={false} className="text-accent" />
            <span className="font-display text-sm font-semibold">{site.name}</span>
          </Link>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft size={15} /> Tous les projets
          </Link>
        </div>
      </header>

      <main id="main">
        <article className="container-content py-16 md:py-24">
          {/* Title block — shared layout animation hook via layoutId on the title */}
          <motion.p {...rise()} className="eyebrow mb-4">
            Étude de cas · {project.year}
          </motion.p>
          <motion.h1
            layoutId={`card-${project.slug}`}
            className="font-display text-5xl font-semibold tracking-[-0.02em] md:text-7xl"
          >
            {project.title}
          </motion.h1>
          <motion.p {...rise(0.08)} className="mt-4 max-w-2xl text-lg text-muted">
            {project.tagline}
          </motion.p>

          {/* Meta + links */}
          <motion.div
            {...rise(0.14)}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream"
              >
                <Github size={15} /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-accent"
              >
                Démo <ArrowUpRight size={15} />
              </a>
            )}
          </motion.div>

          {/* Context */}
          <motion.section {...rise(0.2)} className="mt-16 max-w-2xl">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Contexte
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{study.context}</p>
          </motion.section>

          {/* Stack */}
          <motion.section {...rise(0.26)} className="mt-12">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Stack technique
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-paper px-3.5 py-1.5 font-mono text-sm text-ink/75"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Architecture */}
          {study.hasArchitecture && (
            <section className="mt-16">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                Architecture
              </h2>
              <p className="mb-6 mt-2 max-w-2xl text-muted">
                Le trajet d'une requête, de l'utilisateur jusqu'aux bases de données.
              </p>
              <ArchitectureDiagram />
            </section>
          )}

          {/* Key decisions */}
          <section className="mt-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Décisions techniques
            </h2>
            <div className="mt-6 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
              {study.decisions.map((d) => (
                <div key={d.q} className="bg-cream p-6 md:p-8">
                  <h3 className="font-display text-lg font-semibold text-ink md:text-xl">
                    {d.q}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{d.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Back link */}
          <div className="mt-16">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              <ArrowLeft size={15} /> Retour aux projets
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
