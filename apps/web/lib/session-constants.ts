export const SESSION_COOKIE_NAME = "nl_session";

export const SESSION_COOKIE_PATH = "/";

export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: SESSION_COOKIE_PATH,
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function getSessionCookieDeleteOptions() {
  return {
    name: SESSION_COOKIE_NAME,
    path: SESSION_COOKIE_PATH,
  };
}
