"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-semibold text-neutral-900">
          Lead Ops
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === "/" ? "text-primary-600" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Overview
          </Link>
          <Link
            href="/runs"
            className={`text-sm font-medium ${
              pathname?.startsWith("/runs") ? "text-primary-600" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Automation Runs
          </Link>
        </nav>
      </div>
    </header>
  );
}
