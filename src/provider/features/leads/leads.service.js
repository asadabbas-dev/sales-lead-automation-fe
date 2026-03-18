import api, { unwrapData } from "@/common/utils/api";

const getLeads = async (params = {}) => {
  const response = await api().get("/leads", { params });
  return unwrapData(response);
};

const getLead = async (id) => {
  const response = await api().get(`/leads/${id}`);
  return unwrapData(response);
};

const updateLead = async (id, payload) => {
  const response = await api().patch(`/leads/${id}`, payload);
  return unwrapData(response);
};

const getLeadRuns = async (id, params = {}) => {
  const response = await api().get(`/leads/${id}/runs`, { params });
  return unwrapData(response);
};

const getLeadBrief = async (id) => {
  const response = await api().get(`/leads/${id}/brief`);
  return unwrapData(response);
};

const getLeadsFunnel = async () => {
  const response = await api().get("/metrics/leads-funnel");
  return unwrapData(response);
};

const leadsService = {
  getLeads,
  getLead,
  updateLead,
  getLeadRuns,
  getLeadBrief,
  getLeadsFunnel,
};

export default leadsService;

