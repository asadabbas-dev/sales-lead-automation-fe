"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { AIResultCard } from "./components/ai-result-card/ai-result-card.component";
import { SectionLabel } from "./components/section-label/section-label.component";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Brain,
  CheckCircle2,
  User,
  XCircle,
  Zap,
} from "lucide-react";
import useCreateRun from "./use-create-run.hook";

export default function CreateRun() {
  const {
    form,
    result,
    aiErr,
    isLoading,
    set,
    handleSubmit,
    handleReset,
    goToRuns,
    sourceOptions,
    priorityOptions,
    urgencyOptions,
    aiReturnsList,
  } = useCreateRun();

  return (
    <div className="w-full text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4">
          <button
            type="button"
            onClick={goToRuns}
            className="text-sm text-white/70 hover:text-yellow-300 transition-colors flex items-center gap-1"
          >
            <span aria-hidden>←</span> Back to Runs
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            Create Run
          </h1>
          <p className="mt-1 text-sm text-white">
            Enter lead details below — the AI will qualify the lead, assign a
            score, and save the run automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-white/10 bg-[#0b0b0b] p-6 space-y-4"
          >
            <SectionLabel icon={Zap} label="Run Configuration" />

            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                label="Workflow *"
                value={form.workflow}
                onChange={set("workflow")}
                placeholder="e.g. b2b-qualification"
              />
              <SimpleSelect
                label="Source *"
                name="source"
                value={form.source}
                onChange={set("source")}
                options={sourceOptions}
              />
            </div>

            <SimpleSelect
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={set("priority")}
              options={priorityOptions}
            />

            <SectionLabel icon={User} label="Lead Contact" />

            <CustomInput
              label="Full Name"
              value={form.name}
              onChange={set("name")}
              placeholder="John Smith"
            />

            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                label="Email *"
                value={form.email}
                onChange={set("email")}
                placeholder="john@acme.com"
              />
              <CustomInput
                label="Phone *"
                value={form.phone}
                onChange={set("phone")}
                placeholder="+1 555 000 0000"
              />
            </div>

            <SectionLabel icon={Brain} label="Qualification Signals" />

            <p className="text-xs text-white">
              The more signals you provide, the more accurate the AI score.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                label="Budget (USD)"
                value={form.budget}
                type="number"
                onChange={set("budget")}
                placeholder="50000"
              />
              <SimpleSelect
                label="Urgency"
                name="urgency"
                value={form.urgency}
                onChange={set("urgency")}
                options={urgencyOptions}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                label="Industry"
                value={form.industry}
                onChange={set("industry")}
                placeholder="SaaS / Healthcare / Finance"
              />
              <CustomInput
                label="Intent / Notes"
                value={form.intent}
                onChange={set("intent")}
                placeholder="Looking for enterprise plan"
              />
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2.5 mt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-300">
                How status &amp; qualification are determined
              </p>
              <div className="flex items-start gap-2 text-xs text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-white shrink-0 mt-0.5" />
                <span>
                  <span className="text-yellow-300 font-medium">
                    success + Qualified
                  </span>{" "}
                  — AI scored the lead highly based on budget, urgency, and
                  intent
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-white shrink-0 mt-0.5" />
                <span>
                  <span className="text-yellow-300 font-medium">
                    success + Unqualified
                  </span>{" "}
                  — AI ran but lead lacks sufficient buying signals
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-white">
                <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                <span>
                  <span className="text-yellow-300 font-medium">failed</span> —
                  AI call errored (invalid API key, network, or timeout)
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <CustomButton
                text="Cancel"
                variant="ghost"
                onClick={goToRuns}
                disabled={isLoading}
              />
              <CustomButton
                text={isLoading ? "Running AI..." : "Create Run"}
                onClick={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
              />
            </div>
          </motion.div>

          <div className="lg:sticky lg:top-6">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-12 flex flex-col items-center justify-center gap-5 text-center"
                >
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border-2 border-yellow-300/20 border-t-white animate-spin" />
                    <Brain className="absolute inset-0 m-auto h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      AI is processing the lead...
                    </p>
                    <p className="mt-1 text-sm text-white">
                      Scoring, extracting fields, making qualification decision
                    </p>
                  </div>
                </motion.div>
              )}

              {!isLoading && aiErr && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-300">
                        AI Enrichment Failed
                      </p>
                      <p className="mt-1 text-sm text-red-200">{aiErr}</p>
                      <p className="mt-2 text-xs text-red-400/70">
                        The run was saved with status{" "}
                        <code className="bg-red-500/20 px-1 rounded">
                          failed
                        </code>
                        . Fix the issue and resubmit.
                      </p>
                    </div>
                  </div>
                  <CustomButton
                    text="Try Again"
                    variant="ghost"
                    onClick={handleReset}
                  />
                </motion.div>
              )}

              {!isLoading &&
                result &&
                result.status === "success" &&
                result.result_json && (
                  <motion.div key="result" className="space-y-4">
                    <AIResultCard result={result.result_json} />
                    <div className="flex justify-end gap-3">
                      <CustomButton
                        text="View All Runs"
                        variant="ghost"
                        onClick={goToRuns}
                      />
                      <CustomButton
                        text="Create Another"
                        onClick={handleReset}
                      />
                    </div>
                  </motion.div>
                )}

              {!isLoading && !result && !aiErr && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-dashed border-white/10 bg-white/5 p-12 flex flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-yellow-300 flex items-center justify-center">
                    <Brain className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-300">
                      AI result will appear here
                    </p>
                    <p className="mt-1 text-sm text-white">
                      Fill in the lead details and click "Create Run"
                    </p>
                  </div>
                  <div className="w-full mt-2 rounded-lg border border-white/10 bg-black/30 p-4 text-left space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                      AI returns
                    </p>
                    {aiReturnsList.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-white"
                      >
                        <CheckCircle2 className="h-3 w-3 text-white shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
