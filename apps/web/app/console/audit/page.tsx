import { Alert } from "@repo/ui/alert";
import { Skeleton } from "@repo/ui/skeleton";
import { Suspense } from "react";
import { PermissionGate } from "../../../components/permission-gate";
import { AuditEvents, type AuditQueryState } from "./audit-events";

type AuditPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ALLOWED_ACTIONS = new Set([
  "member.invited",
  "member.removed",
  "role.changed",
  "billing.payment_method_added",
  "api_key.created",
  "api_key.revoked",
] as const);

function parseString(raw: string | string[] | undefined): string | undefined {
  if (typeof raw === "string" && raw.trim().length > 0) {
    return raw.trim();
  }
  return undefined;
}

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  if (!raw) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function toAuditQueryState(params: Record<string, string | string[] | undefined>): AuditQueryState {
  const actionRaw = parseString(params.action);
  const action = actionRaw && ALLOWED_ACTIONS.has(actionRaw as (typeof ALLOWED_ACTIONS extends Set<infer T> ? T : never))
    ? (actionRaw as AuditQueryState["action"])
    : undefined;

  return {
    actor: parseString(params.actor),
    action,
    from: parseString(params.from),
    to: parseString(params.to),
    page: parsePositiveInt(parseString(params.page), 1),
    size: parsePositiveInt(parseString(params.size), 20),
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
