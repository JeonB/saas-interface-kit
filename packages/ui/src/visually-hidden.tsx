import type { HTMLAttributes } from "react";
import { cn } from "./cn";

/**
 * Hides content visually while keeping it available to assistive tech.
 */
export function VisuallyHidden({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ui:absolute ui:h-px ui:w-px ui:overflow-hidden ui:whitespace-nowrap ui:border-0 ui:p-0",
        "[clip-path:inset(50%)]",
        className,
      )}
      {...rest}
    />
  );
}
