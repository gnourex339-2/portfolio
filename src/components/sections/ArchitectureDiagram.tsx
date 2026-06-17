import { lazy, Suspense, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ARCH_NODES, ARCH_ROUTE, nodeById } from "@/data/architecture";

const ArchitectureScene3D = lazy(
  () => import("@/components/three/ArchitectureScene3D"),
);

/**
 * Signature moment 2 (brief §4) — the BATINNOV architecture as an animated
 * isometric 3D scene: slabs for each component, a glowing request packet that
 * travels User → … → PostgreSQL, gentle auto-orbit, hover for context.
 * Reduced-motion users get a static, accessible flow instead.
 */
export function ArchitectureDiagram() {
  const reduce = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <figure className="relative">
      <figcaption className="sr-only">
        Diagramme 3D de l'architecture BATINNOV : une requête traverse Cloudflare, Nginx et
        l'API avant d'atteindre PostgreSQL et Redis.
      </figcaption>

      {reduce ? (
        <ReducedFlow />
      ) : (
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-line-dark bg-[radial-gradient(120%_120%_at_50%_0%,#16273f_0%,#0a1322_70%)] md:h-[480px]">
          <Suspense fallback={<SceneLoading />}>
            <ArchitectureScene3D
              hovered={hovered}
              onHover={setHovered}
              reduce={reduce}
            />
          </Suspense>
          <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[0.65rem] uppercase tracking-widest text-cream/30">
            Glissez pour pivoter
          </span>
        </div>
      )}

      {/* Context line — driven by hover, below the scene so it never clips */}
      <div className="mt-4 flex min-h-[2.75rem] items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink/80">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        {hovered ? (
          nodeById(hovered).tip
        ) : (
          <span className="text-muted">
            Survolez un composant pour comprendre son rôle. Le point lumineux suit le trajet
            d'une requête, de l'utilisateur jusqu'à la base de données.
          </span>
        )}
      </div>
    </figure>
  );
}

function SceneLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="font-mono text-xs uppercase tracking-widest text-cream/40">
        Chargement de la scène 3D…
      </span>
    </div>
  );
}

/** Static, accessible fallback for prefers-reduced-motion. */
function ReducedFlow() {
  return (
    <div className="rounded-2xl border border-line-dark bg-[color-mix(in_srgb,var(--color-navy)_70%,#000)] p-6">
      <ol className="flex flex-wrap items-stretch gap-2">
        {ARCH_NODES.map((n) => {
          const inRoute = ARCH_ROUTE.includes(n.id);
          return (
            <li
              key={n.id}
              className={`flex min-w-[130px] flex-1 flex-col rounded-xl border p-4 ${
                n.accent
                  ? "border-accent/40 bg-accent/10"
                  : "border-line-dark bg-[#13233b]"
              }`}
            >
              <span className="font-display text-base font-semibold text-cream">
                {n.label}
              </span>
              <span className="mt-0.5 font-mono text-[0.7rem] text-[#8aa0bd]">
                {n.sub}
              </span>
              <span className="mt-2 text-xs leading-snug text-cream/60">{n.tip}</span>
              {inRoute && (
                <span className="mt-2 font-mono text-[0.6rem] uppercase tracking-wider text-accent">
                  chemin requête
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
