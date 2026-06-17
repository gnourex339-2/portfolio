export const experience = {
  company: "BATINNOV",
  role: "Stagiaire développeur fullstack — Infrastructure Cloud",
  location: "Clermont-Ferrand, France",
  period: "Avril – Juin 2026",
  url: "https://batinnov63.fr",
  /** Accessible, jargon-free context for a non-technical reader (brief §7). */
  context:
    "BATINNOV est une marketplace française qui met en relation des particuliers avec des artisans certifiés dans 4 domaines : installation de bornes de recharge, travaux, courtage et aide à la personne. La plateforme est en production sur batinnov63.fr — j'étais responsable de l'infrastructure qui la fait tourner.",
  responsibilities: [
    {
      title: "Infrastructure cloud sur VPS Linux",
      detail:
        "Déploiement et administration d'une stack Docker Compose : API, PostgreSQL, Redis, Nginx, n8n.",
    },
    {
      title: "CI/CD & sécurisation TLS",
      detail:
        "Pipeline GitHub Actions avec déploiement automatique, certificats SSL/TLS via Certbot / Let's Encrypt.",
    },
    {
      title: "DNS & sécurité périmètre",
      detail:
        "Administration du domaine de production via Cloudflare : proxy, WAF, stockage objet R2 pour les assets.",
    },
    {
      title: "Migration des sessions vers Redis",
      detail:
        "Sessions déplacées de PostgreSQL vers Redis pour réduire la latence et automatiser l'expiration (TTL).",
    },
  ],
} as const;
