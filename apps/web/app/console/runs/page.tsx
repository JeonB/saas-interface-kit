import type { Run } from "@repo/api-client";
import { Alert } from "@repo/ui/alert";
import { PermissionGate } from "../../../components/permission-gate";
import { getRunsData } from "../../../lib/runs-mock";
import { RunsFilters, type RunsFilterStatus } from "./runs-filters";
import { RunsTable } from "./runs-table";

type RunsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parseString(raw: string | string[] | undefined): string | undefined {
  if (typeof raw !== "string") {
    return undefined;
  }
  const normalized = raw.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function parseStatus(raw: string | undefined): RunsFilterStatus {
  switch (raw) {
    case "queued":
    case "running":
    case "succeeded":
    case "failed":
    case "cancelled":
      return raw;
    default:
      return "all";
  }
}

function applyRunsFilters(runs: Run[], q: string, status: RunsFilterStatus): Run[] {
  const lowered = q.toLowerCase();
  return runs.filter((run) => {
    const okStatus = status === "all" || run.status === status;
    if (!okStatus) {
      return false;
    }
    if (lowered.length === 0) {
      return true;
    }
    return run.id.toLowerCase().includes(lowered) || run.workflowId.toLowerCase().includes(lowered);
  });
}

export default async function RunsPage({ searchParams }: RunsPageProps) {
  const params = await searchParams;
  const query = parseString(params.q) ?? "";
  const status = parseStatus(parseString(params.status));
  const runs = await getRunsData();
  const filtered = applyRunsFilters(runs, query, status);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight">실행 기록</h1>
      <p className="mt-2 text-sm text-neutral-400">
        최근 실행 이력을 상태와 워크플로 기준으로 필터링한 뒤, 상세 페이지에서 스텝 로그를 확인할 수 있습니다.
      </p>

      <PermissionGate
        fallback={
          <Alert title="권한" variant="info">
            실행 로그 조회는 권한이 있는 역할에서만 접근할 수 있습니다.
          </Alert>
        }
        permission="runs:read"
      >
        <div className="mt-8 space-y-6">
          <RunsFilters query={query} status={status} />
          <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
            <RunsTable runs={filtered} />
          </div>
        </div>
      </PermissionGate>
    </div>
  );
}
