"use client";

import { usePathname } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { Home, Database, Settings, Users, Briefcase } from "lucide-react";
import { useSidebar } from "../sidebar-context/sidebar-context.component";

export function useDashboardSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const navItems = useMemo(
    () => [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: Home,
      },
      {
        href: "/leads",
        label: "Leads",
        icon: Users,
      },
      {
        href: "/runs",
        label: "Automation Runs",
        icon: Database,
      },
      {
        href: "/opportunities",
        label: "Opportunities",
        icon: Briefcase,
      },
      {
        href: "/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
    []
  );

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, [setIsCollapsed]);

  const getNavItemActive = useCallback(
    (href) => {
      return (
        pathname === href || (href !== "/" && pathname?.startsWith(href))
      );
    },
    [pathname]
  );

  return {
    isMobileOpen,
    isCollapsed,
    navItems,
    toggleMobile,
    closeMobile,
    toggleCollapse,
    getNavItemActive,
  };
}
