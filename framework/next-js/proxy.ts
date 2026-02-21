import { NextRequest, NextResponse, ProxyConfig } from "next/server";

export function proxy(request: NextRequest) {
  console.log("Proxying request: ", request.url);
  return NextResponse.redirect(new URL("", request.url));
}

// export const config: ProxyConfig = {
//   matcher: "",
// };
