import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTeamMembers } from "../lib/dummyPromise";
import { useEffect } from "react";

function Query() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => getAllTeamMembers(),
  });

  useEffect(() => {
    console.log(
      "Cache data is: ",
      queryClient
        .getQueryCache()
        .get("team-members")
        ?.observers[0]?.getCurrentResult(),
    );
  }, [queryClient]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-slate-400 text-lg">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <button
        className="mb-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey: ["team-members"],
          })
        }
      >
        Clear Cache
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Team</h1>
          <p className="text-lg text-slate-300">
            Meet the talented people behind our success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data &&
            data.map((person) => (
              <div
                key={person.id}
                className="group relative bg-slate-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-slate-600">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-6 0 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                {/* Content Container */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
                    {person.name}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                    {person.details}
                  </p>

                  {/* Hover Action */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200">
                      View Profile
                    </button>
                  </div>
                </div>

                {/* ID Badge */}
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{person.id}
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {(!data || data.length === 0) && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              No data available. Add your data to display team members.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Query;
