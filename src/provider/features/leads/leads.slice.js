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
  leadBrief: generalState,
};

export const getLeads = createAsyncThunk(
  "leads/list",
  async ({ payload, successCallBack } = {}, thunkAPI) => {
    const response = await leadsService.getLeads(payload);
    successCallBack?.(response);
    return response;
  },
);

export const getLead = createAsyncThunk("leads/get", async ({ id }, thunkAPI) => {
  const response = await leadsService.getLead(id);
  return response;
});

export const getLeadRuns = createAsyncThunk(
  "leads/runs",
  async ({ id, payload } = {}, thunkAPI) => {
    const response = await leadsService.getLeadRuns(id, payload);
    return response;
  },
);

export const patchLead = createAsyncThunk(
  "leads/update",
  async ({ id, payload, successCallBack } = {}, thunkAPI) => {
    const response = await leadsService.updateLead(id, payload);
    successCallBack?.(response);
    return response;
  },
);

export const getLeadsFunnel = createAsyncThunk(
  "leads/funnel",
  async (_, thunkAPI) => {
    const response = await leadsService.getLeadsFunnel();
    return response;
  },
);

export const getLeadBrief = createAsyncThunk(
  "leads/brief",
  async ({ id }, thunkAPI) => {
    const response = await leadsService.getLeadBrief(id);
    return response;
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
      state.leadBrief = generalState;
    },
    clearLeadBrief: (state) => {
      state.leadBrief = { ...generalState };
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
          action.payload?.message || action.error?.message || "Failed to fetch leads";
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
          action.payload?.message || action.error?.message || "Failed to fetch lead";
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
          action.payload?.message || action.error?.message || "Failed to fetch lead runs";
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
          action.payload?.message || action.error?.message || "Failed to update lead";
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
          action.payload?.message || action.error?.message || "Failed to fetch leads funnel";
      })
      .addCase(getLeadBrief.pending, (state) => {
        state.leadBrief.isLoading = true;
        state.leadBrief.isError = false;
      })
      .addCase(getLeadBrief.fulfilled, (state, action) => {
        state.leadBrief.isLoading = false;
        state.leadBrief.isSuccess = true;
        state.leadBrief.data = action.payload;
      })
      .addCase(getLeadBrief.rejected, (state, action) => {
        state.leadBrief.isLoading = false;
        state.leadBrief.isError = true;
        state.leadBrief.message =
          action.payload?.message || action.error?.message || "Failed to generate brief";
      });
  },
});

export const { resetLeads, clearLeadBrief } = leadsSlice.actions;
export default leadsSlice.reducer;

