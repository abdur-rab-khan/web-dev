import Tabs from "./components/Tabs";
import TodoInput from "./components/TodoInput";

function App() {
  return (
    <main className="h-screen w-screen bg-slate-900 relative">
      {/* full-screen gradient overlay */}
      <div className="fixed inset-0 pointer-events-none bg-linear-to-br from-transparent via-transparent to-slate-600/20" />

      {/* centered visible section */}
      <section className="bg-slate-800 border border-slate-400/50 border-b-slate-400/80 border-r-slate-400/80  shadow-2xl shadow-slate-700/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-full md:max-w-2xl h-full md:h-[78vh] rounded-xl p-2 text-white">
        <div className="size-full flex flex-col gap-2">
          <TodoInput />
          <Tabs />
        </div>
      </section>
    </main>
  );
}

export default App;
