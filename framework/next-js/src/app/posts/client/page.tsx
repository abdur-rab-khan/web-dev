import React, { Suspense, use } from "react";

async function ClientPage() {
  const posts = fetch("https://jsonplaceholder.typicode.com/posts");

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
  const data = use(postsPromise);
  const posts = use(data.json());

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default ClientPage;
