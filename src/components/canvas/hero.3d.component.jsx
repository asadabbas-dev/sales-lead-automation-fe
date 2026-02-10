"use client";

import dynamic from "next/dynamic";

const SplineScene = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false, loading: () => <Hero3DFallback /> },
);

function Hero3DFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#0f0f0f]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
    </div>
  );
}

export function Hero3D({ splineSceneUrl }) {
  if (splineSceneUrl) {
    return (
      <div className="absolute inset-0 min-h-full min-w-full overflow-hidden bg-black">
        <div className="absolute left-[20%] -top-[4%] h-[115%] w-[115%]">
          <SplineScene scene={splineSceneUrl} className="h-full w-full" />
        </div>
        {/* Overlay to cover Spline watermark (bottom-right corner) */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-16 w-40 bg-gradient-to-tl from-black via-black/80 to-transparent sm:h-20 sm:w-52"
          aria-hidden
        />
      </div>
    );
  }

  return <Hero3DFallback />;
}
