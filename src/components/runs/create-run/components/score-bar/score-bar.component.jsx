"use client";

import { motion } from "framer-motion";

export function ScoreBar({ score }) {
  const color =
    score >= 70
      ? "from-yellow-300 to-emerald-400"
      : score >= 40
        ? "from-yellow-500 to-orange-400"
        : "from-red-500 to-rose-400";
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-white">
        <span>AI Score</span>
        <span className="font-bold text-white">{score} / 100</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}
