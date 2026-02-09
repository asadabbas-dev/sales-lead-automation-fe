import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  variant?: "default" | "success" | "danger";
}

export function StatCard({ label, value, subtext, variant = "default" }: StatCardProps) {
  const variantStyles = {
    default: "border-neutral-200 bg-white",
    success: "border-success-200 bg-success-50/30",
    danger: "border-danger-200 bg-danger-50/30",
  };

  return (
    <div
      className={`rounded-xl border px-5 py-4 shadow-sm ${variantStyles[variant]}`}
    >
      <p className="text-sm font-medium text-neutral-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-neutral-900">
        {value}
      </p>
      {subtext && (
        <p className="mt-0.5 text-xs text-neutral-400">{subtext}</p>
      )}
    </div>
  );
}
