"use client";

import { AnimatedCounter } from "../animated-counter/animated-counter.component";
import { useStatCard } from "./use-stat-card.hook";

export function StatCard({ icon: Icon, label, value }) {
  const { displayType, value: val } = useStatCard({ value });

  const displayValue =
    displayType === "empty" ? (
      <span className="text-white/50 text-base font-medium">&mdash;</span>
    ) : displayType === "number" ? (
      <AnimatedCounter value={val} />
    ) : (
      val
    );

  return (
    <div className="rounded-lg bg-black p-3 backdrop-blur-sm transition-all hover:bg-black/50">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-300/20">
            <Icon className="h-4 w-4 text-yellow-300" />
          </div>
          <p className="text-xs font-medium text-white truncate">{label}</p>
        </div>
        <p className="text-xl font-bold text-white shrink-0">{displayValue}</p>
      </div>
    </div>
  );
}
