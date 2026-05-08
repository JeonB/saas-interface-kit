import { Alert } from "@repo/ui/alert";
import { PermissionGate } from "../../../components/permission-gate";
import { getWorkflowsData } from "../../../lib/workflows-mock";
import { WorkflowsTable } from "./workflows-table";

export default async function WorkflowsPage() {
  const workflows = await getWorkflowsData();

  return (
    <div className="ui:mx-auto ui:max-w-5xl ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <h1 className="ui:text-2xl ui:font-bold ui:tracking-tight">워크플로</h1>
      <p className="ui:mt-2 ui:text-sm ui:text-text-secondary">
        배포된 자동화 흐름의 상태와 마지막 실행 결과를 확인합니다.
      </p>

      <PermissionGate
        fallback={
          <Alert title="권한" variant="info">
            워크플로 조회는 owner, admin, member, viewer 역할에서 가능합니다.
          </Alert>
        }
        permission="workflows:read"
      >
        <div className="ui:mt-8 ui:overflow-x-auto ui:rounded-ui-lg ui:border ui:border-border-subtle ui:bg-surface-raised ui:p-4">
          <WorkflowsTable workflows={workflows} />
        </div>
      </PermissionGate>
    </div>
  );
}
