import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  FALLBACK_DEV_SESSION_SECRET,
  signSession,
  verifySignedSession,
  type SessionUser,
} from "./session";

const demoUser: SessionUser = {
  id: "usr_demo",
  email: "demo@example.com",
  name: "demo",
  role: "member",
  orgId: "org_demo",
  orgName: "Northline (데모)",
};

describe("session", () => {
  it("signSession and verifySignedSession round-trip", () => {
    const token = signSession(demoUser);
    expect(verifySignedSession(token)).toEqual(demoUser);
  });

  it("returns null for tampered tokens", () => {
    const token = signSession(demoUser);
    expect(verifySignedSession(`${token}x`)).toBeNull();
    expect(verifySignedSession("not-a-valid-token")).toBeNull();
  });

  it("returns null for expired tokens", () => {
    const now = Math.floor(Date.now() / 1000);
    const payloadBody = {
      ...demoUser,
      iat: now - 3600,
      exp: now - 1,
    };
    const payload = Buffer.from(JSON.stringify(payloadBody), "utf8").toString("base64url");
    const sig = createHmac("sha256", FALLBACK_DEV_SESSION_SECRET).update(payload).digest("base64url");
    const expiredToken = `${payload}.${sig}`;

    expect(verifySignedSession(expiredToken)).toBeNull();
  });
});
