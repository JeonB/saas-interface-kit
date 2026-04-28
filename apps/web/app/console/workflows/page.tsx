import { Alert } from "@repo/ui/alert";
import { PermissionGate } from "../../../components/permission-gate";
import { getWorkflowsData } from "../../../lib/workflows-mock";
import { WorkflowsTable } from "./workflows-table";

export default async function WorkflowsPage() {
  const workflows = await getWorkflowsData();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight">워크플로</h1>
      <p className="mt-2 text-sm text-neutral-400">배포된 자동화 흐름의 상태와 마지막 실행 결과를 확인합니다.</p>

      <PermissionGate
        fallback={
          <Alert title="권한" variant="info">
            워크플로 조회는 owner 또는 admin 역할이 필요합니다.
          </Alert>
        }
        permission="workflows:read"
      >
        <div className="mt-8 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <WorkflowsTable workflows={workflows} />
        </div>
      </PermissionGate>
    </div>
  );
}
