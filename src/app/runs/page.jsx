"use client";

import { useEffect, useState, useCallback } from "react";
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
import { Database } from "lucide-react";

export default function RunsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.runs?.listRuns || {});

  const [runs, setRuns] = useState([]);
  const [total, setTotal] = useState(0);

  const [statusFilter, setStatusFilter] = useState("");
  const [qualifiedFilter, setQualifiedFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRunId, setSelectedRunId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const fetchRuns = useCallback(() => {
    // Build server-side query params — filtering happens in the DB, not the client
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (sourceFilter) params.source = sourceFilter;
    if (searchQuery) params.search = searchQuery;
    // NOTE: qualifiedFilter is a result_json field — filtered client-side after fetch
    // because it's stored inside JSONB. Move to a DB column if perf becomes an issue.

    dispatch(
      getRuns({
        payload: params,
        successCallBack: (res) => {
          let filteredRuns = res.runs || [];

          // Client-side qualified filter (JSONB field — not indexed)
          if (qualifiedFilter !== "") {
            filteredRuns = filteredRuns.filter(
              (r) => r.qualified === qualifiedFilter,
            );
          }

          setRuns(filteredRuns);
          setTotal(res.total || 0);
        },
      }),
    );
  }, [statusFilter, qualifiedFilter, sourceFilter, searchQuery, dispatch]);

  useEffect(() => {
    fetchRuns();
  }, [fetchRuns]);

  // Derive real stats from fetched data — no random numbers
  const successCount = runs.filter((r) => r.status === "success").length;
  const failedCount = runs.filter((r) => r.status === "failed").length;
  const qualifiedCount = runs.filter((r) => r.qualified === true).length;

  const stats = {
    total,
    success: successCount,
    failed: failedCount,
    qualified: qualifiedCount,
    // avgTime and aiCalls require backend aggregation — show placeholders
    avgTime: null,
    aiCalls: total,
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
            <h3 className="text-2xl font-bold text-yellow-300">
              Automation Runs
            </h3>
            <p className="text-sm text-white">
              All leads processed through the qualification pipeline.
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
            icon={<Database className="h-6 w-6" />}
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
