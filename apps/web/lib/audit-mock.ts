import { unstable_cache } from "next/cache";
import type { AuditEventAction, AuditEventDto, AuditEventsPage } from "@repo/api-client";
import { AUDIT_ACTIONS } from "./audit-actions";
import { requireConsoleApiClient } from "./console-api";
import {
  CONSOLE_DATA_CACHE_TAG,
  CONSOLE_DATA_REVALIDATE_SECONDS,
  getConsoleData,
} from "./console-data";

export type AuditSearchParams = {
  actor?: string;
  action?: AuditEventAction;
  from?: string;
  to?: string;
  page?: number;
  size?: number;
};

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

/** Shared by the data accessor below and the mock API route handlers (single source). */
export const MOCK_AUDIT_EVENTS: AuditEventDto[] = Array.from({ length: 72 }, (_, idx) => {
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

/** Pure filter/pagination over the mock events; reused by the mock API route handler. */
export function filterMockAuditEvents(params: AuditSearchParams): AuditEventsPage {
  const page = normalizePositiveInt(params.page, 1);
  const size = normalizePositiveInt(params.size, 20);
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

const fetchCachedAuditEvents = unstable_cache(
  // Arguments are part of the cache key, so each filter combination is cached separately.
  async (params: AuditSearchParams) => requireConsoleApiClient().getAuditEvents(params),
  ["console-audit-events"],
  { revalidate: CONSOLE_DATA_REVALIDATE_SECONDS, tags: [CONSOLE_DATA_CACHE_TAG] },
);

export async function getAuditEventsData(params: AuditSearchParams): Promise<AuditEventsPage> {
  const normalized: AuditSearchParams = {
    actor: params.actor,
    action: params.action,
    from: params.from,
    to: params.to,
    page: normalizePositiveInt(params.page, 1),
    size: normalizePositiveInt(params.size, 20),
  };

  return getConsoleData({
    fetchCached: () => fetchCachedAuditEvents(normalized),
    fetchLive: (client) => client.getAuditEvents(normalized),
    mockFallback: () => filterMockAuditEvents(normalized),
  });
}
