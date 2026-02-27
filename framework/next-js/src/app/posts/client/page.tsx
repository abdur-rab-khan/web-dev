import React, { Suspense, use } from "react";

async function ClientPage() {
  const posts = fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      tags: ["posts"], // This is used to tag the cached data, so we can invalidate it later using "revalidateTag" function in "server actions" or in "API routes"
    },
  });

  return (
    <div>
      <Suspense fallback={<div>Loading posts...</div>}>
        <ClientComponent postsPromise={posts} />
      </Suspense>
    </div>
  );
}

const ClientComponent = ({
  postsPromise,
}: {
  postsPromise: Promise<Response>;
}) => {
  "use client";
  // OR WE COULD USE PASSED "postsPromise" PROPS INSTEAD OF CALLING "fetch" AGAIN, BOTH ARE SAME
  const data = use(
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json(),
    ),
  );

  return (
    <ul>
      {data.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default ClientPage;
