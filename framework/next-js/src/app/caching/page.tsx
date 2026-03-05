import React from "react";

async function CachingPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "force-cache", // default caching behavior, it will cache the data during build time and serve the same data until we re-build the app again
    // cache: "no-store", // it will fetch fresh data on every request, but it will not cache the data at all
    // next: { revalidate: 10 }, // it will revalidate the data after every 10 seconds, but it will still cache the data and serve the cached data until it revalidates
  });
  const data = await res.json();

  return (
    <div className="p-2">
      <h1 className="text-4xl font-bold">Title: {data.title}</h1>
      <p className="text-sm">Body: {data.body}</p>
    </div>
  );
}

export default CachingPage;
