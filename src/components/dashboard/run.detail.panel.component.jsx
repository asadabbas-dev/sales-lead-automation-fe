"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Copy,
  Download,
  RefreshCw,
  CheckCircle2,
  Inbox,
  Search,
  Brain,
  Database,
  Tag,
  Route,
  HardDrive,
  Mail,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { StatusBadge } from "./status.badge.component";
import { fetchRun } from "@/common/utils/api";

const TIMELINE_STEPS = [
  { id: "webhook", label: "Webhook Received", Icon: Inbox },
  { id: "parse", label: "Parse Payload", Icon: Search },
  { id: "ai", label: "AI Processing", Icon: Brain },
  { id: "retrieval", label: "Data Retrieval", Icon: Database },
  { id: "classification", label: "Classification", Icon: Tag },
  { id: "routing", label: "Routing Decision", Icon: Route },
  { id: "storage", label: "Storage", Icon: HardDrive },
  { id: "notify", label: "Notification", Icon: Mail },
  { id: "complete", label: "Complete", Icon: CheckCircle },
];

export function RunDetailPanel({ runId, isOpen, onClose }) {
  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("raw");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && runId) {
      setLoading(true);
      fetchRun(runId)
        .then(setRun)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isOpen, runId]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="sticky top-0 z-10 border-b border-white/10 bg-black/95 p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Run Details</h2>
                  {run && (
                    <code className="mt-1 text-xs text-cyan-400">
                      {run.id}
                    </code>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                </div>
              ) : run ? (
                <div className="space-y-6">
                  {/* Status Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <p className="text-xs font-medium text-slate-400">Status</p>
                      <div className="mt-2">
                        <StatusBadge status={run.status} />
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <p className="text-xs font-medium text-slate-400">Qualified</p>
                      <div className="mt-2">
                        {run.result_json?.qualified !== undefined ? (
                          <StatusBadge
                            status={run.result_json.qualified ? "qualified" : "unqualified"}
                          />
                        ) : (
                          <span className="text-sm text-slate-500">—</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <h3 className="mb-4 text-sm font-semibold text-white">Execution Timeline</h3>
                    <div className="space-y-4">
                      {TIMELINE_STEPS.map((step, index) => {
                        const isComplete = index < 7; // Simulate completion
                        const StepIcon = step.Icon;
                        return (
                          <div key={step.id} className="flex items-start gap-4">
                            <div className="relative flex flex-col items-center">
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                  isComplete
                                    ? "border-cyan-500 bg-cyan-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                    : "border-slate-500 bg-slate-500/20"
                                }`}
                              >
                                {isComplete ? (
                                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                                ) : (
                                  <StepIcon className="h-4 w-4 text-slate-400" />
                                )}
                              </div>
                              {index < TIMELINE_STEPS.length - 1 && (
                                <div
                                  className={`mt-1 h-12 w-0.5 ${
                                    isComplete ? "bg-cyan-500/30" : "bg-slate-500/30"
                                  }`}
                                />
                              )}
                            </div>
                            <div className="flex-1 pt-1">
                              <p className="text-sm font-medium text-white">{step.label}</p>
                              {isComplete && (
                                <p className="mt-1 text-xs text-slate-400">
                                  Completed in ~{Math.round(Math.random() * 100 + 50)}ms
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Decision Card */}
                  {run.result_json && (
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6 backdrop-blur-sm">
                      <h3 className="mb-4 text-sm font-semibold text-white">AI Decision</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-slate-400">Score</p>
                          <p className="mt-1 text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            {run.result_json.score}
                          </p>
                        </div>
                        {run.result_json.reasons && run.result_json.reasons.length > 0 && (
                          <div>
                            <p className="mb-2 text-xs font-medium text-slate-400">Reasons</p>
                            <div className="flex flex-wrap gap-2">
                              {run.result_json.reasons.map((reason, i) => (
                                <span
                                  key={i}
                                  className="rounded-md border border-cyan-500/30 bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300"
                                >
                                  {reason}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Payload Viewer */}
                  <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="border-b border-white/10 p-4">
                      <div className="flex items-center gap-2">
                        {["raw", "parsed", "ai", "metadata"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                              activeTab === tab
                                ? "bg-cyan-500/20 text-cyan-300"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-slate-400">
                          {activeTab === "raw" && "Raw JSON"}
                          {activeTab === "parsed" && "Parsed Data"}
                          {activeTab === "ai" && "AI Output"}
                          {activeTab === "metadata" && "Metadata"}
                        </p>
                        <button
                          onClick={() =>
                            handleCopy(JSON.stringify(run.payload_json, null, 2))
                          }
                          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 hover:text-white"
                        >
                          {copied ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="overflow-x-auto rounded-lg bg-black/50 p-4 text-xs text-slate-300">
                        {JSON.stringify(
                          activeTab === "raw"
                            ? run.payload_json
                            : activeTab === "parsed"
                            ? run.result_json?.lead || {}
                            : activeTab === "ai"
                            ? run.result_json || {}
                            : { created_at: run.created_at, source: run.source },
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
                      <RefreshCw className="h-4 w-4" />
                      Replay Run
                    </button>
                    <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
                      <Download className="h-4 w-4" />
                      Export Logs
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  Failed to load run details
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
