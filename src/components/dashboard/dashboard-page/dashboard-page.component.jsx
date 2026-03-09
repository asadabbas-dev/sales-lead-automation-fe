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

export default function DashboardPage() {
  const { leadsStats, runsStats, goToLeads, goToRuns, goToCreateRun } =
    useDashboardPage();

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
        </div>
      </section>
    </div>
  );
}
