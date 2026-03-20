import React from "react";

function UserLoader() {
  return (
    <div className="space-y-4 w-full">
      <div className="h-8 w-32 animate-pulse rounded bg-gray-200"></div>
      <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
      <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
    </div>
  );
}

export default UserLoader;
