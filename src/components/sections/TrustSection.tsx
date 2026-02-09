"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const trustItems = [
  { label: "Retry-safe", desc: "No duplicate processing", icon: "↻" },
  { label: "Auditable", desc: "Full run history", icon: "◉" },
  { label: "Deterministic", desc: "Same input, same result", icon: "≡" },
];

export function TrustSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 h-px w-full origin-center bg-gradient-to-r from-transparent via-indigo-500/50 via-violet-500/50 to-transparent"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <GlassCard>
                <div className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-landing-section font-bold text-indigo-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-display text-landing-card font-semibold text-white">{item.label}</p>
                    <p className="text-landing-meta text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-landing-meta text-slate-500">
          Trained on lead patterns. Idempotent. Full audit trail.
        </p>
      </div>
    </section>
  );
}
