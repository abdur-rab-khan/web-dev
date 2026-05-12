import GradientOverlay from "./components/GradientOverlay";
import Tabs from "./components/Tabs";
import TodoContainer from "./components/TodoContainer";
import TodoInput from "./components/TodoInput";

function App() {
  return (
    <main className="h-screen w-screen bg-slate-900 relative">
      {/* full-screen gradient overlay */}
      <GradientOverlay />

      {/* centered visible section */}
      <TodoContainer>
        <TodoInput />
        <Tabs />
      </TodoContainer>
    </main>
  );
}

export default App;
