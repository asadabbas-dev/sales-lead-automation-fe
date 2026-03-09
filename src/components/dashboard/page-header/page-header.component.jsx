"use client";

import React from "react";
import { usePageHeader } from "./use-page-header.hook";

export function PageHeader({ title, subtitle, action }) {
  usePageHeader();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-white/70">{subtitle}</p>
        )}
      </div>
      {action && <div className="mt-4 sm:mt-0">{action}</div>}
    </div>
  );
}
