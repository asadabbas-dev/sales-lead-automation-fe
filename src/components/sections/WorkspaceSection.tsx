"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

export function WorkspaceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="workspace" ref={ref} className="relative px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-display text-landing-section font-bold text-white sm:text-landing-section-lg">
            One workspace ·{" "}
            <span className="font-normal text-slate-400">Runs + Dashboard together</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <GlassCard>
            <div className="overflow-hidden rounded-xl">
              <div className="grid sm:grid-cols-[180px_1fr]">
                <div className="border-b border-white/10 bg-white/5 p-3 sm:border-b-0 sm:border-r">
                  <p className="text-landing-meta font-semibold uppercase tracking-wider text-slate-500">Runs</p>
                  <div className="mt-2 space-y-1">
                    {["#4821", "#4820", "#4819"].map((r) => (
                      <div key={r} className="rounded bg-white/5 px-2 py-1.5 text-landing-meta text-slate-300">
                        Run {r}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-landing-meta font-semibold uppercase tracking-wider text-slate-500">Detail</p>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-1.5 w-24 rounded bg-slate-600" />
                    <div className="h-1.5 w-full rounded bg-slate-700" />
                    <div className="h-1.5 w-3/4 rounded bg-slate-700" />
                    <div className="mt-3 flex gap-2">
                      <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-landing-meta text-indigo-300">Score 82</span>
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-landing-meta text-emerald-300">Qualified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
