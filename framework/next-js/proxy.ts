import { NextRequest, NextResponse, ProxyConfig } from "next/server";

export default function proxy(request: NextRequest) {
  console.log("Proxying request: ", request.url);
  return NextResponse.redirect("/");
}

export const config: ProxyConfig = {
  matcher: "/meta/:path*",
};
