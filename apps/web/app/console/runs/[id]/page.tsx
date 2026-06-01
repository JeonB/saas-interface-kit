import { notFound } from "next/navigation";
import { Alert } from "@repo/ui/alert";
import { RunStatusBadge } from "@repo/ui/run-status-badge";
import { StepLogPanel } from "@repo/ui/step-log-panel";
import { PermissionGate } from "../../../../components/permission-gate";
import { getRunData } from "../../../../lib/runs-mock";
import { RunWorkflowGraph } from "../run-workflow-graph";

type RunDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RunDetailPage({ params }: RunDetailPageProps) {
  const { id } = await params;
  const run = await getRunData(id);
  if (!run) {
    notFound();
  }

  return (
    <div className="ui:mx-auto ui:max-w-6xl ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <h1 className="ui:text-2xl ui:font-bold ui:tracking-tight">실행 상세</h1>
      <div className="ui:mt-2 ui:flex ui:items-center ui:gap-3 ui:text-sm ui:text-text-secondary">
        <span>Run ID: {run.id}</span>
        <span>Workflow: {run.workflowId}</span>
        <RunStatusBadge status={run.status} />
      </div>

      <PermissionGate
        fallback={
          <Alert title="권한" variant="info">
            실행 로그 조회는 owner, admin, member, viewer 역할에서 가능합니다.
          </Alert>
        }
        permission="runs:read"
      >
        <div className="ui:mt-8 ui:grid ui:gap-6 lg:ui:grid-cols-2">
          <section className="ui:rounded-ui-lg ui:border ui:border-border-subtle ui:bg-surface-raised ui:p-4">
            <h2 className="ui:text-sm ui:font-semibold ui:text-text-primary">워크플로 그래프</h2>
            <p className="ui:mt-1 ui:text-xs ui:text-text-muted">
              localStorage에 저장된 정의를 기준으로 표시합니다. 완료된 스텝 노드는 강조됩니다.
            </p>
            <RunWorkflowGraph runSteps={run.steps} workflowId={run.workflowId} />
          </section>
          <StepLogPanel steps={run.steps} title="스텝 로그" />
        </div>
      </PermissionGate>
    </div>
  );
}
