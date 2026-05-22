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
