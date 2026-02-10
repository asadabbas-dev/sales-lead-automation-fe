"use client";

import { motion } from "framer-motion";
import { StatusBadge } from "./status.badge.component";
import {
  ChevronRight,
  Clock,
  Zap,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function formatTime(iso) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  } catch {
    return iso;
  }
}

function StatusIndicator({ status }) {
  const configs = {
    success: {
      icon: CheckCircle2,
      color: "text-cyan-400",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      pulse: "bg-cyan-400",
    },
    failed: {
      icon: XCircle,
      color: "text-red-400",
      glow: "shadow-[0_0_15px_rgba(239,68,68,0.5)]",
      pulse: "bg-red-400",
    },
    processing: {
      icon: Loader2,
      color: "text-blue-400",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      pulse: "bg-blue-400",
      animate: "animate-spin",
    },
    queued: {
      icon: Clock,
      color: "text-violet-400",
      glow: "shadow-[0_0_15px_rgba(139,92,246,0.5)]",
      pulse: "bg-violet-400",
    },
  };

  const config = configs[status] || configs.queued;
  const Icon = config.icon;

  return (
    <div className="relative">
      <Icon
        className={`h-4 w-4 ${config.color} ${config.glow} ${config.animate || ""}`}
      />
      {status === "processing" && (
        <div className={`absolute inset-0 animate-ping rounded-full ${config.pulse} opacity-20`} />
      )}
    </div>
  );
}

export function RunsDataGrid({ runs, onRowClick, loading }) {
  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-lg bg-white/10"
            />
          ))}
        </div>
      </div>
    );
  }

  if (runs.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-12 text-center shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <p className="text-base font-medium text-slate-200">No runs found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-[0_0_25px_rgba(59,130,246,0.2)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr className="bg-white/10">
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-slate-200">
                Run ID
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-slate-200">
                Source
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-slate-200">
                Status
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-slate-200">
                AI Decision
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-slate-200">
                Score
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-slate-200">
                Trigger Time
              </th>
              <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-wider text-slate-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-transparent">
            {runs.map((run, index) => (
              <motion.tr
                key={run.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                onClick={() => onRowClick?.(run)}
                className="group cursor-pointer transition-all hover:bg-white/10"
              >
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-cyan-400">
                      {run.id.slice(0, 8)}...
                    </code>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="text-sm font-medium text-white">
                    {run.source}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2">
                    <StatusIndicator status={run.status} />
                    <StatusBadge status={run.status} />
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {run.qualified === null ? (
                    <span className="text-sm text-slate-400">—</span>
                  ) : (
                    <StatusBadge
                      status={run.qualified ? "qualified" : "unqualified"}
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {run.score !== null && run.score !== undefined ? (
                    <span className="text-sm font-semibold text-cyan-400">
                      {run.score}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-400">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    <Clock className="h-3.5 w-3.5 text-cyan-400" />
                    {formatTime(run.created_at)}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    View
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
