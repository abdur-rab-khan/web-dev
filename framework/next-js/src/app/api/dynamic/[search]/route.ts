import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: RouteContext<"/api/dynamic/[search]">,
) {
  const { search } = await params;
  const queryString = request.nextUrl.searchParams.get("query");

  const data = {
    search,
    query: queryString,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
