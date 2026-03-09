"use client";

import { useAnimatedCounter } from "./use-animated-counter.hook";

export function AnimatedCounter({ value }) {
  const display = useAnimatedCounter(value);
  return <span>{display}</span>;
}
