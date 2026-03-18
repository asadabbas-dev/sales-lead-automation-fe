"use client";

import { isoToLocalInput } from "@/common/utils/iso-to-local-input";
import {
  clearLeadBrief,
  getLead,
  getLeadBrief,
  getLeadRuns,
  patchLead,
} from "@/provider/features/leads/leads.slice";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useLeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ?? null;
  const dispatch = useDispatch();

  const {
    data: lead,
    isLoading,
    isError,
    message,
  } = useSelector((s) => s?.leads?.leadDetail || {});
  const { data: leadRuns, isLoading: runsLoading } = useSelector(
    (s) => s?.leads?.leadRuns || {},
  );
  const { isLoading: updateLeadLoading } = useSelector(
    (s) => s?.leads?.updateLead || {},
  );
  const {
    data: leadBrief,
    isLoading: briefLoading,
    isError: briefError,
    message: briefMessage,
  } = useSelector((s) => s?.leads?.leadBrief || {});

  const [selectedRunId, setSelectedRunId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [nextActionAt, setNextActionAt] = useState("");
  const [nextActionNote, setNextActionNote] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(clearLeadBrief());
      dispatch(getLead({ id }));
      dispatch(getLeadRuns({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setNextActionAt(isoToLocalInput(lead?.next_action_at) ?? "");
    setNextActionNote(lead?.next_action_note ?? "");
  }, [lead?.next_action_at, lead?.next_action_note]);

  const statusOptions = useMemo(
    () => [
      { label: "New", value: "new" },
      { label: "Contacted", value: "contacted" },
      { label: "Qualified", value: "qualified" },
      { label: "Unqualified", value: "unqualified" },
      { label: "Lost", value: "lost" },
    ],
    [],
  );

  const handleStatusChange = useCallback(
    (nextStatus) => {
      dispatch(
        patchLead({
          id,
          payload: { status: nextStatus },
          successCallBack: () => dispatch(getLead({ id })),
        }),
      );
    },
    [dispatch, id],
  );

  const handleRowClick = useCallback((run) => {
    setSelectedRunId(run.id);
    setIsPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedRunId(null);
  }, []);

  const handleSaveNextAction = useCallback(() => {
    dispatch(
      patchLead({
        id,
        payload: {
          next_action_at: nextActionAt,
          next_action_note: nextActionNote,
        },
        successCallBack: () => dispatch(getLead({ id })),
      }),
    );
  }, [dispatch, id, nextActionAt, nextActionNote]);

  const handleGenerateBrief = useCallback(() => {
    dispatch(getLeadBrief({ id }));
  }, [dispatch, id]);

  const goToRuns = useCallback(() => router.push("/runs"), [router]);

  const runsList = Array.isArray(leadRuns) ? leadRuns : [];

  return {
    lead,
    isLoading,
    isError,
    message,
    statusOptions,
    updateLeadLoading,
    nextActionAt,
    setNextActionAt,
    nextActionNote,
    setNextActionNote,
    handleStatusChange,
    handleRowClick,
    handleClosePanel,
    handleSaveNextAction,
    handleGenerateBrief,
    leadBrief,
    briefLoading,
    briefError,
    briefMessage,
    goToRuns,
    runsList,
    runsLoading,
    selectedRunId,
    isPanelOpen,
  };
}
