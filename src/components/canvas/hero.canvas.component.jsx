"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useMousePosition } from "@/common/hooks/use-mouse-position.hook";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  {
    ssr: false,
    loading: () => <CanvasFallback />,
  },
);

const HeroScene = dynamic(
  () =>
    import("./hero.scene.component").then((mod) => ({
      default: mod.HeroScene,
    })),
  {
    ssr: false,
  },
);

function CanvasFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0B0E14] to-[#0F172A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(99,102,241,0.2)_0%,transparent_50%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-2 w-32 animate-pulse rounded-full bg-indigo-500/30" />
      </div>
    </div>
  );
}

export function HeroCanvas() {
  const { normalized } = useMousePosition();

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <HeroScene mouse={normalized} />
        </Suspense>
      </Canvas>
    </div>
  );
}
