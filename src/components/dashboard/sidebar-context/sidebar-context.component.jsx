"use client";

import { useSidebarContext, SidebarContext } from "./use-sidebar-context.hook";

export function SidebarProvider({ children }) {
  const { isCollapsed, setIsCollapsed } = useSidebarContext();

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export { useSidebar } from "./use-sidebar-context.hook";
