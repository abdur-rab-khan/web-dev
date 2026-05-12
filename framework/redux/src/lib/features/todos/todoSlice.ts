import {
  createAction,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type ITodo } from "./todoType";

type UpdateTodoPayload = Partial<Omit<ITodo, "id">> & { id: string };

const initialState: ITodo[] = [];

// "CreateSlice" is a function that is use to create a "slice".
// Here we initialize "slice" with "initialState", "reducers", "extraReducers" (for asyncThunk),
const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<ITodo>) {
      // "state": Current state data (Proxy array)
      // "action": It's an object which has {"type": "name/function_name -> (todoSlice/addTodo)", payload:""}
      // We need to return "new state" or "update existing one"
      state.push(action.payload);
    },
    removeTodo(state, action) {
      return state.filter((t) => t.id !== action.payload);
    },
    // "PayloadAction" is a generic type used to tell the type of "payload"
    updateTodo(state, action: PayloadAction<UpdateTodoPayload>) {
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t,
      );
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
