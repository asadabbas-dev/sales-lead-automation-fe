"use client";

export function useAnimatedCounter(value) {
  const num = typeof value === "number" && !Number.isNaN(value) ? value : 0;
  return num;
}
