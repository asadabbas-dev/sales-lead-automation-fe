"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/glass.card.component";

const useCases = [
  { pain: "Manual triage", outcome: "Auto scoring", gradient: "from-indigo-500/20 to-violet-500/20" },
  { pain: "Lost leads", outcome: "Logged & auditable", gradient: "from-cyan-500/20 to-emerald-500/20" },
  { pain: "No visibility", outcome: "Real-time metrics", gradient: "from-purple-500/20 to-pink-500/20" },
  { pain: "Duplicate runs", outcome: "Idempotent pipeline", gradient: "from-rose-500/20 to-orange-500/20" },
];

export function UseCasesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="use-cases" ref={ref} className="relative px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-display text-landing-section font-bold text-white sm:text-landing-section-lg">
            Use cases ·{" "}
            <span className="font-normal text-slate-400">Teams that ship faster</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.pain}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <GlassCard>
                <div className={`rounded-xl bg-gradient-to-br ${uc.gradient} p-3`}>
                  <p className="text-landing-meta text-slate-400">{uc.pain}</p>
                  <p className="mt-1 text-landing-card font-semibold text-white">{uc.outcome}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
