import { useEffect, useMemo, useState } from "react";
import Loader from "./components/Loader";
import useTodoStore from "./stores/todoStore";

function App() {
  const [title, setTitle] = useState("");

  const todos = useTodoStore((state) => state.todos);
  const isLoading = useTodoStore((state) => state.isLoading);
  const addTodo = useTodoStore((state) => state.addTodo);
  const asyncAddTodo = useTodoStore((state) => state.asyncAddTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const asyncRemoveTodo = useTodoStore((state) => state.asyncRemoveTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const completedTodos = useTodoStore((state) => state.completedTodos);
  const pendingTodos = useTodoStore((state) => state.getPendingTodos);

  useEffect(() => {
    useTodoStore.persist.rehydrate();
  }, []);

  const stats = useMemo(
    () => ({
      total: todos.length,
      completed: completedTodos().length,
      pending: pendingTodos().length,
    }),
    [todos, completedTodos, pendingTodos],
  );

  const buildTodo = () => ({
    id: crypto.randomUUID(),
    title: title.trim(),
    state: "pending" as const,
  });

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodo(buildTodo());
    setTitle("");
  };

  const handleAsyncAdd = async () => {
    if (!title.trim()) return;
    await asyncAddTodo(buildTodo());
    setTitle("");
  };

  return (
    <div className="app">
      <Loader />
      <header className="hero">
        <div className="badge">Zustand Todo Lab</div>
        <h1>
          A bold, tactile todo experience
          <span className="accent"> with instant and promised actions.</span>
        </h1>
        <p>
          Capture tasks, flip their state, and compare sync vs async flows with
          distinct controls.
        </p>
      </header>

      <section className="todo-shell">
        <div className="todo-top">
          <div className="field">
            <label htmlFor="todo-title">Add a new task</label>
            <div className="input-row">
              <input
                id="todo-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleAdd();
                }}
                placeholder="Sketch the next move"
              />
              <div className="button-row">
                <button
                  className="btn primary"
                  onClick={handleAdd}
                  disabled={isLoading}
                >
                  Add now
                </button>
                <button
                  className="btn ghost"
                  onClick={handleAsyncAdd}
                  disabled={isLoading}
                >
                  Add with promise
                </button>
              </div>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <span>Total</span>
              <strong>{stats.total}</strong>
            </div>
            <div className="stat">
              <span>Pending</span>
              <strong>{stats.pending}</strong>
            </div>
            <div className="stat">
              <span>Completed</span>
              <strong>{stats.completed}</strong>
            </div>
          </div>
        </div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty">
              <h3>No tasks yet</h3>
              <p>Start with something small and watch the list glow.</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <article
                key={todo.id}
                className="todo-card"
                data-state={todo.state}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <button
                  className="state-pill"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.state === "completed" ? "Completed" : "Pending"}
                </button>

                <div className="todo-body">
                  <h4>{todo.title}</h4>
                  <p>
                    Tap the pill to toggle state. Try the async removal to see
                    the loader.
                  </p>
                </div>

                <div className="actions">
                  <button
                    className="btn minimal"
                    onClick={() => removeTodo(todo.id)}
                    disabled={isLoading}
                  >
                    Remove now
                  </button>
                  <button
                    className="btn outline"
                    onClick={() => asyncRemoveTodo(todo.id)}
                    disabled={isLoading}
                  >
                    Remove with promise
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
