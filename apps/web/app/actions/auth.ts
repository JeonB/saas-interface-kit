"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signSession, type SessionUser } from "../../lib/session";
import { SESSION_COOKIE_NAME } from "../../lib/session-constants";
import { isRole, type Role } from "../../lib/rbac";

const DEMO_ORG_ID = "org_demo";
const DEMO_ORG_NAME = "Northline (데모)";

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

export async function loginAction(formData: FormData): Promise<void> {
  const emailRaw = formData.get("email");
  const roleRaw = formData.get("role");
  const fromRaw = formData.get("from");

  const email = typeof emailRaw === "string" ? emailRaw.trim() : "";
  const from = typeof fromRaw === "string" ? fromRaw : "/console";
  const safeFrom = from.startsWith("/") && !from.startsWith("//") ? from : "/console";

  if (!email || !email.includes("@")) {
    redirect(`/login?error=invalid&from=${encodeURIComponent(safeFrom)}`);
  }

  const roleStr = typeof roleRaw === "string" ? roleRaw : "member";
  if (!isRole(roleStr)) {
    redirect(`/login?error=invalid&from=${encodeURIComponent(safeFrom)}`);
  }

  const local = email.split("@")[0] ?? "user";
  const name = local.length > 0 ? local : "User";
  const user = buildSessionUser(email, name, roleStr);
  const token = signSession(user);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(safeFrom);
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/");
}
