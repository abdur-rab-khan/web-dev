import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Outlet />
    </main>
  );
}

export default App;
