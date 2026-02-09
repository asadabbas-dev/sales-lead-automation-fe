"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { RunTable } from "@/components/dashboard/RunTable";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { TableSkeleton } from "@/components/dashboard/Skeleton";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { fetchRuns, type RunListItem } from "@/lib/api";

type StatusFilter = "success" | "failed" | "";
type QualifiedFilter = boolean | "";

export default function RunsPage() {
  const [runs, setRuns] = useState<RunListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("");
  const [qualifiedFilter, setQualifiedFilter] = useState<QualifiedFilter>("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchRuns({
      status: statusFilter || undefined,
      qualified: qualifiedFilter === "" ? undefined : qualifiedFilter,
    })
      .then((data) => {
        if (!cancelled) {
          setRuns(data.runs);
          setTotal(data.total);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [statusFilter, qualifiedFilter]);

  const qualifiedCount = runs.filter((r) => r.qualified === true).length;
  const failedCount = runs.filter((r) => r.status === "failed").length;

  return (
    <>
      <PageHeader
        title="Automation Runs"
        subtitle="Monitor lead qualification and routing"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total runs" value={total} />
        <StatCard
          label="Qualified"
          value={qualifiedCount}
          subtext="From this view"
          variant="success"
        />
        <StatCard
          label="Failed"
          value={failedCount}
          subtext="Require attention"
          variant={failedCount > 0 ? "danger" : "default"}
        />
      </div>

      <div className="mt-8">
        <div className="mb-4 flex flex-wrap items-center gap-6">
          <div className="w-full sm:w-48">
            <SimpleSelect
              label="Status"
              name="status"
              value={statusFilter}
              onChange={(val) => setStatusFilter((val ?? "") as StatusFilter)}
              options={[
                { label: "All", value: "" },
                { label: "Success", value: "success" },
                { label: "Failed", value: "failed" },
              ]}
              placeholder="All"
            />
          </div>
          <div className="w-full sm:w-48">
            <SimpleSelect
              label="Qualified"
              name="qualified"
              value={qualifiedFilter === "" ? "" : String(qualifiedFilter)}
              onChange={(val) =>
                setQualifiedFilter(val === "" || val == null ? "" : val === "true")
              }
              options={[
                { label: "All", value: "" },
                { label: "Qualified", value: "true" },
                { label: "Unqualified", value: "false" },
              ]}
              placeholder="All"
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-800">
            <p className="font-medium">Failure detected</p>
            <p className="mt-1">{error}</p>
            <p className="mt-2 text-danger-600">
              Check that the API is running at {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"} and try again.
            </p>
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border border-neutral-200 bg-white p-8">
            <TableSkeleton rows={8} />
          </div>
        ) : runs.length === 0 ? (
          <EmptyState
            title="No runs yet"
            description="When leads are processed through the automation, they will appear here. Send a test lead to the webhook to see your first run."
            actionLabel="Back to Overview"
            actionHref="/"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
        ) : (
          <RunTable runs={runs} />
        )}
      </div>
    </>
  );
}
