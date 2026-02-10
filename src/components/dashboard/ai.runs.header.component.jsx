"use client";

import { motion } from "framer-motion";

export function AIRunsHeader() {

  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-1 font-display text-3xl font-bold tracking-tight"
        >
          <span className="text-white">
            AI Runs
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm font-medium text-slate-200"
        >
          System activity, workflows, and AI execution history
        </motion.p>
      </div>

    </div>
  );
}
