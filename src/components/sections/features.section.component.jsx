"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/glass.card.component";

const features = [
  { title: "Receive Lead", desc: "Leads arrive from forms, webhooks, WhatsApp, or ads", gradient: "from-blue-400 to-cyan-400", icon: "→", titleColor: "text-blue-300" },
  { title: "Qualify with AI", desc: "AI analyzes, extracts, and scores each lead", gradient: "from-purple-400 to-pink-400", icon: "◉", titleColor: "text-purple-300" },
  { title: "Route Automatically", desc: "Qualified leads routed to Slack, Sheets, or tagged", gradient: "from-emerald-400 to-teal-400", icon: "✓", titleColor: "text-emerald-300" },
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
          className="mb-10 text-center"
        >
          <h2 className="font-display text-landing-section font-bold text-white sm:text-landing-section-lg">
            How it works ·{" "}
            <span className="font-normal bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">Receive → Qualify → Route</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="h-full"
            >
              <GlassCard className="h-full min-h-[160px]">
                <div className="flex h-full flex-col p-5">
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} text-landing-card font-bold text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className={`font-display text-landing-card font-semibold ${feature.titleColor}`}>{feature.title}</h3>
                  <p className="mt-0.5 text-landing-meta text-slate-200">{feature.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
