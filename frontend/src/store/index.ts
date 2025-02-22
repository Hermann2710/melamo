import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import postsReducer from "./posts";
import usersReducer from "./users";

const AppStore = configureStore({
  reducer: {
    authReducer: authReducer,
    usersReducer: usersReducer,
    postsReducer: postsReducer,
  },
});

export type RootState = ReturnType<typeof AppStore.getState>;

export type AppDispatch = typeof AppStore.dispatch;

export default AppStore;
