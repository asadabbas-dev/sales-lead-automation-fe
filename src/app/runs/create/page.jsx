"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { StatusBadge } from "@/components/dashboard/status.badge.component";
import { createRun } from "@/provider/features/runs/runs.slice";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Brain,
  CheckCircle2,
  User,
  XCircle,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ─── Score bar ────────────────────────────────────────────────────────────────
function ScoreBar({ score }) {
  const color =
    score >= 70
      ? "from-yellow-300 to-emerald-400"
      : score >= 40
        ? "from-yellow-500 to-orange-400"
        : "from-red-500 to-rose-400";
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-white">
        <span>AI Score</span>
        <span className="font-bold text-white">{score} / 100</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

// ─── AI Result card ───────────────────────────────────────────────────────────
function AIResultCard({ result }) {
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-yellow-300" />
          <h3 className="font-semibold text-yellow-300">AI Decision</h3>
        </div>
        <StatusBadge status={qualified ? "qualified" : "unqualified"} />
      </div>

      {/* Score */}
      <ScoreBar score={score} />

      {/* Reasons */}
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

      {/* Extracted lead fields */}
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

// ─── Section divider ──────────────────────────────────────────────────────────
function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <Icon className="h-3.5 w-3.5 text-yellow-300" />
      <span className="text-xs font-semibold uppercase tracking-wider text-yellow-300">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

// ─── Initial state ────────────────────────────────────────────────────────────
const INITIAL_FORM = {
  // Run config
  workflow: "",
  source: "manual",
  priority: "",
  // Lead data — these become payload_json sent to the AI
  name: "",
  email: "",
  phone: "",
  budget: "",
  intent: "",
  urgency: "",
  industry: "",
};

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CreateRunPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state) => state?.runs?.createRun || {});

  const [form, setForm] = useState(INITIAL_FORM);
  const [result, setResult] = useState(null);
  const [aiErr, setAiErr] = useState(null);

  // Generic field change — clears previous result on any edit
  const set = (name) => (e) => {
    const value = typeof e === "string" ? e : e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (result) setResult(null);
    if (aiErr) setAiErr(null);
  };

  const handleSubmit = () => {
    // ── Validate run config ───────────────────────────────────────────────────
    if (!form.workflow.trim()) {
      enqueueSnackbar("Workflow name is required.", { variant: "error" });
      return;
    }

    // ── Validate lead data — email OR phone required ───────────────────────────
    if (!form.email.trim() && !form.phone.trim()) {
      enqueueSnackbar("Lead must have at least an Email or Phone number.", {
        variant: "error",
      });
      return;
    }

    // ── Build payload_json from individual lead fields ─────────────────────────
    const payload_json = {};
    if (form.name.trim()) payload_json.name = form.name.trim();
    if (form.email.trim()) payload_json.email = form.email.trim();
    if (form.phone.trim()) payload_json.phone = form.phone.trim();
    if (form.budget.trim()) payload_json.budget = Number(form.budget);
    if (form.intent.trim()) payload_json.intent = form.intent.trim();
    if (form.urgency) payload_json.urgency = form.urgency;
    if (form.industry.trim()) payload_json.industry = form.industry.trim();

    // ── Dispatch ──────────────────────────────────────────────────────────────
    dispatch(
      createRun({
        payload: {
          workflow: form.workflow.trim(),
          source: form.source,
          priority: form.priority || null,
          payload_json, // assembled from individual fields above
        },
        successCallBack: (res) => {
          setResult(res);
          if (res.status === "success") {
            enqueueSnackbar(
              res.qualified
                ? "Lead qualified!"
                : "Lead processed — not qualified.",
              { variant: res.qualified ? "success" : "info" },
            );
          } else {
            setAiErr(res.error || "AI enrichment failed.");
            enqueueSnackbar("AI enrichment failed. Run saved as failed.", {
              variant: "error",
            });
          }
        },
        errorCallBack: (err) => {
          const msg = err?.detail || err?.message || "Failed to create run.";
          setAiErr(msg);
          enqueueSnackbar(msg, { variant: "error" });
        },
      }),
    );
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setResult(null);
    setAiErr(null);
  };

  return (
    <div className="w-full text-white">
      <div className="mx-auto max-w-6xl">
        {/* Page header */}
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
          {/* ── Left: Form ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-white/10 bg-[#0b0b0b] p-6 space-y-4"
          >
            {/* ── Section 1: Run config ──────────────────────────────────── */}
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
                options={[
                  { label: "Manual", value: "manual" },
                  { label: "API", value: "api" },
                  { label: "Webhook", value: "webhook" },
                  { label: "CRM", value: "crm" },
                  { label: "Import", value: "import" },
                ]}
              />
            </div>

            <SimpleSelect
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={set("priority")}
              options={[
                { label: "None", value: "" },
                { label: "Low", value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High", value: "high" },
              ]}
            />

            {/* ── Section 2: Lead contact ────────────────────────────────── */}
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

            {/* ── Section 3: Qualification signals ──────────────────────── */}
            <SectionLabel icon={Brain} label="Qualification Signals" />

            <p className="text-xs text-white">
              The more signals you provide, the more accurate the AI score.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                label="Budget (USD)"
                value={form.budget}
                onChange={set("budget")}
                placeholder="50000"
              />
              <SimpleSelect
                label="Urgency"
                name="urgency"
                value={form.urgency}
                onChange={set("urgency")}
                options={[
                  { label: "Not specified", value: "" },
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                ]}
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

            {/* ── Status legend ──────────────────────────────────────────── */}
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

            {/* ── Actions ────────────────────────────────────────────────── */}
            <div className="flex justify-end gap-3 pt-2">
              <CustomButton
                text="Cancel"
                variant="ghost"
                onClick={() => router.push("/runs")}
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

          {/* ── Right: AI result panel ─────────────────────────────────────── */}
          <div className="lg:sticky lg:top-6">
            <AnimatePresence mode="wait">
              {/* Loading */}
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

              {/* Error */}
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

              {/* Success result */}
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
                        onClick={() => router.push("/runs")}
                      />
                      <CustomButton
                        text="Create Another"
                        onClick={handleReset}
                      />
                    </div>
                  </motion.div>
                )}

              {/* Empty / initial state */}
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

                  {/* Mini legend of what AI returns */}
                  <div className="w-full mt-2 rounded-lg border border-white/10 bg-black/30 p-4 text-left space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                      AI returns
                    </p>
                    {[
                      "Qualified / Unqualified decision",
                      "Score from 0 to 100",
                      "1–5 reasons for the decision",
                      "Extracted & normalised lead fields",
                    ].map((item) => (
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
