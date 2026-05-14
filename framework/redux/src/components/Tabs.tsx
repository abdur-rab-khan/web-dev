import { useAppSelector } from "../lib/store/hooks";

function Tabs() {
  const todos = useAppSelector((state) => state.todos);

  console.log("Todos: ", todos);

  return <div className="flex-1 size-full "></div>;
}

export default Tabs;
