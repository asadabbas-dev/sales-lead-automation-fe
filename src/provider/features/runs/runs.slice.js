import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import runsService from "./runs.service";

const generalState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const initialState = {
  listRuns: generalState,
  createRun: generalState,
  runDetail: generalState,
  runsSummary: generalState,
  automationHealth: generalState,
  highValueOverview: generalState,
};

/* ================= GET RUNS ================= */
export const getRuns = createAsyncThunk(
  "runs/list",
  async ({ payload, successCallBack }, thunkAPI) => {
    const response = await runsService.getRuns(payload);
    if (response?.runs) successCallBack?.(response);
    return response;
  },
);

/* ================= CREATE RUN ================= */
export const createRun = createAsyncThunk(
  "runs/create",
  async ({ payload, successCallBack }, thunkAPI) => {
    const response = await runsService.createRun(payload);
    successCallBack?.(response);
    return response;
  },
);

// ================= GET RUN =================
export const getRun = createAsyncThunk(
  "runs/getRun",
  async ({ id }, thunkAPI) => {
    const response = await runsService.getRun(id);
    return response;
  },
);

/* ================= RUNS SUMMARY ================= */
export const getRunsSummary = createAsyncThunk(
  "runs/summary",
  async ({ successCallBack } = {}, thunkAPI) => {
    const response = await runsService.getRunsSummary();
    successCallBack?.(response);
    return response;
  },
);

/* ================= AUTOMATION HEALTH ================= */
export const getAutomationHealth = createAsyncThunk(
  "runs/automationHealth",
  async (_, thunkAPI) => {
    const response = await runsService.getAutomationHealth();
    return response;
  },
);

/* ================= HIGH VALUE OVERVIEW ================= */
export const getHighValueOverview = createAsyncThunk(
  "runs/highValueOverview",
  async (_, thunkAPI) => {
    const response = await runsService.getHighValueOverview();
    return response;
  },
);

// Ensure a slice key exists (handles old persisted state missing new keys)
const ensure = (state, key) => {
  if (state[key] == null) state[key] = { ...generalState };
};

const runsSlice = createSlice({
  name: "runs",
  initialState,
  reducers: {
    resetRuns: (state) => {
      state.listRuns = { ...generalState };
      state.createRun = { ...generalState };
      state.runDetail = { ...generalState };
      state.runsSummary = { ...generalState };
      state.automationHealth = { ...generalState };
      state.highValueOverview = { ...generalState };
    },
  },
  extraReducers: (builder) => {
    builder
      /* -------- LIST RUNS -------- */
      .addCase(getRuns.pending, (state) => {
        ensure(state, "listRuns");
        state.listRuns.isLoading = true;
        state.listRuns.isError = false;
      })
      .addCase(getRuns.fulfilled, (state, action) => {
        state.listRuns.isLoading = false;
        state.listRuns.isSuccess = true;
        state.listRuns.data = action.payload;
      })
      .addCase(getRuns.rejected, (state, action) => {
        state.listRuns.isLoading = false;
        state.listRuns.isError = true;
        state.listRuns.message =
          action.payload?.message || action.error?.message || "Failed to fetch runs";
      })

      /* -------- CREATE RUN -------- */
      .addCase(createRun.pending, (state) => {
        ensure(state, "createRun");
        state.createRun.isLoading = true;
        state.createRun.isError = false;
      })
      .addCase(createRun.fulfilled, (state, action) => {
        state.createRun.isLoading = false;
        state.createRun.isSuccess = true;
        state.createRun.data = action.payload;
      })
      .addCase(createRun.rejected, (state, action) => {
        state.createRun.isLoading = false;
        state.createRun.isError = true;
        state.createRun.message =
          action.payload?.message || action.error?.message || "Create run failed";
      })
      /* -------- GET RUN -------- */
      .addCase(getRun.pending, (state) => {
        ensure(state, "runDetail");
        state.runDetail.isLoading = true;
        state.runDetail.isError = false;
        state.runDetail.isSuccess = false;
      })
      .addCase(getRun.fulfilled, (state, action) => {
        state.runDetail.isLoading = false;
        state.runDetail.isSuccess = true;
        state.runDetail.data = action.payload;
      })
      .addCase(getRun.rejected, (state, action) => {
        state.runDetail.isLoading = false;
        state.runDetail.isError = true;
        state.runDetail.message =
          action.payload?.message || action.error?.message || "Failed to fetch run";
      })
      /* -------- RUNS SUMMARY -------- */
      .addCase(getRunsSummary.pending, (state) => {
        ensure(state, "runsSummary");
        state.runsSummary.isLoading = true;
        state.runsSummary.isError = false;
        state.runsSummary.isSuccess = false;
      })
      .addCase(getRunsSummary.fulfilled, (state, action) => {
        state.runsSummary.isLoading = false;
        state.runsSummary.isSuccess = true;
        state.runsSummary.data = action.payload;
      })
      .addCase(getRunsSummary.rejected, (state, action) => {
        state.runsSummary.isLoading = false;
        state.runsSummary.isError = true;
        state.runsSummary.message =
          action.payload?.message || action.error?.message || "Failed to fetch runs summary";
      })
      /* -------- AUTOMATION HEALTH -------- */
      .addCase(getAutomationHealth.pending, (state) => {
        ensure(state, "automationHealth");
        state.automationHealth.isLoading = true;
        state.automationHealth.isError = false;
      })
      .addCase(getAutomationHealth.fulfilled, (state, action) => {
        state.automationHealth.isLoading = false;
        state.automationHealth.isSuccess = true;
        state.automationHealth.data = action.payload;
      })
      .addCase(getAutomationHealth.rejected, (state, action) => {
        state.automationHealth.isLoading = false;
        state.automationHealth.isError = true;
        state.automationHealth.message =
          action.payload?.message || action.error?.message || "Failed to fetch automation health";
      })
      /* -------- HIGH VALUE OVERVIEW -------- */
      .addCase(getHighValueOverview.pending, (state) => {
        ensure(state, "highValueOverview");
        state.highValueOverview.isLoading = true;
        state.highValueOverview.isError = false;
      })
      .addCase(getHighValueOverview.fulfilled, (state, action) => {
        state.highValueOverview.isLoading = false;
        state.highValueOverview.isSuccess = true;
        state.highValueOverview.data = action.payload;
      })
      .addCase(getHighValueOverview.rejected, (state, action) => {
        state.highValueOverview.isLoading = false;
        state.highValueOverview.isError = true;
        state.highValueOverview.message =
          action.payload?.message || action.error?.message || "Failed to fetch high value overview";
      });
  },
});

export const { resetRuns } = runsSlice.actions;
export default runsSlice.reducer;
