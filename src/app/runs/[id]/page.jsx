"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import { PageHeader } from "@/components/dashboard/page.header.component";
import { StatusBadge } from "@/components/dashboard/status.badge.component";
import { CollapsibleSection } from "@/components/dashboard/collapsible.section.component";
import { Skeleton } from "@/components/dashboard/skeleton.component";
import { fetchRun } from "@/lib/api";

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
  const [error, setError] = useState<string | null>(null);

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
          <Link href="/runs" className="text-sm text-neutral-500 hover:text-neutral-700">
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
        <Link href="/runs" className="text-sm text-neutral-500 hover:text-neutral-700">
          ← Back to Runs
        </Link>
        <div className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-6">
          <h3 className="font-display text-lg font-semibold text-danger-800">
            Run not found
          </h3>
          <p className="mt-2 text-sm text-danger-700">
            {error || "This run may have been deleted or the ID is invalid."}
          </p>
          <p className="mt-4 text-sm text-danger-600">
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
        <Link href="/runs" className="text-sm text-neutral-500 hover:text-neutral-700">
          ← Back to Runs
        </Link>
      </div>

      <PageHeader
        title={`Run ${run.id.slice(0, 8)}...`}
        subtitle={`${formatTime(run.created_at)} · ${run.source}`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs font-medium text-neutral-500">Status</p>
          <div className="mt-1">
            <StatusBadge status={run.status} />
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs font-medium text-neutral-500">Qualified</p>
          <div className="mt-1">
            {qualified === undefined ? (
              <span className="text-sm text-neutral-400">—</span>
            ) : (
              <StatusBadge
                status={qualified ? "qualified" : "unqualified"}
              />
            )}
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs font-medium text-neutral-500">Score</p>
          <p className="mt-1 font-display text-xl font-semibold text-neutral-900">
            {score ?? "—"}
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs font-medium text-neutral-500">Source</p>
          <p className="mt-1 text-sm font-medium text-neutral-900">{run.source}</p>
        </div>
      </div>

      {lead && (
        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-neutral-900">
            Lead summary
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Name", value: lead.name },
              { label: "Email", value: lead.email },
              { label: "Phone", value: lead.phone },
              { label: "Budget", value: lead.budget != null ? `$${lead.budget.toLocaleString()}` : null },
              { label: "Intent", value: lead.intent },
              { label: "Urgency", value: lead.urgency },
              { label: "Industry", value: lead.industry },
            ].map(
              ({ label, value }) =>
                value != null && (
                  <div key={label} className="rounded-lg border border-neutral-200 bg-white p-4">
                    <p className="text-xs font-medium text-neutral-500">{label}</p>
                    <p className="mt-1 text-sm text-neutral-900">{value}</p>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {reasons.length > 0 && (
        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-neutral-900">
            Qualification reasons
          </h3>
          <ul className="flex flex-wrap gap-2">
            {reasons.map((r, i) => (
              <li
                key={i}
                className="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-800"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {run.error && (
        <div className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-4">
          <h3 className="font-display text-sm font-semibold text-danger-800">
            Error
          </h3>
          <p className="mt-2 font-mono text-sm text-danger-700 whitespace-pre-wrap">
            {run.error}
          </p>
        </div>
      )}

      <CollapsibleSection title="Raw payload" defaultOpen={false}>
        <pre className="overflow-x-auto rounded-lg bg-neutral-100 p-4 text-xs text-neutral-700">
          {JSON.stringify(run.payload_json, null, 2)}
        </pre>
      </CollapsibleSection>

      {run.result_json && (
        <CollapsibleSection title="Full result" defaultOpen={false}>
          <pre className="overflow-x-auto rounded-lg bg-neutral-100 p-4 text-xs text-neutral-700">
            {JSON.stringify(run.result_json, null, 2)}
          </pre>
        </CollapsibleSection>
      )}
    </div>
  );
}
