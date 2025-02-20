import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import topicsReducer from "./topics";
import postsReducer from "./posts";

const AppStore = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicsReducer,
    posts: postsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof AppStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof AppStore.dispatch;

export default AppStore;
