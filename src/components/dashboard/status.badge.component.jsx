import React from "react";

const statusConfig = {
  success: { bg: "bg-success-100", text: "text-success-800", label: "Success" },
  failed: { bg: "bg-danger-100", text: "text-danger-800", label: "Failed" },
  qualified: { bg: "bg-success-100", text: "text-success-800", label: "Qualified" },
  unqualified: { bg: "bg-neutral-100", text: "text-neutral-700", label: "Unqualified" },
};

export function StatusBadge({ status, label }) {
  const config = statusConfig[status] || statusConfig.unqualified;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}
    >
      {label ?? config.label}
    </span>
  );
}
