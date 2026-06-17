/** Deep-dive content for the project detail pages (brief §5 "case study"). */
export type Decision = { q: string; a: string };

export type CaseStudy = {
  slug: string;
  /** Render the animated architecture diagram on this page. */
  hasArchitecture?: boolean;
  context: string;
  decisions: Decision[];
};

export const caseStudies: Record<string, CaseStudy> = {
  batinnov: {
    slug: "batinnov",
    hasArchitecture: true,
    context:
      "BATINNOV est une marketplace en production qui met en relation particuliers et artisans certifiés. J'ai pris en charge l'infrastructure : la faire tourner de manière fiable, sécurisée et reproductible, sur un budget de startup. Tout est conteneurisé et déployé automatiquement à chaque push sur la branche principale.",
    decisions: [
      {
        q: "Pourquoi un VPS plutôt qu'un PaaS (Vercel, Heroku…) ?",
        a: "Le coût d'un PaaS explose dès qu'on a plusieurs services persistants (PostgreSQL, Redis, n8n). Un VPS Linux donne un contrôle total et un coût fixe prévisible — au prix d'avoir à gérer soi-même l'OS, le réseau et le TLS. C'est exactement la compétence que je voulais consolider.",
      },
      {
        q: "Pourquoi migrer les sessions de PostgreSQL vers Redis ?",
        a: "Les sessions sont des données éphémères, lues à chaque requête. Les stocker dans PostgreSQL ajoutait de la charge sur la base métier et compliquait l'expiration. Redis gère ça nativement avec un TTL : latence plus basse, nettoyage automatique, base relationnelle déchargée.",
      },
      {
        q: "Pourquoi Cloudflare devant Nginx ?",
        a: "Cloudflare absorbe le trafic malveillant (WAF), masque l'IP d'origine, gère le DNS et sert les assets statiques via R2. Nginx reste responsable du reverse proxy et de la terminaison TLS côté serveur. Deux couches, deux rôles clairs.",
      },
    ],
  },
  "api-parking": {
    slug: "api-parking",
    context:
      "API REST pour gérer parkings, villes et pays. L'objectif était une base backend propre : architecture par modules, validation stricte des entrées, et un projet entièrement conteneurisable que l'on peut déployer n'importe où.",
    decisions: [
      {
        q: "Pourquoi Bun plutôt que Node ?",
        a: "Bun offre un runtime plus rapide et un outillage intégré (test runner, bundler) qui réduit la configuration. Pour une API où la latence compte, le gain au démarrage et à l'exécution est appréciable.",
      },
      {
        q: "Pourquoi Hono + TypeORM ?",
        a: "Hono est un framework web ultra-léger et typé, idéal avec Bun. TypeORM apporte des entités typées et des migrations, ce qui garde le schéma de données sous contrôle de version.",
      },
    ],
  },
};
