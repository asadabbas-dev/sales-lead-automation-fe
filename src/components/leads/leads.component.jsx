"use client";

import CustomDataTable from "@/common/components/custom-data-table/custom-data-table.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { PageHeader } from "@/components/dashboard/page-header/page-header.component";
import { StatCard } from "../dashboard/stats-overview-bar/components/stat-card/stat-card.component";
import useLeads from "./use-leads.hook";

export default function Leads() {
  const {
    funnelBadges,
    statusFilter,
    setStatusFilter,
    sourceFilter,
    setSourceFilter,
    searchQuery,
    setSearchQuery,
    statusOptions,
    sourceOptions,
    columns,
    actions,
    leads,
    isLoading,
    handleRowClick,
    handleActionClick,
  } = useLeads();

  return (
    <div className="space-y-3">
      <PageHeader
        title="Leads"
        subtitle="Lead-centric view (latest AI snapshot + lifecycle status)"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 bg-white/20 rounded-lg p-3">
        {funnelBadges.map((item) => (
          <StatCard
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>

      <div className="relative z-20 rounded-lg border border-white/10 bg-black/40 p-2.5 backdrop-blur-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <CustomInput
            label="Search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Name, email, phone"
          />
          <SimpleSelect
            label="Status"
            name="status"
            value={statusFilter}
            onChange={(v) => setStatusFilter(v || "")}
            options={statusOptions}
            placeholder="All"
          />
          <SimpleSelect
            label="Source"
            name="source"
            value={sourceFilter}
            onChange={(v) => setSourceFilter(v || "")}
            options={sourceOptions}
            placeholder="All"
          />
        </div>
      </div>

      <CustomDataTable
        columns={columns}
        data={leads}
        loading={isLoading}
        selectable={false}
        searchable={false}
        paginated={true}
        pageSize={10}
        initialSortConfig={{ key: "updated_at", direction: "desc" }}
        actions={actions}
        onActionClick={handleActionClick}
        onRowClick={handleRowClick}
        emptyMessage="No leads found"
        className="overflow-hidden"
        tableClassName="min-w-full divide-y divide-white/10"
        rowClassName="cursor-pointer"
      />
    </div>
  );
}
