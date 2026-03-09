"use client";

import { useMemo } from "react";

export function useStatCard({ value }) {
  const displayType = useMemo(() => {
    if (value === null || value === undefined) {
      return "empty";
    }
    if (typeof value === "number") {
      return "number";
    }
    return "string";
  }, [value]);

  return { displayType, value };
}
