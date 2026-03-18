"use client";

import {
  getLeads,
  getLeadsFunnel,
} from "@/provider/features/leads/leads.slice";
import {
  getAutomationHealth,
  getHighValueOverview,
  getRunsSummary,
} from "@/provider/features/runs/runs.slice";
import { getOpportunitiesOverview } from "@/provider/features/opportunities/opportunities.slice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useDashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: runsSummary } = useSelector((s) => s?.runs?.runsSummary || {});
  const { data: automationHealth } = useSelector(
    (s) => s?.runs?.automationHealth || {},
  );
  const { data: highValueOverview } = useSelector(
    (s) => s?.runs?.highValueOverview || {},
  );
  const { data: funnel } = useSelector((s) => s?.leads?.leadsFunnel || {});
  const { data: listLeadsData } = useSelector(
    (s) => s?.leads?.listLeads || {},
  );
  const { data: opportunitiesOverview } = useSelector(
    (s) => s?.opportunities?.opportunitiesOverview || {},
  );

  useEffect(() => {
    dispatch(getRunsSummary());
    dispatch(getAutomationHealth());
    dispatch(getHighValueOverview());
    dispatch(getLeadsFunnel());
    dispatch(getLeads({ payload: {} }));
    dispatch(getOpportunitiesOverview());
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

  const automationHealthStats = useMemo(() => {
    const lastRunAt = automationHealth?.last_run_at ?? null;
    const failedLast24h = automationHealth?.failed_last_24h ?? 0;
    const recentErrors = automationHealth?.recent_errors ?? [];
    return { lastRunAt, failedLast24h, recentErrors };
  }, [automationHealth]);

  const highValueStats = useMemo(
    () => ({
      highScoreLeads: highValueOverview?.high_score_leads ?? 0,
      qualifiedThisWeek: highValueOverview?.qualified_this_week ?? 0,
      newThisWeek: highValueOverview?.new_this_week ?? 0,
      highIcpCount: highValueOverview?.high_icp_count ?? 0,
    }),
    [highValueOverview],
  );

  const opportunitiesOverviewStats = useMemo(() => {
    const overview = opportunitiesOverview?.opportunities_overview || {};
    return {
      totalOpportunities: overview.total_opportunities ?? 0,
      analyzedCount: overview.analyzed_count ?? 0,
      highScoreCount: overview.high_score_count ?? 0,
    };
  }, [opportunitiesOverview]);

  const pipelineCounts = useMemo(
    () => opportunitiesOverview?.pipeline || {},
    [opportunitiesOverview],
  );

  const goToLeads = useCallback(() => router.push("/leads"), [router]);
  const goToRuns = useCallback(() => router.push("/runs"), [router]);
  const goToCreateRun = useCallback(() => router.push("/runs/create"), [router]);
  const goToOpportunities = useCallback(() => router.push("/opportunities"), [router]);

  return {
    leadsStats,
    runsStats,
    automationHealthStats,
    highValueStats,
    opportunitiesOverviewStats,
    pipelineCounts,
    goToLeads,
    goToRuns,
    goToCreateRun,
    goToOpportunities,
  };
}
