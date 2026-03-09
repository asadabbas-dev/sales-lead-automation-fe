"use client";

import { useRef, useMemo } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

export function useHeroSection() {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 60]);

  const splineSceneUrl = useMemo(
    () => process.env.NEXT_PUBLIC_SPLINE_SCENE_URL || null,
    []
  );

  const handleViewRuns = () => {
    router.push("/runs");
  };

  return {
    ref,
    opacity,
    y,
    splineSceneUrl,
    handleViewRuns,
  };
}
