import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${(await params).id}`,
  );
  const data = await response.json();

  return {
    title: data.title,
    description: data.body,
    keywords: ["dynamic", "metadata", "nextjs"],
    openGraph: {
      type: "article",
      title: data.title,
      description: data.body,
      url: `https://example.com/meta/${(await params).id}`,
    },
  };
}

async function DynamicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  const data = await response.json();

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}

export default DynamicPage;
