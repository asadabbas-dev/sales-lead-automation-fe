"use client";

import { motion } from "framer-motion";

export function GradientDivider() {
  return (
    <div className="mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto h-px max-w-5xl origin-center bg-gradient-to-r from-transparent via-white/30 via-white/40 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)]"
      />
    </div>
  );
}
