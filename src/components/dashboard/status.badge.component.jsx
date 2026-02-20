import React from "react";

const statusConfig = {
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
  const config = statusConfig[status] || statusConfig.unqualified;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all ${config.bg} ${config.text} ${config.border} ${config.glow}`}
    >
      {label ?? config.label}
    </span>
  );
}
