import React from "react";

async function FetchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  // In Server Components, fetch requires an absolute URL
  const users = (await fetch("http://localhost:3000/api/users").then((res) =>
    res.json(),
  )) as {
    id: string;
    name: string;
  }[];
  const { q } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="mb-4">
        {users.map((user) => (
          <li key={user.id} className="text-lg">
            {user.name}
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-500">Query: {q}</p>
    </div>
  );
}

export default FetchPage;
