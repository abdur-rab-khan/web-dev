import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ITodo } from "./todoType";

const dummyPromise = <T>(a: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(a);
    }, 1000);
  });

/*
`createAsyncThunk` is used to handle async operations in Redux Toolkit.

- It creates an async thunk function and automatically generates:
    - pending
    - fulfilled
    - rejected

    action types.

- There are two common ways to update state:
    1. Dispatch normal actions manually.
    2. Handle async action states inside `extraReducers` in `createSlice`.
*/
const todoAddThunk = createAsyncThunk(
  "todo/add",
  async (todo: ITodo, { abort, signal, dispatch }) => {
    return await dummyPromise(todo);
  },
);

const removeTodoThunk = createAsyncThunk("todo/remove", async (id: string) => {
  return await dummyPromise(id);
});

export { todoAddThunk, removeTodoThunk };
