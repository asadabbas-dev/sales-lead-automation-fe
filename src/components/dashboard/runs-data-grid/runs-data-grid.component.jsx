"use client";

import { useMemo } from "react";
import { ChevronRight, Clock, Eye } from "lucide-react";
import CustomDataTable from "@/common/components/custom-data-table/custom-data-table.component";
import { StatusBadge } from "../status-badge/status-badge.component";
import { StatusIndicator } from "./components/status-indicator/status-indicator.component";
import { useRunsDataGrid } from "./use-runs-data-grid.hook";

export function RunsDataGrid({ runs, onRowClick, loading }) {
  const { formatTime } = useRunsDataGrid();

  const columns = useMemo(
    () => [
      {
        key: "source",
        title: "Source",
        sortable: true,
        customRender: (row) => (
          <span className="text-sm font-medium text-white">
            {row.source ?? "—"}
          </span>
        ),
      },
      {
        key: "status",
        title: "Status",
        sortable: true,
        customRender: (row) => (
          <div className="flex items-center gap-1.5">
            <StatusIndicator status={row.status} />
            <StatusBadge status={row.status} />
          </div>
        ),
      },
      {
        key: "qualified",
        title: "AI Decision",
        sortable: true,
        customRender: (row) =>
          row.qualified === null || row.qualified === undefined ? (
            <span className="text-sm text-white/50">—</span>
          ) : (
            <StatusBadge status={row.qualified ? "qualified" : "unqualified"} />
          ),
      },
      {
        key: "score",
        title: "Score",
        sortable: true,
        customRender: (row) =>
          row.score !== null && row.score !== undefined ? (
            <span className="text-sm font-semibold text-yellow-300">
              {row.score}
            </span>
          ) : (
            <span className="text-sm text-white/50">—</span>
          ),
      },
      {
        key: "created_at",
        title: "Time",
        sortable: true,
        customRender: (row) => (
          <div className="flex items-center gap-1.5 text-sm text-white/80">
            <Clock className="h-3.5 w-3.5 shrink-0 text-yellow-300/80" />
            {formatTime(row.created_at)}
          </div>
        ),
      },
    ],
    [formatTime],
  );

  const actions = useMemo(
    () => [
      {
        key: "view",
        label: "View",
        icon: <Eye className="h-4 w-4" />,
      },
    ],
    [],
  );

  const handleActionClick = (key, row) => {
    if (key === "view") onRowClick?.(row);
  };

  return (
    <CustomDataTable
      columns={columns}
      data={runs}
      loading={loading}
      selectable={false}
      searchable={false}
      paginated={true}
      pageSize={10}
      initialSortConfig={{ key: "created_at", direction: "desc" }}
      actions={actions}
      onActionClick={handleActionClick}
      onRowClick={onRowClick}
      emptyMessage="No runs found"
      className="overflow-hidden"
      tableClassName="min-w-full divide-y divide-white/10"
      rowClassName="cursor-pointer"
    />
  );
}
