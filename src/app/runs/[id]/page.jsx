"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import { PageHeader } from "@/components/dashboard/page.header.component";
import { StatusBadge } from "@/components/dashboard/status.badge.component";
import { CollapsibleSection } from "@/components/dashboard/collapsible.section.component";
import { Skeleton } from "@/components/dashboard/skeleton.component";
import { fetchRun } from "@/common/utils/api";

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function RunDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = (useState < string) | (null > null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchRun(id)
      .then((data) => {
        if (!cancelled) setRun(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/runs"
            className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
          >
            ← Back to Runs
          </Link>
        </div>
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !run) {
    return (
      <div className="space-y-6">
        <Link
          href="/runs"
          className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
        >
          ← Back to Runs
        </Link>
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-6 backdrop-blur-sm">
          <h3 className="font-display text-lg font-semibold text-red-300">
            Run not found
          </h3>
          <p className="mt-2 text-sm text-red-200">
            {error || "This run may have been deleted or the ID is invalid."}
          </p>
          <p className="mt-4 text-sm text-red-300/80">
            Go back to the runs list to inspect other runs.
          </p>
          <CustomButton
            text="Back to Runs"
            variant="danger"
            size="md"
            onClick={() => router.push("/runs")}
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  const lead = run.result_json?.lead;
  const qualified = run.result_json?.qualified;
  const score = run.result_json?.score;
  const reasons = run.result_json?.reasons ?? [];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/runs"
          className="text-sm text-slate-400 hover:text-yellow-400 transition-colors"
        >
          ← Back to Runs
        </Link>
      </div>

      <PageHeader
        title={`Run ${run.id.slice(0, 8)}...`}
        subtitle={`${formatTime(run.created_at)} · ${run.source}`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <p className="text-xs font-medium text-slate-400">Status</p>
          <div className="mt-2">
            <StatusBadge status={run.status} />
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <p className="text-xs font-medium text-slate-400">Qualified</p>
          <div className="mt-2">
            {qualified === undefined ? (
              <span className="text-sm text-slate-500">—</span>
            ) : (
              <StatusBadge status={qualified ? "qualified" : "unqualified"} />
            )}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <p className="text-xs font-medium text-slate-400">Score</p>
          <p className="mt-2 font-display text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {score ?? "—"}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <p className="text-xs font-medium text-slate-400">Source</p>
          <p className="mt-2 text-sm font-semibold text-white">
            {run.source}
          </p>
        </div>
      </div>

      {lead && (
        <div>
          <h3 className="mb-5 font-display text-xl font-semibold text-white">
            Lead summary
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Name", value: lead.name },
              { label: "Email", value: lead.email },
              { label: "Phone", value: lead.phone },
              {
                label: "Budget",
                value:
                  lead.budget != null
                    ? `$${lead.budget.toLocaleString()}`
                    : null,
              },
              { label: "Intent", value: lead.intent },
              { label: "Urgency", value: lead.urgency },
              { label: "Industry", value: lead.industry },
            ].map(
              ({ label, value }) =>
                value != null && (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                  >
                    <p className="text-xs font-medium text-slate-400">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">{value}</p>
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {reasons.length > 0 && (
        <div>
          <h3 className="mb-5 font-display text-xl font-semibold text-white">
            Qualification reasons
          </h3>
          <ul className="flex flex-wrap gap-2">
            {reasons.map((r, i) => (
              <li
                key={i}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {run.error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-4 backdrop-blur-sm">
          <h3 className="font-display text-sm font-semibold text-red-300">
            Error
          </h3>
          <p className="mt-2 font-mono text-sm text-red-200 whitespace-pre-wrap">
            {run.error}
          </p>
        </div>
      )}

      <CollapsibleSection title="Raw payload" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-4 text-xs text-slate-300 font-mono">
          {JSON.stringify(run.payload_json, null, 2)}
        </pre>
      </CollapsibleSection>

      {run.result_json && (
        <CollapsibleSection title="Full result" defaultOpen={false}>
          <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-4 text-xs text-slate-300 font-mono">
            {JSON.stringify(run.result_json, null, 2)}
          </pre>
        </CollapsibleSection>
      )}
    </div>
  );
}
