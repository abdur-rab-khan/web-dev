import { create } from "zustand";
import type { ITodoStore } from "../types/todo.store";

const dummyPromise = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("Done");
    }, 1200);
  });

// To create store in "ZUSTAND" there is any "API" called "create", We use ths API to create it.
// "create" -> Create todo returns a "React Hook", We can use them as a "select" to get "store", "actions"
const useTodoStore = create<ITodoStore>((set) => ({
  todos: [],
  isLoading: false,

  // Actually, It's little bit confusing because unlike "redux/redux-toolkit" where everything like "store", "action" are stored in the store. Instead of only "store"
  addTodo(todo) {
    set((state) => ({
      ...state,
      todos: [...state.todos, todo],
    }));
  },
  removeTodo(todoId) {
    set((state) => ({
      ...state,
      todos: state.todos.filter((t) => t.id !== todoId), // You confuse everything how "filter" works, Think of it like this filter "keep" everything that does the matched (condition return true).
    }));
  },
  toggleTodo(todoId) {
    set((state) => ({
      ...state,
      todos: state.todos.map((t) =>
        t.id === todoId
          ? { ...t, state: t.state === "completed" ? "pending" : "completed" }
          : t,
      ),
    }));
  },
  async asyncAddTodo(todo) {
    set({ isLoading: true });

    await dummyPromise();

    set((state) => ({
      ...state,
      todos: [...state.todos, todo],
      isLoading: false,
    }));
  },
  async asyncRemoveTodo(todoId) {
    set({ isLoading: true });

    await dummyPromise();

    set((state) => ({
      ...state,
      todos: state.todos.filter((t) => t.id !== todoId),
      isLoading: false,
    }));
  },
}));

export default useTodoStore;
