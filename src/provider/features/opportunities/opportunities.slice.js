import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import opportunitiesService from "./opportunities.service";

const generalState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const initialState = {
  listOpportunities: generalState,
  opportunityDetail: generalState,
  createOpportunity: generalState,
  updateOpportunity: generalState,
  analyzeOpportunity: generalState,
  proposalBrief: generalState,
  updateCrm: generalState,
  opportunitiesOverview: generalState,
};

const ensure = (state, key) => {
  if (state[key] == null) state[key] = { ...generalState };
};

export const getOpportunities = createAsyncThunk(
  "opportunities/list",
  async ({ payload, successCallBack } = {}, thunkAPI) => {
    const response = await opportunitiesService.getOpportunities(payload);
    successCallBack?.(response);
    return response;
  },
);

export const getOpportunity = createAsyncThunk(
  "opportunities/get",
  async ({ id }, thunkAPI) => {
    const response = await opportunitiesService.getOpportunity(id);
    return response;
  },
);

export const createOpportunity = createAsyncThunk(
  "opportunities/create",
  async ({ payload, successCallBack }, thunkAPI) => {
    const response = await opportunitiesService.createOpportunity(payload);
    successCallBack?.(response);
    return response;
  },
);

export const updateOpportunity = createAsyncThunk(
  "opportunities/update",
  async ({ id, payload, successCallBack }, thunkAPI) => {
    const response = await opportunitiesService.updateOpportunity(id, payload);
    successCallBack?.(response);
    return response;
  },
);

export const analyzeOpportunity = createAsyncThunk(
  "opportunities/analyze",
  async ({ id, successCallBack }, thunkAPI) => {
    const response = await opportunitiesService.analyzeOpportunity(id);
    successCallBack?.(response);
    return response;
  },
);

export const getProposalBrief = createAsyncThunk(
  "opportunities/proposalBrief",
  async ({ id, successCallBack }, thunkAPI) => {
    const response = await opportunitiesService.getProposalBrief(id);
    successCallBack?.(response);
    return response;
  },
);

export const updateOpportunityCrm = createAsyncThunk(
  "opportunities/updateCrm",
  async ({ id, payload, successCallBack }, thunkAPI) => {
    const response = await opportunitiesService.updateOpportunityCrm(id, payload);
    successCallBack?.(response);
    return response;
  },
);

export const getOpportunitiesOverview = createAsyncThunk(
  "opportunities/overview",
  async (_, thunkAPI) => {
    const response = await opportunitiesService.getOpportunitiesOverview();
    return response;
  },
);

