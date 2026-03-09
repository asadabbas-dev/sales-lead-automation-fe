"use client";

import React from "react";
import { useStatusBadge } from "./use-status-badge.hook";

const statusConfig = {
  new: {
    bg: "bg-white/10",
    text: "text-white",
    border: "border-white/20",
    label: "New",
  },
  contacted: {
    bg: "bg-cyan-500/15",
    text: "text-cyan-200",
    border: "border-cyan-500/30",
    label: "Contacted",
  },
  lost: {
    bg: "bg-slate-500/15",
    text: "text-slate-200",
    border: "border-slate-500/30",
    label: "Lost",
  },
  success: {
    bg: "bg-yellow-300",
    text: "text-black",
    border: "border-yellow-300/30",
    label: "Success",
  },
  failed: {
    bg: "bg-red-500/20",
    text: "text-red-300",
    border: "border-red-500/30",
    label: "Failed",
  },
  qualified: {
    bg: "bg-yellow-300",
    text: "text-black",
    border: "border-yellow-300/30",
    label: "Qualified",
  },
  unqualified: {
    bg: "bg-red-500/20",
    text: "text-red-300",
    border: "border-slate-500/30",
    label: "Unqualified",
  },
};

export function StatusBadge({ status, label }) {
  useStatusBadge();
  const config = statusConfig[status] || statusConfig.unqualified;
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-all ${config.bg} ${config.text} ${config.border} ${config.glow}`}
    >
      {label ?? config.label}
    </span>
  );
}
