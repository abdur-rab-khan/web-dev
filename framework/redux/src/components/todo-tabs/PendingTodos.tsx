import Todo from "./Todo";
import TodoLayout from "./TodoLayout";

import { useAppSelector } from "../../lib/store/hooks";
import { pendingTodos } from "../../lib/features/todos/todoSelector";

function PendingTodos() {
  const pdTodos = useAppSelector(pendingTodos);

  console.log("PendingTodos rendered");

  return (
    <TodoLayout>
      {pdTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </TodoLayout>
  );
}

export default PendingTodos;
