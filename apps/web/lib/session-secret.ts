/** Development-only session signing fallback. */
export const FALLBACK_DEV_SESSION_SECRET = "development-only-set-session-secret" as const;

/** 32 characters ≈ 256 bits for hex/base64 secrets, matching the HMAC-SHA256 key size. */
export const MIN_SESSION_SECRET_LENGTH = 32;

/** Key used for HMAC signing. Blank values fall back to the dev placeholder instead of an empty key. */
export function resolveSessionSecret(raw: string | undefined): string {
  const trimmed = raw?.trim() ?? "";
  return trimmed === "" ? FALLBACK_DEV_SESSION_SECRET : trimmed;
}

/** Returns why `raw` is unfit for production, or `null` when it is acceptable. */
export function getProductionSessionSecretProblem(raw: string | undefined): string | null {
  const trimmed = raw?.trim() ?? "";
  if (trimmed === "") {
    return "SESSION_SECRET is not set";
  }
  if (trimmed === FALLBACK_DEV_SESSION_SECRET) {
    return "SESSION_SECRET is the development placeholder";
  }
  if (trimmed.length < MIN_SESSION_SECRET_LENGTH) {
    return `SESSION_SECRET must be at least ${MIN_SESSION_SECRET_LENGTH} characters`;
  }
  return null;
}
