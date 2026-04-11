import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "./lib/session-constants";

/** Next.js 16 app convention: `proxy.ts` / `export function proxy` replace deprecated `middleware`. */
export function proxy(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME);
  if (!session?.value) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
