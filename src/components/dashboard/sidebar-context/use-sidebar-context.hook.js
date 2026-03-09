"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function useSidebarContext() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return { isCollapsed, setIsCollapsed };
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    return { isCollapsed: false, setIsCollapsed: () => {} };
  }
  return context;
}

export { SidebarContext };
