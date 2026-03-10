"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import { PageHeader } from "@/components/dashboard/page-header/page-header.component";
import { Skeleton } from "@/components/dashboard/skeleton/skeleton.component";
import { StatusBadge } from "@/components/dashboard/status-badge/status-badge.component";
import Link from "next/link";
import useRunDetailPage from "./use-run-detail-page.hook";

export default function RunDetailPage() {
  const {
    run,
    isLoading,
    isError,
    message,
    formatTime,
    goToRuns,
    leadSummaryRows,
    qualified,
    score,
    reasons,
  } = useRunDetailPage();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/runs"
            className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
          >
            &larr; Back to Runs
          </Link>
        </div>
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !run) {
    return (
      <div className="space-y-6">
        <Link
          href="/runs"
          className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
        >
          &larr; Back to Runs
        </Link>
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-6 backdrop-blur-sm">
          <h3 className="font-display text-lg font-semibold text-red-300">
            Run not found
          </h3>
          <p className="mt-2 text-sm text-red-200">
            {isError
              ? message
              : "This run may have been deleted or the ID is invalid."}
          </p>
          <p className="mt-4 text-sm text-red-300/80">
            Go back to the runs list to inspect other runs.
          </p>
          <CustomButton
            text="Back to Runs"
            variant="danger"
            size="md"
            onClick={goToRuns}
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/runs"
          className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
        >
          &larr; Back to Runs
        </Link>
      </div>

      <PageHeader
        title={`Run ${run.id.slice(0, 8)}...`}
        subtitle={`${formatTime(run.created_at)} · ${run.source}`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <p className="text-xs font-medium text-slate-400">Status</p>
          <div className="mt-2">
            <StatusBadge status={run.status} />
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <p className="text-xs font-medium text-slate-400">Qualified</p>
          <div className="mt-2">
            {qualified === undefined || qualified === null ? (
              <span className="text-sm text-slate-500">&mdash;</span>
            ) : (
              <StatusBadge status={qualified ? "qualified" : "unqualified"} />
            )}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <p className="text-xs font-medium text-slate-400">Score</p>
          <p className="mt-2 font-display text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {score ?? <span className="text-slate-500 text-sm">&mdash;</span>}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <p className="text-xs font-medium text-slate-400">Source</p>
          <p className="mt-2 text-sm font-semibold text-white">{run.source}</p>
        </div>
      </div>

      {leadSummaryRows.length > 0 && (
        <div>
          <h3 className="mb-5 font-display text-xl font-semibold text-white">
            Lead Summary
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leadSummaryRows.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-[0_0_15px_rgba(255,255,255,0.03)]"
              >
                <p className="text-xs font-medium text-slate-400">{label}</p>
                <p className="mt-1 text-sm font-medium text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {reasons.length > 0 && (
        <div>
          <h3 className="mb-5 font-display text-xl font-semibold text-white">
            Qualification Reasons
          </h3>
          <ul className="flex flex-wrap gap-2">
            {reasons.map((r, i) => (
              <li
                key={i}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {run.error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-4 backdrop-blur-sm">
          <h3 className="font-display text-sm font-semibold text-red-300">
            Error
          </h3>
          <p className="mt-2 font-mono text-sm text-red-200 whitespace-pre-wrap">
            {run.error}
          </p>
        </div>
      )}
    </div>
  );
}
