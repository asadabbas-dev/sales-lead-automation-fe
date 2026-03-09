import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import leadsService from "./leads.service";

const generalState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const initialState = {
  listLeads: generalState,
  leadDetail: generalState,
  leadRuns: generalState,
  updateLead: generalState,
  leadsFunnel: generalState,
};

export const getLeads = createAsyncThunk(
  "leads/list",
  async ({ payload, successCallBack } = {}, thunkAPI) => {
    try {
      const response = await leadsService.getLeads(payload);
      successCallBack?.(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const getLead = createAsyncThunk("leads/get", async ({ id }, thunkAPI) => {
  try {
    const response = await leadsService.getLead(id);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: error.message },
    );
  }
});

export const getLeadRuns = createAsyncThunk(
  "leads/runs",
  async ({ id, payload } = {}, thunkAPI) => {
    try {
      const response = await leadsService.getLeadRuns(id, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

export const patchLead = createAsyncThunk(
  "leads/update",
  async ({ id, payload, successCallBack, errorCallBack } = {}, thunkAPI) => {
    try {
      const response = await leadsService.updateLead(id, payload);
      successCallBack?.(response);
      return response;
    } catch (error) {
      const errPayload = error.response?.data || { message: error.message };
      errorCallBack?.(errPayload);
      return thunkAPI.rejectWithValue(errPayload);
    }
  },
);

export const getLeadsFunnel = createAsyncThunk(
  "leads/funnel",
  async (_, thunkAPI) => {
    try {
      const response = await leadsService.getLeadsFunnel();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    resetLeads: (state) => {
      state.listLeads = generalState;
      state.leadDetail = generalState;
      state.leadRuns = generalState;
      state.updateLead = generalState;
      state.leadsFunnel = generalState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeads.pending, (state) => {
        state.listLeads.isLoading = true;
        state.listLeads.isError = false;
      })
      .addCase(getLeads.fulfilled, (state, action) => {
        state.listLeads.isLoading = false;
        state.listLeads.isSuccess = true;
        state.listLeads.data = action.payload;
      })
      .addCase(getLeads.rejected, (state, action) => {
        state.listLeads.isLoading = false;
        state.listLeads.isError = true;
        state.listLeads.message =
          action.payload?.message || "Failed to fetch leads";
      })
      .addCase(getLead.pending, (state) => {
        state.leadDetail.isLoading = true;
        state.leadDetail.isError = false;
      })
      .addCase(getLead.fulfilled, (state, action) => {
        state.leadDetail.isLoading = false;
        state.leadDetail.isSuccess = true;
        state.leadDetail.data = action.payload;
      })
      .addCase(getLead.rejected, (state, action) => {
        state.leadDetail.isLoading = false;
        state.leadDetail.isError = true;
        state.leadDetail.message =
          action.payload?.message || "Failed to fetch lead";
      })
      .addCase(getLeadRuns.pending, (state) => {
        state.leadRuns.isLoading = true;
        state.leadRuns.isError = false;
      })
      .addCase(getLeadRuns.fulfilled, (state, action) => {
        state.leadRuns.isLoading = false;
        state.leadRuns.isSuccess = true;
        state.leadRuns.data = action.payload;
      })
      .addCase(getLeadRuns.rejected, (state, action) => {
        state.leadRuns.isLoading = false;
        state.leadRuns.isError = true;
        state.leadRuns.message =
          action.payload?.message || "Failed to fetch lead runs";
      })
      .addCase(patchLead.pending, (state) => {
        state.updateLead.isLoading = true;
        state.updateLead.isError = false;
      })
      .addCase(patchLead.fulfilled, (state, action) => {
        state.updateLead.isLoading = false;
        state.updateLead.isSuccess = true;
        state.updateLead.data = action.payload;
      })
      .addCase(patchLead.rejected, (state, action) => {
        state.updateLead.isLoading = false;
        state.updateLead.isError = true;
        state.updateLead.message =
          action.payload?.message || "Failed to update lead";
      })
      .addCase(getLeadsFunnel.pending, (state) => {
        state.leadsFunnel.isLoading = true;
        state.leadsFunnel.isError = false;
      })
      .addCase(getLeadsFunnel.fulfilled, (state, action) => {
        state.leadsFunnel.isLoading = false;
        state.leadsFunnel.isSuccess = true;
        state.leadsFunnel.data = action.payload;
      })
      .addCase(getLeadsFunnel.rejected, (state, action) => {
        state.leadsFunnel.isLoading = false;
        state.leadsFunnel.isError = true;
        state.leadsFunnel.message =
          action.payload?.message || "Failed to fetch leads funnel";
      });
  },
});

export const { resetLeads } = leadsSlice.actions;
export default leadsSlice.reducer;

