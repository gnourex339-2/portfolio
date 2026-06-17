/** Shared model for the BATINNOV architecture — used by the 3D scene and the 2D fallback. */
export type ArchNode = {
  id: string;
  label: string;
  sub: string;
  tip: string;
  /** 3D position [x, y, z] (y is up; flow runs along x; DBs split on z). */
  pos: [number, number, number];
  accent?: boolean;
};

export const ARCH_NODES: ArchNode[] = [
  { id: "user", label: "Utilisateur", sub: "Navigateur", pos: [-6, 0, 0], tip: "Une requête entre dans le système depuis le navigateur d'un visiteur." },
  { id: "cf", label: "Cloudflare", sub: "DNS · WAF · R2", pos: [-3.6, 0, 0], tip: "Gère le DNS, filtre le trafic (WAF) et sert les assets statiques via R2." },
  { id: "nginx", label: "Nginx", sub: "Reverse proxy · TLS", pos: [-1.2, 0, 0], tip: "Termine le TLS (Let's Encrypt) et route le trafic vers l'API." },
  { id: "api", label: "API", sub: "Hono · Bun", pos: [1.2, 0, 0], accent: true, tip: "Logique métier sur Bun pour les performances, exposée en REST." },
  { id: "pg", label: "PostgreSQL", sub: "Données métier", pos: [4.2, 0, -1.6], tip: "Source de vérité : utilisateurs, artisans, demandes." },
  { id: "redis", label: "Redis", sub: "Sessions · TTL", pos: [4.2, 0, 1.6], tip: "Sessions migrées depuis PostgreSQL — latence réduite, expiration automatique." },
];

/** Directed connections between node ids. */
export const ARCH_EDGES: [string, string][] = [
  ["user", "cf"],
  ["cf", "nginx"],
  ["nginx", "api"],
  ["api", "pg"],
  ["api", "redis"],
];

/** The path a request packet travels (animated). */
export const ARCH_ROUTE = ["user", "cf", "nginx", "api", "pg"];

export const nodeById = (id: string) => ARCH_NODES.find((n) => n.id === id)!;
