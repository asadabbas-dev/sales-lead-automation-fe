"use client";

import {
  getIcpConfigThunk,
  updateIcpConfigThunk,
} from "@/provider/features/settings/settings.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { EMPTY_ICP_CONFIG } from "../../common/constants/settings.constants";
import {
  formValuesToIcpPayload,
  icpDataToFormValues,
} from "../../common/utils/settings.utils";

const validationSchema = Yup.object()
  .shape({
    industry: Yup.string().optional(),
    company_size: Yup.string().optional(),
    budget_min: Yup.string().optional(),
    budget_max: Yup.string().optional(),
    intent_keywords: Yup.string().optional(),
    location: Yup.string().optional(),
  })
  .test(
    "budget-range",
    "Budget min must be less than or equal to budget max",
    (values) => {
      const min = values.budget_min?.trim();
      const max = values.budget_max?.trim();
      if (!min || !max) return true;
      const minNum = Number(min);
      const maxNum = Number(max);
      if (Number.isNaN(minNum) || Number.isNaN(maxNum)) return true;
      return minNum <= maxNum;
    },
  );

const defaultValues = { ...EMPTY_ICP_CONFIG };

export default function useSettingsPage() {
  const dispatch = useDispatch();
  const { isLoading: loading, data: icpData } = useSelector(
    (s) => s?.settings?.getIcp ?? {},
  );
  const saving = useSelector(
    (s) => (s?.settings?.updateIcp?.isLoading === true),
  );

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getIcpConfigThunk());
  }, [dispatch]);

  useEffect(() => {
    reset(icpDataToFormValues(icpData));
  }, [icpData, reset]);

  const onSave = (values) => {
    const payload = formValuesToIcpPayload(values);
    dispatch(
      updateIcpConfigThunk({
        payload,
        successCallBack: (data) => reset(icpDataToFormValues(data)),
      }),
    );
  };

  return {
    register,
    handleSubmit: formHandleSubmit(onSave),
    errors,
    loading,
    saving,
  };
}
