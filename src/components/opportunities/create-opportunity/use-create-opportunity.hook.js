"use client";

import { createOpportunity } from "@/provider/features/opportunities/opportunities.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const SOURCE_OPTIONS = [
  { label: "Manual", value: "manual" },
  { label: "API", value: "api" },
  { label: "Grant portal", value: "grant_portal" },
];

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("Title is required")
    .max(512, "Title must be at most 512 characters"),
  source: Yup.string().trim().required("Source is required").max(64, "Source must be at most 64 characters"),
  deadline: Yup.string().trim().nullable(),
  funding_value: Yup.string().trim().nullable(),
  description: Yup.string().trim().nullable().max(50000, "Description must be at most 50000 characters"),
  url: Yup.string()
    .trim()
    .nullable()
    .max(2048, "URL must be at most 2048 characters")
    .test("url", "Invalid URL", (v) => !v || /^https?:\/\/.+/.test(v)),
  organization: Yup.string().trim().nullable().max(512, "Organization must be at most 512 characters"),
  location: Yup.string().trim().nullable().max(255, "Location must be at most 255 characters"),
  industry_tags: Yup.string().trim().nullable(),
});

const defaultValues = {
  title: "",
  source: "manual",
  deadline: "",
  funding_value: "",
  description: "",
  url: "",
  organization: "",
  location: "",
  industry_tags: "",
};

export default function useCreateOpportunity() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (s) => s?.opportunities?.createOpportunity ?? {},
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const setSelect = useCallback(
    (name) => (value) => {
      setValue(name, value ?? "");
    },
    [setValue],
  );

  const onSubmit = useCallback(
    (values) => {
      const payload = {
        title: values.title?.trim() ?? "",
        source: (values.source?.trim() || "manual"),
      };
      if (values.deadline?.trim()) payload.deadline = values.deadline.trim();
      if (values.funding_value?.trim()) {
        const num = parseFloat(String(values.funding_value).replace(/[$,]/g, ""), 10);
        if (!Number.isNaN(num)) payload.funding_value = num;
      }
      if (values.description?.trim()) payload.description = values.description.trim();
      if (values.url?.trim()) payload.url = values.url.trim();
      if (values.organization?.trim()) payload.organization = values.organization.trim();
      if (values.location?.trim()) payload.location = values.location.trim();
      if (values.industry_tags?.trim()) {
        payload.industry_tags = values.industry_tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      dispatch(
        createOpportunity({
          payload,
          successCallBack: (data) => {
            const id = data?.id;
            if (id) router.push(`/opportunities/${id}`);
            else router.push("/opportunities");
          },
        }),
      );
    },
    [dispatch, router],
  );

  const goBack = useCallback(() => router.push("/opportunities"), [router]);

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setSelect,
    onSubmit,
    isLoading,
    sourceOptions: SOURCE_OPTIONS,
    goBack,
  };
}
