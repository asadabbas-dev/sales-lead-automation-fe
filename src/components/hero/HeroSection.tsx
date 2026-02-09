"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { Hero3D } from "@/components/canvas/Hero3D";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Set your Spline scene URL here or via NEXT_PUBLIC_SPLINE_SCENE_URL
const SPLINE_SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL || null;

export function HeroSection() {
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden pt-14 lg:min-h-[85vh]"
    >
      {/* Full-width 3D background - Spline or Three.js */}
      <div className="absolute inset-0">
        <Hero3D splineSceneUrl={SPLINE_SCENE_URL} />
      </div>

      {/* Gradient overlay - dark left for text, transparent right to show Spline (brain + particles) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/60 to-transparent" />

      {/* Hero content - left aligned on top of full 3D */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-7xl px-4 py-12 text-left sm:px-6 sm:py-16 lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-xl"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-landing-meta font-medium text-slate-300">
            AI-powered lead qualification
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="font-display text-landing-hero font-bold sm:text-landing-hero-lg lg:text-landing-hero-xl"
        >
          <span className="block text-white">AI that qualifies</span>
          <span className="mt-1 block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            leads & routes — instantly
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="mt-4 max-w-md text-landing-body text-slate-400"
        >
          Leads from forms, web, WhatsApp, or ads. AI scores, extracts, routes.
          No manual triage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-6 flex flex-wrap gap-3"
        >
          <MagneticButton
            strength={0.3}
            onClick={() => router.push("/runs")}
            className="rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 bg-[length:200%_100%] px-6 py-3 text-landing-body font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,92,246,0.6)] transition-all duration-500 hover:bg-right"
          >
            Try Demo
          </MagneticButton>
          <MagneticButton
            strength={0.2}
            onClick={() => router.push("/runs")}
            className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-landing-body font-semibold text-white backdrop-blur-sm hover:border-indigo-500/50 hover:bg-white/10"
          >
            View Runs
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
