"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRun } from "@/provider/features/runs/runs.slice";

export function useRunDetailPanel({ runId, isOpen }) {
  const dispatch = useDispatch();

  const {
    data: runDetail,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.runs.runDetail);

  useEffect(() => {
    if (isOpen && runId) {
      dispatch(getRun({ id: runId }));
    }
  }, [isOpen, runId, dispatch]);

  return {
    runDetail,
    isLoading,
    isError,
    message,
  };
}
