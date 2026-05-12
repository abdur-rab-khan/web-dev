import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../lib/features/todos/todoSlice";

function TodoInput() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleTodoAdd = () => {
    if (inputValue.trim() === "") return;

    const todoData = {
      id: crypto.randomUUID().toString(),
      title: inputValue,
      status: "pending" as const,
    };
    dispatch(addTodo(todoData));

    setInputValue("");
  };

  const handleMouseDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key !== "Enter") return;
    handleTodoAdd();
  };

  return (
    <div className="w-full h-12 flex justify-center items-center gap-2">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleMouseDown}
        placeholder="Enter your todo"
        className="flex-1 w-full border px-3 py-2 rounded-md bg-slate-700 border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-slate-400/80 focus:ring-offset-1 focus:ring-offset-slate-700/50"
      />
      <button
        onClick={handleTodoAdd}
        className="border px-6 py-2 rounded-md bg-slate-500/50 border-slate-400/80 hover:bg-slate-400/80 focus:outline-none focus:ring-2 focus:ring-slate-400/80 focus:ring-offset-1 focus:ring-offset-slate-700/50"
      >
        Add
      </button>
    </div>
  );
}

export default TodoInput;
