interface ITodo {
  id: string;
  title: string;
  state: "pending" | "completed";
}

interface ITodoAction {
  addTodo: (todo: ITodo) => void;
  removeTodo: (todoId: string) => void;
  toggleTodo: (todoId: string) => void;
  asyncAddTodo: (todo: ITodo) => Promise<void>;
  asyncRemoveTodo: (todoId: string) => Promise<void>;
}

interface ITodoStore extends ITodoAction {
  todos: ITodo[];
  isLoading: boolean;
}

export type { ITodo, ITodoAction, ITodoStore };
