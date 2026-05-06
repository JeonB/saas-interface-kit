export type Role = "owner" | "admin" | "member" | "viewer";

export type Permission =
  | "integrations:read"
  | "integrations:manage"
  | "workflows:read"
  | "workflows:manage"
  | "runs:read"
  | "billing:read"
  | "billing:manage"
  | "members:read"
  | "members:manage"
  | "org:settings"
  | "audit:read";

const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  owner: [
    "integrations:read",
    "integrations:manage",
    "workflows:read",
    "workflows:manage",
    "runs:read",
    "billing:read",
    "billing:manage",
    "members:read",
    "members:manage",
    "org:settings",
    "audit:read",
  ],
  admin: [
    "integrations:read",
    "integrations:manage",
    "workflows:read",
    "workflows:manage",
    "runs:read",
    "billing:read",
    "billing:manage",
    "members:read",
    "members:manage",
    "org:settings",
    "audit:read",
  ],
  member: ["integrations:read", "workflows:read", "runs:read", "billing:read", "members:read", "org:settings"],
  viewer: ["integrations:read", "workflows:read", "runs:read", "billing:read", "members:read"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function isRole(value: string): value is Role {
  return value === "owner" || value === "admin" || value === "member" || value === "viewer";
}
