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
