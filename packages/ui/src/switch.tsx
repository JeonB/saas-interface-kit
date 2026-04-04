import type { ButtonHTMLAttributes, Ref } from "react";
import { cn } from "./cn";
import type { ComponentSize } from "./contracts";

export type SwitchProps = {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  size?: ComponentSize;
  id?: string;
  ref?: Ref<HTMLButtonElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "role" | "aria-checked" | "onClick">;

function trackSize(size: ComponentSize): string {
  switch (size) {
    case "sm":
      return "ui:h-5 ui:w-9";
    case "lg":
      return "ui:h-7 ui:w-12";
    case "md":
    default:
      return "ui:h-6 ui:w-11";
  }
}

function thumbSize(size: ComponentSize): string {
  switch (size) {
    case "sm":
      return "ui:h-3 ui:w-3";
    case "lg":
      return "ui:h-5 ui:w-5";
    case "md":
    default:
      return "ui:h-4 ui:w-4";
  }
}

function thumbTranslate(size: ComponentSize, checked: boolean): string {
  if (!checked) return "ui:translate-x-0.5";
  switch (size) {
    case "sm":
      return "ui:translate-x-4";
    case "lg":
      return "ui:translate-x-5";
    case "md":
    default:
      return "ui:translate-x-5";
  }
}

export function Switch({
  checked,
  onCheckedChange,
  size = "md",
  className,
  disabled,
  id,
  ref,
  ...rest
}: SwitchProps) {
  return (
    <button
      ref={ref}
      aria-checked={checked}
      className={cn(
        "ui:relative ui:inline-flex ui:shrink-0 ui:cursor-pointer ui:rounded-full ui:border ui:border-border-default ui:transition-colors focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40 disabled:ui:cursor-not-allowed disabled:ui:opacity-50",
        trackSize(size),
        checked ? "ui:bg-semantic-brand" : "ui:bg-surface-muted",
        className,
      )}
      disabled={disabled}
      id={id}
      onClick={() => {
        if (!disabled) onCheckedChange(!checked);
      }}
      role="switch"
      type="button"
      {...rest}
    >
      <span
        aria-hidden
        className={cn(
          "ui:pointer-events-none ui:block ui:rounded-full ui:bg-text-on-brand ui:shadow-ui-sm ui:transition-transform",
          thumbSize(size),
          thumbTranslate(size, checked),
        )}
      />
    </button>
  );
}
