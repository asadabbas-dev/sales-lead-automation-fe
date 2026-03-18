"use client";

import {
  getLeads,
  getLeadsFunnel,
} from "@/provider/features/leads/leads.slice";
import {
  Eye,
  Users,
  UserPlus,
  Phone,
  CheckCircle2,
  XCircle,
  UserX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBadge } from "@/components/dashboard/status-badge/status-badge.component";

function formatTime(iso) {
  if (iso == null) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default function useLeads() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s?.leads?.listLeads || {});
  const { data: funnel } = useSelector((s) => s?.leads?.leadsFunnel || {});

  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const leads = data?.leads || [];
  const total = data?.total || 0;

  const funnelStats = useMemo(() => {
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
    const byStatus = (s) => leads.filter((l) => l.status === s).length;
    return {
      total: total || leads.length,
      new: byStatus("new"),
      contacted: byStatus("contacted"),
      qualified: byStatus("qualified"),
      unqualified: byStatus("unqualified"),
      lost: byStatus("lost"),
    };
  }, [funnel, leads, total]);

  const funnelBadges = useMemo(
    () => [
      { icon: Users, label: "Total", value: funnelStats.total },
      { icon: UserPlus, label: "New", value: funnelStats.new },
      { icon: Phone, label: "Contacted", value: funnelStats.contacted },
      { icon: CheckCircle2, label: "Qualified", value: funnelStats.qualified },
      { icon: XCircle, label: "Unqualified", value: funnelStats.unqualified },
      { icon: UserX, label: "Lost", value: funnelStats.lost },
    ],
    [funnelStats],
  );

  useEffect(() => {
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (sourceFilter) params.source = sourceFilter;
    if (searchQuery) params.search = searchQuery;
    dispatch(getLeads({ payload: params }));
  }, [dispatch, statusFilter, sourceFilter, searchQuery]);

  useEffect(() => {
    dispatch(getLeadsFunnel());
  }, [dispatch]);

  const statusOptions = useMemo(
    () => [
      { label: "All", value: "" },
      { label: "New", value: "new" },
      { label: "Qualified", value: "qualified" },
      { label: "Unqualified", value: "unqualified" },
      { label: "Contacted", value: "contacted" },
      { label: "Lost", value: "lost" },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      {
        key: "name",
        title: "Lead",
        sortable: true,
        customRender: (row) => (
          <div className="min-w-[200px]">
            <p className="text-sm font-semibold text-white">
              {row.name || row.email || row.phone || "Unknown"}
            </p>
            <p className="mt-0.5 text-xs text-white/70">
              {row.email || "—"} · {row.phone || "—"}
            </p>
          </div>
        ),
      },
      {
        key: "status",
        title: "Status",
        sortable: true,
        customRender: (row) => (
          <StatusBadge status={row.status} label={row.status} />
        ),
      },
      {
        key: "latest_score",
        title: "Latest Score",
        sortable: true,
        customRender: (row) => (
          <span className="text-sm font-semibold text-yellow-300">
            {row.latest_score ?? "—"}
          </span>
        ),
      },
      {
        key: "icp_score",
        title: "ICP Score",
        sortable: true,
        customRender: (row) => (
          <span className="text-sm font-medium text-cyan-300">
            {row.icp_score != null ? row.icp_score : "—"}
          </span>
        ),
      },
      {
        key: "latest_source",
        title: "Source",
        sortable: true,
        customRender: (row) => (
          <span className="text-sm text-white">{row.latest_source || "—"}</span>
        ),
      },
      {
        key: "updated_at",
        title: "Updated",
        sortable: true,
        customRender: (row) => (
          <span className="text-sm text-white/80">
            {formatTime(row.updated_at)}
          </span>
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

  const sourceOptions = useMemo(
    () => [
      { label: "All", value: "" },
      { label: "Manual", value: "manual" },
      { label: "Webhook", value: "webhook" },
      { label: "API", value: "api" },
      { label: "UI", value: "ui" },
    ],
    [],
  );

  const handleRowClick = useCallback(
    (lead) => {
      if (lead?.id) router.push(`/leads/${lead.id}`);
    },
    [router],
  );

  const handleActionClick = useCallback(
    (key, row) => {
      if (key === "view" && row?.id) router.push(`/leads/${row.id}`);
    },
    [router],
  );

  return {
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
  };
}
