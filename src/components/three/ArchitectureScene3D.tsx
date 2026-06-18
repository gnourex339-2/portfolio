import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Html, Line, OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import {
  ARCH_EDGES,
  ARCH_NODES,
  ARCH_ROUTE,
  nodeById,
  type ArchNode,
} from "../../data/architecture";

const COLORS = {
  slab: "#13233b",
  slabHover: "#1b3257",
  accent: "#1d4ed8",
  accentHover: "#2563eb",
  edge: "#3a4f6b",
  packet: "#7cc0ff",
};

function NodeMesh({
  node,
  hovered,
  onHover,
}: {
  node: ArchNode;
  hovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const base = node.accent ? COLORS.accent : COLORS.slab;
  const color = hovered ? (node.accent ? COLORS.accentHover : COLORS.slabHover) : base;
  const h = node.accent ? 0.85 : 0.55;

  return (
    <group position={node.pos}>
      <RoundedBox
        args={[1.9, h, 1.25]}
        radius={0.1}
        smoothness={4}
        position={[0, h / 2, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "";
        }}
        scale={hovered ? 1.05 : 1}
      >
        <meshStandardMaterial
          color={color}
          emissive={node.accent ? COLORS.accent : "#0c1626"}
          emissiveIntensity={hovered ? 0.5 : 0.18}
          roughness={0.45}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Billboard label (DOM, always faces camera) */}
      <Html center position={[0, h + 0.7, 0]} distanceFactor={9} pointerEvents="none">
        <div style={{ textAlign: "center", whiteSpace: "nowrap", userSelect: "none" }}>
          <div
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 600,
              fontSize: 15,
              color: "#F4F7FB",
              letterSpacing: "-0.01em",
            }}
          >
            {node.label}
          </div>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 9.5,
              color: "#8aa0bd",
              marginTop: 1,
            }}
          >
            {node.sub}
          </div>
        </div>
      </Html>
    </group>
  );
}

function Edge({ from, to, active }: { from: ArchNode; to: ArchNode; active: boolean }) {
  const y = 0.28;
  const a = new THREE.Vector3(from.pos[0], y, from.pos[2]);
  const b = new THREE.Vector3(to.pos[0], y, to.pos[2]);
  // gentle elbow so api→db edges curve
  const mid = new THREE.Vector3((a.x + b.x) / 2, y, (a.z + b.z) / 2);
  const points = [a, mid, b];
  return (
    <Line
      points={points}
      color={active ? COLORS.packet : COLORS.edge}
      lineWidth={active ? 3 : 1.5}
      transparent
      opacity={active ? 1 : 0.7}
    />
  );
}

function Packet({ animate }: { animate: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  // Build the polyline the packet follows, with cumulative lengths.
  const { waypoints, segLen, total } = useMemo(() => {
    const wp = ARCH_ROUTE.map((id) => {
      const p = nodeById(id).pos;
      return new THREE.Vector3(p[0], 0.28, p[2]);
    });
    const seg: number[] = [];
    let tot = 0;
    for (let i = 0; i < wp.length - 1; i++) {
      const d = wp[i].distanceTo(wp[i + 1]);
      seg.push(d);
      tot += d;
    }
    return { waypoints: wp, segLen: seg, total: tot };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (!animate) {
      ref.current.position.copy(waypoints[0]);
      return;
    }
    t.current = (t.current + delta * 0.18) % 1.25; // pause at end of loop
    const dist = Math.min(t.current, 1) * total;
    let acc = 0;
    for (let i = 0; i < segLen.length; i++) {
      if (dist <= acc + segLen[i] || i === segLen.length - 1) {
        const local = THREE.MathUtils.clamp((dist - acc) / segLen[i], 0, 1);
        ref.current.position.lerpVectors(waypoints[i], waypoints[i + 1], local);
        break;
      }
      acc += segLen[i];
    }
    const visible = t.current <= 1;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = visible ? 1 : 0;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.16, 16, 16]} />
      <meshBasicMaterial color={COLORS.packet} transparent toneMapped={false} />
    </mesh>
  );
}

function Scene({
  hovered,
  onHover,
  reduce,
}: {
  hovered: string | null;
  onHover: (id: string | null) => void;
  reduce: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 10, 6]} intensity={1.1} />
      <directionalLight position={[-6, 4, -4]} intensity={0.3} color="#3b82f6" />

      <group position={[0, -0.4, 0]}>
        {ARCH_EDGES.map(([f, t]) => (
          <Edge
            key={`${f}-${t}`}
            from={nodeById(f)}
            to={nodeById(t)}
            active={hovered === f || hovered === t}
          />
        ))}

        {ARCH_NODES.map((n) => (
          <NodeMesh key={n.id} node={n} hovered={hovered === n.id} onHover={onHover} />
        ))}

        <Packet animate={!reduce} />

        <Grid
          position={[0, -0.02, 0]}
          args={[24, 16]}
          cellSize={0.8}
          cellThickness={0.6}
          cellColor="#1e2a3a"
          sectionSize={4}
          sectionThickness={1}
          sectionColor="#2a3a4f"
          fadeDistance={26}
          fadeStrength={1.5}
          infiniteGrid
        />
      </group>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        autoRotate={!reduce}
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        target={[-0.5, 0, 0]}
      />
    </>
  );
}

export default function ArchitectureScene3D({
  onHover,
  hovered,
  reduce,
}: {
  onHover: (id: string | null) => void;
  hovered: string | null;
  reduce: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [5, 5.5, 9], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene hovered={hovered} onHover={onHover} reduce={reduce} />
    </Canvas>
  );
}
