import { useAppSelector } from "../../lib/store/hooks";
import { completedTodos } from "../../lib/features/todos/todoSelector";
import TodoLayout from "./TodoLayout";
import Todo from "./Todo";

function CompletedTodos() {
  const compTodos = useAppSelector(completedTodos);

  console.log("CompletedTodos rendered");

  return (
    <TodoLayout>
      {compTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </TodoLayout>
  );
}

export default CompletedTodos;
