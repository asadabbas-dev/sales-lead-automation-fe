"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Database, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSidebar } from "./sidebar.context";

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const navItems = [
    {
      href: "/",
      label: "Overview",
      icon: Home,
    },
    {
      href: "/runs",
      label: "Automation Runs",
      icon: Database,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-sm text-white"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-black/95 backdrop-blur-xl border-r border-white/10 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        } ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Brand */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
            {!isCollapsed ? (
              <>
                <Link
                  href="/"
                  className="font-display text-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent hover:text-yellow-300 transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Lead Ops
                </Link>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden lg:flex items-center justify-center rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full flex items-center justify-center rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-yellow-400"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-300 hover:no-underline"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
