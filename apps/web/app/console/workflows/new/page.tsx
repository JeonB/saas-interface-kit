import { Alert } from "@repo/ui/alert";
import { PermissionGate } from "../../../../components/permission-gate";
import { NewWorkflowRedirect } from "../new-workflow-redirect";

export default async function NewWorkflowPage() {
  return (
    <div className="ui:mx-auto ui:max-w-[1400px] ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <h1 className="ui:text-2xl ui:font-bold ui:tracking-tight">새 워크플로</h1>
      <p className="ui:mt-2 ui:text-sm ui:text-text-secondary">
        트리거부터 시작해 노드를 연결하고 테스트 실행으로 흐름을 확인하세요.
      </p>

      <PermissionGate
        fallback={
          <Alert className="ui:mt-8" title="권한" variant="info">
            워크플로 생성은 owner 또는 admin 역할에서 가능합니다.
          </Alert>
        }
        permission="workflows:manage"
      >
        <div className="ui:mt-8">
          <NewWorkflowRedirect />
        </div>
      </PermissionGate>
    </div>
  );
}
