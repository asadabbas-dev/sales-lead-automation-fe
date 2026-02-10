"use client";

import { motion } from "framer-motion";

export function GlassCard({ children, className = "", hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={`
        rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.2)]
        transition-all duration-300
        hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
