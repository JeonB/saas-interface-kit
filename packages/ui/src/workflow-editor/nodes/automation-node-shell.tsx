"use client";

import type { ReactNode } from "react";
import { Handle, Position } from "@xyflow/react";
import { cn } from "../../cn";

export type AutomationNodeShellProps = {
  accentClass: string;
  children?: ReactNode;
  icon: ReactNode;
  label: string;
  runStatus?: "idle" | "running" | "done" | "error";
  selected?: boolean;
  showSourceHandle: boolean;
  showTargetHandle: boolean;
  summary?: string;
};

function runStatusRing(status: AutomationNodeShellProps["runStatus"]): string {
  switch (status) {
    case "running":
      return "ui:ring-2 ui:ring-semantic-info";
    case "done":
      return "ui:ring-2 ui:ring-semantic-success";
    case "error":
      return "ui:ring-2 ui:ring-semantic-danger";
    default:
      return "";
  }
}

export function AutomationNodeShell({
  accentClass,
  children,
  icon,
  label,
  runStatus,
  selected,
  showSourceHandle,
  showTargetHandle,
  summary,
}: AutomationNodeShellProps) {
  return (
    <div
      className={cn(
        "ui:min-w-[180px] ui:rounded-ui-md ui:border ui:border-border-subtle ui:bg-surface-raised ui:shadow-sm",
        accentClass,
        runStatusRing(runStatus),
        selected && "ui:border-border-strong",
      )}
    >
      {showTargetHandle ? (
        <Handle className="ui:!h-2.5 ui:!w-2.5 ui:!bg-border-strong" position={Position.Left} type="target" />
      ) : null}
      <div className="ui:flex ui:items-center ui:gap-2 ui:border-b ui:border-border-subtle ui:px-3 ui:py-2">
        <span className="ui:flex ui:h-7 ui:w-7 ui:items-center ui:justify-center ui:rounded-ui-sm ui:bg-surface-muted ui:text-text-primary">
          {icon}
        </span>
        <span className="ui:text-sm ui:font-semibold ui:text-text-primary">{label}</span>
      </div>
      {summary ? (
        <p className="ui:px-3 ui:py-2 ui:text-xs ui:text-text-secondary">{summary}</p>
      ) : null}
      {children}
      {showSourceHandle ? (
        <Handle className="ui:!h-2.5 ui:!w-2.5 ui:!bg-border-strong" position={Position.Right} type="source" />
      ) : null}
    </div>
  );
}
