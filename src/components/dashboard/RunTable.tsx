"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { RunListItem } from "@/lib/api";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import { StatusBadge } from "./StatusBadge";

interface RunTableProps {
  runs: RunListItem[];
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function RunTable({ runs }: RunTableProps) {
  const router = useRouter();
  if (runs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead>
            <tr className="bg-neutral-50">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                Source
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                Qualified
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                Score
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-neutral-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white">
            {runs.map((run) => (
              <tr
                key={run.id}
                className="transition-colors hover:bg-neutral-50/50"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                  {formatTime(run.created_at)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-900">
                  {run.source}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <StatusBadge status={run.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {run.qualified === null ? (
                    <span className="text-sm text-neutral-400">—</span>
                  ) : (
                    <StatusBadge
                      status={run.qualified ? "qualified" : "unqualified"}
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-600">
                  {run.score ?? "—"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <CustomButton
                    text="View Details"
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/runs/${run.id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
