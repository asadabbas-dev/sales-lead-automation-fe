"use client";

import { motion } from "framer-motion";

export function Scene3D() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated gradient mesh */}
      <motion.div
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(99,102,241,0.3)_0%,transparent_50%)]"
      />
      <motion.div
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_30%,rgba(139,92,246,0.25)_0%,transparent_50%)]"
      />
      <motion.div
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_70%,rgba(6,182,212,0.25)_0%,transparent_50%)]"
      />
      <motion.div
        animate={{
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_70%_80%,rgba(236,72,153,0.2)_0%,transparent_50%)]"
      />
      {/* Floating orbs with CSS animation */}
      <motion.div
        animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-indigo-500/25 blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, 12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -right-1/4 top-1/3 h-80 w-80 rounded-full bg-purple-500/25 blur-[80px]"
      />
      <motion.div
        animate={{ y: [0, -10, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-cyan-500/25 blur-[60px]"
      />
      <motion.div
        animate={{ y: [0, 8, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-pink-500/20 blur-[70px]"
      />
      <motion.div
        animate={{ y: [0, -6, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[50px]"
      />
    </div>
  );
}
