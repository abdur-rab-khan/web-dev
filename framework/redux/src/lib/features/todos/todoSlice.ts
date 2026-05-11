import { createSlice } from "@reduxjs/toolkit";
import { type ITodo } from "./todoType";

const initialState: ITodo[] = [];

// "CreateSlice" is a function that is use to create a "slice".
const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo(state, action) {},
    removeTodo(state, action) {},
    updateTodo(state, action) {},
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
