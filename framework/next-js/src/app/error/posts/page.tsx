import { notFound } from "next/navigation";
import React from "react";

const simulatingPostPromise = (): Promise<
  { title: string; description: string }[]
> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        resolve([
          { title: "Post 1", description: "Description for Post 1" },
          { title: "Post 2", description: "Description for Post 2" },
          { title: "Post 3", description: "Description for Post 3" },
        ]);
      } else {
        resolve([]);
      }
    }, 1000);
  });

async function PostPage() {
  const posts = await simulatingPostPromise();

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="size-screen p-1">
      <h1 className="text-2xl">Posts</h1>
      <ul className="mt-4 space-y-2">
        {posts.map((post, index) => (
          <li key={index} className="border border-gray-300 rounded p-2">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostPage;
