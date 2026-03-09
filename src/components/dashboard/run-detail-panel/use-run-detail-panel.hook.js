"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRun } from "@/provider/features/runs/runs.slice";

export function useRunDetailPanel({ runId, isOpen }) {
  const [activeTab, setActiveTab] = useState("raw");
  const [copied, setCopied] = useState(false);
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

  const handleCopy = useCallback((text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const getTabData = useCallback(() => {
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
  }, [runDetail, activeTab]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleCopyTabData = useCallback(() => {
    handleCopy(JSON.stringify(getTabData(), null, 2));
  }, [handleCopy, getTabData]);

  const handleCopyFullData = useCallback(() => {
    if (runDetail) {
      handleCopy(JSON.stringify(runDetail, null, 2));
    }
  }, [runDetail, handleCopy]);

  return {
    activeTab,
    copied,
    runDetail,
    isLoading,
    isError,
    message,
    handleCopy,
    getTabData,
    handleTabChange,
    handleCopyTabData,
    handleCopyFullData,
  };
}
