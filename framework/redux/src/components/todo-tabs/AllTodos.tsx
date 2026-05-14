import Todo from "./Todo";
import TodoLayout from "./TodoLayout";

import { useAppSelector } from "../../lib/store/hooks";

function AllTodos() {
  const allTodos = useAppSelector((state) => state.todos.todos);

  return (
    <TodoLayout>
      {allTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </TodoLayout>
  );
}

export default AllTodos;
