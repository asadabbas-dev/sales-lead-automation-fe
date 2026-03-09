"use client";

import React from "react";
import { useSkeleton } from "./use-skeleton.hook";

export function Skeleton({ className = "" }) {
  useSkeleton();
  return (
    <div
      className={`animate-pulse rounded-md bg-white/10 ${className}`}
      aria-hidden
    />
  );
}
