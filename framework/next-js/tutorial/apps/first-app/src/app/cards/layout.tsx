import React from "react";

function CardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-2">
      <h1 className="text-4xl font-semibold mb-2">Created Cards</h1>
      <div className="flex w-full flex-wrap content-start items-start gap-4 p-2">
        {children}
      </div>
    </section>
  );
}

export default CardLayout;
