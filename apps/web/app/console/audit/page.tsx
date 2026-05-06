import { Alert } from "@repo/ui/alert";
import { Skeleton } from "@repo/ui/skeleton";
import { Suspense } from "react";
import { PermissionGate } from "../../../components/permission-gate";
import { isAuditAction } from "../../../lib/audit-actions";
import { parsePositiveInt, parseString } from "../../../lib/search-params";
import { AuditEvents, type AuditQueryState } from "./audit-events";

type AuditPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function toAuditQueryState(params: Record<string, string | string[] | undefined>): AuditQueryState {
  const actionRaw = parseString(params.action);
  const action = actionRaw && isAuditAction(actionRaw) ? actionRaw : undefined;

  return {
    actor: parseString(params.actor),
    action,
    from: parseString(params.from),
    to: parseString(params.to),
    page: parsePositiveInt(params.page, 1),
    size: parsePositiveInt(params.size, 20),
  };
}

function AuditEventsFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-8 w-40" />
    </div>
  );
}

export default async function AuditPage({ searchParams }: AuditPageProps) {
  const query = toAuditQueryState(await searchParams);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight">감사 로그</h1>
      <p className="mt-2 text-sm text-neutral-400">
        운영 이벤트를 URL 상태 기반 필터로 조회합니다. API가 설정되면 서버 데이터를, 아니면 템플릿 목 데이터를 사용합니다.
      </p>
      <div className="mt-8">
        <PermissionGate
          fallback={
            <Alert title="권한" variant="info">
              감사 로그 조회는 owner 또는 admin 역할이 필요합니다.
            </Alert>
          }
          permission="audit:read"
        >
          <Suspense fallback={<AuditEventsFallback />}>
            <AuditEvents query={query} />
          </Suspense>
        </PermissionGate>
      </div>
    </div>
  );
}
