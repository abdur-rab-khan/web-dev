import React from "react";

function TodoContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-slate-800 border border-slate-400/50 border-b-slate-400/80 border-r-slate-400/80  shadow-2xl shadow-slate-700/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-full md:max-w-2xl h-full md:h-[78vh] rounded-xl p-3 text-white">
      <div className="size-full flex flex-col gap-2">{children}</div>
    </section>
  );
}

export default TodoContainer;
