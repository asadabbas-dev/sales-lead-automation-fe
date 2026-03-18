import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import settingsService from "./settings.service";

const generalState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const initialState = {
  getIcp: { ...generalState },
  updateIcp: { ...generalState },
};

export const getIcpConfigThunk = createAsyncThunk(
  "settings/getIcp",
  async (_, thunkAPI) => {
    const response = await settingsService.getIcpConfig();
    return response;
  },
);

export const updateIcpConfigThunk = createAsyncThunk(
  "settings/updateIcp",
  async ({ payload, successCallBack }, thunkAPI) => {
    const response = await settingsService.updateIcpConfig(payload);
    successCallBack?.(response);
    return response;
  },
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    resetSettings: (state) => {
      state.getIcp = { ...generalState };
      state.updateIcp = { ...generalState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIcpConfigThunk.pending, (state) => {
        state.getIcp.isLoading = true;
        state.getIcp.isError = false;
      })
      .addCase(getIcpConfigThunk.fulfilled, (state, action) => {
        state.getIcp.isLoading = false;
        state.getIcp.isSuccess = true;
        state.getIcp.data = action.payload;
      })
      .addCase(getIcpConfigThunk.rejected, (state, action) => {
        state.getIcp.isLoading = false;
        state.getIcp.isError = true;
        state.getIcp.message =
          action.error?.message || "Failed to load ICP config";
      })
      .addCase(updateIcpConfigThunk.pending, (state) => {
        state.updateIcp.isLoading = true;
        state.updateIcp.isError = false;
      })
      .addCase(updateIcpConfigThunk.fulfilled, (state, action) => {
        state.updateIcp.isLoading = false;
        state.updateIcp.isSuccess = true;
        state.updateIcp.data = action.payload;
      })
      .addCase(updateIcpConfigThunk.rejected, (state, action) => {
        state.updateIcp.isLoading = false;
        state.updateIcp.isError = true;
        state.updateIcp.message =
          action.error?.message || "Failed to save ICP config";
      });
  },
});

export const { resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
