import GradientOverlay from "./components/GradientOverlay";
import Tabs from "./components/Tabs";
import TodoContainer from "./components/TodoContainer";
import TodoInput from "./components/TodoInput";
import { useAppSelector } from "./lib/store/hooks";

const Loader = () => {
  const state = useAppSelector((state) => state.todos.state);

  if (state !== "loading") return null;

  return (
    <div className="fixed bottom-4 left-4 bg-slate-700 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm font-medium">Loading...</span>
    </div>
  );
};

function App() {
  return (
    <main className="h-screen w-screen bg-slate-900 relative">
      {/* full-screen gradient overlay */}
      <GradientOverlay />

      <Loader />

      {/* centered visible section */}
      <TodoContainer>
        <TodoInput />
        <Tabs />
      </TodoContainer>
    </main>
  );
}

export default App;
