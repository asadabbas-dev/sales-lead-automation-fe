"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, FileText, BarChart3, RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/ui/glass.card.component";

const useCases = [
  { pain: "Manual triage", outcome: "Auto scoring", Icon: Zap, gradient: "from-yellow-400/20 to-orange-400/20", iconColor: "text-yellow-400", problemColor: "text-orange-300", solutionColor: "text-yellow-300" },
  { pain: "Lost leads", outcome: "Logged & auditable", Icon: FileText, gradient: "from-blue-400/20 to-cyan-400/20", iconColor: "text-blue-400", problemColor: "text-cyan-300", solutionColor: "text-blue-300" },
  { pain: "No visibility", outcome: "Real-time metrics", Icon: BarChart3, gradient: "from-purple-400/20 to-pink-400/20", iconColor: "text-purple-400", problemColor: "text-pink-300", solutionColor: "text-purple-300" },
  { pain: "Duplicate runs", outcome: "Idempotent pipeline", Icon: RefreshCw, gradient: "from-emerald-400/20 to-teal-400/20", iconColor: "text-emerald-400", problemColor: "text-teal-300", solutionColor: "text-emerald-300" },
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
          className="mb-10 text-center"
        >
          <h2 className="font-display text-landing-section font-bold text-white sm:text-landing-section-lg">
            Key benefits ·{" "}
            <span className="font-normal bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">What this solves</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.pain}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="h-full"
            >
              <GlassCard className="h-full min-h-[160px]">
                <div className="flex h-full flex-col p-5">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${uc.gradient} shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
                    <uc.Icon className={`h-6 w-6 ${uc.iconColor}`} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className={`mb-2 text-xs font-bold uppercase tracking-wider ${uc.problemColor}`}>Problem</p>
                    <p className={`mb-4 text-sm font-semibold ${uc.problemColor}`}>{uc.pain}</p>
                    <p className={`mb-2 text-xs font-bold uppercase tracking-wider ${uc.solutionColor}`}>Solution</p>
                    <p className={`text-base font-bold ${uc.solutionColor}`}>{uc.outcome}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
