"use client";

import { useState, useCallback } from "react";

export function useCollapsibleSection({ defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return {
    open,
    toggle,
  };
}
