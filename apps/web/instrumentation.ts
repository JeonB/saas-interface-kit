import { FALLBACK_DEV_SESSION_SECRET } from "./lib/session";

export function register() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const raw = process.env.SESSION_SECRET;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (!trimmed || trimmed === FALLBACK_DEV_SESSION_SECRET) {
    throw new Error(
      "[web] SESSION_SECRET must be set to a strong random value in production (not the development placeholder).",
    );
  }
}
