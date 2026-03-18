"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { PageHeader } from "@/components/dashboard/page-header/page-header.component";
import {
  Brain,
  Calendar,
  FileText,
  Link2,
  List,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import useOpportunityDetailPage from "./use-opportunity-detail-page.hook";

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

export default function OpportunityDetailPage() {
  const {
    opportunity,
    isLoading,
    isError,
    message,
    analyzeLoading,
    handleRunAnalysis,
    briefLoading,
    briefError,
    briefMessage,
    proposalBrief,
    handleGenerateBrief,
    stage,
    setStage,
    assignedUser,
    setAssignedUser,
    stageOptions,
    handleStageChange,
    handleAssignedUserBlur,
    goBack,
  } = useOpportunityDetailPage();

  const briefRef = useRef(null);

  useEffect(() => {
    if (proposalBrief && briefRef.current) {
      briefRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [proposalBrief]);

  if (isError || (!isLoading && !opportunity)) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <Link
          href="/opportunities"
          className="inline-flex text-sm text-white/70 hover:text-yellow-300 transition-colors"
        >
          &larr; Back to Opportunities
        </Link>
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-red-200">Failed to load opportunity</p>
          <p className="mt-1 text-sm text-red-200/80">{message}</p>
        </div>
      </div>
    );
  }

  if (isLoading || !opportunity) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <Link href="/opportunities" className="text-sm text-white/70 hover:text-yellow-300">
          &larr; Back to Opportunities
        </Link>
        <p className="text-white/80">Loading…</p>
      </div>
    );
  }

  const ai = opportunity.ai_analysis;
  const crc = opportunity.crm_record;

  return (
    <div className="mx-auto max-w-full space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-yellow-300 transition-colors"
        >
          &larr; Back to Opportunities
        </button>
      </header>

      <PageHeader
        title={opportunity.title || "Opportunity"}
        subtitle={opportunity.organization || opportunity.source || "—"}
      />

      <div className="flex flex-wrap gap-3">
        <CustomButton
          text="Run analysis"
          variant="primary"
          size="sm"
          startIcon={<Brain className="h-4 w-4" />}
          onClick={handleRunAnalysis}
          disabled={analyzeLoading}
          loading={analyzeLoading}
        />
        <CustomButton
          text="Generate proposal brief"
          variant="secondary"
          size="sm"
          startIcon={<FileText className="h-4 w-4" />}
          onClick={handleGenerateBrief}
          disabled={briefLoading}
          loading={briefLoading}
        />
      </div>

      <section className="rounded-lg border border-white/10 bg-black/40 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Target className="h-4 w-4 text-yellow-300" />
          Details
        </h2>
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-white/60">Source</dt>
            <dd className="text-sm text-white">{opportunity.source || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-white/60">Deadline</dt>
            <dd className="text-sm text-white">{formatDate(opportunity.deadline)}</dd>
          </div>
          <div>
            <dt className="text-xs text-white/60">Funding value</dt>
            <dd className="text-sm text-white">
              {opportunity.funding_value != null ? Number(opportunity.funding_value).toLocaleString() : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-white/60">Location</dt>
            <dd className="text-sm text-white">{opportunity.location || "—"}</dd>
          </div>
          {opportunity.url && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-white/60">URL</dt>
              <dd>
                <a
                  href={opportunity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-yellow-300 hover:underline flex items-center gap-1"
                >
                  <Link2 className="h-3 w-3" /> {opportunity.url}
                </a>
              </dd>
            </div>
          )}
          {opportunity.description && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-white/60">Description</dt>
              <dd className="text-sm text-white/90 whitespace-pre-wrap mt-1">
                {opportunity.description}
              </dd>
            </div>
          )}
          {opportunity.industry_tags?.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-white/60">Industry tags</dt>
              <dd className="text-sm text-white">
                {opportunity.industry_tags.join(", ")}
              </dd>
            </div>
          )}
        </dl>
      </section>

      {ai && (
        <section className="rounded-lg border border-white/10 bg-black/40 p-4">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <Brain className="h-4 w-4 text-yellow-300" />
            AI Analysis
          </h2>
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-white/60">Proposal complexity</dt>
              <dd className="text-sm text-white">{ai.proposal_complexity || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-white/60">Success probability</dt>
              <dd className="text-sm text-white">
                {ai.success_probability != null
                  ? `${Math.round(ai.success_probability * 100)}%`
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-white/60">Recommended company size</dt>
              <dd className="text-sm text-white">{ai.recommended_company_size || "—"}</dd>
            </div>
            {ai.industry_match?.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-white/60">Industry match</dt>
                <dd className="text-sm text-white">{ai.industry_match.join(", ")}</dd>
              </div>
            )}
            {ai.key_requirements?.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-white/60">Key requirements</dt>
                <dd className="text-sm text-white">
                  <ul className="list-disc list-inside">
                    {ai.key_requirements.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </section>
      )}

      <section className="rounded-lg border border-white/10 bg-black/40 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Sparkles className="h-4 w-4 text-yellow-300" />
          Score &amp; CRM
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-white/60">Score</p>
            <p className="text-lg font-semibold text-yellow-300">
              {opportunity.score != null ? opportunity.score : "—"}
            </p>
            <p className="text-xs text-white/70">{opportunity.priority || ""}</p>
          </div>
          <div className="space-y-3">
            <SimpleSelect
              label="Stage"
              name="stage"
              value={stage}
              onChange={(v) => v && handleStageChange(v)}
              options={stageOptions}
              placeholder="Select stage"
            />
            <CustomInput
              label="Assigned user"
              name="assigned_user"
              value={assignedUser}
              onChange={(e) => setAssignedUser(e.target.value)}
              onBlur={handleAssignedUserBlur}
              placeholder="Optional"
            />
          </div>
        </div>
      </section>

      {(proposalBrief || briefError) && (
        <section
          ref={briefRef}
          className="rounded-lg border border-white/10 bg-black/40 p-4"
        >
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <FileText className="h-4 w-4 text-yellow-300" />
            Proposal brief
          </h2>
          {briefError && (
            <p className="text-sm text-red-300">{briefMessage}</p>
          )}
          {proposalBrief && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/60">Summary</p>
                <p className="text-sm text-white/90">{proposalBrief.summary}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Eligibility reasoning</p>
                <p className="text-sm text-white/90">{proposalBrief.eligibility_reasoning}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Proposal outline</p>
                <p className="text-sm text-white/90 whitespace-pre-wrap">
                  {proposalBrief.proposal_outline}
                </p>
              </div>
              {proposalBrief.checklist?.length > 0 && (
                <div>
                  <p className="text-xs text-white/60">Checklist</p>
                  <ul className="list-disc list-inside text-sm text-white/90">
                    {proposalBrief.checklist.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
