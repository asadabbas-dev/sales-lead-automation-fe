"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

export function useScrollTrigger(
  animation: (el: HTMLElement, gsap: typeof import("gsap")) => void,
  deps: unknown[] = []
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      animation(el, gsap);
    }, el);

    return () => ctx.revert();
  }, deps);

  return ref;
}
