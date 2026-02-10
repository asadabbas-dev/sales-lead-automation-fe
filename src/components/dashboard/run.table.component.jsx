"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import { StatusBadge } from "./status.badge.component";

function formatTime(iso) {
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

export function RunTable({ runs }) {
  const router = useRouter();
  if (runs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr className="bg-white/5">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Source
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Qualified
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Score
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-transparent">
            {runs.map((run) => (
              <tr
                key={run.id}
                className="transition-colors hover:bg-white/5"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                  {formatTime(run.created_at)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                  {run.source}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <StatusBadge status={run.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {run.qualified === null ? (
                    <span className="text-sm text-slate-500">—</span>
                  ) : (
                    <StatusBadge
                      status={run.qualified ? "qualified" : "unqualified"}
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-200">
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
