"use client";

import { isoToLocalInput } from "@/common/utils/iso-to-local-input";
import {
  getLead,
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

  const [selectedRunId, setSelectedRunId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [nextActionAt, setNextActionAt] = useState("");
  const [nextActionNote, setNextActionNote] = useState("");

  useEffect(() => {
    if (id) {
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
      enqueueSnackbar(`Lead status updated to ${nextStatus}`, {
        variant: "success",
      });
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
    enqueueSnackbar("Next action saved", {
      variant: "success",
    });
  }, [dispatch, id, nextActionAt, nextActionNote]);

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
    goToRuns,
    runsList,
    runsLoading,
    selectedRunId,
    isPanelOpen,
  };
}
