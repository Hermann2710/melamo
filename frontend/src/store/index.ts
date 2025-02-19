import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import adminReducer from "./topics";

const AppStore = configureStore({
  reducer: {
    auth: authReducer,
    topics: adminReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof AppStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof AppStore.dispatch;

export default AppStore;
