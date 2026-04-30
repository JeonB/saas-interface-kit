import { Alert } from "@repo/ui/alert";
import { ConnectorCard } from "@repo/ui/connector-card";
import { FilterBar, FilterChip } from "@repo/ui/filter-bar";
import { PermissionGate } from "../../../components/permission-gate";
import { getIntegrationsData } from "../../../lib/integrations-mock";

export default async function IntegrationsPage() {
  const integrations = await getIntegrationsData();

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
          <FilterBar>
            <FilterChip active>전체</FilterChip>
            <FilterChip>연결됨</FilterChip>
            <FilterChip>오류</FilterChip>
            <FilterChip>미연결</FilterChip>
          </FilterBar>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
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
        </div>
      </PermissionGate>
    </div>
  );
}
