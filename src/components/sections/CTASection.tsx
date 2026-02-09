"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTASection() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative px-4 py-12 pb-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-cyan-500/20 px-6 py-10 text-center backdrop-blur-xl sm:px-8 sm:py-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(99,102,241,0.15),transparent)]" />
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-landing-section font-bold text-white sm:text-landing-section-lg">Ready to automate?</h2>
            <p className="mt-2 text-landing-meta text-slate-400">View runs & monitor your pipeline.</p>
            <motion.div className="mt-5" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <MagneticButton
                strength={0.25}
                onClick={() => router.push("/runs")}
                className="rounded-lg bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-[length:200%_100%] px-8 py-3.5 text-landing-body font-semibold text-white shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] transition-all duration-500 hover:bg-right"
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
