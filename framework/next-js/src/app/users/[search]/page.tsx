import React from "react";

async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ search: string }>;
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const { search } = await params;

  // If page is client component we can use "use" react hook to get params and searchParams like below:
  // const { q } = use(searchParams);
  // const { search } = use(params);
  // NOTE: We have to manage the loading and error state by ourself when we use "use" react hook.

  return (
    <div>
      <p className="text-2xl font-bold">Search: {search}</p>
      <p className="text-lg">Query: {q}</p>
    </div>
  );
}

export default Page;
