import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { Role } from "./rbac";
import { isRole } from "./rbac";
import { SESSION_COOKIE_NAME } from "./session-constants";

export { SESSION_COOKIE_NAME } from "./session-constants";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  orgId: string;
  orgName: string;
};

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

/** Development-only session signing fallback. */
export const FALLBACK_DEV_SESSION_SECRET = "development-only-set-session-secret" as const;

type SignedSessionPayload = SessionUser & {
  exp: number;
  iat: number;
};

function sessionSecret(): string {
  return process.env.SESSION_SECRET ?? FALLBACK_DEV_SESSION_SECRET;
}

export function signSession(user: SessionUser): string {
  const now = Math.floor(Date.now() / 1000);
  const payloadBody: SignedSessionPayload = {
    ...user,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };
  const payload = Buffer.from(JSON.stringify(payloadBody), "utf8").toString("base64url");
  const sig = createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySignedSession(token: string): SessionUser | null {
  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) {
    return null;
  }
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);
  const expected = createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  const sigBuf = Buffer.from(sig, "utf8");
  const expBuf = Buffer.from(expected, "utf8");
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }
  try {
    const json = Buffer.from(payload, "base64url").toString("utf8");
    const parsed: unknown = JSON.parse(json);
    if (!isSignedSessionPayload(parsed)) {
      return null;
    }
    const now = Math.floor(Date.now() / 1000);
    if (parsed.exp <= now) {
      return null;
    }
    return {
      id: parsed.id,
      email: parsed.email,
      name: parsed.name,
      role: parsed.role,
      orgId: parsed.orgId,
      orgName: parsed.orgName,
    };
  } catch {
    return null;
  }
}

function isSignedSessionPayload(value: unknown): value is SignedSessionPayload {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.email === "string" &&
    typeof o.name === "string" &&
    typeof o.orgId === "string" &&
    typeof o.orgName === "string" &&
    typeof o.role === "string" &&
    isRole(o.role) &&
    typeof o.iat === "number" &&
    Number.isFinite(o.iat) &&
    typeof o.exp === "number" &&
    Number.isFinite(o.exp)
  );
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!raw) {
    return null;
  }
  const user = verifySignedSession(raw);
  if (!user) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return null;
  }
  return user;
}
