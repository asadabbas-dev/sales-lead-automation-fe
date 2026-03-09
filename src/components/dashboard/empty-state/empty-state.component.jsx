"use client";

import React from "react";
import { useEmptyState } from "./use-empty-state.hook";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
}) {
  const { handleAction } = useEmptyState({ actionHref });

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm px-8 py-16 text-center shadow-[0_0_20px_rgba(255,255,255,0.05)]">
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-300/20 text-yellow-300">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-white/70">{description}</p>
      {/* {actionLabel && actionHref && (
        <button
          onClick={handleAction}
          className="mt-6 rounded-lg bg-yellow-300 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-yellow-200"
        >
          {actionLabel}
        </button>
      )} */}
    </div>
  );
}
