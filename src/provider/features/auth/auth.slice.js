import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser } from "@/common/utils/users.util";
import authService from "./auth.service";

const generalState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const user = getUser();
const initialState = {
  isCreatorMode: null,
  sidebarToggleItem: false,
  logoutLoader: false,
  login: { ...generalState },
  signUp: { ...generalState },
  logout: { ...generalState },
  loginAndSignUpWithOAuth: { ...generalState },
  loginAndSignUpWithLinkedin: { ...generalState },
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ payload, successCallBack }, thunkAPI) => {
    const response = await authService.login(payload);
    if (response?.Succeeded ?? response?.success) {
      successCallBack?.(response.data);
      return response.data;
    }
    return thunkAPI.rejectWithValue(response || { message: "Login failed" });
  },
);

export const signUp = createAsyncThunk(
  "auth/register",
  async ({ payload, successCallBack }, thunkAPI) => {
    const response = await authService.signUp(payload);
    if (response?.Succeeded) {
      successCallBack?.(response.data);
      return response.data;
    }
    return thunkAPI.rejectWithValue(response || { message: "Sign up failed" });
  },
);

export const loginAndSignUpWithOAuth = createAsyncThunk(
  "auth/loginAndSignUpWithOAuth",
  async ({ loginType, email, accessToken, successCallBack }, thunkAPI) => {
    const response = await authService.loginAndSignUpWithOAuth({
      loginType,
      email,
      accessToken,
    });
    if (response?.Succeeded) {
      successCallBack?.(response.data);
      return response.data;
    }
    return thunkAPI.rejectWithValue(response || { message: "OAuth login failed" });
  },
);

export const loginAndSignUpWithLinkedin = createAsyncThunk(
  "auth/loginAndSignUpWithLinkedin",
  async ({ payload, successCallBack }, thunkAPI) => {
    const response = await authService.loginAndSignUpWithLinkedin(payload);
    if (response?.Succeeded) {
      successCallBack?.(response.data);
      return response.data;
    }
    return thunkAPI.rejectWithValue(response || { message: "LinkedIn login failed" });
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  let response;
  try {
    response = await authService.logout();
  } finally {
    removeUser();
  }
  if (response?.Succeeded) return response;
  return thunkAPI.rejectWithValue(response || { message: "Logout failed" });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsCreatorModeMode: (state, action) => {
      state.isCreatorMode = action.payload;
    },
    setSidebarToggleItem: (state, action) => {
      state.sidebarToggleItem = action.payload;
    },
    setLogoutLoader: (state, action) => {
      state.logoutLoader = action.payload;
    },
    reset: (state) => {
      state.login = { ...generalState };
      state.logout = { ...generalState };
      state.signUp = { ...generalState };
      state.loginAndSignUpWithOAuth = { ...generalState };
      state.loginAndSignUpWithLinkedin = { ...generalState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.isLoading = true;
        state.login.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.isSuccess = true;
        state.login.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.isError = true;
        state.login.message =
          action.payload?.message || action.error?.message || "Login failed";
      })
      .addCase(signUp.pending, (state) => {
        state.signUp.isLoading = true;
        state.signUp.isError = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUp.isLoading = false;
        state.signUp.isSuccess = true;
        state.signUp.data = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUp.isLoading = false;
        state.signUp.isError = true;
        state.signUp.message =
          action.payload?.message || action.error?.message || "Sign up failed";
      })
      .addCase(logout.pending, (state) => {
        state.logout.isLoading = true;
        state.logout.isError = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logout.isLoading = false;
        state.logout.isSuccess = true;
        state.logout.data = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logout.isLoading = false;
        state.logout.isError = true;
        state.logout.message =
          action.payload?.message || action.error?.message || "Logout failed";
      })
      .addCase(loginAndSignUpWithOAuth.pending, (state) => {
        state.loginAndSignUpWithOAuth.isLoading = true;
        state.loginAndSignUpWithOAuth.isError = false;
      })
      .addCase(loginAndSignUpWithOAuth.fulfilled, (state, action) => {
        state.loginAndSignUpWithOAuth.isLoading = false;
        state.loginAndSignUpWithOAuth.isSuccess = true;
        state.loginAndSignUpWithOAuth.data = action.payload;
      })
      .addCase(loginAndSignUpWithOAuth.rejected, (state, action) => {
        state.loginAndSignUpWithOAuth.isLoading = false;
        state.loginAndSignUpWithOAuth.isError = true;
        state.loginAndSignUpWithOAuth.message =
          action.payload?.message || action.error?.message || "OAuth login failed";
      })
      .addCase(loginAndSignUpWithLinkedin.pending, (state) => {
        state.loginAndSignUpWithLinkedin.isLoading = true;
        state.loginAndSignUpWithLinkedin.isError = false;
      })
      .addCase(loginAndSignUpWithLinkedin.fulfilled, (state, action) => {
        state.loginAndSignUpWithLinkedin.isLoading = false;
        state.loginAndSignUpWithLinkedin.isSuccess = true;
        state.loginAndSignUpWithLinkedin.data = action.payload;
      })
      .addCase(loginAndSignUpWithLinkedin.rejected, (state, action) => {
        state.loginAndSignUpWithLinkedin.isLoading = false;
        state.loginAndSignUpWithLinkedin.isError = true;
        state.loginAndSignUpWithLinkedin.message =
          action.payload?.message || action.error?.message || "LinkedIn login failed";
      });
  },
});

export const { reset, setIsCreatorModeMode, setSidebarToggleItem, setLogoutLoader } =
  authSlice.actions;

export default authSlice.reducer;
