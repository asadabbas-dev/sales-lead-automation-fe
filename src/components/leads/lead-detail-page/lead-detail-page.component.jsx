"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { PageHeader } from "@/components/dashboard/page-header/page-header.component";
import { RunDetailPanel } from "@/components/dashboard/run-detail-panel/run-detail-panel.component";
import { RunsDataGrid } from "@/components/dashboard/runs-data-grid/runs-data-grid.component";
import { StatCard } from "@/components/dashboard/stats-overview-bar/components/stat-card/stat-card.component";
import { StatusBadge } from "@/components/dashboard/status-badge/status-badge.component";
import {
  Activity,
  Brain,
  Calendar,
  FileText,
  Link2,
  List,
  Target,
  User,
} from "lucide-react";
import Link from "next/link";
import useLeadDetailPage from "./use-lead-detail-page.hook";

export default function LeadDetailPage() {
  const {
    lead,
    isLoading,
    isError,
    message,
    statusOptions,
    updateLeadLoading,
    nextActionAt,
    setNextActionAt,
    nextActionNote,
    setNextActionNote,
    handleStatusChange,
    handleRowClick,
    handleClosePanel,
    handleSaveNextAction,
    handleGenerateBrief,
    leadBrief,
    briefLoading,
    briefError,
    briefMessage,
    goToRuns,
    runsList,
    runsLoading,
    selectedRunId,
    isPanelOpen,
  } = useLeadDetailPage();

  if (isError || !lead) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <Link
          href="/leads"
          className="inline-flex text-sm text-white/70 hover:text-yellow-300 transition-colors"
        >
          &larr; Back to Leads
        </Link>
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-red-200">
            Failed to load lead
          </p>
          <p className="mt-1 text-sm text-red-200/80">{message}</p>
        </div>
      </div>
    );
  }

  const latestQualifiedStatus =
    lead.latest_qualified === true
      ? "qualified"
      : lead.latest_qualified === false
        ? "unqualified"
        : null;

  return (
    <div className="mx-auto max-w-full space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/leads"
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-yellow-300 transition-colors"
        >
          &larr; Back to Leads
        </Link>
        <CustomButton
          text="View Runs"
          variant="secondary"
          size="sm"
          onClick={goToRuns}
        />
      </header>

      <PageHeader
        title={lead.name || lead.email || lead.phone || "Lead"}
        subtitle={lead.email || lead.phone || "—"}
      />

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
          <User className="h-3.5 w-3.5 text-yellow-300" />
          Overview
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 bg-white/20 rounded-lg p-3">
          <StatCard
            icon={Activity}
            label="Status"
            value={<StatusBadge status={lead.status} label={lead.status} />}
          />
          <StatCard
            icon={Brain}
            label="Latest AI"
            value={
              latestQualifiedStatus ? (
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <span className="text-xl font-bold text-yellow-300">
                    {lead.latest_score ?? "—"}
                  </span>
                  <StatusBadge status={latestQualifiedStatus} />
                </div>
              ) : (
                <span className="text-white">{lead.latest_score ?? "—"}</span>
              )
            }
          />
          <StatCard
            icon={Link2}
            label="Source"
            value={lead.latest_source || "—"}
          />
          {lead.icp_score != null && (
            <StatCard
              icon={Target}
              label="ICP Score"
              value={
                <span className="text-lg font-bold text-cyan-300">
                  {lead.icp_score}
                </span>
              }
            />
          )}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/40 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
          <Activity className="h-3.5 w-3.5 text-yellow-300" />
          Update status
        </h2>
        <div className="max-w-xs">
          <SimpleSelect
            label=""
            name="status"
            value={lead.status}
            onChange={(v) => handleStatusChange(v)}
            options={statusOptions}
            loading={updateLeadLoading}
            placeholder="Select status"
          />
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/40 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
          <FileText className="h-3.5 w-3.5 text-yellow-300" />
          Meeting prep
        </h2>
        <CustomButton
          text={briefLoading ? "Generating…" : "Generate brief"}
          variant="secondary"
          size="sm"
          loading={briefLoading}
          onClick={handleGenerateBrief}
        />
        {briefError && (
          <p className="mt-2 text-sm text-red-300">{briefMessage}</p>
        )}
        {leadBrief && (
          <div className="mt-4 space-y-4 rounded-lg border border-yellow-300/20 bg-yellow-300/5 p-4">
            <div>
              <p className="text-xs font-semibold uppercase text-yellow-300/80">
                Summary
              </p>
              <p className="mt-1 text-sm text-white/90">{leadBrief.summary}</p>
            </div>
            {leadBrief.talking_points?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-yellow-300/80">
                  Talking points
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-white/90">
                  {leadBrief.talking_points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
            {leadBrief.checklist?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-yellow-300/80">
                  Checklist
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-white/90">
                  {leadBrief.checklist.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="rounded-lg border border-white/10 bg-black/40">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
            <Calendar className="h-3.5 w-3.5 text-yellow-300" />
            Next action
          </h2>
          <CustomButton
            text="Save"
            variant="secondary"
            size="sm"
            loading={updateLeadLoading}
            onClick={handleSaveNextAction}
          />
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          <CustomInput
            label="Next action at"
            type="datetime-local"
            value={nextActionAt}
            onChange={(e) => setNextActionAt(e.target.value)}
          />
          <CustomInput
            label="Note"
            value={nextActionNote}
            onChange={(e) => setNextActionNote(e.target.value)}
            placeholder="e.g. Call tomorrow morning"
          />
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/40">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <List className="h-3.5 w-3.5 text-yellow-300" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Recent Runs
          </span>
        </div>
        <div className="p-4">
          <RunsDataGrid
            runs={runsList}
            loading={runsLoading}
            onRowClick={handleRowClick}
          />
        </div>
      </section>

      <RunDetailPanel
        runId={selectedRunId}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  );
}
