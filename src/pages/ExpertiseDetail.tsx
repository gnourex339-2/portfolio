import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "../components/layout/Footer";
import { CodeMark } from "../components/ui/CodeMark";
import { expertiseBySlug } from "../data/expertise";
import { projects } from "../data/projects";
import { site } from "../data/site";
import { DUR, EASE_OUT_EXPO } from "../lib/motion";

export function ExpertiseDetail() {
  const { slug = "" } = useParams();
  const item = expertiseBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!item) return <Navigate to="/" replace />;

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.section, ease: EASE_OUT_EXPO, delay },
  });

  const proofProjects = item.proof
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <header className="border-b border-line">
        <div className="container-content flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-2.5 text-ink">
            <CodeMark size={24} animate={false} className="text-accent" />
            <span className="font-display text-sm font-semibold">{site.name}</span>
          </Link>
          <Link
            to="/#skills"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft size={15} /> Compétences
          </Link>
        </div>
      </header>

      <main id="main">
        <article className="container-content py-16 md:py-24">
          <motion.p {...rise()} className="eyebrow mb-4">
            {item.eyebrow} · {item.label}
          </motion.p>
          <motion.h1
            {...rise(0.06)}
            className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.02em] md:text-6xl"
          >
            {item.title}
          </motion.h1>

          {/* The cloud framing — why this skill matters for the positioning */}
          <motion.p {...rise(0.12)} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
            {item.cloudAngle}
          </motion.p>

          {/* Concrete capabilities */}
          <motion.section {...rise(0.2)} className="mt-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Ce que je sais faire
            </h2>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {item.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 bg-cream p-5 text-ink/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Tools */}
          <motion.section {...rise(0.26)} className="mt-12">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Outils</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line bg-paper px-3.5 py-1.5 font-mono text-sm text-ink/75"
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Proof — the projects that back the claim */}
          {proofProjects.length > 0 && (
            <section className="mt-16">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                Les projets qui le prouvent
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {proofProjects.map((p) => {
                  const to = p.detail ? `/projects/${p.slug}` : "/#projects";
                  return (
                    <Link
                      key={p.slug}
                      to={to}
                      className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-accent"
                    >
                      <span className="font-mono text-xs text-muted">{p.year}</span>
                      <span className="mt-2 inline-flex items-center gap-1.5 font-display text-xl font-semibold text-ink">
                        {p.title}
                        <ArrowUpRight
                          size={16}
                          className="text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </span>
                      <span className="mt-2 text-sm text-muted">{p.tagline}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Back link */}
          <div className="mt-16">
            <Link
              to="/#skills"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              <ArrowLeft size={15} /> Retour aux compétences
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
