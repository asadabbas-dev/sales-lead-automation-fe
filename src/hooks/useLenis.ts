"use client";

import { useEffect, useState } from "react";
import { initLenis } from "@/lib/animations/lenis";
import { syncLenisWithGSAP } from "@/lib/animations/gsap";

export function useLenis() {
  const [lenis, setLenis] = useState<ReturnType<typeof initLenis>>(null);

  useEffect(() => {
    const instance = initLenis();
    if (instance) {
      setLenis(instance);
      syncLenisWithGSAP(instance);
    }
    return () => {
      instance?.destroy();
    };
  }, []);

  return lenis;
}
