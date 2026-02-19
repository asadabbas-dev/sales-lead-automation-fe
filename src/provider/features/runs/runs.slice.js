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
};

/* ================= GET RUNS ================= */
export const getRuns = createAsyncThunk(
  "runs/list",
  async ({ payload, successCallBack }, thunkAPI) => {
    try {
      const response = await runsService.getRuns(payload);

      if (response?.runs) {
        successCallBack && successCallBack(response);
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue({ payload: error });
    }
  },
);

/* ================= CREATE RUN ================= */
export const createRun = createAsyncThunk(
  "runs/create",
  async ({ payload, successCallBack }, thunkAPI) => {
    try {
      const response = await runsService.createRun(payload);

      if (response?.id || response?.success || response?.Succeeded) {
        successCallBack && successCallBack(response);
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue({ payload: error });
    }
  },
);

// ================= GET RUN =================
export const getRun = createAsyncThunk(
  "runs/getRun",
  async ({ id }, thunkAPI) => {
    try {
      const response = await runsService.getRun(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

const runsSlice = createSlice({
  name: "runs",
  initialState,
  reducers: {
    resetRuns: (state) => {
      state.listRuns = generalState;
      state.createRun = generalState;
      state.runDetail = generalState;
    },
  },
  extraReducers: (builder) => {
    builder
      /* -------- LIST RUNS -------- */
      .addCase(getRuns.pending, (state) => {
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
          action.payload?.message || "Failed to fetch runs";
      })

      /* -------- CREATE RUN -------- */
      .addCase(createRun.pending, (state) => {
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
          action.payload?.message || "Create run failed";
      })
      /* -------- GET RUN -------- */
      .addCase(getRun.pending, (state) => {
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
          action.payload?.message || "Failed to fetch run";
      });
  },
});

export const { resetRuns } = runsSlice.actions;
export default runsSlice.reducer;
