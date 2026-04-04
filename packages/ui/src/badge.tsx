import { type ReactNode } from "react";
import { cn } from "./cn";

type BadgeVariant = "default" | "success" | "warning" | "danger";

function getBadgeClasses(variant: BadgeVariant): string {
  const base =
    "ui:inline-flex ui:items-center ui:rounded-full ui:px-2.5 ui:py-1 ui:text-sm ui:font-semibold";

  switch (variant) {
    case "success":
      return `${base} ui:bg-semantic-success ui:text-text-on-brand`;
    case "warning":
      return `${base} ui:bg-semantic-warning ui:text-text-on-brand`;
    case "danger":
      return `${base} ui:bg-semantic-danger ui:text-text-on-brand`;
    case "default":
      return `${base} ui:bg-surface-raised ui:text-text-primary`;
  }
}

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return <span className={cn(getBadgeClasses(variant), className)}>{children}</span>;
}
