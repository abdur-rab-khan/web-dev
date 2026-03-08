"use client";

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="size-screen p-1">
      <h1>Error Page</h1>
      <p>{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-0.5 bg-blue-500 cursor-pointer text-white rounded active:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorPage;
