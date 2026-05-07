import type { Run, RunStatus } from "@repo/api-client";
import { Alert } from "@repo/ui/alert";
import { PermissionGate } from "../../../components/permission-gate";
import { getRunsData } from "../../../lib/runs-mock";
import { parseString, parseStringOneOf } from "../../../lib/search-params";
import { RunsFilters, type RunsFilterStatus } from "./runs-filters";
import { RunsTable } from "./runs-table";

type RunsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const RUN_STATUS_VALUES: readonly RunStatus[] = [
  "queued",
  "running",
  "succeeded",
  "failed",
  "cancelled",
];

function parseStatus(raw: string | string[] | undefined): RunsFilterStatus {
  return parseStringOneOf(raw, RUN_STATUS_VALUES) ?? "all";
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
  const status = parseStatus(params.status);
  const runs = await getRunsData();
  const filtered = applyRunsFilters(runs, query, status);

  return (
    <div className="ui:mx-auto ui:max-w-6xl ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <h1 className="ui:text-2xl ui:font-bold ui:tracking-tight">실행 기록</h1>
      <p className="ui:mt-2 ui:text-sm ui:text-text-secondary">
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
        <div className="ui:mt-8 ui:space-y-6">
          <RunsFilters query={query} status={status} />
          <div className="ui:overflow-x-auto ui:rounded-ui-lg ui:border ui:border-border-subtle ui:bg-surface-raised ui:p-4">
            <RunsTable runs={filtered} />
          </div>
        </div>
      </PermissionGate>
    </div>
  );
}
