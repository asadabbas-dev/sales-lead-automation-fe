"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatsOverviewBar } from "@/components/dashboard/stats.overview.bar.component";
import { FilterBar } from "@/components/dashboard/filter.bar.component";
import { RunsDataGrid } from "@/components/dashboard/runs.data.grid.component";
import { RunDetailPanel } from "@/components/dashboard/run.detail.panel.component";
import { EmptyState } from "@/components/dashboard/empty.state.component";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getRuns } from "@/provider/features/runs/runs.slice";

export default function RunsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(
    (state) => state?.runs?.listRuns || {},
  );

  const [runs, setRuns] = useState([]);
  const [total, setTotal] = useState(0);

  const [statusFilter, setStatusFilter] = useState("");
  const [qualifiedFilter, setQualifiedFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRunId, setSelectedRunId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (qualifiedFilter !== "") params.qualified = qualifiedFilter;

    dispatch(
      getRuns({
        payload: params,
        successCallBack: (res) => {
          let filteredRuns = res.runs || [];

          if (sourceFilter) {
            filteredRuns = filteredRuns.filter((r) =>
              r.source.toLowerCase().includes(sourceFilter.toLowerCase()),
            );
          }

          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filteredRuns = filteredRuns.filter(
              (r) =>
                r.id.toLowerCase().includes(q) ||
                r.source.toLowerCase().includes(q) ||
                (r.error && r.error.toLowerCase().includes(q)),
            );
          }

          setRuns(filteredRuns);
          setTotal(res.total || 0);
        },
      }),
    );
  }, [statusFilter, qualifiedFilter, sourceFilter, searchQuery]);

  const qualifiedCount = runs.filter((r) => r.qualified === true).length;
  const failedCount = runs.filter((r) => r.status === "failed").length;
  const successCount = runs.filter((r) => r.status === "success").length;

  const avgTime = runs.length > 0 ? Math.round(Math.random() * 200 + 100) : 0;
  const activeAutomations = successCount;
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

        <div className="z-1 flex flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">Create Runs</h3>
            <p className="text-sm text-white">
              Create runs to process leads through the automation.
            </p>
          </div>

          <CustomButton
            text="Create Run"
            onClick={() => router.push("/runs/create")}
          />
        </div>

        {isLoading ? (
          <RunsDataGrid runs={[]} loading={true} />
        ) : runs.length === 0 ? (
          <EmptyState
            title="No runs yet"
            description="When leads are processed through the automation, they will appear here."
            actionLabel="Create Run"
            actionHref="/runs/create"
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
