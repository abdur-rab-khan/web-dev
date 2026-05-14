import { AnimatePresence } from "motion/react";
import React from "react";

type TodoLayoutProps = {
  children: React.ReactNode;
};

function TodoLayout({ children }: TodoLayoutProps) {
  return (
    <section className="size-full bg-yellow-500 overflow-y-auto">
      <div className="relative mx-auto flex w-full max-w-3xl flex-col px-4 py-8">
        <div className="pointer-events-none absolute left-6 top-6 h-32 w-32 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-slate-200/60 blur-3xl" />

        <div className="relative">
          <AnimatePresence>{children}</AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default TodoLayout;
