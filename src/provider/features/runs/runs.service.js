import api from "@/common/utils/api";

const getRuns = async (params = {}) => {
  const response = await api().get("/runs", { params });
  return response.data;
};

const createRun = async (payload) => {
  const response = await api().post("/runs", payload);
  return response.data;
};

const runsService = {
  getRuns,
  createRun,
};

export default runsService;
