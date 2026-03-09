"use client";

export function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <Icon className="h-3.5 w-3.5 text-yellow-300" />
      <span className="text-xs font-semibold uppercase tracking-wider text-yellow-300">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}
