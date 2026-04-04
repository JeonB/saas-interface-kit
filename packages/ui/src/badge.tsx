import { type ReactNode } from "react";
import { cn } from "./cn";
import type { ComponentSize } from "./contracts";

type BadgeVariant = "default" | "success" | "warning" | "danger";

function getBadgeClasses(variant: BadgeVariant, showDot: boolean): string {
  const base =
    "ui:inline-flex ui:items-center ui:gap-1.5 ui:rounded-full ui:px-2.5 ui:py-1 ui:text-sm ui:font-semibold";

  const dot = showDot ? "ui:pl-2" : "";

  switch (variant) {
    case "success":
      return `${base} ${dot} ui:bg-semantic-success ui:text-text-on-brand`;
    case "warning":
      return `${base} ${dot} ui:bg-semantic-warning ui:text-text-on-brand`;
    case "danger":
      return `${base} ${dot} ui:bg-semantic-danger ui:text-text-on-brand`;
    case "default":
      return `${base} ${dot} ui:bg-surface-raised ui:text-text-primary`;
  }
}

function sizeClasses(size: ComponentSize): string {
  switch (size) {
    case "sm":
      return "ui:px-2 ui:py-0.5 ui:text-xs";
    case "lg":
      return "ui:px-3 ui:py-1.5 ui:text-base";
    case "md":
    default:
      return "ui:px-2.5 ui:py-1 ui:text-sm";
  }
}

export type BadgeProps = {
  children: ReactNode;
  className?: string;
  showDot?: boolean;
  size?: ComponentSize;
  variant?: BadgeVariant;
};

export function Badge({
  children,
  showDot = false,
  size = "md",
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span className={cn(getBadgeClasses(variant, showDot), sizeClasses(size), className)}>
      {showDot ? (
        <span
          aria-hidden
          className="ui:inline-block ui:h-1.5 ui:w-1.5 ui:rounded-full ui:bg-current ui:opacity-90"
        />
      ) : null}
      {children}
    </span>
  );
}
