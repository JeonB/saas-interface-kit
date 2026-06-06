import { isAuditAction } from "../../../../../../lib/audit-actions";
import { type AuditSearchParams, filterMockAuditEvents } from "../../../../../../lib/audit-mock";
import { applyMockApiSimulation, MOCK_API_NO_STORE, mockApiJson } from "../../../../../../lib/mock-api";

function parsePositiveInt(raw: string | null): number | undefined {
  if (!raw) {
    return undefined;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : undefined;
}

export async function GET(request: Request) {
  const simulated = await applyMockApiSimulation(request.headers);
  if (simulated) {
    return simulated;
  }
  const search = new URL(request.url).searchParams;
  const actionRaw = search.get("action");
  const params: AuditSearchParams = {
    actor: search.get("actor") ?? undefined,
    action: actionRaw && isAuditAction(actionRaw) ? actionRaw : undefined,
    from: search.get("from") ?? undefined,
    to: search.get("to") ?? undefined,
    page: parsePositiveInt(search.get("page")),
    size: parsePositiveInt(search.get("size")),
  };
  return mockApiJson(filterMockAuditEvents(params), { cacheControl: MOCK_API_NO_STORE });
}
