import type { Integration } from "@repo/api-client";
import { Alert } from "@repo/ui/alert";
import { ConnectorCard } from "@repo/ui/connector-card";
import { EmptyState } from "@repo/ui/empty-state";
import { PermissionGate } from "../../../components/permission-gate";
import { getIntegrationsData } from "../../../lib/integrations-mock";
import { IntegrationsFilters, type IntegrationFilterStatus } from "./integrations-filters";

type IntegrationsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parseString(raw: string | string[] | undefined): string | undefined {
  if (typeof raw !== "string") {
    return undefined;
  }
  const normalized = raw.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function parseStatus(raw: string | undefined): IntegrationFilterStatus {
  switch (raw) {
    case "connected":
    case "error":
    case "disconnected":
      return raw;
    default:
      return "all";
  }
}

function applyFilters(
  integrations: Integration[],
  status: IntegrationFilterStatus,
  query: string,
): Integration[] {
  const loweredQuery = query.toLowerCase();
  return integrations.filter((integration) => {
    const statusMatched = status === "all" ? true : integration.status === status;
    if (!statusMatched) {
      return false;
    }
    if (loweredQuery.length === 0) {
      return true;
    }
    const searchable = `${integration.name} ${integration.vendor}`.toLowerCase();
    return searchable.includes(loweredQuery);
  });
}

export default async function IntegrationsPage({ searchParams }: IntegrationsPageProps) {
  const params = await searchParams;
  const status = parseStatus(parseString(params.status));
  const query = parseString(params.q) ?? "";
  const integrations = await getIntegrationsData();
  const filtered = applyFilters(integrations, status, query);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight">통합</h1>
      <p className="mt-2 text-sm text-neutral-400">
        외부 서비스 연동 상태를 확인하고 재연결/점검할 수 있습니다.
      </p>

      <PermissionGate
        fallback={
          <Alert title="권한" variant="info">
            통합 목록 조회는 owner, admin, member, viewer 역할에서 가능합니다.
          </Alert>
        }
        permission="integrations:read"
      >
        <div className="mt-6 space-y-6">
          <IntegrationsFilters query={query} status={status} />

          {filtered.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((integration) => (
                <ConnectorCard
                  key={integration.id}
                  description={integration.description}
                  lastSyncAt={integration.lastSyncAt}
                  name={integration.name}
                  status={integration.status}
                  vendor={integration.vendor}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              description="조건에 맞는 통합이 없습니다. 상태를 변경하거나 검색어를 지워 다시 시도해 보세요."
              title="조회 결과 없음"
            />
          )}
        </div>
      </PermissionGate>
    </div>
  );
}
