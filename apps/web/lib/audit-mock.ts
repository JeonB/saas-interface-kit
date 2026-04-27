import type { AuditEventAction, AuditEventDto, AuditEventsPage } from "@repo/api-client";
import { getConsoleApiClient } from "./console-api";

export type AuditSearchParams = {
  actor?: string;
  action?: AuditEventAction;
  from?: string;
  to?: string;
  page?: number;
  size?: number;
};

const AUDIT_ACTIONS: AuditEventAction[] = [
  "member.invited",
  "member.removed",
  "role.changed",
  "billing.payment_method_added",
  "api_key.created",
  "api_key.revoked",
];

const MOCK_ACTORS = [
  { id: "usr_owner", name: "김오너", email: "owner@example.com" },
  { id: "usr_admin", name: "이관리", email: "admin@example.com" },
  { id: "usr_ops", name: "박옵스", email: "ops@example.com" },
  { id: "usr_security", name: "최보안", email: "security@example.com" },
];

function pickActor(index: number): (typeof MOCK_ACTORS)[number] {
  return MOCK_ACTORS[index % MOCK_ACTORS.length] as (typeof MOCK_ACTORS)[number];
}

function pickAction(index: number): AuditEventAction {
  return AUDIT_ACTIONS[index % AUDIT_ACTIONS.length] as AuditEventAction;
}

const MOCK_AUDIT_EVENTS: AuditEventDto[] = Array.from({ length: 72 }, (_, idx) => {
  const actor = pickActor(idx);
  const action = pickAction(idx);
  const dayOffset = idx % 28;
  const hourOffset = (idx * 3) % 24;
  const occurredAt = new Date(Date.UTC(2026, 3, 1 + dayOffset, hourOffset, 15, 0)).toISOString();
  return {
    id: `evt_${String(idx + 1).padStart(4, "0")}`,
    occurredAt,
    actor,
    action,
    target: {
      type: action.startsWith("member") || action === "role.changed" ? "member" : "integration",
      id: `target_${(idx % 12) + 1}`,
      label: `Target ${(idx % 12) + 1}`,
    },
    ip: `10.0.${(idx % 7) + 1}.${(idx % 220) + 10}`,
  };
});

function normalizePositiveInt(raw: number | undefined, fallback: number): number {
  if (typeof raw !== "number" || !Number.isFinite(raw) || raw < 1) {
    return fallback;
  }
  return Math.floor(raw);
}

export async function getAuditEventsData(params: AuditSearchParams): Promise<AuditEventsPage> {
  const page = normalizePositiveInt(params.page, 1);
  const size = normalizePositiveInt(params.size, 20);
  const client = getConsoleApiClient();

  if (client) {
    return client.getAuditEvents({
      actor: params.actor,
      action: params.action,
      from: params.from,
      to: params.to,
      page,
      size,
    });
  }

  const actorFilter = params.actor?.trim().toLowerCase();
  const fromDate = params.from ? new Date(`${params.from}T00:00:00.000Z`) : null;
  const toDate = params.to ? new Date(`${params.to}T23:59:59.999Z`) : null;

  const filtered = MOCK_AUDIT_EVENTS.filter((event) => {
    if (params.action && event.action !== params.action) {
      return false;
    }
    if (actorFilter) {
      const actorBlob = `${event.actor.name} ${event.actor.email}`.toLowerCase();
      if (!actorBlob.includes(actorFilter)) {
        return false;
      }
    }
    const occurredAt = new Date(event.occurredAt);
    if (fromDate && occurredAt < fromDate) {
      return false;
    }
    if (toDate && occurredAt > toDate) {
      return false;
    }
    return true;
  });

  const start = (page - 1) * size;
  const items = filtered.slice(start, start + size);
  return {
    items,
    total: filtered.length,
    page,
    size,
  };
}
