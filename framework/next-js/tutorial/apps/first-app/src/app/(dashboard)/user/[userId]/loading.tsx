import React from "react";

function UserLoading() {
  return (
    <div className="size-full p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Name skeleton */}
        <div className="h-10 bg-gray-700 rounded animate-pulse mb-2"></div>

        {/* Username skeleton */}
        <div className="h-6 bg-gray-700 rounded animate-pulse mb-6 w-32"></div>

        {/* Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h-6 bg-gray-700 rounded animate-pulse mb-4 w-24"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          <div>
            <div className="h-6 bg-gray-700 rounded animate-pulse mb-4 w-20"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-40"></div>
            </div>
          </div>
        </div>

        {/* Company section skeleton */}
        <div className="mt-8 bg-gray-700 p-6 rounded-lg">
          <div className="h-6 bg-gray-600 rounded animate-pulse mb-4 w-24"></div>
          <div className="space-y-2">
            <div className="h-5 bg-gray-600 rounded animate-pulse w-48"></div>
            <div className="h-4 bg-gray-600 rounded animate-pulse mt-2"></div>
            <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLoading;
