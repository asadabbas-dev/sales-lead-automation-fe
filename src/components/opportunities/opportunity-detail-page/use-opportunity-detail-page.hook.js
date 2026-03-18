"use client";

import {
  clearProposalBrief,
  getOpportunity,
  getProposalBrief,
  analyzeOpportunity,
  updateOpportunityCrm,
} from "@/provider/features/opportunities/opportunities.slice";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CRM_STAGES = [
  "New Opportunity",
  "Under Review",
  "Proposal Preparation",
  "Submitted",
  "Won",
  "Lost",
];

export default function useOpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ?? null;
  const dispatch = useDispatch();

  const {
    data: opportunity,
    isLoading,
    isError,
    message,
  } = useSelector((s) => s?.opportunities?.opportunityDetail || {});
  const { isLoading: analyzeLoading } = useSelector(
    (s) => s?.opportunities?.analyzeOpportunity || {},
  );
  const {
    data: proposalBrief,
    isLoading: briefLoading,
    isError: briefError,
    message: briefMessage,
  } = useSelector((s) => s?.opportunities?.proposalBrief || {});
  const { isLoading: updateCrmLoading } = useSelector(
    (s) => s?.opportunities?.updateCrm || {},
  );

  const [stage, setStage] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(clearProposalBrief());
      dispatch(getOpportunity({ id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const crc = opportunity?.crm_record;
    setStage(crc?.stage ?? "");
    setAssignedUser(crc?.assigned_user ?? "");
  }, [opportunity?.crm_record?.stage, opportunity?.crm_record?.assigned_user]);

  const stageOptions = CRM_STAGES.map((s) => ({ label: s, value: s }));

  const handleRunAnalysis = useCallback(() => {
    if (!id) return;
    dispatch(
      analyzeOpportunity({
        id,
        successCallBack: () => dispatch(getOpportunity({ id })),
      }),
    );
  }, [dispatch, id]);

  const handleGenerateBrief = useCallback(() => {
    if (!id) return;
    dispatch(getProposalBrief({ id }));
  }, [dispatch, id]);

  const handleStageChange = useCallback(
    (newStage) => {
      if (!id || !newStage) return;
      setStage(newStage);
      dispatch(
        updateOpportunityCrm({
          id,
          payload: { stage: newStage },
          successCallBack: () => dispatch(getOpportunity({ id })),
        }),
      );
    },
    [dispatch, id],
  );

  const handleAssignedUserBlur = useCallback(() => {
    if (!id) return;
    dispatch(
      updateOpportunityCrm({
        id,
        payload: { assigned_user: assignedUser || null },
        successCallBack: () => dispatch(getOpportunity({ id })),
      }),
    );
  }, [dispatch, id, assignedUser]);

  const goBack = useCallback(() => router.push("/opportunities"), [router]);

  return {
    opportunity,
    isLoading,
    isError,
    message,
    analyzeLoading,
    handleRunAnalysis,
    briefLoading,
    briefError,
    briefMessage,
    proposalBrief,
    handleGenerateBrief,
    stage,
    setStage,
    assignedUser,
    setAssignedUser,
    stageOptions,
    handleStageChange,
    handleAssignedUserBlur,
    updateCrmLoading,
    goBack,
  };
}
