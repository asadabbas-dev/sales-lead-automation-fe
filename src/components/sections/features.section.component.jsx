"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/glass.card.component";

const features = [
  { title: "Ingest", desc: "Webhook → AI scores & extracts", gradient: "from-indigo-500 to-violet-500", icon: "→" },
  { title: "Inspect", desc: "Full payload & reasoning", gradient: "from-cyan-500 to-emerald-500", icon: "◉" },
  { title: "Route", desc: "Slack, Sheets, or tag", gradient: "from-pink-500 to-rose-500", icon: "✓" },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="features" ref={ref} className="relative px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-display text-landing-section font-bold text-white sm:text-landing-section-lg">
            What it does ·{" "}
            <span className="font-normal text-slate-400">Ingest → Inspect → Route</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.35 }}
            >
              <GlassCard>
                <div className="p-4">
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} text-landing-card font-bold text-white`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-landing-card font-semibold text-white">{feature.title}</h3>
                  <p className="mt-0.5 text-landing-meta text-slate-400">{feature.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
