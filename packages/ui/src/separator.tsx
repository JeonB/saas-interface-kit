import type { HTMLAttributes } from "react";
import { cn } from "./cn";
import type { ComponentOrientation } from "./contracts";

export type SeparatorProps = {
  orientation?: ComponentOrientation;
} & Omit<HTMLAttributes<HTMLDivElement>, "role">;

export function Separator({
  className,
  orientation = "horizontal",
  ...rest
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal";
  return (
    <div
      aria-orientation={isHorizontal ? "horizontal" : "vertical"}
      className={cn(
        "ui:shrink-0 ui:bg-border-subtle",
        isHorizontal ? "ui:h-px ui:w-full" : "ui:h-full ui:w-px",
        className,
      )}
      role="separator"
      {...rest}
    />
  );
}
