"use client";

import { useSidebar } from "../sidebar-context/sidebar-context.component";

export function useStatsOverviewBar() {
  const { isCollapsed } = useSidebar();

  return {
    isCollapsed,
  };
}
