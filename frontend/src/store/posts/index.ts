import { API } from "@/config";
import Post, { initialPostState } from "@/types/Post";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk<any, { author?: string }>(
  "posts/find",
  async ({ author }) => {
    let url = `${API}/posts`;
    if (author) {
      url += `?author=${author}`;
    }
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }
);

export const createPost = createAsyncThunk<any, Post>(
  "posts/create",
  async (data) => {
    const response = await axios.post(`${API}/posts`, data, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const updatePost = createAsyncThunk<any, { id: string; data: Post }>(
  "posts/update",
  async ({ id, data }) => {
    const response = await axios.put(`${API}/posts/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const deletePost = createAsyncThunk<any, string>(
  "posts/delete",
  async (id) => {
    const response = await axios.delete(`${API}/posts/${id}`, { withCredentials: true });
    return response.data;
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState: initialPostState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.success ? action.payload.posts : [];
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle creating a post
      .addCase(createPost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.posts.unshift(action.payload.post);
        }
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle updating a post
      .addCase(updatePost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.posts = state.posts.map((post) =>
            post._id === action.payload.post._id ? action.payload.post : post
          );
        }
      })
      .addCase(updatePost.rejected, (state) => {
        state.isLoading = false;
      })
      // Handle deleting a post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload.post._id);
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const postsReducer = postSlice.reducer;

export default postsReducer;
