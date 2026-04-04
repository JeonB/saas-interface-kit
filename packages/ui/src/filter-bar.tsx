import type { ReactNode } from "react";
import { cn } from "./cn";

export type FilterBarProps = {
  children: ReactNode;
  className?: string;
};

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      className={cn(
        "ui:flex ui:flex-wrap ui:items-center ui:gap-2 ui:rounded-ui-md ui:border ui:border-border-subtle ui:bg-surface-raised ui:p-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type FilterChipProps = {
  active?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function FilterChip({ active = false, children, className, onClick }: FilterChipProps) {
  return (
    <button
      className={cn(
        "ui:rounded-full ui:border ui:px-3 ui:py-1 ui:text-xs ui:font-medium ui:transition-colors focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40",
        active
          ? "ui:border-semantic-brand ui:bg-semantic-brand/15 ui:text-text-primary"
          : "ui:border-border-default ui:bg-surface-muted ui:text-text-secondary hover:ui:border-border-strong",
        className,
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
