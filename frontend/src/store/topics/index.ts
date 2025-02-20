import { InitialTopicState } from "@/types/Topic";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: InitialTopicState = {
  isLoading: false,
  topics: [],
};

export const fetchTopics = createAsyncThunk("admin/topics/all", async () => {
  const response = await axios.get("http://localhost:5000/api/admin/topics", {
    withCredentials: true,
  });
  return response.data;
});

export const addTopic = createAsyncThunk<any, any>(
  "admin/topics/add",
  async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/topics",
      data,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const editTopic = createAsyncThunk<any, { id: string; data: any }>(
  "admin/topics/edit",
  async ({ id, data }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/topics/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const deleteTopic = createAsyncThunk<any, string>(
  "admin/topics/delete",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/admin/topics/${id}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "topicsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch topics
      .addCase(fetchTopics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.topics = action.payload?.topics;
        }
      })
      .addCase(fetchTopics.rejected, (state) => {
        state.isLoading = false;
        state.topics = [];
      })
      // Add topic
      .addCase(addTopic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.topics.push(action.payload.topic);
        }
      })
      .addCase(addTopic.rejected, (state) => {
        state.isLoading = false;
        state.topics = [];
      })
      // Edit topic
      .addCase(editTopic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          const topicIndex = state.topics.findIndex(
            (topic) => topic._id === action.payload.topic._id
          );
          if (topicIndex !== -1) {
            state.topics[topicIndex] = action.payload.topic;
          }
        }
      })
      .addCase(editTopic.rejected, (state) => {
        state.isLoading = false;
        state.topics = [];
      })
      // Delete topic
      .addCase(deleteTopic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.topics = state.topics.filter(
            (topic) => topic._id !== action.payload.topic._id
          );
        }
      })
      .addCase(deleteTopic.rejected, (state) => {
        state.isLoading = false;
        state.topics = [];
      });
  },
});

export default adminSlice.reducer;
