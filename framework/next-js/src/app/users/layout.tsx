import React from "react";

function UsersLayout({ children, params }: LayoutProps<"/users/[search]">) {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex items-start justify-start py-12 px-4 sm:px-6 lg:px-8 relative flex-col">
      <h1 className="text-3xl font-bold mb-4">Users Layout</h1>
      <div className="pt-4">{children}</div>
    </div>
  );
}

export default UsersLayout;
