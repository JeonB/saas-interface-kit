"use client";

import type { Edge, Node } from "@xyflow/react";
import { Background, BackgroundVariant, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "./cn";

export type FlowCanvasNode = Node;
export type FlowCanvasEdge = Edge;

export type FlowCanvasProps = {
  ariaLabel?: string;
  className?: string;
  edges: FlowCanvasEdge[];
  fitView?: boolean;
  nodes: FlowCanvasNode[];
  readOnly?: boolean;
};

export function FlowCanvas({
  ariaLabel = "워크플로 캔버스",
  className,
  edges,
  fitView = true,
  nodes,
  readOnly = true,
}: FlowCanvasProps) {
  return (
    <div className={cn("ui:h-[360px] ui:w-full ui:overflow-hidden ui:rounded-ui-lg ui:border ui:border-border-subtle", className)}>
      <ReactFlow
        aria-label={ariaLabel}
        connectOnClick={!readOnly}
        deleteKeyCode={readOnly ? null : "Backspace"}
        edges={edges}
        elementsSelectable={!readOnly}
        fitView={fitView}
        nodes={nodes}
        nodesConnectable={!readOnly}
        nodesDraggable={!readOnly}
        panOnDrag
        zoomOnDoubleClick={!readOnly}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls showInteractive={!readOnly} />
      </ReactFlow>
    </div>
  );
}
