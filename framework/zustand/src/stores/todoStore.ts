import { create } from "zustand";
import type { ITodoStore } from "../types/todo.store";
import { createJSONStorage, persist } from "zustand/middleware";

const dummyPromise = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("Done");
    }, 1200);
  });

// To create store in "ZUSTAND" there is any "API" called "create", We use ths API to create it.
// "create" -> Create todo returns a "React Hook", We can use them as a "select" to get "store", "actions"
const useTodoStore = create<ITodoStore>()(
  persist(
    (set, get) => ({
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
              ? {
                  ...t,
                  state: t.state === "completed" ? "pending" : "completed",
                }
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

      // Instead of manually doing filtration on "useTodoStore((state) => state.todos.filter((t) => t.state === "completed"))" every time, We can create a "selector" in the store itself, So, we can directly use "useTodoStore((state) => state.completedTodos)" to get the completed todos.
      // It's gives us a better performance because it only re-renders the component that uses the "selector" when the "selector" value changes, Instead of re-rendering all the components that use the store when any state changes.
      completedTodos() {
        return get().todos.filter((t) => t.state === "completed");
      },

      getPendingTodos() {
        return get().todos.filter((t) => t.state === "pending");
      },
    }),
    {
      // It's
      name: "todo-storage",

      // It's used to say I want to use "localStorage" to store my data, Instead of "localStorage" you can also use "sessionStorage" or any custom storage that you want to use.
      storage: createJSONStorage(() => localStorage),

      // It's a function that filters the state that I want to persist, In this case, I only want to persist the "todos" and not the "isLoading" state. So, I return an object that only contains the "todos" state.
      partialize: (state) => ({ todos: state.todos }),

      // A version used to manage the state. If version miss-match it won't store the data into the storage.
      version: 1,

      // It's a function that is used to migrate the state from one version to another. Suppose you have a new version of your store and you want to migrate the old state to the new state, You can use this function to do that. In this case, we are not doing any migration, So, we just return the persisted state as it is.
      migrate: (persistedState, version) =>
        version === 1 ? persistedState : { todos: [] },

      // It's important in "Next.js", because "Next.js" does "Server Side Rendering", and "localStorage" is not available in the server, So, we need to skip the hydration process to avoid the error. So, we set "skipHydration" to true.
      skipHydration: true,
    },
  ),
);

export default useTodoStore;
