import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";
import type { ComponentSize, ComponentVariant } from "./contracts";

type ButtonVariant = ComponentVariant;
type ButtonSize = ComponentSize;

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

function getButtonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
): string {
  const base =
    "ui:inline-flex ui:items-center ui:justify-center ui:rounded-ui-md ui:px-4 ui:py-2 ui:text-sm ui:font-semibold ui:transition-colors ui:cursor-pointer";
  const sizeClasses =
    size === "sm"
      ? "ui:h-8 ui:px-3 ui:text-xs"
      : size === "lg"
        ? "ui:h-11 ui:px-6 ui:text-base"
        : "ui:h-10 ui:px-4 ui:text-sm";

  if (disabled) {
    return cn(
      base,
      sizeClasses,
      "ui:bg-surface-muted ui:text-text-muted ui:cursor-not-allowed",
    );
  }

  switch (variant) {
    case "primary":
      return cn(
        base,
        sizeClasses,
        "ui:bg-semantic-brand ui:text-text-on-brand hover:ui:opacity-90",
      );
    case "danger":
      return cn(
        base,
        sizeClasses,
        "ui:bg-semantic-danger ui:text-text-on-brand hover:ui:opacity-90",
      );
    case "default":
      return cn(
        base,
        sizeClasses,
        "ui:bg-surface-raised ui:text-text-primary hover:ui:bg-surface-muted",
      );
  }
}

export function Button({
  children,
  variant = "default",
  size = "md",
  disabled = false,
  type = "button",
  className,
  ...rest
}: ButtonProps) {
  const base = getButtonClasses(variant, size, disabled);
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(base, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
