"use client";

import { getOpportunities } from "@/provider/features/opportunities/opportunities.slice";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function formatDate(iso) {
  if (iso == null) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString();
}

const STAGE_OPTIONS = [
  { label: "All", value: "" },
  { label: "New Opportunity", value: "New Opportunity" },
  { label: "Under Review", value: "Under Review" },
  { label: "Proposal Preparation", value: "Proposal Preparation" },
  { label: "Submitted", value: "Submitted" },
  { label: "Won", value: "Won" },
  { label: "Lost", value: "Lost" },
];

export default function useOpportunities() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s?.opportunities?.listOpportunities || {});
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stageFilter, setStageFilter] = useState("");

  const opportunities = data?.opportunities || [];
  const total = data?.total ?? 0;

  useEffect(() => {
    const params = {};
    if (sourceFilter) params.source = sourceFilter;
    if (statusFilter) params.status = statusFilter;
    if (stageFilter) params.stage = stageFilter;
    dispatch(getOpportunities({ payload: params }));
  }, [dispatch, sourceFilter, statusFilter, stageFilter]);

  const columns = useMemo(
    () => [
      {
        key: "title",
        title: "Title",
        sortable: true,
        customRender: (row) => (
          <div className="min-w-[200px]">
            <p className="text-sm font-semibold text-white">{row.title || "—"}</p>
            <p className="mt-0.5 text-xs text-white/70">
              {row.source || "—"} · {row.organization || "—"}
            </p>
          </div>
        ),
      },
      {
        key: "source",
        title: "Source",
        sortable: true,
        customRender: (row) => (
          <span className="text-sm text-white">{row.source || "—"}</span>
        ),
      },
      {
        key: "deadline",
        title: "Deadline",
        sortable: true,
        customRender: (row) => (
          <span className="text-sm text-white/80">{formatDate(row.deadline)}</span>
        ),
      },
      {
        key: "score",
        title: "Score",
        sortable: true,
        customRender: (row) => (
          <span className="text-sm font-semibold text-yellow-300">
            {row.score != null ? row.score : "—"}
          </span>
        ),
      },
      {
        key: "stage",
        title: "Stage",
        sortable: true,
        customRender: (row) => (
          <span className="text-sm text-white/90">{row.stage || "—"}</span>
        ),
      },
      {
        key: "created_at",
        title: "Created",
        sortable: true,
        customRender: (row) => (
          <span className="text-sm text-white/80">{formatDate(row.created_at)}</span>
        ),
      },
    ],
    [],
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

  const handleRowClick = useCallback(
    (row) => {
      if (row?.id) router.push(`/opportunities/${row.id}`);
    },
    [router],
  );

  const handleActionClick = useCallback(
    (key, row) => {
      if (key === "view" && row?.id) router.push(`/opportunities/${row.id}`);
    },
    [router],
  );

  const goToCreate = useCallback(
    () => router.push("/opportunities/create"),
    [router],
  );

  return {
    sourceFilter,
    setSourceFilter,
    statusFilter,
    setStatusFilter,
    stageFilter,
    setStageFilter,
    stageOptions: STAGE_OPTIONS,
    columns,
    actions,
    opportunities,
    total,
    isLoading,
    handleRowClick,
    handleActionClick,
    goToCreate,
  };
}
