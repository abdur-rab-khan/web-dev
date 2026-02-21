import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Glowing 404 */}
        <h1 className="text-[8rem] font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500 drop-shadow-lg select-none">
          404
        </h1>

        {/* Decorative line */}
        <div className="mx-auto mt-4 mb-8 h-px w-24 bg-linear-to-r from-transparent via-violet-500 to-transparent" />

        {/* Message */}
        <h2 className="text-2xl font-semibold text-zinc-100 mb-3">
          User Not Found
        </h2>
        <p className="text-zinc-400 mb-10 leading-relaxed">
          The user you&apos;re looking for doesn&apos;t exist or may have been
          removed. Please check the URL and try again.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
              />
            </svg>
            Go Home
          </Link>

          <Link
            href="/users"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-4a4 4 0 10-8 0 4 4 0 008 0zm6 0a4 4 0 10-2-7.46"
              />
            </svg>
            All Users
          </Link>
        </div>

        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
        </div>
      </div>
    </div>
  );
}
