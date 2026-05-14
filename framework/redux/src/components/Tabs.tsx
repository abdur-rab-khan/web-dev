import { useState } from "react";
import AllTodos from "./todo-tabs/AllTodos";
import CompletedTodos from "./todo-tabs/CompletedTodos";
import PendingTodos from "./todo-tabs/PendingTodos";

type ITab = "all" | "completed" | "pending";

const tabs: { key: ITab; label: string; content: string }[] = [
  { key: "all", label: "All", content: "Showing all items." },
  {
    key: "completed",
    label: "Completed",
    content: "Showing completed items.",
  },
  { key: "pending", label: "Pending", content: "Showing pending items." },
];

function Tabs() {
  const [tab, setTab] = useState<ITab>("all");

  const handleSwitchTab = (tab: ITab) => {
    setTab(tab);
  };

  let ActiveTab;

  switch (tab) {
    case "all":
      ActiveTab = AllTodos;
      break;
    case "completed":
      ActiveTab = CompletedTodos;
      break;
    case "pending":
      ActiveTab = PendingTodos;
      break;
    default:
      ActiveTab = AllTodos;
  }

  return (
    <div className="size-full p-4 flex flex-col">
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleSwitchTab(key)}
            className={`rounded-t px-4 py-2 text-sm font-medium transition-colors ${
              tab === key
                ? "border border-b-0 border-gray-200 bg-white text-blue-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="border border-gray-200 overflow-hidden flex-1 size-full">
        <ActiveTab />
      </div>
    </div>
  );
}

export default Tabs;
