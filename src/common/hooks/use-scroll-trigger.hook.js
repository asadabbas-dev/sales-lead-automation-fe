"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";

export function useScrollTrigger(animation, deps = []) {
  const ref = useRef(null);

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
