"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatsOverviewBar } from "@/components/dashboard/stats.overview.bar.component";
import { FilterBar } from "@/components/dashboard/filter.bar.component";
import { RunsDataGrid } from "@/components/dashboard/runs.data.grid.component";
import { RunDetailPanel } from "@/components/dashboard/run.detail.panel.component";
import { EmptyState } from "@/components/dashboard/empty.state.component";
import { fetchRuns } from "@/common/utils/api";

export default function RunsPage() {
  const [runs, setRuns] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [qualifiedFilter, setQualifiedFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (qualifiedFilter !== "") params.qualified = qualifiedFilter;

    fetchRuns(params)
      .then((data) => {
        if (!cancelled) {
          let filteredRuns = data.runs;

          // Apply client-side filters
          if (sourceFilter) {
            filteredRuns = filteredRuns.filter((r) =>
              r.source.toLowerCase().includes(sourceFilter.toLowerCase()),
            );
          }

          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredRuns = filteredRuns.filter(
              (r) =>
                r.id.toLowerCase().includes(query) ||
                r.source.toLowerCase().includes(query) ||
                (r.error && r.error.toLowerCase().includes(query)),
            );
          }

          setRuns(filteredRuns);
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
  }, [statusFilter, qualifiedFilter, sourceFilter, searchQuery]);

  const qualifiedCount = runs.filter((r) => r.qualified === true).length;
  const failedCount = runs.filter((r) => r.status === "failed").length;
  const successCount = runs.filter((r) => r.status === "success").length;

  // Calculate average processing time (mock for now)
  const avgTime = runs.length > 0 ? Math.round(Math.random() * 200 + 100) : 0;
  const activeAutomations = runs.filter((r) => r.status === "success").length;
  const aiCallsToday = total;

  const stats = {
    total,
    success: successCount,
    failed: failedCount,
    avgTime,
    active: activeAutomations,
    aiCalls: aiCallsToday,
  };

  const handleRowClick = (run) => {
    setSelectedRunId(run.id);
    setIsPanelOpen(true);
  };

  const handleClearFilters = () => {
    setStatusFilter("");
    setQualifiedFilter("");
    setSourceFilter("");
    setSearchQuery("");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <StatsOverviewBar stats={stats} />

        <FilterBar
          statusFilter={statusFilter}
          qualifiedFilter={qualifiedFilter}
          sourceFilter={sourceFilter}
          searchQuery={searchQuery}
          onStatusChange={setStatusFilter}
          onQualifiedChange={setQualifiedFilter}
          onSourceChange={setSourceFilter}
          onSearchChange={setSearchQuery}
          onClearFilters={handleClearFilters}
        />

        {loading ? (
          <RunsDataGrid runs={[]} loading={true} />
        ) : runs.length === 0 ? (
          <EmptyState
            title="No runs yet"
            description="When leads are processed through the automation, they will appear here. Send a test lead to the webhook to see your first run."
            actionLabel="Back to Overview"
            actionHref="/"
            icon={
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          />
        ) : (
          <RunsDataGrid
            runs={runs}
            onRowClick={handleRowClick}
            loading={false}
          />
        )}
      </motion.div>

      <RunDetailPanel
        runId={selectedRunId}
        isOpen={isPanelOpen}
        onClose={() => {
          setIsPanelOpen(false);
          setSelectedRunId(null);
        }}
      />
    </>
  );
}
