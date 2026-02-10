import React from "react";

export function StatCard({ label, value, subtext, variant = "default" }) {
  const variantStyles = {
    default: "border-white/10 bg-white/5",
    success: "border-emerald-500/30 bg-emerald-500/10",
    danger: "border-red-500/30 bg-red-500/10",
  };

  const valueColors = {
    default: "bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent",
    success: "bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent",
    danger: "bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent",
  };

  return (
    <div
      className={`rounded-xl border backdrop-blur-sm px-6 py-5 shadow-[0_0_20px_rgba(255,255,255,0.05)] ${variantStyles[variant]}`}
    >
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className={`mt-2 font-display text-3xl font-bold ${valueColors[variant]}`}>
        {value}
      </p>
      {subtext && (
        <p className="mt-1 text-xs text-slate-400">{subtext}</p>
      )}
    </div>
  );
}
