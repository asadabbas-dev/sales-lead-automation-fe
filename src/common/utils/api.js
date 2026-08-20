"use client";

import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { getAccessToken } from "./access-token.util";
import { delay } from "./generic.util";
import { removeUser } from "./users.util";

const api = (headers = null) => {
  const accessToken = getAccessToken();

  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const combinedHeaders = accessToken
    ? { ...defaultHeaders, ...headers, Authorization: `Bearer ${accessToken}` }
    : { ...defaultHeaders, ...headers };

  const apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: combinedHeaders,
  });

  apiInstance.interceptors.response.use(
    async (response) => {
      // Common API format: { success, message?, data? } — show success toast only for non-GET
      const msg = response.data?.message;
      const method = response.config?.method?.toLowerCase();
      if (msg && response.data?.success !== false && method !== "get") {
        enqueueSnackbar(msg, { variant: "success" });
      }
      return response;
    },
    (error) => {
      // Network issues
      if (error.message === "Network Error") {
        enqueueSnackbar(error.message, { variant: "error" });
        throw error;
      }

      const status = error.response?.status;
      // Prefer backend common format message (success: false, message); fallback to FastAPI detail
      let message = error.response?.data?.message ?? error.response?.data?.detail;
      if (Array.isArray(message)) {
        message = message.map((m) => (typeof m === "string" ? m : m?.msg ?? String(m))).join(" ");
      }
      if (message == null) message = error.message ?? error.toString();

      // Handle unauthorized
      if (status === 401 && typeof window !== "undefined") {
        removeUser();
        window.location.href = "/";
        return;
      }

      // Handle message display
      if (Array.isArray(message)) {
        message.forEach((msg) => enqueueSnackbar(msg, { variant: "error" }));
      } else {
        const responseURL = error.request?.responseURL;
        const currentEndpoint = responseURL?.split("/").pop();

        if (currentEndpoint === "current-business-setting") {
          return error.message;
        }

        if (message !== "Record Not Found") {
          enqueueSnackbar(message, { variant: "error" });
        }
      }

      return Promise.reject(error); // Reject instead of returning raw response
    },
  );

  return apiInstance;
};

/** Unwrap common API response { success, message?, data? } to payload for callers. */
export function unwrapData(response) {
  const body = response?.data;
  if (body && typeof body === "object" && "data" in body && body.success === true) {
    return body.data;
  }
  return body;
}

export default api;
