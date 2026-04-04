import type { TextareaHTMLAttributes } from "react";
import { cn } from "./cn";
import type { ComponentSize } from "./contracts";

function getTextareaSizeClasses(size: ComponentSize): string {
  switch (size) {
    case "sm":
      return "ui:min-h-20 ui:px-2.5 ui:py-2 ui:text-xs ui:rounded-ui-sm";
    case "lg":
      return "ui:min-h-32 ui:px-4 ui:py-3 ui:text-base ui:rounded-ui-md";
    case "md":
    default:
      return "ui:min-h-24 ui:px-3 ui:py-2 ui:text-sm ui:rounded-ui-md";
  }
}

const base =
  "ui:w-full ui:resize-y ui:border ui:border-border-default ui:bg-surface-raised ui:text-text-primary ui:placeholder:text-text-muted ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40 focus-visible:ui:border-semantic-brand disabled:ui:opacity-50 disabled:ui:cursor-not-allowed";

export type TextareaProps = {
  size?: ComponentSize;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ size = "md", className, ...rest }: TextareaProps) {
  return (
    <textarea className={cn(base, getTextareaSizeClasses(size), className)} {...rest} />
  );
}
