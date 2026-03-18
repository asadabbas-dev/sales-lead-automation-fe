import api, { unwrapData } from "@/common/utils/api";

const getIcpConfig = async () => {
  const response = await api().get("/settings/icp");
  return unwrapData(response);
};

const updateIcpConfig = async (payload) => {
  const response = await api().put("/settings/icp", payload);
  return unwrapData(response);
};

const settingsService = {
  getIcpConfig,
  updateIcpConfig,
};

export default settingsService;
