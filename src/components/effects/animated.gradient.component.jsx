"use client";

import { motion } from "framer-motion";

export function AnimatedGradient({ className = "" }) {
  return (
    <motion.div
      animate={{
        background: [
          "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)",
          "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 50%)",
          "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
          "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)",
        ],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className={`absolute inset-0 ${className}`}
    />
  );
}
