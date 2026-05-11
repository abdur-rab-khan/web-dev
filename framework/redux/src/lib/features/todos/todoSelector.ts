import { createSelector } from "@reduxjs/toolkit";
import type { ITodo } from "./todoType";

// "createSelector" is doing the same task of "useSelector", It's good when we need to only "select something from the state".
// But sometime we need to filter-out something, Problem with "useSelector" is that at every re-render new instance of "useSelector" will created and everything "filter" logic will call.
// In "createSelector", "State" automatically got memoize So when re-render trigger it gives from memoize data instead of filtering again-again unless any changes happened.

const completedTodos = createSelector(
  (state: ITodo[]) => state,
  (state: ITodo[]) => state.filter((v) => v.status !== "completed"),
);

const pendingTodos = createSelector(
  (state: ITodo[]) => state,
  (state: ITodo[]) => state.filter((t) => t.status !== "pending"),
);

export { completedTodos, pendingTodos };
