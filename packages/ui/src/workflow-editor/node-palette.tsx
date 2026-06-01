"use client";

import { WORKFLOW_DRAG_TYPE, WORKFLOW_PALETTE_ITEMS } from "./types";
import { cn } from "../cn";

export type NodePaletteProps = {
  className?: string;
  disabled?: boolean;
};

export function NodePalette({ className, disabled }: NodePaletteProps) {
  return (
    <aside
      aria-label="노드 팔레트"
      className={cn(
        "ui:flex ui:w-52 ui:shrink-0 ui:flex-col ui:gap-2 ui:border-r ui:border-border-subtle ui:bg-surface-muted ui:p-3",
        className,
      )}
    >
      <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-wide ui:text-text-muted">노드 추가</p>
      {WORKFLOW_PALETTE_ITEMS.map((item) => (
        <button
          key={item.type}
          className="ui:rounded-ui-md ui:border ui:border-border-subtle ui:bg-surface-raised ui:px-3 ui:py-2 ui:text-left ui:transition-colors hover:ui:bg-surface-muted disabled:ui:cursor-not-allowed disabled:ui:opacity-50"
          disabled={disabled}
          draggable={!disabled}
          onDragStart={(e) => {
            e.dataTransfer.setData(WORKFLOW_DRAG_TYPE, item.type);
            e.dataTransfer.effectAllowed = "move";
          }}
          type="button"
        >
          <span className="ui:block ui:text-sm ui:font-medium ui:text-text-primary">{item.label}</span>
          <span className="ui:mt-0.5 ui:block ui:text-xs ui:text-text-secondary">{item.description}</span>
        </button>
      ))}
    </aside>
  );
}
