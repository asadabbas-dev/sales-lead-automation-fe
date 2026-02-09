"use client";

import dynamic from "next/dynamic";

const SplineScene = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false, loading: () => <Hero3DFallback /> },
);

function Hero3DFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0B0E14] to-[#0F172A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(99,102,241,0.2)_0%,transparent_50%)]" />
    </div>
  );
}

type Hero3DProps = {
  splineSceneUrl?: string | null;
};

export function Hero3D({ splineSceneUrl }: Hero3DProps) {
  if (splineSceneUrl) {
    return (
      <div className="absolute inset-0 min-h-full min-w-full overflow-hidden bg-[#030712]">
        <div className="absolute left-[20%] -top-[4%] h-[115%] w-[115%]">
          <SplineScene scene={splineSceneUrl} className="h-full w-full" />
        </div>
        {/* Overlay to cover Spline watermark (bottom-right corner) */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-16 w-40 bg-gradient-to-tl from-[#030712] via-[#030712]/80 to-transparent sm:h-20 sm:w-52"
          aria-hidden
        />
      </div>
    );
  }

  return <Hero3DFallback />;
}
