"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Database,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  Brain,
} from "lucide-react";
import { useEffect } from "react";
import { useSidebar } from "./sidebar.context";

function AnimatedCounter({ value, duration = 1.5 }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return <motion.span>{display}</motion.span>;
}

function StatCard({ icon: Icon, label, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all hover:bg-white/10"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
            <Icon className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-xs font-medium text-slate-200 truncate">{label}</p>
        </div>
        <p className="text-xl font-bold text-white shrink-0">
          {typeof value === "number" ? (
            <AnimatedCounter value={value} />
          ) : (
            value
          )}
        </p>
      </div>
    </motion.div>
  );
}

export function StatsOverviewBar({ stats }) {
  const {
    total = 0,
    success = 0,
    failed = 0,
    avgTime = 0,
    active = 0,
    aiCalls = 0,
  } = stats || {};

  const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`mb-4 grid gap-3 ${
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
        icon={Clock}
        label="Avg Time"
        value={`${avgTime}ms`}
        delay={0.15}
      />
      <StatCard icon={Zap} label="Active" value={active} delay={0.2} />
      <StatCard
        icon={Brain}
        label="AI Calls Today"
        value={aiCalls}
        delay={0.25}
      />
    </div>
  );
}
