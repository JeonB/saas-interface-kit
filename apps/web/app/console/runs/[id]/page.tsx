import { notFound } from "next/navigation";
import type { FlowCanvasEdge, FlowCanvasNode } from "@repo/ui/flow-canvas";
import { Alert } from "@repo/ui/alert";
import { FlowCanvas } from "@repo/ui/flow-canvas";
import { RunStatusBadge } from "@repo/ui/run-status-badge";
import { StepLogPanel } from "@repo/ui/step-log-panel";
import { PermissionGate } from "../../../../components/permission-gate";
import { getRunData } from "../../../../lib/runs-mock";

type RunDetailPageProps = {
  params: Promise<{ id: string }>;
};

function buildFlow(runId: string): { nodes: FlowCanvasNode[]; edges: FlowCanvasEdge[] } {
  const nodes: FlowCanvasNode[] = [
    { id: `${runId}-trigger`, position: { x: 0, y: 0 }, data: { label: "Trigger" }, type: "input" },
    { id: `${runId}-transform`, position: { x: 240, y: 0 }, data: { label: "Transform" } },
    { id: `${runId}-target`, position: { x: 480, y: 0 }, data: { label: "Target API" }, type: "output" },
  ];
  const edges: FlowCanvasEdge[] = [
    { id: `${runId}-e1`, source: `${runId}-trigger`, target: `${runId}-transform` },
    { id: `${runId}-e2`, source: `${runId}-transform`, target: `${runId}-target` },
  ];
  return { nodes, edges };
}

export default async function RunDetailPage({ params }: RunDetailPageProps) {
  const { id } = await params;
  const run = await getRunData(id);
  if (!run) {
    notFound();
  }
  const flow = buildFlow(id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight">실행 상세</h1>
      <div className="mt-2 flex items-center gap-3 text-sm text-neutral-400">
        <span>Run ID: {run.id}</span>
        <RunStatusBadge status={run.status} />
      </div>

      <PermissionGate
        fallback={
          <Alert title="권한" variant="info">
            실행 로그 조회는 owner 또는 admin 역할이 필요합니다.
          </Alert>
        }
        permission="runs:read"
      >
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
            <h2 className="text-sm font-semibold text-white">워크플로 그래프 (읽기 전용)</h2>
            <FlowCanvas ariaLabel="실행 그래프" className="mt-4" edges={flow.edges} nodes={flow.nodes} readOnly />
          </section>
          <StepLogPanel steps={run.steps} title="스텝 로그" />
        </div>
      </PermissionGate>
    </div>
  );
}
