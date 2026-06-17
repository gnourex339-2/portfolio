# Portfolio — Amine Benzerga

Portfolio personnel, conçu comme une vitrine de compétences **Cloud Engineer**. La manière
dont il est construit et déployé fait partie de la démonstration.

**Live :** _(à compléter une fois déployé)_

---

## Stack

| Domaine     | Choix                                                        |
| ----------- | ------------------------------------------------------------ |
| Framework   | React 18 + Vite 6                                            |
| Langage     | TypeScript (strict)                                          |
| Styling     | Tailwind CSS v4 (`@tailwindcss/vite`, config CSS-first)      |
| Animations  | Framer Motion (langage de mouvement unique, easings custom)  |
| 3D          | Three.js + React Three Fiber + drei (diagramme d'architecture)|
| Routing     | React Router 6 (pages détail projet)                         |
| Icônes      | Lucide React                                                 |
| Fonts       | Space Grotesk · Inter · JetBrains Mono (auto-hébergées via Fontsource) |

Le diagramme 3D est **chargé à la demande** (`React.lazy`) : il n'alourdit pas le bundle
initial (~109 kB gzip). Les utilisateurs avec `prefers-reduced-motion` reçoivent un
schéma statique et accessible à la place.

## Développement

```bash
npm install
npm run dev        # serveur de dev (http://localhost:5173)
npm run build      # build de production -> dist/
npm run preview    # prévisualise le build
npm run lint
npm run format
```

## Contenu

Aucun CMS, aucun backend. Tout le contenu est typé dans `src/data/` :

| Fichier                  | Contenu                                       |
| ------------------------ | --------------------------------------------- |
| `src/data/site.ts`       | Identité, liens, coordonnées                   |
| `src/data/experience.ts` | Stage BATINNOV                                 |
| `src/data/skills.ts`     | Compétences par catégorie + marquee            |
| `src/data/projects.ts`   | Cartes projets (bento)                         |
| `src/data/caseStudies.ts`| Contenu des pages détail (contexte, décisions) |
| `src/data/architecture.ts`| Nœuds & flux du diagramme 3D                  |

> ⚠️ Le bouton « Télécharger le CV » pointe vers `/cv.pdf` — déposer le PDF dans `public/`.
> L'image de partage social attend `public/og-image.png` (1200×630).

## Déploiement

Deux voies, au choix.

### 1. Voie simple — Cloudflare Pages / Vercel

Build statique, déploiement en un clic.

- **Build command :** `npm run build`
- **Output directory :** `dist`
- Le fallback SPA est géré par `public/_redirects` (Cloudflare Pages / Netlify) et
  `vercel.json` (Vercel).

### 2. Voie démonstrative — Docker + Nginx derrière Cloudflare

C'est la voie qui illustre le mieux la compétence Cloud.

```bash
docker build -t portfolio .
docker run -p 8080:80 portfolio   # http://localhost:8080
```

- Build multi-stage (`node:22-alpine` → `nginx:1.27-alpine`), image finale légère.
- `nginx.conf` : fallback SPA, gzip, cache long sur les assets fingerprintés, en-têtes de
  sécurité. En production, servir derrière Cloudflare (DNS + WAF + TLS) ; décommenter HSTS
  si le TLS est terminé directement par Nginx.

## Objectifs qualité

- Lighthouse ≥ 95 (Performance / Accessibility / Best Practices / SEO).
- Accessibilité : skip link, focus visible, ARIA, `prefers-reduced-motion` respecté.
- Meta tags Open Graph pour le partage (LinkedIn).
