"use client";

import { createRun } from "@/provider/features/runs/runs.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const defaultValues = {
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

const validationSchema = Yup.object()
  .shape({
    workflow: Yup.string()
      .trim()
      .required("Workflow is required"),
    source: Yup.string().required("Source is required"),
    priority: Yup.string().optional(),
    name: Yup.string().optional(),
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .optional(),
    phone: Yup.string().trim().optional(),
    budget: Yup.string().optional(),
    intent: Yup.string().optional(),
    urgency: Yup.string().optional(),
    industry: Yup.string().optional(),
  })
  .test(
    "contact-required",
    "Email or phone is required",
    (values) =>
      !!(
        (values.email && values.email.trim()) ||
        (values.phone && values.phone.trim())
      ),
  );

export default function useCreateRun() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => state?.runs?.createRun ?? {},
  );
  const [submittedResult, setSubmittedResult] = useState(null);

  const {
    register,
    handleSubmit: formHandleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (values) => {
      const payload_json = {};
      if (values.name?.trim()) payload_json.name = values.name.trim();
      if (values.email?.trim()) payload_json.email = values.email.trim();
      if (values.phone?.trim()) payload_json.phone = values.phone.trim();
      if (values.budget?.trim())
        payload_json.budget = Number(values.budget);
      if (values.intent?.trim()) payload_json.intent = values.intent.trim();
      if (values.urgency?.trim()) payload_json.urgency = values.urgency.trim();
      if (values.industry?.trim())
        payload_json.industry = values.industry.trim();

      dispatch(
        createRun({
          payload: {
            workflow: values.workflow.trim(),
            source: values.source,
            priority: values.priority?.trim() || null,
            payload_json,
          },
          successCallBack: (res) => setSubmittedResult(res),
        }),
      );
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    setSubmittedResult(null);
    reset(defaultValues);
  }, [reset]);

  const goToRuns = useCallback(() => router.push("/runs"), [router]);

  const setSelect = useCallback(
    (name) => (value) => setValue(name, value ?? "", { shouldValidate: true }),
    [setValue],
  );

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

  const result = submittedResult;
  const aiErr =
    result?.status === "failed" ? result?.error || "AI enrichment failed." : null;

  return {
    register,
    handleSubmit: formHandleSubmit(onSubmit),
    errors,
    setValue,
    watch,
    setSelect,
    result,
    aiErr,
    isLoading,
    handleReset,
    goToRuns,
    sourceOptions,
    priorityOptions,
    urgencyOptions,
    aiReturnsList,
  };
}
