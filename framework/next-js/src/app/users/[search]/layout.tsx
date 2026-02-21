import { notFound } from "next/navigation";
import React from "react";

async function SearchLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ search: string }>;
}) {
  const { search } = await params;

  // If search is a integer return notFound page
  if (isNaN(Number(search))) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-start justify-start relative flex-col">
      <h1 className="text-3xl font-bold mb-4">Search Layout: {search}</h1>
      <div className=" pt-4">{children}</div>
    </div>
  );
}

export default SearchLayout;
