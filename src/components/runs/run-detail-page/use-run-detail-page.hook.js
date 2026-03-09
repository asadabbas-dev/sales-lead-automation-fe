"use client";

import { getRun, resetRuns } from "@/provider/features/runs/runs.slice";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function formatTime(iso) {
  if (iso == null) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default function useRunDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ?? null;
  const dispatch = useDispatch();
  const runDetailState = useSelector(
    (state) => state?.runs?.runDetail || {},
  );
  const run = runDetailState.data ?? null;
  const isLoading = runDetailState.isLoading ?? false;
  const isError = runDetailState.isError ?? false;
  const message = runDetailState.message ?? "";

  useEffect(() => {
    if (id) dispatch(getRun({ id }));
    if (!id) dispatch(resetRuns());
  }, [id, dispatch]);

  const goToRuns = useCallback(() => router.push("/runs"), [router]);

  const lead = run?.result_json?.lead;
  const qualified = run?.result_json?.qualified;
  const score = run?.result_json?.score;
  const reasons = run?.result_json?.reasons ?? [];

  const leadSummaryRows = lead
    ? [
        { label: "Name", value: lead.name },
        { label: "Email", value: lead.email },
        { label: "Phone", value: lead.phone },
        {
          label: "Budget",
          value:
            lead.budget != null
              ? `$${Number(lead.budget).toLocaleString()}`
              : null,
        },
        { label: "Intent", value: lead.intent },
        { label: "Urgency", value: lead.urgency },
        { label: "Industry", value: lead.industry },
      ].filter(({ value }) => value != null)
    : [];

  return {
    id,
    run,
    isLoading,
    isError,
    message,
    formatTime: (iso) => formatTime(iso),
    goToRuns,
    leadSummaryRows,
    qualified,
    score,
    reasons,
  };
}
