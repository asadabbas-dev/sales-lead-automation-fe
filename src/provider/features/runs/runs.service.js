import api from "@/common/utils/api";

const getRuns = async (params = {}) => {
  const response = await api().get("/runs", { params });
  return response.data;
};

const createRun = async (payload) => {
  const response = await api().post("/runs", payload);
  return response.data;
};

const getRun = async (id) => {
  const response = await api().get(`/runs/${id}`);
  return response.data;
};

const getRunsSummary = async () => {
  const response = await api().get("/metrics/runs-summary");
  return response.data;
};

const runsService = {
  getRuns,
  createRun,
  getRun,
  getRunsSummary,
};

export default runsService;
