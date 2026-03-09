"use client";

import { StatusBadge } from "@/components/dashboard/status-badge/status-badge.component";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";
import { ScoreBar } from "../score-bar/score-bar.component";

export function AIResultCard({ result }) {
  const { qualified, score, reasons, lead } = result;

  const leadFields = [
    { label: "Name", value: lead?.name },
    { label: "Email", value: lead?.email },
    { label: "Phone", value: lead?.phone },
    {
      label: "Budget",
      value:
        lead?.budget != null
          ? `$${Number(lead.budget).toLocaleString()}`
          : null,
    },
    { label: "Intent", value: lead?.intent },
    { label: "Urgency", value: lead?.urgency },
    { label: "Industry", value: lead?.industry },
  ].filter(({ value }) => value != null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-6 space-y-5 ${
        qualified
          ? "border-yellow-300/40 bg-gradient-to-br from-yellow-300/10 to-transparent"
          : "border-white/40 bg-gradient-to-br from-white/10 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-yellow-300" />
          <h3 className="font-semibold text-yellow-300">AI Decision</h3>
        </div>
        <StatusBadge status={qualified ? "qualified" : "unqualified"} />
      </div>

      <ScoreBar score={score} />

      {reasons?.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white">
            Reasons
          </p>
          <div className="flex flex-wrap gap-2">
            {reasons.map((r, i) => (
              <span
                key={i}
                className="rounded-full border border-yellow-300 bg-yellow-300 px-3 py-1 text-xs text-black"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      )}

      {leadFields.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white">
            Extracted by AI
          </p>
          <div className="grid grid-cols-2 gap-2">
            {leadFields.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5"
              >
                <p className="text-xs text-white">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
