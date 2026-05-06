import type { AuditEventAction } from "@repo/api-client";

/**
 * Single source of truth for the audit event actions surfaced in the console
 * filters and demo data. Keeps the dropdown, chip bar, and mock generator
 * in sync.
 */
export const AUDIT_ACTIONS: readonly AuditEventAction[] = [
  "member.invited",
  "member.removed",
  "role.changed",
  "billing.payment_method_added",
  "api_key.created",
  "api_key.revoked",
];

const AUDIT_ACTION_SET: ReadonlySet<AuditEventAction> = new Set(AUDIT_ACTIONS);

export function isAuditAction(value: string): value is AuditEventAction {
  return AUDIT_ACTION_SET.has(value as AuditEventAction);
}
