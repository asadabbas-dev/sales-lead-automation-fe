"use client";

import React from "react";
import { useCollapsibleSection } from "./use-collapsible-section.hook";

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}) {
  const { open, toggle } = useCollapsibleSection({ defaultOpen });

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-white transition-colors hover:bg-white/5"
      >
        {title}
        <svg
          className={`h-5 w-5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="border-t border-white/10 px-5 py-4">{children}</div>
      )}
    </div>
  );
}
