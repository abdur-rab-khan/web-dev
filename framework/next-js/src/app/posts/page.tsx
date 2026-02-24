import React from "react";

async function PostsPage() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
  });
  const posts = await data.json();

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default PostsPage;
