import type { InputHTMLAttributes } from "react";
import { cn } from "./cn";
import type { ComponentSize } from "./contracts";

function getInputSizeClasses(size: ComponentSize): string {
  switch (size) {
    case "sm":
      return "ui:h-8 ui:px-2.5 ui:text-xs ui:rounded-ui-sm";
    case "lg":
      return "ui:h-11 ui:px-4 ui:text-base ui:rounded-ui-md";
    case "md":
    default:
      return "ui:h-10 ui:px-3 ui:text-sm ui:rounded-ui-md";
  }
}

const base =
  "ui:w-full ui:border ui:border-border-default ui:bg-surface-raised ui:text-text-primary ui:placeholder:text-text-muted ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40 focus-visible:ui:border-semantic-brand disabled:ui:opacity-50 disabled:ui:cursor-not-allowed";

export type InputProps = {
  size?: ComponentSize;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export function Input({ size = "md", className, ...rest }: InputProps) {
  return (
    <input className={cn(base, getInputSizeClasses(size), className)} {...rest} />
  );
}
