import { Outlet } from "react-router-dom";

function HomeLayout() {
  console.log("Rendering HomeLayout");

  return (
    <section className="bg-blue-900 text-white p-5 min-h-screen flex flex-col items-center gap-5 ml-72">
      <h1 className="text-sky-300 border-b-2 border-sky-300 pb-2.5">
        Home Layout
      </h1>
      <div className="flex-1 size-full">
        <Outlet />
      </div>
    </section>
  );
}

export default HomeLayout;
