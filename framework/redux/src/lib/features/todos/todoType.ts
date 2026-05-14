interface ITodoSlice {
  todos: ITodo[];
  state: "loading" | "stale";
}

interface ITodo {
  id: string;
  title: string;
  status: "completed" | "pending";
}

export type { ITodo, ITodoSlice };
