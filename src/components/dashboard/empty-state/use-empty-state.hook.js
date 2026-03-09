"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useEmptyState({ actionHref }) {
  const router = useRouter();

  const handleAction = useCallback(() => {
    if (actionHref) {
      router.push(actionHref);
    }
  }, [router, actionHref]);

  return {
    handleAction,
  };
}
