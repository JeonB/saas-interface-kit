import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  resolveAuthenticatedLoginRedirect,
  resolveUnauthenticatedRedirect,
} from "./lib/proxy-auth";
import { verifySignedSession } from "./lib/session";
import { SESSION_COOKIE_NAME } from "./lib/session-constants";

/** Next.js 16 app convention: `proxy.ts` / `export function proxy` replace deprecated `middleware`. */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = raw ? verifySignedSession(raw) : null;

  if (pathname === "/login") {
    if (user) {
      const from = request.nextUrl.searchParams.get("from");
      return NextResponse.redirect(
        new URL(resolveAuthenticatedLoginRedirect(from), request.url),
      );
    }
    return NextResponse.next();
  }

  if (!user) {
    const res = NextResponse.redirect(
      new URL(resolveUnauthenticatedRedirect(pathname), request.url),
    );
    if (raw) {
      res.cookies.delete(SESSION_COOKIE_NAME);
    }
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("x-pathname", pathname);
  return res;
}

export const config = {
  matcher: ["/console/:path*", "/login"],
};
