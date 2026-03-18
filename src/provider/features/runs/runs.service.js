import api, { unwrapData } from "@/common/utils/api";

const getRuns = async (params = {}) => {
  const response = await api().get("/runs", { params });
  return unwrapData(response);
};

const createRun = async (payload) => {
  const response = await api().post("/runs", payload);
  return unwrapData(response);
};

const getRun = async (id) => {
  const response = await api().get(`/runs/${id}`);
  return unwrapData(response);
};

const getRunsSummary = async () => {
  const response = await api().get("/metrics/runs-summary");
  return unwrapData(response);
};

const getAutomationHealth = async () => {
  const response = await api().get("/metrics/automation-health");
  return unwrapData(response);
};

const getHighValueOverview = async () => {
  const response = await api().get("/metrics/high-value-overview");
  return unwrapData(response);
};

const runsService = {
  getRuns,
  createRun,
  getRun,
  getRunsSummary,
  getAutomationHealth,
  getHighValueOverview,
};

export default runsService;
