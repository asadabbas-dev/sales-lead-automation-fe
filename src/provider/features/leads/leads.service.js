import api from "@/common/utils/api";

const getLeads = async (params = {}) => {
  const response = await api().get("/leads", { params });
  return response.data;
};

const getLead = async (id) => {
  const response = await api().get(`/leads/${id}`);
  return response.data;
};

const updateLead = async (id, payload) => {
  const response = await api().patch(`/leads/${id}`, payload);
  return response.data;
};

const getLeadRuns = async (id, params = {}) => {
  const response = await api().get(`/leads/${id}/runs`, { params });
  return response.data;
};

const getLeadsFunnel = async () => {
  const response = await api().get("/metrics/leads-funnel");
  return response.data;
};

const leadsService = {
  getLeads,
  getLead,
  updateLead,
  getLeadRuns,
  getLeadsFunnel,
};

export default leadsService;

