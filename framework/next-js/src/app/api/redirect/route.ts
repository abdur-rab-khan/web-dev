import { redirect } from "next/navigation";

// Browser will be redirected to google.com when we hit this api route
export async function GET(request: Request) {
  redirect("https://www.google.com");
}
