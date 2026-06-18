export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** Longer pitch shown when the card expands / on the detail page. */
  description: string;
  stack: string[];
  highlights: string[];
  /** Visual weight in the bento grid. */
  size: "lg" | "md" | "sm";
  pinned?: boolean;
  /** Has a dedicated case-study page. */
  detail?: boolean;
  repo?: string;
  demo?: string;
  year: string;
};

/** Ordered by Cloud Engineer relevance (brief §8). */
export const projects: Project[] = [
  {
    slug: "batinnov",
    title: "BATINNOV",
    tagline: "Infrastructure cloud d'une marketplace en production",
    description:
      "Responsable de l'infrastructure cloud d'une marketplace française en production : déploiement Docker sur VPS, CI/CD GitHub Actions, DNS & WAF Cloudflare, migration des sessions vers Redis. Du serveur nu jusqu'au TLS.",
    stack: ["Docker", "Nginx", "Cloudflare", "PostgreSQL", "Redis", "GitHub Actions"],
    highlights: [
      "Stack Docker Compose en production (API · PostgreSQL · Redis · Nginx · n8n)",
      "CI/CD automatisé + TLS Let's Encrypt",
      "DNS, WAF et stockage objet R2 via Cloudflare",
    ],
    size: "lg",
    pinned: true,
    detail: true,
    year: "2026",
  },
  {
    slug: "api-parking",
    title: "API Parking",
    tagline: "API REST modulaire pour la gestion de parkings",
    description:
      "API REST pour la gestion de parkings, villes et pays. Architecture par modules, validation stricte des entrées, entièrement conteneurisable. Construite sur Bun pour les performances.",
    stack: ["TypeScript", "Hono", "TypeORM", "MySQL", "Bun"],
    highlights: [
      "Architecture backend par modules, endpoints documentés",
      "Choix de Bun pour les performances",
      "Conçue pour être conteneurisée",
    ],
    size: "md",
    detail: true,
    repo: "https://github.com/gnourex339-2",
    year: "2025",
  },
  {
    slug: "agoraedate",
    title: "AgoraeDate",
    tagline: "Bot de synchronisation Instagram → Google Calendar",
    description:
      "Bot d'automatisation qui extrait des événements depuis Instagram et les synchronise dans Google Calendar. Parsing robuste par regex, intégration multi-API, déployable en cron / serverless.",
    stack: ["Python", "Google Calendar API", "Instaloader", "Regex"],
    highlights: [
      "Intégration multi-API (Instagram + Google)",
      "Parsing robuste par expressions régulières",
      "Déploiement potentiel en cron / serverless",
    ],
    size: "md",
    repo: "https://github.com/gnourex339-2",
    year: "2025",
  },
  {
    slug: "vlauvegestion",
    title: "VlauveGestion",
    tagline: "Gestion de vélos en libre-service",
    description:
      "Application de gestion de vélos en libre-service. Modélisation de base de données et conception orientée objet. Projet à dominante académique.",
    stack: ["Python", "Tkinter", "MySQL", "POO"],
    highlights: ["Modélisation BDD", "Conception orientée objet"],
    size: "sm",
    repo: "https://github.com/gnourex339-2",
    year: "2024",
  },
];
