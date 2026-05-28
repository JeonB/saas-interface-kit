import { buildLoginRedirectUrl, sanitizeConsoleRedirectPath } from "./redirect-path";

export function resolveUnauthenticatedRedirect(pathname: string): string {
  return buildLoginRedirectUrl(pathname);
}

export function resolveAuthenticatedLoginRedirect(fromParam: string | null): string {
  return sanitizeConsoleRedirectPath(fromParam ?? undefined);
}
