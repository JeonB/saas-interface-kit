import type { RunStep } from "@repo/ui/step-log-panel";
import type { WorkflowDefinition, WorkflowNode, NodeRunStatus } from "./types";
import { defaultLabel, summarizeNodeData } from "./types";

export type ExecuteWorkflowResult = {
  steps: RunStep[];
  nodeStatuses: Record<string, NodeRunStatus>;
  warnings: string[];
};

type ExecutionContext = Record<string, unknown>;

export function topologicalOrder(definition: WorkflowDefinition): {
  ordered: WorkflowNode[];
  warnings: string[];
} {
  const warnings: string[] = [];
  const nodeMap = new Map(definition.nodes.map((n) => [n.id, n]));
  const inDegree = new Map<string, number>();
  const adjacency = new Map<string, string[]>();

  for (const node of definition.nodes) {
    inDegree.set(node.id, 0);
    adjacency.set(node.id, []);
  }

  for (const edge of definition.edges) {
    if (!nodeMap.has(edge.source) || !nodeMap.has(edge.target)) {
      warnings.push(`Invalid edge ${edge.id}: missing node`);
      continue;
    }
    adjacency.get(edge.source)?.push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1);
  }

  const triggers = definition.nodes.filter((n: WorkflowNode) => n.type === "trigger");
  const queue: string[] = [];

  if (triggers.length === 0) {
    warnings.push("No trigger node found; executing nodes with no incoming edges.");
    for (const [id, deg] of inDegree) {
      if (deg === 0) queue.push(id);
    }
  } else {
    for (const t of triggers) {
      if ((inDegree.get(t.id) ?? 0) === 0) queue.push(t.id);
    }
  }

  const ordered: WorkflowNode[] = [];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const id = queue.shift();
    if (!id || visited.has(id)) continue;
    visited.add(id);
    const node = nodeMap.get(id);
    if (node) ordered.push(node);

    for (const next of adjacency.get(id) ?? []) {
      const deg = (inDegree.get(next) ?? 1) - 1;
      inDegree.set(next, deg);
      if (deg === 0) queue.push(next);
    }
  }

  const skipped = definition.nodes.filter((n: WorkflowNode) => !visited.has(n.id));
  if (skipped.length > 0) {
    warnings.push(`Skipped ${skipped.length} node(s) (cycle or disconnected).`);
  }

  return { ordered, warnings };
}

export function executeWorkflow(definition: WorkflowDefinition): ExecuteWorkflowResult {
  const { ordered, warnings } = topologicalOrder(definition);
  const steps: RunStep[] = [];
  const nodeStatuses: Record<string, NodeRunStatus> = {};
  const context: ExecutionContext = { payload: { demo: true } };
  const baseTime = Date.now();

  for (const node of definition.nodes) {
    nodeStatuses[node.id] = "idle";
  }

  for (let i = 0; i < ordered.length; i++) {
    const node = ordered[i];
    if (!node) continue;
    nodeStatuses[node.id] = "running";
    const startedAt = new Date(baseTime + i * 400).toISOString();

    try {
      const { message, level } = runNode(node, context);
      context[`node_${node.id}`] = message;
      steps.push({
        id: `step_${node.id}`,
        title: node.data.label || defaultLabel(node.type),
        message,
        level,
        startedAt,
      });
      nodeStatuses[node.id] = level === "error" ? "error" : "done";
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      steps.push({
        id: `step_${node.id}`,
        title: node.data.label || defaultLabel(node.type),
        message,
        level: "error",
        startedAt,
      });
      nodeStatuses[node.id] = "error";
      break;
    }
  }

  return { steps, nodeStatuses, warnings };
}

function runNode(
  node: WorkflowNode,
  context: ExecutionContext,
): { message: string; level: "info" | "warning" | "error" } {
  const summary = summarizeNodeData(node.type, node.data);

  switch (node.type) {
    case "trigger": {
      const kind = node.data.trigger?.kind ?? "webhook";
      return { message: `Triggered via ${kind} (${summary})`, level: "info" };
    }
    case "dbQuery": {
      const table = node.data.dbQuery?.table ?? "table";
      const preset = node.data.dbQuery?.queryPreset ?? "list_recent";
      const count = preset === "count" ? 42 : preset === "by_id" ? 1 : 12;
      context.rows = count;
      return { message: `Queried ${table} (${preset}): ${count} row(s)`, level: "info" };
    }
    case "transform": {
      const expr = node.data.transform?.expression ?? "map";
      context.transformed = true;
      return { message: `Applied transform: ${expr}`, level: "info" };
    }
    case "httpResponse": {
      const code = node.data.httpResponse?.statusCode ?? 200;
      return { message: `Responded HTTP ${code} with mock body`, level: "info" };
    }
    case "slackNotify": {
      const channel = node.data.slackNotify?.channel ?? "#alerts";
      return { message: `Posted to Slack ${channel}`, level: "info" };
    }
    case "emailSend": {
      const to = node.data.emailSend?.to ?? "recipient";
      return { message: `Sent email to ${to}`, level: "info" };
    }
    default:
      return { message: summary, level: "info" };
  }
}
