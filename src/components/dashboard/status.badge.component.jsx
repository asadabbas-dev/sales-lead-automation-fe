import React from "react";

const statusConfig = {
  success: {
    bg: "bg-yellow-300",
    text: "text-black",
    label: "Success",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.4)]",
  },
  failed: {
    bg: "bg-red-500/20",
    text: "text-red-300",
    border: "border-red-500/30",
    label: "Failed",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.4)]",
  },
  qualified: {
    bg: "bg-yellow-300",
    text: "text-black",
    label: "Qualified",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.4)]",
  },
  unqualified: {
    bg: "bg-slate-500/20",
    text: "text-slate-300",
    border: "border-slate-500/30",
    label: "Unqualified",
    glow: "",
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
