import type { ReactNode } from "react";
import { getSession } from "../lib/session";
import type { Permission } from "../lib/rbac";
import { hasPermission } from "../lib/rbac";

type PermissionGateProps = {
  permission: Permission;
  children: ReactNode;
  fallback: ReactNode;
};

export async function PermissionGate({ permission, children, fallback }: PermissionGateProps) {
  const session = await getSession();
  if (!session || !hasPermission(session.role, permission)) {
    return fallback;
  }
  return children;
}
