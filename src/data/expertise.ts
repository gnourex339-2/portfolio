/**
 * Transverse competencies (Lot 2). NOT a pivot away from Cloud Engineer —
 * each page frames a skill as something that *serves* the cloud positioning:
 * a Cloud Engineer who can also read and write the front and back is more credible.
 * `proof` references project slugs (see data/projects.ts) so claims stay grounded.
 *
 * Content is about Amine — review and adjust the wording freely.
 */
export type Expertise = {
  slug: "frontend" | "backend" | "python";
  label: string;
  eyebrow: string;
  /** Headline shown on the page. */
  title: string;
  /** The "why this serves the cloud" framing — one short paragraph. */
  cloudAngle: string;
  /** Concrete things I can do — text, not percentages. */
  capabilities: string[];
  /** Tools actually used. */
  tools: string[];
  /** Project slugs that prove it. */
  proof: string[];
};

export const expertise: Expertise[] = [
  {
    slug: "frontend",
    label: "Front-end",
    eyebrow: "Au service du cloud",
    title: "Comprendre le client pour mieux servir le serveur.",
    cloudAngle:
      "Un Cloud Engineer qui sait ce qu'attend le navigateur prend de meilleures décisions d'infra : quoi mettre en cache, quels assets servir depuis un CDN, où placer la terminaison TLS. Ce portfolio en est la démonstration — React typé, animations disciplinées, et un bundle gardé léger parce que la performance perçue dépend autant du transport que du code.",
    capabilities: [
      "Interfaces React + TypeScript structurées et accessibles (skip links, ARIA, focus visible)",
      "État serveur et consommation d'API typées (TanStack Query : cache, synchronisation, états loading/error)",
      "Styling cohérent avec Tailwind et des design tokens, sans CSS-in-JS au runtime",
      "Optimisation du chargement : code-splitting, lazy-loading, auto-hébergement des polices",
    ],
    tools: ["React 18", "TypeScript", "Tailwind CSS", "TanStack Query", "Framer Motion", "Vite"],
    proof: ["worldcup-billeterie", "batinnov"],
  },
  {
    slug: "backend",
    label: "Back-end",
    eyebrow: "Au service du cloud",
    title: "Des API qui se déploient proprement.",
    cloudAngle:
      "L'infrastructure n'a de valeur que par ce qu'elle fait tourner. Savoir concevoir une API claire, validée et conteneurisable, c'est livrer à l'infra quelque chose de prévisible : un service qui démarre vite, expose des endpoints documentés et se réplique sans surprise. C'est exactement ce que j'ai cherché à faire sur API Parking et sur l'API de BATINNOV.",
    capabilities: [
      "API REST modulaires avec validation stricte des entrées",
      "Modélisation de données et migrations versionnées (TypeORM)",
      "Conteneurisation et configuration prête pour le déploiement",
      "Choix de runtime orientés performance (Bun) et frameworks légers (Hono)",
    ],
    tools: ["Hono", "Bun", "TypeORM", "PostgreSQL", "MySQL", "Redis", "REST"],
    proof: ["api-parking", "batinnov"],
  },
  {
    slug: "python",
    label: "Python",
    eyebrow: "Au service du cloud",
    title: "L'outil d'automatisation par défaut.",
    cloudAngle:
      "En infrastructure, Python est le couteau suisse : scripts de déploiement, intégrations d'API, tâches planifiées. AgoraeDate synchronise des événements entre Instagram et Google Calendar via un bot déployable en cron ou en serverless — exactement le type d'automatisation glue qu'un Cloud Engineer écrit pour relier des services entre eux.",
    capabilities: [
      "Intégration multi-API et orchestration de services tiers",
      "Communication inter-processus et lecture concurrente (pipes Unix, threading, verrous)",
      "Parsing robuste (expressions régulières) sur des données non structurées",
      "Automatisations planifiées (cron) et logique déployable en serverless",
    ],
    tools: ["Python", "Flask", "IPC Unix", "Google Calendar API", "Regex", "MySQL"],
    proof: ["webs", "agoraedate", "vlauvegestion"],
  },
];

export const expertiseBySlug = (slug: string): Expertise | undefined =>
  expertise.find((e) => e.slug === slug);
