"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import { EmptyState } from "@/components/dashboard/empty-state/empty-state.component";
import { FilterBar } from "@/components/dashboard/filter-bar/filter-bar.component";
import { RunDetailPanel } from "@/components/dashboard/run-detail-panel/run-detail-panel.component";
import { RunsDataGrid } from "@/components/dashboard/runs-data-grid/runs-data-grid.component";
import { StatsOverviewBar } from "@/components/dashboard/stats-overview-bar/stats-overview-bar.component";
import { Database } from "lucide-react";
import useRunsPage from "./use-runs-page.hook";

export default function RunsPage() {
  const {
    runs,
    isLoading,
    stats,
    statusFilter,
    setStatusFilter,
    qualifiedFilter,
    setQualifiedFilter,
    sourceFilter,
    setSourceFilter,
    searchQuery,
    setSearchQuery,
    selectedRunId,
    isPanelOpen,
    handleRowClick,
    handleClosePanel,
    handleClearFilters,
    goToCreateRun,
  } = useRunsPage();

  return (
    <>
      <div className="space-y-3">
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
        <div className="relative z-0 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-yellow-300">
              Automation Runs
            </h3>
            <p className="text-xs text-white/70">
              Leads processed through the qualification pipeline.
            </p>
          </div>
          <CustomButton
            text="Create Run"
            variant="primary"
            onClick={goToCreateRun}
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
      </div>
      <RunDetailPanel
        runId={selectedRunId}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </>
  );
}
