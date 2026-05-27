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

export function buildLoginRedirectUrl(
  raw: string | null | undefined,
  fallback = DEFAULT_CONSOLE_PATH,
): string {
  return `/login?from=${encodeURIComponent(sanitizeRedirectPath(raw, fallback))}`;
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
  return sanitizeRedirectPath(raw, fallback);
}
