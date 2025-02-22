import { API } from "@/config";
import User, { initialAuthState } from "@/types/User";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkAuth = createAsyncThunk("auth/check-autk", async () => {
  const response = await axios.get(`${API}/auth/check-auth`, {
    withCredentials: true,
  });
  return response.data;
});

export const registerUser = createAsyncThunk<any, User>(
  "auth/register",
  async (data) => {
    const response = await axios.post(`${API}/auth/register`, data, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const loginUser = createAsyncThunk<any, User>(
  "auth/login",
  async (data) => {
    const response = await axios.post(`${API}/auth/login`, data, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post(
    `${API}/auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
});

export const deleteProfile = createAsyncThunk<any, User>(
  "auth/update",
  async (user) => {
    const response = await axios.put(`${API}/auth/update`, user, {
      withCredentials: true,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    // Handle Checking Authentication
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success
          ? (action.payload.user as User)
          : null;
        state.isAuthenticated = action.payload.success as boolean;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle registration
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success
          ? (action.payload.user as User)
          : null;
        state.isAuthenticated = action.payload.success as boolean;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success
          ? (action.payload.user as User)
          : null;
        state.isAuthenticated = action.payload.success as boolean;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle update
      .addCase(deleteProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success
          ? (action.payload.user as User)
          : state.user;
      })
      .addCase(deleteProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
