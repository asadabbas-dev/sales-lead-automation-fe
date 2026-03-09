"use client";

import CustomInput from "@/common/components/custom-input/custom-input.component";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { Search } from "lucide-react";
import { useFilterBar } from "./use-filter-bar.hook";

export function FilterBar({
  statusFilter,
  qualifiedFilter,
  sourceFilter,
  searchQuery,
  onStatusChange,
  onQualifiedChange,
  onSourceChange,
  onSearchChange,
  onClearFilters,
}) {
  const { hasActiveFilters, handleStatusToggle, handleQualifiedToggle } =
    useFilterBar({
      statusFilter,
      qualifiedFilter,
      sourceFilter,
      searchQuery,
      onStatusChange,
      onQualifiedChange,
      onSourceChange,
      onSearchChange,
      onClearFilters,
    });

  return (
    <div className="relative z-20 space-y-2.5 rounded-lg border border-white/10 bg-black/40 p-2.5 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.3)]">
      <div className="flex flex-wrap items-end gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <CustomInput
              label="Search"
              name="search"
              value={searchQuery || ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search runs, IDs, sources"
              startIcon={<Search className="h-4 w-4 text-yellow-300" />}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-48">
          <SimpleSelect
            label="Status"
            name="status"
            value={statusFilter || ""}
            onChange={(val) => onStatusChange?.(val || "")}
            options={[
              { label: "All", value: "" },
              { label: "Success", value: "success" },
              { label: "Failed", value: "failed" },
            ]}
            placeholder="All"
          />
        </div>

        {/* Qualified Filter */}
        <div className="w-full sm:w-48">
          <SimpleSelect
            label="Qualified"
            name="qualified"
            value={qualifiedFilter === "" ? "" : String(qualifiedFilter)}
            onChange={(val) =>
              onQualifiedChange?.(
                val === "" || val == null ? "" : val === "true",
              )
            }
            options={[
              { label: "All", value: "" },
              { label: "Qualified", value: "true" },
              { label: "Unqualified", value: "false" },
            ]}
            placeholder="All"
          />
        </div>

        {/* Source Filter */}
        <div className="w-full sm:w-48">
          <SimpleSelect
            label="Source"
            name="source"
            value={sourceFilter || ""}
            onChange={(val) => onSourceChange?.(val || "")}
            options={[
              { label: "All", value: "" },
              { label: "Webhook", value: "webhook" },
              { label: "API", value: "api" },
              { label: "Manual", value: "manual" },
            ]}
            placeholder="All"
          />
        </div>
      </div>
    </div>
  );
}
