import { InitialPostState } from "@/types/Post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: InitialPostState = {
  isLoading: false,
  posts: [],
};

export const fetchPosts = createAsyncThunk<
  any,
  { author?: string; topic?: string }
>("admin/posts/fetch", async (data) => {
  let url = "http://localhost:5000/api/admin/posts";
  if (data.author) {
    url += `?author=${data.author}`;
    if (data.topic) {
      url += `?topic=${data.topic}`;
    }
  } else if (data.topic) {
    url += `?topic=${data.topic}`;
  }
  const response = await axios.get(url, { withCredentials: true });
  return response.data;
});

export const addPost = createAsyncThunk<any, any>(
  "admin/posts/create",
  async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/posts",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const editPost = createAsyncThunk<any, { id: string; data: any }>(
  "admin/posts/edit",
  async ({ id, data }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/posts/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const deletePost = createAsyncThunk<any, string>(
  "admin/posts/delete",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/admin/posts/${id}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch the posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.posts = action.payload.posts;
        }
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.posts = [];
      })
      // Create a new Post
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.posts.push(action.payload.post);
        }
      })
      .addCase(addPost.rejected, (state) => {
        state.isLoading = false;
      })
      // Update a post
      .addCase(editPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          const postIndex = state.posts.findIndex(
            (post) => post._id === action.payload.post._id
          );
          if (postIndex !== -1) {
            state.posts[postIndex] = action.payload.post;
          }
        }
      })
      .addCase(editPost.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete a post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          const postIndex = state.posts.findIndex(
            (post) => post._id === action.payload.postId
          );
          if (postIndex !== -1) {
            state.posts.splice(postIndex, 1);
          }
        }
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default postsSlice.reducer;
