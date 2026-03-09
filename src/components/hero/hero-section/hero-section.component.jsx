"use client";

import { motion } from "framer-motion";
import { Hero3D } from "@/components/canvas/hero.3d.component";
import { MagneticButton } from "@/components/ui/magnetic.button.component";
import { useHeroSection } from "./use-hero-section.hook";

export function HeroSection() {
  const { ref, opacity, y, splineSceneUrl, handleViewRuns } =
    useHeroSection();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden pt-14 lg:min-h-[85vh]"
    >
      {/* Full-width 3D background - Spline or Three.js */}
      <div className="absolute inset-0">
        <Hero3D splineSceneUrl={splineSceneUrl} />
      </div>

      {/* Gradient overlay - dark left for text, transparent right to show Spline (brain + particles) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Hero content - left aligned on top of full 3D */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 text-left sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
          </span>
          <span className="text-landing-meta font-medium text-yellow-400">
            Internal automation dashboard
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mb-5 font-display text-landing-hero font-bold leading-tight sm:text-landing-hero-lg lg:text-landing-hero-xl"
        >
          <span className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]">Automated Lead Qualification</span>
          <span className="mt-2 block bg-gradient-to-r from-purple-400 via-violet-400 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            & Routing Dashboard
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="mb-6 max-w-lg text-base leading-relaxed text-slate-200 sm:text-lg"
        >
          Monitor automation runs, inspect lead qualification results, and track performance. 
          See which leads are qualified and debug safely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-6 flex flex-wrap gap-4"
        >
          <MagneticButton
            strength={0.3}
            onClick={handleViewRuns}
            className="rounded-lg bg-white px-8 py-4 text-base font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.4),0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.3)] hover:scale-105 sm:px-10 sm:py-4 sm:text-lg"
          >
            View Runs
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
