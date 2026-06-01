import type { AutomationNodeType, WorkflowDefinition, WorkflowNode, WorkflowNodeData } from "./types";
import { summarizeNodeData } from "./types";

export type WorkflowFlowNode = {
  id: string;
  type: AutomationNodeType;
  position: { x: number; y: number };
  data: WorkflowNodeData;
};

export type WorkflowFlowEdge = {
  id: string;
  source: string;
  target: string;
};

export function definitionToXYFlow(definition: WorkflowDefinition): {
  nodes: WorkflowFlowNode[];
  edges: WorkflowFlowEdge[];
} {
  const nodes: WorkflowFlowNode[] = definition.nodes.map((n: WorkflowNode) => ({
    id: n.id,
    type: n.type,
    position: n.position,
    data: {
      ...n.data,
      summary: n.data.summary ?? summarizeNodeData(n.type, n.data),
    },
  }));
  const edges: WorkflowFlowEdge[] = definition.edges.map((e: WorkflowDefinition["edges"][number]) => ({
    id: e.id,
    source: e.source,
    target: e.target,
  }));
  return { nodes, edges };
}

export function xyFlowToDefinition(
  nodes: WorkflowFlowNode[],
  edges: WorkflowFlowEdge[],
): WorkflowDefinition {
  return {
    version: 1,
    nodes: nodes.map(
      (n): WorkflowNode => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: stripRunStatus(n.data),
      }),
    ),
    edges: edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
    })),
  };
}

function stripRunStatus(data: WorkflowNodeData): WorkflowNodeData {
  const { runStatus: _runStatus, ...rest } = data;
  return rest;
}
