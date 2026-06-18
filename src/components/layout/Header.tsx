import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "../../data/site";
import { CodeMark } from "../ui/CodeMark";
import { DUR, EASE_OUT_EXPO } from "../../lib/motion";
import { useActiveSection } from "../../hooks/useActiveSection";

const SECTION_IDS = ["top", "about", "experience", "skills", "projects", "contact"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-cream)_82%,transparent)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-content flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-ink"
          aria-label={`${site.name} — accueil`}
        >
          <CodeMark size={26} animate={false} className="text-accent" />
          <span className="font-display text-[0.95rem] font-semibold tracking-tight">
            {site.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]"
                    transition={
                      reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }
                    }
                  />
                )}
                {item.label}
              </a>
            );
          })}
          <a
            href={site.cvUrl}
            className="rounded-full border border-ink/15 px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            CV
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-10 w-10 items-center justify-center text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Navigation mobile"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: DUR.base, ease: EASE_OUT_EXPO }}
            className="overflow-hidden border-b border-[var(--color-line)] bg-cream md:hidden"
          >
            <ul className="container-content flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-lg text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.cvUrl}
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-block rounded-full border border-ink/15 px-5 py-2 text-base font-medium text-ink"
                >
                  Télécharger le CV
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
