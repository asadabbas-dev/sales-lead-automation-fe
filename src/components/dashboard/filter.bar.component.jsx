"use client";

import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";
import { DarkSelect } from "./dark.select.component";

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
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1.5 block text-xs font-semibold text-slate-200">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery || ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search runs, IDs, sources..."
              className="w-full rounded-lg border border-white/10 bg-black/50 px-10 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-48">
          <label className="mb-1.5 block text-xs font-semibold text-slate-200">
            Status
          </label>
          <DarkSelect
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
          <label className="mb-1.5 block text-xs font-semibold text-slate-200">
            Qualified
          </label>
          <DarkSelect
            value={qualifiedFilter === "" ? "" : String(qualifiedFilter)}
            onChange={(val) =>
              onQualifiedChange?.(
                val === "" || val == null ? "" : val === "true"
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
          <label className="mb-1.5 block text-xs font-semibold text-slate-200">
            Source
          </label>
          <DarkSelect
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

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClearFilters}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
            Clear
          </motion.button>
        )}
      </div>

      {/* Quick Toggles */}
      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
        <span className="text-xs font-semibold text-slate-200">Quick filters:</span>
        <button
          className={`rounded-md border px-3 py-1 text-xs font-medium transition-colors ${
            statusFilter === "failed"
              ? "border-red-500/50 bg-red-500/20 text-red-300"
              : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
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
              ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-300"
              : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          onClick={() =>
            onQualifiedChange?.(
              qualifiedFilter === true ? "" : true
            )
          }
        >
          Qualified Only
        </button>
      </div>
    </motion.div>
  );
}
