"use client";

import { getRun, resetRuns } from "@/provider/features/runs/runs.slice";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Copy, Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBadge } from "./status.badge.component";

export function RunDetailPanel({ runId, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("raw");
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  const {
    data: runDetail,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.runs.runDetail);

  // if (!runDetail) return null;

  useEffect(() => {
    if (isOpen && runId) {
      dispatch(getRun({ id: runId }));
    }
  }, [isOpen, runId, dispatch]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTabData = () => {
    if (!runDetail) return {};
    switch (activeTab) {
      case "raw":
        return runDetail.payload_json;
      case "parsed":
        return runDetail.result_json?.lead || {};
      case "ai":
        return runDetail.result_json || {};
      case "metadata":
        return {
          id: runDetail.id,
          source: runDetail.source,
          status: runDetail.status,
          priority: runDetail.priority || null,
          idempotency_key: runDetail.idempotency_key || null,
          created_at: runDetail.created_at,
          error: runDetail.error || null,
        };
      default:
        return {};
    }
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
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm"
          />

          {/* Slide-in panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-16 z-[100] h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-white/10 bg-black/95 p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Run Details</h2>
                  {runDetail && (
                    <code className="mt-1 text-xs text-cyan-400">
                      {runDetail.id}
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
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                </div>
              ) : isError ? (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                  {message}
                </div>
              ) : runDetail ? (
                <div className="space-y-6">
                  {/* Status + Qualified */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <p className="text-xs font-medium text-slate-400">
                        Status
                      </p>
                      <div className="mt-2">
                        <StatusBadge status={runDetail.status} />
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <p className="text-xs font-medium text-slate-400">
                        Qualified
                      </p>
                      <div className="mt-2">
                        {runDetail.result_json?.qualified !== undefined ? (
                          <StatusBadge
                            status={
                              runDetail.result_json.qualified
                                ? "qualified"
                                : "unqualified"
                            }
                          />
                        ) : (
                          <span className="text-sm text-slate-500">
                            &mdash;
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Metadata row */}
                  <div className="grid grid-cols-2 gap-4">
                    {runDetail.priority && (
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                        <p className="text-xs font-medium text-slate-400">
                          Priority
                        </p>
                        <p className="mt-1 text-sm font-semibold capitalize text-white">
                          {runDetail.priority}
                        </p>
                      </div>
                    )}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <p className="text-xs font-medium text-slate-400">
                        Source
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {runDetail.source}
                      </p>
                    </div>
                  </div>

                  {/* AI Decision */}
                  {runDetail.result_json && (
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6 backdrop-blur-sm">
                      <h3 className="mb-4 text-sm font-semibold text-white">
                        AI Decision
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-slate-400">
                            Score
                          </p>
                          <p className="mt-1 text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            {runDetail.result_json.score ?? "&mdash;"}
                          </p>
                        </div>
                        {runDetail.result_json.reasons?.length > 0 && (
                          <div>
                            <p className="mb-2 text-xs font-medium text-slate-400">
                              Reasons
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {runDetail.result_json.reasons.map(
                                (reason, i) => (
                                  <span
                                    key={i}
                                    className="rounded-md border border-cyan-500/30 bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300"
                                  >
                                    {reason}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                        {/* Lead fields */}
                        {runDetail.result_json.lead && (
                          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                            {Object.entries(runDetail.result_json.lead)
                              .filter(([, v]) => v != null)
                              .map(([key, value]) => (
                                <div key={key}>
                                  <p className="text-xs font-medium capitalize text-slate-400">
                                    {key}
                                  </p>
                                  <p className="mt-0.5 text-sm text-white">
                                    {typeof value === "number" &&
                                    key === "budget"
                                      ? `$${value.toLocaleString()}`
                                      : String(value)}
                                  </p>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Error block */}
                  {runDetail.error && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                      <p className="text-xs font-medium text-red-400 mb-1">
                        Error
                      </p>
                      <p className="font-mono text-xs text-red-200 whitespace-pre-wrap">
                        {runDetail.error}
                      </p>
                    </div>
                  )}

                  {/* Payload tabs */}
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
                          {activeTab === "raw" && "Raw Input Payload"}
                          {activeTab === "parsed" && "Extracted Lead Fields"}
                          {activeTab === "ai" && "Full AI Output"}
                          {activeTab === "metadata" && "Run Metadata"}
                        </p>
                        <button
                          onClick={() =>
                            handleCopy(JSON.stringify(getTabData(), null, 2))
                          }
                          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 hover:text-white transition-colors"
                        >
                          {copied ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 text-cyan-400" />
                              <span className="text-cyan-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="overflow-x-auto rounded-lg bg-black/50 p-4 text-xs text-slate-300 max-h-80">
                        {JSON.stringify(getTabData(), null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handleCopy(JSON.stringify(runDetail, null, 2))
                      }
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                      <Download className="h-4 w-4" />
                      Export JSON
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  Failed to load run details.
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
