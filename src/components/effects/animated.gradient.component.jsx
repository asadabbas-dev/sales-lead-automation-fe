"use client";

import { motion } from "framer-motion";

export function AnimatedGradient({ className = "" }) {
  return (
    <motion.div
      animate={{
        background: [
          "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
          "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)",
          "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)",
          "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
        ],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className={`absolute inset-0 ${className}`}
    />
  );
}