const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {
    resetOpportunities: (state) => {
      Object.keys(initialState).forEach((k) => {
        state[k] = { ...generalState };
      });
    },
    clearProposalBrief: (state) => {
      state.proposalBrief = { ...generalState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOpportunities.pending, (state) => {
        ensure(state, "listOpportunities");
        state.listOpportunities.isLoading = true;
        state.listOpportunities.isError = false;
      })
      .addCase(getOpportunities.fulfilled, (state, action) => {
        state.listOpportunities.isLoading = false;
        state.listOpportunities.isSuccess = true;
        state.listOpportunities.data = action.payload;
      })
      .addCase(getOpportunities.rejected, (state, action) => {
        state.listOpportunities.isLoading = false;
        state.listOpportunities.isError = true;
        state.listOpportunities.message =
          action.payload?.message || action.error?.message || "Failed to fetch opportunities";
      })
      .addCase(getOpportunity.pending, (state) => {
        ensure(state, "opportunityDetail");
        state.opportunityDetail.isLoading = true;
        state.opportunityDetail.isError = false;
      })
      .addCase(getOpportunity.fulfilled, (state, action) => {
        state.opportunityDetail.isLoading = false;
        state.opportunityDetail.isSuccess = true;
        state.opportunityDetail.data = action.payload;
      })
      .addCase(getOpportunity.rejected, (state, action) => {
        state.opportunityDetail.isLoading = false;
        state.opportunityDetail.isError = true;
        state.opportunityDetail.message =
          action.payload?.message || action.error?.message || "Failed to fetch opportunity";
      })
      .addCase(createOpportunity.pending, (state) => {
        ensure(state, "createOpportunity");
        state.createOpportunity.isLoading = true;
        state.createOpportunity.isError = false;
      })
      .addCase(createOpportunity.fulfilled, (state, action) => {
        state.createOpportunity.isLoading = false;
        state.createOpportunity.isSuccess = true;
        state.createOpportunity.data = action.payload;
      })
      .addCase(createOpportunity.rejected, (state, action) => {
        state.createOpportunity.isLoading = false;
        state.createOpportunity.isError = true;
        state.createOpportunity.message =
          action.payload?.message || action.error?.message || "Failed to create opportunity";
      })
      .addCase(updateOpportunity.pending, (state) => {
        ensure(state, "updateOpportunity");
        state.updateOpportunity.isLoading = true;
        state.updateOpportunity.isError = false;
      })
      .addCase(updateOpportunity.fulfilled, (state, action) => {
        state.updateOpportunity.isLoading = false;
        state.updateOpportunity.isSuccess = true;
        state.updateOpportunity.data = action.payload;
      })
      .addCase(updateOpportunity.rejected, (state, action) => {
        state.updateOpportunity.isLoading = false;
        state.updateOpportunity.isError = true;
        state.updateOpportunity.message =
          action.payload?.message || action.error?.message || "Failed to update opportunity";
      })
      .addCase(analyzeOpportunity.pending, (state) => {
        ensure(state, "analyzeOpportunity");
        state.analyzeOpportunity.isLoading = true;
        state.analyzeOpportunity.isError = false;
      })
      .addCase(analyzeOpportunity.fulfilled, (state, action) => {
        state.analyzeOpportunity.isLoading = false;
        state.analyzeOpportunity.isSuccess = true;
        state.analyzeOpportunity.data = action.payload;
      })
      .addCase(analyzeOpportunity.rejected, (state, action) => {
        state.analyzeOpportunity.isLoading = false;
        state.analyzeOpportunity.isError = true;
        state.analyzeOpportunity.message =
          action.payload?.message || action.error?.message || "Analysis failed";
      })
      .addCase(getProposalBrief.pending, (state) => {
        ensure(state, "proposalBrief");
        state.proposalBrief.isLoading = true;
        state.proposalBrief.isError = false;
      })
      .addCase(getProposalBrief.fulfilled, (state, action) => {
        state.proposalBrief.isLoading = false;
        state.proposalBrief.isSuccess = true;
        state.proposalBrief.data = action.payload;
      })
      .addCase(getProposalBrief.rejected, (state, action) => {
        state.proposalBrief.isLoading = false;
        state.proposalBrief.isError = true;
        state.proposalBrief.message =
          action.payload?.message || action.error?.message || "Failed to generate proposal brief";
      })
      .addCase(updateOpportunityCrm.pending, (state) => {
        ensure(state, "updateCrm");
        state.updateCrm.isLoading = true;
        state.updateCrm.isError = false;
      })
      .addCase(updateOpportunityCrm.fulfilled, (state, action) => {
        state.updateCrm.isLoading = false;
        state.updateCrm.isSuccess = true;
        state.updateCrm.data = action.payload;
      })
      .addCase(updateOpportunityCrm.rejected, (state, action) => {
        state.updateCrm.isLoading = false;
        state.updateCrm.isError = true;
        state.updateCrm.message =
          action.payload?.message || action.error?.message || "Failed to update CRM";
      })
      .addCase(getOpportunitiesOverview.pending, (state) => {
        ensure(state, "opportunitiesOverview");
        state.opportunitiesOverview.isLoading = true;
        state.opportunitiesOverview.isError = false;
      })
      .addCase(getOpportunitiesOverview.fulfilled, (state, action) => {
        state.opportunitiesOverview.isLoading = false;
        state.opportunitiesOverview.isSuccess = true;
        state.opportunitiesOverview.data = action.payload;
      })
      .addCase(getOpportunitiesOverview.rejected, (state, action) => {
        state.opportunitiesOverview.isLoading = false;
        state.opportunitiesOverview.isError = true;
        state.opportunitiesOverview.message =
          action.payload?.message || action.error?.message || "Failed to fetch opportunities overview";
      });
  },
});

export const { resetOpportunities, clearProposalBrief } = opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;
