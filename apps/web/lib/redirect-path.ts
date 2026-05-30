const DEFAULT_CONSOLE_PATH = "/console";

export function sanitizeRedirectPath(
  raw: string | null | undefined,
  fallback = DEFAULT_CONSOLE_PATH,
): string {
  if (typeof raw !== "string") {
    return fallback;
  }
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return fallback;
  }
  return trimmed;
}

export function sanitizeConsoleRedirectPath(
  raw: string | null | undefined,
  fallback = DEFAULT_CONSOLE_PATH,
): string {
  const sanitized = sanitizeRedirectPath(raw, fallback);
  if (sanitized === "/console" || sanitized.startsWith("/console/")) {
    return sanitized;
  }
  return fallback;
}

export function buildLoginRedirectUrl(
  raw: string | null | undefined,
  fallback = DEFAULT_CONSOLE_PATH,
): string {
  return `/login?from=${encodeURIComponent(sanitizeConsoleRedirectPath(raw, fallback))}`;
}

type RequestHeaders = Readonly<{ get(name: string): string | null }>;

export function resolveConsoleRequestPathname(
  headers: RequestHeaders,
  fallback = DEFAULT_CONSOLE_PATH,
): string {
  const raw =
    headers.get("x-pathname") ??
    headers.get("next-url")?.replace(/^https?:\/\/[^/]+/, "") ??
    fallback;
  return sanitizeConsoleRedirectPath(raw, fallback);
}

export function buildConsoleLoginRedirectFromHeaders(
  headers: RequestHeaders,
  fallback = DEFAULT_CONSOLE_PATH,
): string {
  return buildLoginRedirectUrl(resolveConsoleRequestPathname(headers, fallback));
}
