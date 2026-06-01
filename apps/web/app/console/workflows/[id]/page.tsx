import { Alert } from "@repo/ui/alert";
import { PermissionGate } from "../../../../components/permission-gate";
import { hasPermission } from "../../../../lib/rbac";
import { getSession } from "../../../../lib/session";
import { WorkflowEditorClient } from "../workflow-editor-client";

type WorkflowEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorkflowEditPage({ params }: WorkflowEditPageProps) {
  const { id } = await params;
  const session = await getSession();
  const canManage = session ? hasPermission(session.role, "workflows:manage") : false;

  return (
    <div className="ui:mx-auto ui:max-w-[1400px] ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <h1 className="ui:text-2xl ui:font-bold ui:tracking-tight">워크플로 편집</h1>
      <p className="ui:mt-2 ui:text-sm ui:text-text-secondary">
        노드를 배치·연결하고 설정 패널에서 세부 값을 조정한 뒤 테스트 실행으로 확인합니다.
      </p>

      <PermissionGate
        fallback={
          <Alert className="ui:mt-8" title="권한" variant="info">
            워크플로 조회는 member 이상, 편집은 owner 또는 admin 역할에서 가능합니다.
          </Alert>
        }
        permission="workflows:read"
      >
        <div className="ui:mt-8">
          <WorkflowEditorClient canManage={canManage} workflowId={id} />
        </div>
      </PermissionGate>
    </div>
  );
}
