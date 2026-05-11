import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todos/todoSlice";

// "configureStore" is used to combine all "slices" at single place, it does everything automatically without it we need to manually setup in "redux".
export const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});
