import { InitialAuthState } from "@/types/User";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: InitialAuthState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

export const checkAuthUser = createAsyncThunk("auth/check-auth", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/auth/check-auth",
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const registerUser = createAsyncThunk<any, any>(
  "auth/register",
  async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk<any, any>(
  "auth/login",
  async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const deleteUser = createAsyncThunk<any, string>(
  "auth/delete",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/auth/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setUser: () => {},
  },
  extraReducers: (builder) => {
    builder
      // Check authentication
      .addCase(checkAuthUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.isAuthenticated = true;
          state.user = action.payload?.user;
        }
      })
      .addCase(checkAuthUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.isAuthenticated = true;
          state.user = action.payload?.user;
        }
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.isAuthenticated = true;
          state.user = action.payload?.user;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Logout user
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.isAuthenticated = false;
          state.user = null;
        }
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.isAuthenticated = false;
          state.user = null;
        }
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const { setUser } = authSlice.actions;

export default authSlice.reducer;
