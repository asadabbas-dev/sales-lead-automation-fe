"use client";

import { Database, CheckCircle2, XCircle, Clock, Brain } from "lucide-react";
import { formatDuration } from "@/common/utils/format-duration";
import { StatCard } from "./components/stat-card/stat-card.component";
import { useStatsOverviewBar } from "./use-stats-overview-bar.hook";

export function StatsOverviewBar({ stats }) {
  const {
    total = 0,
    success = 0,
    failed = 0,
    qualified = 0,
    // avgTime: null means we don't have this data from the backend yet
    avgTime = null,
    aiCalls = 0,
  } = stats || {};

  const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
  const { isCollapsed } = useStatsOverviewBar();

  return (
    <div
      className={`grid gap-3 bg-white/20 rounded-lg p-3 ${
        isCollapsed
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
          : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      <StatCard icon={Database} label="Total Runs" value={total} delay={0} />
      <StatCard
        icon={CheckCircle2}
        label="Success Rate"
        value={`${successRate}%`}
        delay={0.05}
      />
      <StatCard icon={XCircle} label="Failed" value={failed} delay={0.1} />
      <StatCard
        icon={CheckCircle2}
        label="Qualified"
        value={qualified}
        delay={0.15}
      />
      <StatCard
        icon={Clock}
        label="Avg Time"
        value={formatDuration(avgTime)}
        delay={0.2}
      />
      <StatCard
        icon={Brain}
        label="AI Calls Today"
        value={aiCalls}
        delay={0.25}
      />
    </div>
  );
}
