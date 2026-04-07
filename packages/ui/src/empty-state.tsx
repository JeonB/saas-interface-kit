import type { ReactNode } from "react";
import { cn } from "./cn";

export type EmptyStateProps = {
  title: string;
  description: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "ui:flex ui:flex-col ui:items-center ui:justify-center ui:rounded-ui-md ui:border ui:border-dashed ui:border-border-default ui:bg-surface-muted/20 ui:px-6 ui:py-10 ui:text-center",
        className,
      )}
    >
      <p className="ui:text-base ui:font-semibold ui:text-text-primary">{title}</p>
      <p className="ui:mt-2 ui:text-sm ui:text-text-secondary">{description}</p>
      {action ? <div className="ui:mt-4">{action}</div> : null}
    </div>
  );
}
