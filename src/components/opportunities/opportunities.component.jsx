"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomDataTable from "@/common/components/custom-data-table/custom-data-table.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { PageHeader } from "@/components/dashboard/page-header/page-header.component";
import { PlusCircle } from "lucide-react";
import useOpportunities from "./use-opportunities.hook";

export default function Opportunities() {
  const {
    sourceFilter,
    setSourceFilter,
    statusFilter,
    setStatusFilter,
    stageFilter,
    setStageFilter,
    stageOptions,
    columns,
    actions,
    opportunities,
    isLoading,
    handleRowClick,
    handleActionClick,
    goToCreate,
  } = useOpportunities();

  return (
    <div className="space-y-3">
      <PageHeader
        title="Opportunities"
        subtitle="Grant and funding opportunities (manual + API). Run analysis and view proposal briefs."
        action={
          <CustomButton
            text="Create opportunity"
            variant="primary"
            size="sm"
            startIcon={<PlusCircle className="h-4 w-4" />}
            onClick={goToCreate}
          />
        }
      />

      <div className="relative z-20 rounded-lg border border-white/10 bg-black/40 p-2.5 backdrop-blur-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <CustomInput
            label="Source"
            name="source"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            placeholder="e.g. manual, api"
          />
          <SimpleSelect
            label="Status"
            name="status"
            value={statusFilter}
            onChange={(v) => setStatusFilter(v || "")}
            options={[
              { label: "All", value: "" },
              { label: "New", value: "new" },
            ]}
            placeholder="All"
          />
          <SimpleSelect
            label="Stage"
            name="stage"
            value={stageFilter}
            onChange={(v) => setStageFilter(v || "")}
            options={stageOptions}
            placeholder="All"
          />
        </div>
      </div>

      <CustomDataTable
        columns={columns}
        data={opportunities}
        loading={isLoading}
        selectable={false}
        searchable={false}
        paginated={true}
        pageSize={10}
        initialSortConfig={{ key: "created_at", direction: "desc" }}
        actions={actions}
        onActionClick={handleActionClick}
        onRowClick={handleRowClick}
        emptyMessage="No opportunities found"
        className="overflow-hidden"
        tableClassName="min-w-full divide-y divide-white/10"
        rowClassName="cursor-pointer"
      />
    </div>
  );
}
