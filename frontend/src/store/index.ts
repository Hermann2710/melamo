import { configureStore } from "@reduxjs/toolkit";

const AppStore = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof AppStore.getState>;

export type AppDispatch = typeof AppStore.dispatch;

export default AppStore;
