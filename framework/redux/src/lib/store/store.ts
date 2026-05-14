import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todos/todoSlice";

// "configureStore" is used to combine all "slices" at single place, it does everything automatically setup with default settings, otherwise we have to do manually in core-redux.
export const store = configureStore({
  // Take two type of value "Single Slice Function" (If we want single reducer), "Object of Slice function" (If we want multiple reducers).
  // It behind the sense call core-redux "combineReducers()" function to combine all reducer for creating store by using "createStore".
  reducer: {
    todos: todoSlice,
  },
  // Option state what provided to "createStore" but we don't have to specify it because we already do it in "createSlice".
  // preloadedState: {
  //   todos: [],
  // },
});

// Infer the "RootState" and "AppDispatch" directly from the "store".
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
