import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { inView, riseIn, stagger } from "@/lib/motion";
import { site } from "@/data/site";

const links = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "amine-benzerga339", href: site.linkedin },
  { icon: Github, label: "GitHub", value: "gnourex339-2", href: site.github },
  { icon: Phone, label: "Téléphone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-navy py-24 text-cream md:py-32">
      <div className="container-content">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          <motion.div variants={riseIn} className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs text-accent">05</span>
            <span className="h-px w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-cream/60">
              Contact
            </span>
          </motion.div>

          <motion.h2
            variants={riseIn}
            className="max-w-3xl font-display text-4xl font-semibold md:text-6xl"
          >
            Une alternance Cloud à pourvoir&nbsp;?
          </motion.h2>
          <motion.p variants={riseIn} className="mt-5 max-w-xl text-cream/70">
            Le plus simple, c'est l'email — je réponds vite. Disponible pour la rentrée 2026,
            à Nancy ou ailleurs.
          </motion.p>

          <motion.a
            variants={riseIn}
            href={`mailto:${site.email}`}
            className="group mt-10 inline-flex items-center gap-3 font-display text-2xl font-medium text-cream underline-offset-8 hover:underline md:text-4xl"
          >
            {site.email}
            <ArrowUpRight
              className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
              size={28}
            />
          </motion.a>

          <motion.div
            variants={stagger(0.08)}
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4"
          >
            {links.map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                variants={riseIn}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex flex-col gap-3 bg-navy p-6 transition-colors hover:bg-navy-soft"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-accent">
                  <Icon size={18} />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-cream/50">
                  {label}
                </span>
                <span className="break-all text-sm text-cream/90">{value}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
