import type { SelectHTMLAttributes } from "react";
import { cn } from "./cn";
import type { ComponentSize } from "./contracts";

function getSelectSizeClasses(size: ComponentSize): string {
  switch (size) {
    case "sm":
      return "ui:h-8 ui:px-2 ui:text-xs ui:rounded-ui-sm";
    case "lg":
      return "ui:h-11 ui:px-3 ui:text-base ui:rounded-ui-md";
    case "md":
    default:
      return "ui:h-10 ui:px-2.5 ui:text-sm ui:rounded-ui-md";
  }
}

const base =
  "ui:w-full ui:appearance-none ui:border ui:border-border-default ui:bg-surface-raised ui:text-text-primary ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40 focus-visible:ui:border-semantic-brand disabled:ui:opacity-50 disabled:ui:cursor-not-allowed";

export type SelectProps = {
  size?: ComponentSize;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">;

export function Select({ size = "md", className, children, ...rest }: SelectProps) {
  return (
    <select className={cn(base, getSelectSizeClasses(size), className)} {...rest}>
      {children}
    </select>
  );
}
