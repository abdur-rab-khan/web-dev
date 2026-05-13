import { createAppSelector } from "../../store/hooks";
import type { ITodo } from "./todoType";

// "createSelector" is doing the same task of "useSelector", It's good when we need to only "select something from the state".
// But sometime we need to filter-out something, Problem with "useSelector" is that at every re-render new instance of "useSelector" will created and everything "filter" logic will call.
// In "createSelector", "State" automatically got memoize So when re-render trigger it gives from memoize data instead of filtering again-again unless any changes happened.

const completedTodos = createAppSelector(
  (state) => state.todos.todos,
  (todos: ITodo[]) => todos.filter((v) => v.status !== "completed"),
);

const pendingTodos = createAppSelector(
  (state) => state.todos.todos,
  (todos: ITodo[]) => todos.filter((t) => t.status !== "pending"),
);

export { completedTodos, pendingTodos };
