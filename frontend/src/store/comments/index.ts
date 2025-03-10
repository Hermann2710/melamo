import { API } from "@/config";
import Comment, { initialCommentsState } from "@/types/Comment";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk<any, any>(
  "home/comments/fetch",
  async (query) => {
    const response = await axios.post(`${API}/comments/all`, query, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const addComment = createAsyncThunk<any, any>(
  "home/comments/add",
  async (comment) => {
    const response = await axios.post(`${API}/comments`, comment, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const editComment = createAsyncThunk<
  any,
  { id: string; comment: Comment }
>("home/comments/edit", async ({ id, comment }) => {
  const response = await axios.put(`${API}/comments/${id}`, comment, {
    withCredentials: true,
  });
  return response.data;
});

export const deleteComment = createAsyncThunk<any, string>(
  "home/comments/delete",
  async (id) => {
    const response = await axios.delete(`${API}/comments/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState: initialCommentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Comments
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload.success ? action.payload.comments : [];
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = false;
        state.comments = [];
      })
      // Add Comment
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = true;
        if (action.payload.success) {
          state.comments.push(action.payload.comment);
        }
      })
      .addCase(addComment.rejected, (state) => {
        state.isLoading = false;
      })
      // Edit Comm
      .addCase(editComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.isLoading = true;
        if (action.payload.success) {
          state.comments.map((comment) => {
            if (comment._id === action.payload.comment._id) {
              comment = action.payload.comment;
            }
          });
        }
      })
      .addCase(editComment.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.comments.filter(
            (comment) => comment._id !== action.payload.comment._id
          );
        }
      })
      .addCase(deleteComment.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const commentsReducer = commentsSlice.reducer;

export default commentsReducer;
