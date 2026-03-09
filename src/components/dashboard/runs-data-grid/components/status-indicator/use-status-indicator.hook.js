"use client";

import { useMemo } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Pending } from "@mui/icons-material";

export function useStatusIndicator({ status }) {
  const { Icon, className } = useMemo(() => {
    const configs = {
      success: {
        icon: CheckCircle2,
        color: "text-yellow-300",
        glow: "shadow-[0_0_15px_rgba(253,224,71,0.4)]",
      },
      failed: {
        icon: XCircle,
        color: "text-red-400",
        glow: "shadow-[0_0_15px_rgba(239,68,68,0.5)]",
      },
      pending: {
        icon: Pending,
        color: "text-white/60",
        glow: "shadow-[0_0_10px_rgba(255,255,255,0.2)]",
      },
    };

    const config = configs[status] || configs.pending;
    const Icon = config.icon;

    return {
      Icon,
      className: `h-4 w-4 ${config.color} ${config.glow}`,
    };
  }, [status]);

  return { Icon, className };
}
