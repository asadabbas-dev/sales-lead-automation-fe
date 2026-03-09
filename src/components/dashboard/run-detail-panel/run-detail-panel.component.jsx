"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Copy, Download, X } from "lucide-react";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import StatsBadge from "@/common/components/stats-badge/stats-badge.component";
import { StatusBadge } from "../status-badge/status-badge.component";
import { useRunDetailPanel } from "./use-run-detail-panel.hook";

function runRef(id) {
  return id ? `#${String(id).slice(0, 6)}` : "";
}

const PANEL_TOP_OFFSET = "1rem"; /* match navbar h-16 */

export function RunDetailPanel({ runId, isOpen, onClose }) {
  const {
    activeTab,
    copied,
    runDetail,
    isLoading,
    isError,
    message,
    getTabData,
    handleTabChange,
    handleCopyTabData,
    handleCopyFullData,
  } = useRunDetailPanel({ runId, isOpen });

  if (!isOpen) return null;

  const panelContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — full viewport, below navbar so header stays visible or cover all */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm"
            aria-hidden
          />

          {/* Slide-in panel — starts below navbar so nothing is hidden */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 z-[100] w-full max-w-2xl overflow-hidden rounded-l-lg border-l border-y border-white/20 bg-black/95 shadow-2xl backdrop-blur-xl"
            style={{
              top: PANEL_TOP_OFFSET,
              height: `calc(100vh - ${PANEL_TOP_OFFSET})`,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="run-detail-title"
          >
            <div className="flex h-full flex-col overflow-hidden">
              {/* Sticky header */}
              <div className="shrink-0 border-b border-white/10 bg-black/95 px-4 py-3 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h2
                      id="run-detail-title"
                      className="text-base font-bold text-white"
                    >
                      Run Details
                    </h2>
                  </div>
                  <CustomButton
                    text="Close"
                    variant="ghost"
                    size="sm"
                    startIcon={<X className="h-4 w-4" />}
                    onClick={onClose}
                  />
                </div>
              </div>

              {/* Scrollable body */}
              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-300 border-t-transparent" />
                  </div>
                ) : isError ? (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                    {message}
                  </div>
                ) : runDetail ? (
                  <div className="space-y-4">
                    {/* Status + Qualified */}
                    <div className="grid grid-cols-2 gap-3">
                      <StatsBadge
                        label="Status"
                        value={<StatusBadge status={runDetail.status} />}
                        labelClassName="text-white/70"
                        valueClassName=""
                        className="p-3 backdrop-blur-sm"
                      />
                      <StatsBadge
                        label="Qualified"
                        value={
                          runDetail.result_json?.qualified !== undefined ? (
                            <StatusBadge
                              status={
                                runDetail.result_json.qualified
                                  ? "qualified"
                                  : "unqualified"
                              }
                            />
                          ) : (
                            <span className="text-sm text-white/50">
                              &mdash;
                            </span>
                          )
                        }
                        labelClassName="text-white/70"
                        valueClassName=""
                        className="p-3 backdrop-blur-sm"
                      />
                    </div>

                    {/* Metadata row */}
                    <div className="grid grid-cols-2 gap-3">
                      {runDetail.priority && (
                        <StatsBadge
                          label="Priority"
                          value={runDetail.priority}
                          labelClassName="text-white/70"
                          valueClassName="capitalize"
                          className="p-3 backdrop-blur-sm"
                        />
                      )}
                      <StatsBadge
                        label="Source"
                        value={runDetail.source}
                        labelClassName="text-white/70"
                        className="p-3 backdrop-blur-sm"
                      />
                    </div>

                    {/* AI Decision */}
                    {runDetail.result_json && (
                      <div className="rounded-lg border border-white/10 bg-gradient-to-br from-yellow-300/10 to-yellow-300/5 p-4 backdrop-blur-sm">
                        <h3 className="mb-3 text-sm font-semibold text-yellow-300">
                          AI Decision
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-white/70">
                              Score
                            </p>
                            <p className="mt-1 text-3xl font-bold text-yellow-300">
                              {runDetail.result_json.score ?? "—"}
                            </p>
                          </div>
                          {runDetail.result_json.reasons?.length > 0 && (
                            <div>
                              <p className="mb-2 text-xs font-medium text-white/70">
                                Reasons
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {runDetail.result_json.reasons.map(
                                  (reason, i) => (
                                    <span
                                      key={i}
                                      className="rounded-lg border border-yellow-300/30 bg-yellow-300/20 px-2 py-1 text-xs text-yellow-300"
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
                                    <p className="text-xs font-medium capitalize text-yellow-300">
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
                    <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm">
                      <div className="border-b border-white/10 p-3">
                        <div className="flex items-center gap-2">
                          {["raw", "parsed", "ai", "metadata"].map((tab) => (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => handleTabChange(tab)}
                              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                                activeTab === tab
                                  ? "bg-yellow-300/20 text-yellow-300"
                                  : "text-white/60 hover:text-white"
                              }`}
                            >
                              {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-medium text-white/70">
                            {activeTab === "raw" && "Raw Input Payload"}
                            {activeTab === "parsed" && "Extracted Lead Fields"}
                            {activeTab === "ai" && "Full AI Output"}
                            {activeTab === "metadata" && "Run Metadata"}
                          </p>
                          <CustomButton
                            text={copied ? "Copied" : "Copy"}
                            variant="ghost"
                            size="sm"
                            startIcon={
                              copied ? (
                                <CheckCircle2 className="h-3 w-3 text-yellow-300" />
                              ) : (
                                <Copy className="h-3 w-3 text-white/70" />
                              )
                            }
                            onClick={handleCopyTabData}
                          />
                        </div>
                        <pre className="overflow-x-auto rounded-lg bg-black/60 p-4 text-xs text-white/80 max-h-80">
                          {JSON.stringify(getTabData(), null, 2)}
                        </pre>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <CustomButton
                        text="Export JSON"
                        variant="outline"
                        size="sm"
                        startIcon={<Download className="h-4 w-4" />}
                        onClick={handleCopyFullData}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-white/60">
                    Failed to load run details.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(panelContent, document.body)
    : null;
}
