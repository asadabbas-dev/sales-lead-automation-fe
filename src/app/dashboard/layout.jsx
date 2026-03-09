"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar/dashboard-sidebar.component";
import { DashboardHeader } from "@/components/dashboard/dashboard-header/dashboard-header.component";
import { AnimatedBackground } from "@/components/dashboard/animated-background/animated-background.component";
import { SidebarProvider, useSidebar } from "@/components/dashboard/sidebar-context/sidebar-context.component";

function LayoutContent({ children }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <AnimatedBackground />
      <DashboardSidebar />
      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ml-0 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <DashboardHeader />
        <main className="relative z-10 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
