"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signSession, type SessionUser } from "../../lib/session";
import { SESSION_COOKIE_NAME, getSessionCookieOptions } from "../../lib/session-constants";
import { sanitizeRedirectPath } from "../../lib/redirect-path";
import { isRole, type Role } from "../../lib/rbac";

const DEMO_ORG_ID = "org_demo";
const DEMO_ORG_NAME = "Northline (데모)";

export type LoginActionState = {
  error?: string;
};

function buildSessionUser(email: string, name: string, role: Role): SessionUser {
  const id = `usr_${Buffer.from(email).toString("base64url").slice(0, 12)}`;
  return {
    id,
    email,
    name,
    role,
    orgId: DEMO_ORG_ID,
    orgName: DEMO_ORG_NAME,
  };
}

export async function loginAction(
  _prev: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const emailRaw = formData.get("email");
  const roleRaw = formData.get("role");
  const fromRaw = formData.get("from");

  const email = typeof emailRaw === "string" ? emailRaw.trim() : "";
  const safeFrom = sanitizeRedirectPath(typeof fromRaw === "string" ? fromRaw : undefined);

  if (!email || !email.includes("@")) {
    return { error: "이메일 형식을 확인하세요." };
  }

  const roleStr = typeof roleRaw === "string" ? roleRaw : "member";
  if (!isRole(roleStr)) {
    return { error: "역할을 다시 선택하세요." };
  }

  const local = email.split("@")[0] ?? "user";
  const name = local.length > 0 ? local : "User";
  const user = buildSessionUser(email, name, roleStr);
  const token = signSession(user);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions());

  redirect(safeFrom);
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/");
}
