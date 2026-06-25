/** Single source of truth for personal info (brief §6). Edit here, not in components. */
export const site = {
  name: "Amine Benzerga",
  role: "Cloud Engineer",
  tagline: "Étudiant MIAGE — Cloud & Infrastructure",
  location: "Nancy, France",
  locationNote: "mobilité ouverte",
  seeking: "Alternance Cloud Engineer — Rentrée 2026 (Master MIAGE)",
  email: "aminebenzerga13@gmail.com",
  phone: "+33 7 45 76 19 65",
  github: "https://github.com/gnourex339-2",
  linkedin: "https://www.linkedin.com/in/amine-benzerga339/",
  cvUrl: `${import.meta.env.BASE_URL}cv.pdf`, // PDF lives in /public; base-aware for GitHub Pages
  repoUrl: "https://github.com/gnourex339-2/portfolio", // footer signal for tech recruiters
  languages: ["Français (natif)", "Anglais", "Arabe"],
  /** The single "what I do" line — keywords revealed with measured delays (brief §4, Moment 1). */
  focus: ["Cloud", "Infrastructure", "Data"],
  /** Hosting region shown in the footer "live infra" line. Update when the VPS goes live. */
  region: "github-pages",
} as const;

/**
 * "En ce moment" (addendum §3.3) — short, factual, kept current.
 * Edit these 2-3 lines every month or two; never pad with anything untrue.
 */
export const now = [
  { label: "Recherche", value: "Alternance Cloud Engineer · rentrée 2026" },
  { label: "Veille", value: "AWS · Terraform" },
] as const;

export const nav = [
  { label: "À propos", href: "#about" },
  { label: "Expérience", href: "#experience" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
