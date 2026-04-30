import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "./cn";

export type ChecklistItemStatus = "todo" | "done" | "skipped";

export type ChecklistItemData = {
  actionHref?: string;
  actionLabel?: string;
  description?: string;
  id: string;
  status: ChecklistItemStatus;
  title: string;
};

export type ChecklistProps = {
  className?: string;
  items: ChecklistItemData[];
  title: string;
};

export type ChecklistItemProps = {
  actionHref?: string;
  actionLabel?: string;
  className?: string;
  description?: string;
  onAction?: () => void;
  status: ChecklistItemStatus;
  title: string;
};

function getStatusLabel(status: ChecklistItemStatus): string {
  switch (status) {
    case "done":
      return "완료";
    case "skipped":
      return "건너뜀";
    case "todo":
      return "해야 함";
  }
}

function getCompletedCount(items: ChecklistItemData[]): number {
  return items.filter((item) => item.status === "done").length;
}

function getProgressPercent(items: ChecklistItemData[]): number {
  if (items.length === 0) {
    return 0;
  }
  return Math.round((getCompletedCount(items) / items.length) * 100);
}

export function Checklist({ className, items, title }: ChecklistProps) {
  const completedCount = getCompletedCount(items);
  const progressPercent = getProgressPercent(items);

  return (
    <section
      aria-label={title}
      className={cn("ui:space-y-4 ui:rounded-ui-lg ui:border ui:border-border-subtle ui:bg-surface-raised ui:p-4", className)}
    >
      <div className="ui:space-y-2">
        <div className="ui:flex ui:items-center ui:justify-between ui:gap-3">
          <h2 className="ui:text-base ui:font-semibold ui:text-text-primary">{title}</h2>
          <span aria-live="polite" className="ui:text-xs ui:text-text-secondary">
            {completedCount}/{items.length} 완료
          </span>
        </div>
        <progress
          aria-label={`진행률 ${progressPercent}%`}
          className="ui:h-2 ui:w-full ui:overflow-hidden ui:rounded-full ui:[&::-webkit-progress-bar]:ui:bg-surface-muted ui:[&::-webkit-progress-value]:ui:bg-semantic-brand ui:[&::-moz-progress-bar]:ui:bg-semantic-brand"
          max={100}
          value={progressPercent}
        />
      </div>

      <ul className="ui:space-y-2" role="list">
        {items.map((item) => (
          <li key={item.id}>
            <ChecklistItem
              actionHref={item.actionHref}
              actionLabel={item.actionLabel}
              description={item.description}
              status={item.status}
              title={item.title}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ChecklistItem({
  actionHref,
  actionLabel,
  className,
  description,
  onAction,
  status,
  title,
}: ChecklistItemProps) {
  const statusLabel = getStatusLabel(status);

  const actionContent: ReactNode = actionLabel ? (
    actionHref ? (
      <Button asChild name={`checklistAction-${title}`} size="sm" type="button" variant="default">
        <a href={actionHref}>{actionLabel}</a>
      </Button>
    ) : (
      <Button name={`checklistAction-${title}`} onClick={onAction} size="sm" type="button" variant="default">
        {actionLabel}
      </Button>
    )
  ) : null;

  return (
    <article
      className={cn(
        "ui:flex ui:items-start ui:justify-between ui:gap-3 ui:rounded-ui-md ui:border ui:border-border-subtle ui:bg-surface-default ui:p-3",
        className,
      )}
    >
      <div className="ui:min-w-0 ui:space-y-1">
        <div className="ui:flex ui:items-center ui:gap-2">
          <span
            aria-hidden
            className={cn(
              "ui:inline-block ui:h-2.5 ui:w-2.5 ui:rounded-full",
              status === "done"
                ? "ui:bg-semantic-success"
                : status === "skipped"
                  ? "ui:bg-semantic-warning"
                  : "ui:bg-border-strong",
            )}
          />
          <h3 className="ui:text-sm ui:font-medium ui:text-text-primary">{title}</h3>
          <span className="ui:text-xs ui:text-text-secondary">{statusLabel}</span>
        </div>
        {description ? <p className="ui:text-sm ui:text-text-secondary">{description}</p> : null}
      </div>
      {actionContent}
    </article>
  );
}
