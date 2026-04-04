import type { InputHTMLAttributes, ReactNode } from "react";
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

function getInputInnerPadding(size: ComponentSize): string {
  switch (size) {
    case "sm":
      return "ui:px-2.5 ui:text-xs";
    case "lg":
      return "ui:px-4 ui:text-base";
    case "md":
    default:
      return "ui:px-3 ui:text-sm";
  }
}

function getWrapperHeightAndRadius(size: ComponentSize): string {
  switch (size) {
    case "sm":
      return "ui:h-8 ui:rounded-ui-sm";
    case "lg":
      return "ui:h-11 ui:rounded-ui-md";
    case "md":
    default:
      return "ui:h-10 ui:rounded-ui-md";
  }
}

const base =
  "ui:w-full ui:border ui:border-border-default ui:bg-surface-raised ui:text-text-primary ui:placeholder:text-text-muted ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40 focus-visible:ui:border-semantic-brand disabled:ui:opacity-50 disabled:ui:cursor-not-allowed";

const addonShell =
  "ui:flex ui:w-full ui:items-stretch ui:overflow-hidden ui:border ui:border-border-default ui:bg-surface-raised ui:focus-within:ui:ring-2 ui:focus-within:ui:ring-semantic-brand/40 ui:focus-within:ui:border-semantic-brand";

export type InputProps = {
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  size?: ComponentSize;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export function Input({ size = "md", className, leftAddon, rightAddon, ...rest }: InputProps) {
  const hasAddon = leftAddon != null || rightAddon != null;
  if (!hasAddon) {
    return <input className={cn(base, getInputSizeClasses(size), className)} {...rest} />;
  }

  return (
    <div className={cn(addonShell, getWrapperHeightAndRadius(size), className)}>
      {leftAddon != null ? (
        <span className="ui:flex ui:shrink-0 ui:items-center ui:border-r ui:border-border-default ui:px-2.5 ui:text-text-muted">
          {leftAddon}
        </span>
      ) : null}
      <input
        className={cn(
          "ui:h-full ui:min-w-0 ui:flex-1 ui:border-0 ui:bg-transparent ui:text-text-primary ui:outline-none ui:placeholder:text-text-muted disabled:ui:cursor-not-allowed disabled:ui:opacity-50",
          getInputInnerPadding(size),
        )}
        {...rest}
      />
      {rightAddon != null ? (
        <span className="ui:flex ui:shrink-0 ui:items-center ui:border-l ui:border-border-default ui:px-2.5 ui:text-text-muted">
          {rightAddon}
        </span>
      ) : null}
    </div>
  );
}
