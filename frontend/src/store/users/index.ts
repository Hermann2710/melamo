import { API } from "@/config";
import User from "@/types/User";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialUserState: {
  isLoading: boolean;
  users: User[];
} = {
  isLoading: false,
  users: [],
};

export const fetchUsers = createAsyncThunk<any>("users/all", async () => {
  const response = await axios.get(`${API}/users`, { withCredentials: true });
  return response.data;
});

export const updateUser = createAsyncThunk<any, { id: string; data: User }>(
  "/users/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API}/users/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const deleteUser = createAsyncThunk<any, string>(
  "/users/delete",
  async (id) => {
    const response = await axios.delete(`${API}/users/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.users = action.payload.users;
        }
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle Editing user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.users = state.users.map((user) =>
            user._id === action.payload.user._id ? action.payload.user : user
          );
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle deleting user
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.users = state.users.filter((user) => user._id !== action.payload.user._id);
        }
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const usersReducer = usersSlice.reducer;

export default usersReducer;
