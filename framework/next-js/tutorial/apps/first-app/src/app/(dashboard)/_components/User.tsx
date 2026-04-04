import { Style_Script } from "next/font/google";
import React from "react";

const styleScript = Style_Script({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const userPromise = (): Promise<{
  name: string;
  email: string;
  description: string;
}> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          name: "John Doe",
          email: "jhon@john.com",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        }),
      500,
    ),
  );

async function User() {
  const user = await userPromise();

  return (
    <div
      style={styleScript.style}
      className="space-y-4 bg-slate-900 w-full p-6 border border-slate-800 shadow-xl shadow-slate-800/20 hover:shadow-slate-800/50 transition rounded-md"
    >
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-600">{user.email}</p>
      <p>{user.description}</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

export default User;
