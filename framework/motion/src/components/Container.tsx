import React from "react";

interface IContainerProps {
  title: string;
  children: React.ReactNode;
}

function Container({ title, children }: IContainerProps) {
  return (
    <div className="size-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex flex-1 size-full flex-col gap-y-3">{children}</div>
    </div>
  );
}

export default Container;
