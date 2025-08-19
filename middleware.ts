import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;
  const publicPaths = ["/login", "/api/login", "/api/logout", "/_next", "/favicon.ico"];
  if (publicPaths.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}