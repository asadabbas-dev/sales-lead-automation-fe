"use client";

import {
  Users,
  Database,
  PlusCircle,
  TrendingUp,
  Activity,
  UserPlus,
  Phone,
  CheckCircle2,
  XCircle,
  UserX,
  Clock,
  Target,
  Sparkles,
  Briefcase,
  FileEdit,
  Send,
  Trophy,
  ThumbsDown,
} from "lucide-react";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import { StatCard } from "@/components/dashboard/stats-overview-bar/components/stat-card/stat-card.component";
import { formatDuration } from "@/common/utils/format-duration";
import useDashboardPage from "./use-dashboard-page.hook";

const LEADS_PIPELINE_ITEMS = [
  { icon: Users, label: "Total", key: "total" },
  { icon: UserPlus, label: "New", key: "new" },
  { icon: Phone, label: "Contacted", key: "contacted" },
  { icon: CheckCircle2, label: "Qualified", key: "qualified" },
  { icon: XCircle, label: "Unqualified", key: "unqualified" },
  { icon: UserX, label: "Lost", key: "lost" },
];

function formatLastRunAt(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  } catch {
    return "—";
  }
}

export default function DashboardPage() {
  const {
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
  } = useDashboardPage();

  return (
    <div className="mx-auto max-w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-yellow-300">CRM Dashboard</h1>
        <p className="mt-1 text-sm text-white/70">
          Pipeline overview and automation health
        </p>
      </div>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Users className="h-4 w-4 text-yellow-300" />
          Leads pipeline
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 bg-white/20 rounded-lg p-3">
          {LEADS_PIPELINE_ITEMS.map((item) => (
            <StatCard
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={leadsStats[item.key]}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Activity className="h-4 w-4 text-yellow-300" />
          Automation health
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 bg-white/20 rounded-lg p-3">
          <StatCard
            icon={Database}
            label="Total runs"
            value={runsStats.total}
          />
          <StatCard
            icon={CheckCircle2}
            label="Success rate"
            value={`${runsStats.successRate}%`}
          />
          <StatCard icon={XCircle} label="Failed" value={runsStats.failed} />
          <StatCard
            icon={Clock}
            label="Last run"
            value={formatLastRunAt(automationHealthStats?.lastRunAt)}
          />
          <StatCard
            icon={XCircle}
            label="Failed (24h)"
            value={automationHealthStats?.failedLast24h ?? 0}
          />
          <StatCard
            icon={CheckCircle2}
            label="Qualified"
            value={runsStats.qualified}
          />
          <StatCard
            icon={Clock}
            label="Avg time"
            value={formatDuration(runsStats.avgTime) ?? "—"}
          />
        </div>
        {automationHealthStats?.recentErrors?.length > 0 && (
          <div className="mt-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
            <p className="mb-2 text-xs font-medium text-red-300">
              Recent errors
            </p>
            <ul className="space-y-1.5 text-xs text-white/80">
              {automationHealthStats.recentErrors.map((e) => (
                <li key={e.run_id} className="font-mono truncate">
                  {e.message}
                  {e.at && (
                    <span className="ml-2 text-white/50">
                      {formatLastRunAt(e.at)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Briefcase className="h-4 w-4 text-yellow-300" />
          Opportunity overview
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 bg-white/20 rounded-lg p-3">
          <StatCard
            icon={Briefcase}
            label="Total opportunities"
            value={opportunitiesOverviewStats.totalOpportunities}
          />
          <StatCard
            icon={Sparkles}
            label="Analyzed"
            value={opportunitiesOverviewStats.analyzedCount}
          />
          <StatCard
            icon={Target}
            label="High score (80+)"
            value={opportunitiesOverviewStats.highScoreCount}
          />
        </div>
        <div className="mt-2">
          <CustomButton
            text="View opportunities"
            variant="ghost"
            size="sm"
            startIcon={<Briefcase className="h-4 w-4" />}
            onClick={goToOpportunities}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <TrendingUp className="h-4 w-4 text-yellow-300" />
          CRM pipeline
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 bg-white/20 rounded-lg p-3">
          <StatCard
            icon={Briefcase}
            label="New"
            value={pipelineCounts["New Opportunity"] ?? 0}
          />
          <StatCard
            icon={FileEdit}
            label="Under Review"
            value={pipelineCounts["Under Review"] ?? 0}
          />
          <StatCard
            icon={Activity}
            label="Proposal Prep"
            value={pipelineCounts["Proposal Preparation"] ?? 0}
          />
          <StatCard
            icon={Send}
            label="Submitted"
            value={pipelineCounts["Submitted"] ?? 0}
          />
          <StatCard
            icon={Trophy}
            label="Won"
            value={pipelineCounts["Won"] ?? 0}
          />
          <StatCard
            icon={ThumbsDown}
            label="Lost"
            value={pipelineCounts["Lost"] ?? 0}
          />
        </div>
        <div className="mt-2">
          <CustomButton
            text="View opportunities"
            variant="ghost"
            size="sm"
            startIcon={<Briefcase className="h-4 w-4" />}
            onClick={goToOpportunities}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Target className="h-4 w-4 text-yellow-300" />
          Best opportunities (leads)
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 bg-white/20 rounded-lg p-3">
          <StatCard
            icon={Sparkles}
            label="High-score leads (80+)"
            value={highValueStats?.highScoreLeads ?? 0}
          />
          <StatCard
            icon={Target}
            label="High ICP match (80+)"
            value={highValueStats?.highIcpCount ?? 0}
          />
          <StatCard
            icon={CheckCircle2}
            label="Qualified this week"
            value={highValueStats?.qualifiedThisWeek ?? 0}
          />
          <StatCard
            icon={UserPlus}
            label="New this week"
            value={highValueStats?.newThisWeek ?? 0}
          />
        </div>
        <div className="mt-2">
          <CustomButton
            text="View leads"
            variant="ghost"
            size="sm"
            startIcon={<Users className="h-4 w-4" />}
            onClick={goToLeads}
          />
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/40 p-4">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
          <TrendingUp className="h-4 w-4 text-yellow-300" />
          At a glance
        </h2>
        <p className="text-sm text-white/70">
          {leadsStats.qualified > 0 || runsStats.qualified > 0 ? (
            <>
              You have{" "}
              <strong className="text-yellow-300">
                {leadsStats.qualified}
              </strong>{" "}
              qualified lead{leadsStats.qualified === 1 ? "" : "s"} in the
              pipeline
              {runsStats.total > 0 && (
                <>
                  {" "}
                  and{" "}
                  <strong className="text-yellow-300">
                    {runsStats.total}
                  </strong>{" "}
                  automation run{runsStats.total === 1 ? "" : "s"} processed.
                </>
              )}
            </>
          ) : (
            <>
              No qualified leads or runs yet. Create a run or add leads to see
              pipeline metrics.
            </>
          )}
        </p>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/40 p-4">
        <h2 className="mb-3 text-sm font-semibold text-white/80">
          Quick actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <CustomButton
            text="View Leads"
            variant="secondary"
            size="sm"
            startIcon={<Users className="h-4 w-4" />}
            onClick={goToLeads}
          />
          <CustomButton
            text="Automation Runs"
            variant="secondary"
            size="sm"
            startIcon={<Database className="h-4 w-4" />}
            onClick={goToRuns}
          />
          <CustomButton
            text="Create Run"
            variant="primary"
            size="sm"
            startIcon={<PlusCircle className="h-4 w-4" />}
            onClick={goToCreateRun}
          />
          <CustomButton
            text="Opportunities"
            variant="secondary"
            size="sm"
            startIcon={<Briefcase className="h-4 w-4" />}
            onClick={goToOpportunities}
          />
        </div>
      </section>
    </div>
  );
}
