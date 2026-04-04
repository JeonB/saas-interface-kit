import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export type SkeletonProps = {
  className?: string;
  width?: string;
  height?: string;
  rounded?: "sm" | "md" | "lg" | "full" | "none";
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

const roundedMap = {
  none: "",
  sm: "ui:rounded-ui-sm",
  md: "ui:rounded-ui-md",
  lg: "ui:rounded-ui-lg",
  full: "ui:rounded-full",
} as const;

export function Skeleton({
  className,
  width,
  height,
  rounded = "md",
  style,
  ...rest
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "ui:animate-pulse ui:bg-surface-muted",
        roundedMap[rounded],
        className,
      )}
      style={{
        width: width ?? undefined,
        height: height ?? undefined,
        ...style,
      }}
      {...rest}
    />
  );
}
