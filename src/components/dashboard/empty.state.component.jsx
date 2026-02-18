"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-16 text-center shadow-[0_0_20px_rgba(255,255,255,0.05)]">
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-yellow-400">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-300">{description}</p>
      {actionLabel && actionHref && (
        <button
          onClick={() => router.push(actionHref)}
          className="mt-6 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-slate-100"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
