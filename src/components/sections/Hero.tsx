import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "../../data/site";
import { CodeMark } from "../ui/CodeMark";
import { MagneticLink } from "../ui/MagneticLink";
import { DUR, EASE_OUT_EXPO } from "../../lib/motion";

/**
 * Signature moment 1 — editorial hero (brief §4).
 * XXL type, deliberate asymmetry, a composed entrance (no typewriter, no emoji wave),
 * the `</>` mark integrated into the name, and one "what I do" line whose keywords
 * arrive on measured delays.
 */
export function Hero() {
  const reduce = useReducedMotion();

  // Master timeline. Each value is a start time in seconds — readable as a score.
  const t = {
    eyebrow: 0.1,
    line1: 0.25,
    line2: 0.42,
    mark: 0.62,
    focus: 0.9,
    aside: 1.15,
    cta: 1.3,
  };

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.section, ease: EASE_OUT_EXPO, delay: reduce ? 0 : delay },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-20 md:pt-32"
    >
      {/* Faint mono grid coordinate, top-right — editorial, not decorative noise */}
      <motion.span
        className="pointer-events-none absolute right-6 top-24 hidden font-mono text-xs tracking-widest text-muted/60 md:block md:right-10"
        {...rise(t.eyebrow + 0.2)}
      >
        47.05°N · 6.18°E
      </motion.span>

      <div className="container-content">
        {/* Eyebrow — factual status, no pulsing green badge */}
        <motion.p className="eyebrow mb-7 flex items-center gap-3" {...rise(t.eyebrow)}>
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          En recherche d'alternance · Rentrée 2026
        </motion.p>

        {/* Name — XXL, two lines, the mark integrated into the second */}
        <h1 className="font-display font-bold leading-[0.92] tracking-[-0.03em] text-ink">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[clamp(3rem,9vw,8.5rem)] leading-[0.9]"
              {...rise(t.line1)}
            >
              Amine
            </motion.span>
          </span>

          <span className="flex flex-wrap items-end gap-x-5 gap-y-2 overflow-hidden">
            <motion.span
              className="block text-[clamp(3rem,9vw,8.5rem)] leading-[0.9] text-navy"
              {...rise(t.line2)}
            >
              Benzerga
            </motion.span>

            <motion.span
              className="mb-[0.18em] inline-flex text-accent"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: DUR.base,
                ease: EASE_OUT_EXPO,
                delay: reduce ? 0 : t.mark,
              }}
            >
              <CodeMark size={56} animate={false} />
            </motion.span>
          </span>
        </h1>

        {/* The one "what I do" line — keywords on measured delays */}
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1">
          {site.focus.map((word, i) => (
            <span key={word} className="flex items-center gap-x-4">
              <motion.span
                className="font-display text-2xl font-medium text-ink md:text-3xl"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DUR.base,
                  ease: EASE_OUT_EXPO,
                  delay: reduce ? 0 : t.focus + i * 0.14,
                }}
              >
                {word}
              </motion.span>
              {i < site.focus.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  className="text-2xl text-accent md:text-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reduce ? 0 : t.focus + i * 0.14 + 0.07 }}
                >
                  ·
                </motion.span>
              )}
            </span>
          ))}
        </div>

        {/* Asymmetric lower row: accroche left, CTAs right */}
        <div className="mt-14 grid items-end gap-10 md:mt-20 md:grid-cols-[1fr_auto]">
          <motion.p
            className="max-w-md text-balance text-muted"
            {...rise(t.aside)}
          >
            Je conçois et déploie des infrastructures cloud fiables. Récemment responsable
            de l'infra en production d'une marketplace chez BATINNOV — Docker, CI/CD,
            Cloudflare, du VPS jusqu'au TLS.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-3" {...rise(t.cta)}>
            <MagneticLink
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-cream"
            >
              Voir mes projets
              <ArrowDownRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </MagneticLink>
            <a
              href={site.cvUrl}
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Télécharger le CV
              <ArrowUpRight
                size={17}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
