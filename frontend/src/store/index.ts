import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import postsReducer from "./posts";
import usersReducer from "./users";
import commentsReducer from "./comments";
import conversationReducer from "./conversations";

const AppStore = configureStore({
  reducer: {
    authReducer: authReducer,
    usersReducer: usersReducer,
    postsReducer: postsReducer,
    commentsReducer: commentsReducer,
    conversationReducer: conversationReducer
  },
});

export type RootState = ReturnType<typeof AppStore.getState>;

export type AppDispatch = typeof AppStore.dispatch;

export default AppStore;
