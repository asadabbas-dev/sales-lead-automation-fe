"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/common/components/custom-button/custom-button.component";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50/50 px-8 py-16 text-center">
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
          {icon}
        </div>
      )}
      <h3 className="font-display text-lg font-semibold text-neutral-900">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-neutral-500">{description}</p>
      {actionLabel && actionHref && (
        <CustomButton
          text={actionLabel}
          variant="primary"
          size="md"
          onClick={() => router.push(actionHref)}
          className="mt-6"
        />
      )}
    </div>
  );
}
