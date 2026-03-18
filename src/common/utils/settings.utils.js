import { EMPTY_ICP_CONFIG } from "../constants/settings.constants";

/**
 * Map API ICP config to form values (strings for inputs).
 * @param {Object} data - API response (getIcp)
 * @returns {Object} Form values matching EMPTY_ICP_CONFIG shape
 */
export function icpDataToFormValues(data) {
  if (!data) return { ...EMPTY_ICP_CONFIG };
  return {
    industry: data.industry ?? "",
    company_size: data.company_size ?? "",
    budget_min: data.budget_min != null ? String(data.budget_min) : "",
    budget_max: data.budget_max != null ? String(data.budget_max) : "",
    intent_keywords: Array.isArray(data.intent_keywords)
      ? data.intent_keywords.join(", ")
      : "",
    location: data.location ?? "",
  };
}

/**
 * Map form values to API payload (trimmed, null for empty, intent_keywords as array).
 * @param {Object} values - Form values from react-hook-form
 * @returns {Object} Payload for updateIcpConfig
 */
export function formValuesToIcpPayload(values) {
  return {
    industry: values.industry?.trim() || null,
    company_size: values.company_size?.trim() || null,
    budget_min: values.budget_min?.trim() ? Number(values.budget_min) : null,
    budget_max: values.budget_max?.trim() ? Number(values.budget_max) : null,
    intent_keywords: (values.intent_keywords ?? "")
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean),
    location: values.location?.trim() || null,
  };
}
