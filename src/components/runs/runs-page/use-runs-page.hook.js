"use client";

import { getRuns, getRunsSummary } from "@/provider/features/runs/runs.slice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useRunsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.runs?.listRuns || {});
  const { data: runsSummary } = useSelector(
    (state) => state?.runs?.runsSummary || {},
  );

  const [runs, setRuns] = useState([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [qualifiedFilter, setQualifiedFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const fetchRuns = useCallback(() => {
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (sourceFilter) params.source = sourceFilter;
    if (searchQuery) params.search = searchQuery;
    dispatch(
      getRuns({
        payload: params,
        successCallBack: (res) => {
          let filteredRuns = res.runs || [];
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
  }, [
    statusFilter,
    qualifiedFilter,
    sourceFilter,
    searchQuery,
    dispatch,
  ]);

  useEffect(() => {
    fetchRuns();
  }, [fetchRuns]);

  useEffect(() => {
    dispatch(getRunsSummary());
  }, [dispatch]);

  const successCount = runs.filter((r) => r.status === "success").length;
  const failedCount = runs.filter((r) => r.status === "failed").length;
  const qualifiedCount = runs.filter((r) => r.qualified === true).length;

  const stats = {
    total: runsSummary?.total ?? total,
    success: runsSummary?.success ?? successCount,
    failed: runsSummary?.failed ?? failedCount,
    qualified: runsSummary?.qualified ?? qualifiedCount,
    avgTime: runsSummary?.avg_processing_ms ?? null,
    aiCalls: runsSummary?.ai_calls_today ?? total,
  };

  const handleRowClick = useCallback((run) => {
    setSelectedRunId(run.id);
    setIsPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedRunId(null);
  }, []);

  const handleClearFilters = useCallback(() => {
    setStatusFilter("");
    setQualifiedFilter("");
    setSourceFilter("");
    setSearchQuery("");
  }, []);

  const goToCreateRun = useCallback(() => router.push("/runs/create"), [router]);

  return {
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
  };
}
