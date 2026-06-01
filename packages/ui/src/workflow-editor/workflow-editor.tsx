"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type OnConnect,
  type XYPosition,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo } from "react";
import { cn } from "../cn";
import { NodePalette } from "./node-palette";
import { workflowNodeTypes } from "./nodes/workflow-node-types";
import type { WorkflowAutomationNodeType, WorkflowEditorNodeData } from "./types";
import { WORKFLOW_DRAG_TYPE } from "./types";

export type WorkflowEditorNode = Node<WorkflowEditorNodeData, string>;
export type WorkflowEditorEdge = Edge;

export type WorkflowEditorProps = {
  ariaLabel?: string;
  className?: string;
  edges: WorkflowEditorEdge[];
  fitView?: boolean;
  nodes: WorkflowEditorNode[];
  onConnect?: OnConnect;
  onDropNode?: (type: WorkflowAutomationNodeType, position: XYPosition) => void;
  onEdgesChange?: (changes: EdgeChange<WorkflowEditorEdge>[]) => void;
  onNodeSelect?: (nodeId: string | null) => void;
  onNodesChange?: (changes: NodeChange<WorkflowEditorNode>[]) => void;
  readOnly?: boolean;
  showPalette?: boolean;
};

function WorkflowEditorInner({
  ariaLabel = "워크플로 편집 캔버스",
  className,
  edges,
  fitView = true,
  nodes,
  onConnect,
  onDropNode,
  onEdgesChange,
  onNodeSelect,
  onNodesChange,
  readOnly = false,
  showPalette = true,
}: WorkflowEditorProps) {
  const handleConnect = useCallback(
    (connection: Connection) => {
      if (readOnly) return;
      onConnect?.(connection);
    },
    [onConnect, readOnly],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (readOnly || !onDropNode) return;
      const type = event.dataTransfer.getData(WORKFLOW_DRAG_TYPE) as WorkflowAutomationNodeType;
      if (!type) return;
      const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const position: XYPosition = {
        x: event.clientX - bounds.left - 90,
        y: event.clientY - bounds.top - 40,
      };
      onDropNode(type, position);
    },
    [onDropNode, readOnly],
  );

  const nodeTypes = useMemo(() => workflowNodeTypes, []);

  return (
    <div
      className={cn(
        "ui:flex ui:h-[min(560px,70vh)] ui:w-full ui:overflow-hidden ui:rounded-ui-lg ui:border ui:border-border-subtle ui:bg-surface-muted",
        className,
      )}
    >
      {showPalette && !readOnly ? <NodePalette disabled={readOnly} /> : null}
      <div className="ui:relative ui:min-h-0 ui:flex-1" onDragOver={onDragOver} onDrop={onDrop}>
        <ReactFlow
          aria-label={ariaLabel}
          connectOnClick={!readOnly}
          deleteKeyCode={readOnly ? null : "Backspace"}
          edges={edges}
          elementsSelectable={!readOnly}
          fitView={fitView}
          nodeTypes={nodeTypes}
          nodes={nodes}
          nodesConnectable={!readOnly}
          nodesDraggable={!readOnly}
          onConnect={handleConnect}
          onEdgesChange={readOnly ? undefined : onEdgesChange}
          onNodeClick={(_e, node) => onNodeSelect?.(node.id)}
          onNodesChange={readOnly ? undefined : onNodesChange}
          onPaneClick={() => onNodeSelect?.(null)}
          panOnDrag
          zoomOnDoubleClick={!readOnly}
        >
          <Background gap={16} variant={BackgroundVariant.Dots} />
          <Controls showInteractive={!readOnly} />
        </ReactFlow>
      </div>
    </div>
  );
}

export function WorkflowEditor(props: WorkflowEditorProps) {
  return (
    <ReactFlowProvider>
      <WorkflowEditorInner {...props} />
    </ReactFlowProvider>
  );
}
