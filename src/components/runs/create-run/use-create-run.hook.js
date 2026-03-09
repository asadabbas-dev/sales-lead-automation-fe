"use client";

import { createRun } from "@/provider/features/runs/runs.slice";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const INITIAL_FORM = {
  workflow: "",
  source: "manual",
  priority: "",
  name: "",
  email: "",
  phone: "",
  budget: "",
  intent: "",
  urgency: "",
  industry: "",
};

export default function useCreateRun() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.runs?.createRun || {});

  const [form, setForm] = useState(INITIAL_FORM);
  const [result, setResult] = useState(null);
  const [aiErr, setAiErr] = useState(null);

  const set = useCallback((name) => {
    return (e) => {
      const value = typeof e === "string" ? e : e.target.value;
      setForm((prev) => ({ ...prev, [name]: value }));
      setResult(null);
      setAiErr(null);
    };
  }, []);

  const handleSubmit = useCallback(() => {
    if (!form.workflow.trim()) return;
    if (!form.email.trim() && !form.phone.trim()) return;

    const payload_json = {};
    if (form.name.trim()) payload_json.name = form.name.trim();
    if (form.email.trim()) payload_json.email = form.email.trim();
    if (form.phone.trim()) payload_json.phone = form.phone.trim();
    if (form.budget.trim()) payload_json.budget = Number(form.budget);
    if (form.intent.trim()) payload_json.intent = form.intent.trim();
    if (form.urgency) payload_json.urgency = form.urgency;
    if (form.industry.trim()) payload_json.industry = form.industry.trim();

    dispatch(
      createRun({
        payload: {
          workflow: form.workflow.trim(),
          source: form.source,
          priority: form.priority || null,
          payload_json,
        },
        successCallBack: (res) => {
          setResult(res);
          setAiErr(
            res.status === "success" ? null : res.error || "AI enrichment failed.",
          );
        },
        errorCallBack: (err) => {
          const msg = err?.detail || err?.message || "Failed to create run.";
          setAiErr(msg);
        },
      }),
    );
  }, [dispatch, form]);

  const handleReset = useCallback(() => {
    setForm(INITIAL_FORM);
    setResult(null);
    setAiErr(null);
  }, []);

  const goToRuns = useCallback(() => router.push("/runs"), [router]);

  const sourceOptions = useMemo(
    () => [
      { label: "Manual", value: "manual" },
      { label: "API", value: "api" },
      { label: "Webhook", value: "webhook" },
      { label: "CRM", value: "crm" },
      { label: "Import", value: "import" },
    ],
    [],
  );

  const priorityOptions = useMemo(
    () => [
      { label: "None", value: "" },
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
    [],
  );

  const urgencyOptions = useMemo(
    () => [
      { label: "Not specified", value: "" },
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
    [],
  );

  const aiReturnsList = useMemo(
    () => [
      "Qualified / Unqualified decision",
      "Score from 0 to 100",
      "1–5 reasons for the decision",
      "Extracted & normalised lead fields",
    ],
    [],
  );

  return {
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
  };
}
