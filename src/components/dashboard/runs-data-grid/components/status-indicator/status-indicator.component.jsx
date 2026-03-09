"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Pending } from "@mui/icons-material";
import { useStatusIndicator } from "./use-status-indicator.hook";

export function StatusIndicator({ status }) {
  const { Icon, className } = useStatusIndicator({ status });

  return <Icon className={className} />;
}
