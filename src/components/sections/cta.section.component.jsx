"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { MagneticButton } from "@/components/ui/magnetic.button.component";

export function CTASection() {
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative px-4 py-12 pb-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-white/5 via-white/3 to-white/5 px-6 py-10 text-center backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] sm:px-8 sm:py-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-landing-section font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent sm:text-landing-section-lg">Monitor your automation</h2>
            <p className="mt-2 text-base text-slate-200">View all runs, inspect lead details, and track performance metrics.</p>
            <motion.div className="mt-5" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <MagneticButton
                strength={0.25}
                onClick={() => router.push("/runs")}
                className="rounded-lg bg-white px-8 py-3.5 text-landing-body font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.4),0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.3)]"
              >
                View Runs
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
