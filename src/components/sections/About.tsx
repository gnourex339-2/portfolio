import { motion } from "framer-motion";
import { MapPin, GraduationCap, Target } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { inView, riseIn, stagger } from "@/lib/motion";
import { site } from "@/data/site";

const facts = [
  { icon: GraduationCap, label: "Formation", value: "Licence 3 MIAGE — IDMC (Univ. de Lorraine)" },
  { icon: Target, label: "Objectif", value: site.seeking },
  { icon: MapPin, label: "Localisation", value: `${site.location} · ${site.locationNote}` },
];

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="À propos"
      title="Je rends fiables des infrastructures que les autres préfèrent ne pas toucher."
    >
      <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="space-y-5 text-lg leading-relaxed text-ink/80"
        >
          <motion.p variants={riseIn}>
            Étudiant en MIAGE, je me spécialise dans le cloud et l'infrastructure — la
            couche qui décide si un produit tient en production ou tombe à 3h du matin.
          </motion.p>
          <motion.p variants={riseIn}>
            Pendant mon stage chez BATINNOV, j'étais seul responsable de l'infra d'une
            marketplace en production : déploiement, CI/CD, sécurité réseau, optimisation.
            J'ai appris à arbitrer des choix concrets — pourquoi un VPS plutôt qu'un PaaS,
            pourquoi Redis plutôt que PostgreSQL pour les sessions.
          </motion.p>
          <motion.p variants={riseIn}>
            Je cherche une alternance Cloud Engineer pour me confronter à des systèmes plus
            grands, avec des contraintes réelles.
          </motion.p>
        </motion.div>

        <motion.dl
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          className="space-y-px overflow-hidden rounded-2xl border border-line bg-paper"
        >
          {facts.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={riseIn}
              className="flex items-start gap-4 border-b border-line p-5 last:border-b-0"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
                <Icon size={18} />
              </span>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {label}
                </dt>
                <dd className="mt-1 font-medium text-ink">{value}</dd>
              </div>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </Section>
  );
}
