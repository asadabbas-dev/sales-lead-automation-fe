"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/glass.card.component";

const trustItems = [
  { label: "Retry-safe", desc: "No duplicate processing", icon: "↻", iconColor: "text-blue-400", labelColor: "text-blue-300" },
  { label: "Auditable", desc: "Full run history", icon: "◉", iconColor: "text-emerald-400", labelColor: "text-emerald-300" },
  { label: "Deterministic", desc: "Same input, same result", icon: "≡", iconColor: "text-purple-400", labelColor: "text-purple-300" },
];

export function TrustSection() {
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
            Reliability & compliance ·{" "}
            <span className="font-normal bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Production-ready features</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 h-px w-full origin-center bg-gradient-to-r from-transparent via-white/30 via-white/40 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="h-full"
            >
              <GlassCard className="h-full min-h-[160px]">
                <div className="flex h-full items-center gap-4 p-5">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-landing-section font-bold ${item.iconColor} shadow-[0_0_15px_rgba(255,255,255,0.3)]`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className={`font-display text-landing-card font-semibold ${item.labelColor}`}>{item.label}</p>
                    <p className="text-landing-meta text-slate-200">{item.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-8 text-center text-sm text-slate-200"
        >
          Production-ready automation. Idempotent pipeline. Complete audit trail for compliance.
        </motion.p>
      </div>
    </section>
  );
}
