import { motion } from "motion/react";

import { useAppDispatch } from "../../lib/store/hooks";
import { removeTodoThunk } from "../../lib/features/todos/todoThunk";
import { removeTodo, toggleTodo } from "../../lib/features/todos/todoSlice";

import type { ITodo } from "../../lib/features/todos/todoType";

type TodoProps = {
  todo: ITodo;
};

function Todo({ todo }: TodoProps) {
  const { id, status, title } = todo;
  const dispatch = useAppDispatch();

  const completed = status === "completed";

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = () => {
    dispatch(removeTodo(id));
  };

  const handleAsyncDeleteTodo = () => {
    dispatch(removeTodoThunk(id));
  };

  return (
    <motion.article
      layoutId={todo.id}
      className="relative w-full max-w-xl not-first:-mt-6 rounded-2xl border border-slate-200 bg-linear-to-br from-white via-white to-slate-50 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.6)]"
    >
      <div className="pointer-events-none absolute -top-3 left-6 h-8 w-24 rounded-full bg-emerald-100/70 blur-xl" />

      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <label className="group flex cursor-pointer items-center gap-3">
            <span className="relative flex h-6 w-6 items-center justify-center rounded-md border border-slate-300 bg-white shadow-sm transition group-hover:border-emerald-400">
              <input
                type="checkbox"
                checked={completed}
                onChange={handleToggle}
                className="peer absolute h-full w-full cursor-pointer opacity-0"
              />
              <span className="h-3 w-3 scale-0 rounded-sm bg-emerald-500 transition peer-checked:scale-100" />
            </span>
            <span className="text-sm font-medium text-slate-600">
              Mark done
            </span>
          </label>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            completed
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </span>
      </header>

      <div className="mt-4">
        <h3
          className={`text-lg font-semibold tracking-tight ${
            completed ? "text-slate-400 line-through" : "text-slate-900"
          }`}
        >
          {title}
        </h3>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Stack card
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDeleteTodo}
            className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-100"
          >
            Delete A
          </button>
          <button
            type="button"
            onClick={handleAsyncDeleteTodo}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
          >
            Delete B
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default Todo;
