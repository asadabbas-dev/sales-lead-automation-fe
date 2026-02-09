"use client";

import { useEffect } from "react";
import { initLenis } from "@/lib/animations/lenis";
import { syncLenisWithGSAP } from "@/lib/animations/gsap";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = initLenis();
    if (lenis) {
      syncLenisWithGSAP(lenis);
    }
    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
