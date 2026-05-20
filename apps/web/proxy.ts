import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySignedSession } from "./lib/session";
import { SESSION_COOKIE_NAME } from "./lib/session-constants";

/** Next.js 16 app convention: `proxy.ts` / `export function proxy` replace deprecated `middleware`. */
export function proxy(request: NextRequest) {
  const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = raw ? verifySignedSession(raw) : null;

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", request.nextUrl.pathname);
    const res = NextResponse.redirect(url);
    if (raw) {
      res.cookies.delete(SESSION_COOKIE_NAME);
    }
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("x-pathname", request.nextUrl.pathname);
  return res;
}

export const config = {
  matcher: ["/console/:path*"],
};
