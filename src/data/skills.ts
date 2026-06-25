/** Categorized like the CV (brief §5.4) — text + meaning, never logos-only. */
export const skillGroups = [
  {
    category: "Langages",
    items: ["TypeScript", "Python", "SQL", "Bash","C","JAVA"],
  },
  {
    category: "Cloud & Infra",
    items: [
      "Docker",
      "Docker Compose",
      "Nginx",
      "Cloudflare (DNS · WAF · R2)",
      "GitHub Actions (CI/CD)",
      "VPS Linux",
      "Certbot / Let's Encrypt",
    ],
  },
  {
    category: "Data & Backend",
    items: ["PostgreSQL", "MySQL", "Redis", "Hono", "TypeORM", "Bun", "REST API"],
  },
  {
    category: "Outils",
    items: ["Git", "n8n", "OpenAPI", "Regex", "Bruno", "Ngrok", "Let's Encrypt"],
  },
] as const;

/** Compact marquee row of headline competencies (brief §3 — infinite marquee). */
export const marqueeSkills = [
  "Docker",
  "Cloudflare",
  "CI/CD",
  "PostgreSQL",
  "Redis",
  "Nginx",
  "TypeScript",
  "GitHub Actions",
  "VPS Linux",
  "TLS / SSL",
  "Bun",
  "Hono",
] as const;
