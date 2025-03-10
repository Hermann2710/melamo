import { API } from "@/config";
import { initialConversationState } from "@/types/Conversation";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessages = createAsyncThunk<
  any,
  { senderId: string; receiverId: string }
>("messages/fetch", async ({ senderId, receiverId }) => {
  const response = await axios.get(
    `${API}/messages/${senderId}/${receiverId}`,
    { withCredentials: true }
  );
  return response.data;
});

export const sendMessage = createAsyncThunk<
  any,
  { senderId: string; receiverId: string; text: string }
>("messages/send", async (data) => {
  const response = await axios.post(`${API}/messages`, data, {
    withCredentials: true,
  });
  return response.data;
});

export const editMessage = createAsyncThunk<
  any,
  { messageId: string; text: string }
>("message/edit", async ({ messageId, text }) => {
  const response = await axios.put(
    `${API}/messages/${messageId}`,
    { text: text },
    { withCredentials: true }
  );
  return response.data;
});

export const deleteMessage = createAsyncThunk<any, { messageId: string }>(
  "message/delete",
  async ({ messageId }) => {
    const response = await axios.delete(`${API}/messages/${messageId}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

const conversationSlice = createSlice({
  name: "ConversationSlice",
  initialState: initialConversationState,
  reducers: {
    resetConversation: (state) => {
      state.conversation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.conversation = action.payload.conversation;
        }
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isLoading = false;
        state.conversation = null;
      })
      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          if (state.conversation) {
            state.conversation.messages.push(action.payload.msg);
          }
        }
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isLoading = false;
      })
      // Update Message
      .addCase(editMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          if (state.conversation) {
            const messages = state.conversation.messages.map((message) => {
              if (message._id === action.payload.msg._id) {
                message.text = action.payload.msg.text;
              }
              return message;
            });
            state.conversation.messages = messages;
          }
        }
      })
      .addCase(editMessage.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete Message
      .addCase(deleteMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          if (state.conversation) {
            const messages = state.conversation.messages.filter(
              (message) => message._id !== action.payload.msg._id
            );
            state.conversation.messages = messages;
          }
        }
      })
      .addCase(deleteMessage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const conversationReducer = conversationSlice.reducer;

export const { resetConversation } = conversationSlice.actions;

export default conversationReducer;
