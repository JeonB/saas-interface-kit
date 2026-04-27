/** Organization role used in API DTOs (aligns with product RBAC). */
export type OrgRole = "owner" | "admin" | "member" | "viewer";

export type OrganizationSummary = {
  id: string;
  name: string;
  slug: string;
};

export type MemberSummary = {
  id: string;
  email: string;
  name: string;
  role: OrgRole;
};

export type UsageSummaryDto = {
  mrrUsd: number;
  activeSeats: number;
  churnRate: number;
  nps: number;
};

export type AuditEventAction =
  | "member.invited"
  | "member.removed"
  | "role.changed"
  | "billing.payment_method_added"
  | "api_key.created"
  | "api_key.revoked";

export type AuditActor = {
  id: string;
  email: string;
  name: string;
};

export type AuditTarget = {
  type: string;
  id: string;
  label?: string;
};

export type AuditEventDto = {
  id: string;
  occurredAt: string;
  actor: AuditActor;
  action: AuditEventAction;
  target?: AuditTarget;
  ip?: string;
};

export type AuditEventsPage = {
  items: AuditEventDto[];
  total: number;
  page: number;
  size: number;
};
