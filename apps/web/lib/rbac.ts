export type Role = "owner" | "admin" | "member" | "viewer";

export type Permission =
  | "billing:read"
  | "billing:manage"
  | "members:read"
  | "members:manage"
  | "org:settings"
  | "audit:read";

const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  owner: [
    "billing:read",
    "billing:manage",
    "members:read",
    "members:manage",
    "org:settings",
    "audit:read",
  ],
  admin: [
    "billing:read",
    "billing:manage",
    "members:read",
    "members:manage",
    "org:settings",
    "audit:read",
  ],
  member: ["billing:read", "members:read", "org:settings"],
  viewer: ["billing:read", "members:read"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function requirePermission(role: Role, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Forbidden: missing permission "${permission}"`);
  }
}

export function isRole(value: string): value is Role {
  return value === "owner" || value === "admin" || value === "member" || value === "viewer";
}
