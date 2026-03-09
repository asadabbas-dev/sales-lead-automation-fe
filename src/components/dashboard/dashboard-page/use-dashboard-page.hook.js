"use client";

import {
  getLeads,
  getLeadsFunnel,
} from "@/provider/features/leads/leads.slice";
import { getRunsSummary } from "@/provider/features/runs/runs.slice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useDashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: runsSummary } = useSelector((s) => s?.runs?.runsSummary || {});
  const { data: funnel } = useSelector((s) => s?.leads?.leadsFunnel || {});
  const { data: listLeadsData } = useSelector(
    (s) => s?.leads?.listLeads || {},
  );

  useEffect(() => {
    dispatch(getRunsSummary());
    dispatch(getLeadsFunnel());
    dispatch(getLeads({ payload: {} }));
  }, [dispatch]);

  const leadsStats = useMemo(() => {
    if (funnel && typeof funnel.total === "number") {
      return {
        total: funnel.total,
        new: funnel.new ?? 0,
        contacted: funnel.contacted ?? 0,
        qualified: funnel.qualified ?? 0,
        unqualified: funnel.unqualified ?? 0,
        lost: funnel.lost ?? 0,
      };
    }
    const leads = listLeadsData?.leads || [];
    const total = listLeadsData?.total ?? leads.length;
    const byStatus = (s) => leads.filter((l) => l.status === s).length;
    return {
      total: total || leads.length,
      new: byStatus("new"),
      contacted: byStatus("contacted"),
      qualified: byStatus("qualified"),
      unqualified: byStatus("unqualified"),
      lost: byStatus("lost"),
    };
  }, [funnel, listLeadsData]);

  const runsStats = useMemo(() => {
    const total = runsSummary?.total ?? 0;
    const success = runsSummary?.success ?? 0;
    const failed = runsSummary?.failed ?? 0;
    const qualified = runsSummary?.qualified ?? 0;
    const successRate =
      total > 0 ? Math.round((success / total) * 100) : 0;
    return {
      total,
      successRate,
      failed,
      qualified,
      avgTime: runsSummary?.avg_processing_ms ?? null,
    };
  }, [runsSummary]);

  const goToLeads = useCallback(() => router.push("/leads"), [router]);
  const goToRuns = useCallback(() => router.push("/runs"), [router]);
  const goToCreateRun = useCallback(() => router.push("/runs/create"), [router]);

  return { leadsStats, runsStats, goToLeads, goToRuns, goToCreateRun };
}
