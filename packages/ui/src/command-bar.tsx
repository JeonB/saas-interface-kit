import type { ReactNode } from "react";
import { cn } from "./cn";

export type CommandBarProps = {
  children: ReactNode;
  className?: string;
};

export function CommandBar({ children, className }: CommandBarProps) {
  return (
    <div
      className={cn(
        "ui:flex ui:flex-wrap ui:items-center ui:gap-3 ui:rounded-ui-md ui:border ui:border-border-subtle ui:bg-surface-raised ui:px-3 ui:py-2",
        className,
      )}
      role="search"
    >
      {children}
    </div>
  );
}
