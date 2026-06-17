import { Github } from "lucide-react";
import { CodeMark } from "@/components/ui/CodeMark";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-navy text-cream/60">
      <div className="container-content flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <CodeMark size={22} animate={false} className="text-accent" />
          <span className="font-display text-sm font-semibold text-cream">{site.name}</span>
        </div>

        <p className="text-xs">
          Construit avec React + Vite + Framer Motion. Déployé via Docker derrière Cloudflare.
        </p>

        <a
          href={site.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs text-cream/80 transition-colors hover:text-accent"
        >
          <Github size={15} /> Code source du portfolio
        </a>
      </div>
    </footer>
  );
}
