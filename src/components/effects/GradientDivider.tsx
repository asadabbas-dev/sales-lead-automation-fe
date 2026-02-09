"use client";

import { motion } from "framer-motion";

export function GradientDivider() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-px w-full origin-center bg-gradient-to-r from-transparent via-indigo-500/40 via-violet-500/40 to-transparent"
      />
    </div>
  );
}
