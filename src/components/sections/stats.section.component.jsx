"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "10x", label: "Faster qualification" },
  { value: "0", label: "Manual triage required" },
  { value: "100%", label: "Audit trail coverage" },
];

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <h2 className="font-display text-landing-section font-bold text-white sm:text-landing-section-lg">
            Performance metrics ·{" "}
            <span className="font-normal bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">System efficiency</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="flex h-full min-h-[160px] flex-col justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-5 text-center backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              <p className="font-display text-landing-section-lg font-bold text-white">
                <span className={`bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] ${
                  i === 0 ? "bg-gradient-to-r from-blue-400 to-cyan-400" :
                  i === 1 ? "bg-gradient-to-r from-emerald-400 to-teal-400" :
                  "bg-gradient-to-r from-purple-400 to-pink-400"
                }`}>
                  {stat.value}
                </span>
              </p>
              <p className="mt-1 text-landing-meta text-slate-200">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
