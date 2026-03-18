import api, { unwrapData } from "@/common/utils/api";

const getOpportunities = async (params = {}) => {
  const response = await api().get("/opportunities", { params });
  return unwrapData(response);
};

const getOpportunity = async (id) => {
  const response = await api().get(`/opportunities/${id}`);
  return unwrapData(response);
};

const createOpportunity = async (payload) => {
  const response = await api().post("/opportunities", payload);
  return unwrapData(response);
};

const updateOpportunity = async (id, payload) => {
  const response = await api().patch(`/opportunities/${id}`, payload);
  return unwrapData(response);
};

const analyzeOpportunity = async (id) => {
  const response = await api().post(`/opportunities/${id}/analyze`);
  return unwrapData(response);
};

const getProposalBrief = async (id) => {
  const response = await api().get(`/opportunities/${id}/proposal-brief`);
  return unwrapData(response);
};

const updateOpportunityCrm = async (id, payload) => {
  const response = await api().patch(`/opportunities/${id}/crm`, payload);
  return unwrapData(response);
};

const getOpportunitiesOverview = async () => {
  const response = await api().get("/metrics/opportunities-overview");
  return unwrapData(response);
};

const opportunitiesService = {
  getOpportunities,
  getOpportunity,
  createOpportunity,
  updateOpportunity,
  analyzeOpportunity,
  getProposalBrief,
  updateOpportunityCrm,
  getOpportunitiesOverview,
};

export default opportunitiesService;
