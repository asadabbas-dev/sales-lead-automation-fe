"use client";

import CustomInput from "@/common/components/custom-input/custom-input.component";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState } from "react";

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
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters =
    statusFilter || qualifiedFilter !== "" || sourceFilter || searchQuery;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-4 space-y-3 rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-3 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.3)]"
    >
      <div className="flex flex-wrap items-end gap-4">
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

        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <CustomInput
              label="Search"
              name="search"
              value={searchQuery || ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search runs, IDs, sources"
              startIcon={<Search className="h-4 w-4 text-" />}
            />
          </div>
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
          {/* Quick Filters label */}
          <p className="text-xs font-medium text-yellow-300">Quick Filters</p>
          <button
            className={`rounded-md border px-3 py-1 text-xs font-medium transition-colors ${
              statusFilter === "failed"
                ? "border-red-500/50 bg-red-500/20 text-white"
                : "border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            }`}
            onClick={() =>
              onStatusChange?.(statusFilter === "failed" ? "" : "failed")
            }
          >
            Errors Only
          </button>
          <button
            className={`rounded-md border px-3 py-1 text-xs font-medium transition-colors ${
              qualifiedFilter === true
                ? "border-cyan-500/50 bg-cyan-500/20 text-white"
                : "border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            }`}
            onClick={() =>
              onQualifiedChange?.(qualifiedFilter === true ? "" : true)
            }
          >
            Qualified Only
          </button>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClearFilters}
            className="flex items-center gap-2 rounded-lg border border-white bg-white text-black px-3 py-1 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
