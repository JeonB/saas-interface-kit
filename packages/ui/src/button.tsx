import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";
import type { ComponentSize, ComponentVariant } from "./contracts";
import { Spinner } from "./spinner";

type ButtonVariant = ComponentVariant;
type ButtonSize = ComponentSize;

export type ButtonProps = {
  asChild?: boolean;
  children: ReactNode;
  leftIcon?: ReactNode;
  loading?: boolean;
  rightIcon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

function getButtonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  loading: boolean,
): string {
  const base =
    "ui:inline-flex ui:items-center ui:justify-center ui:gap-2 ui:rounded-ui-md ui:px-4 ui:py-2 ui:text-sm ui:font-semibold ui:transition-colors ui:cursor-pointer";
  const sizeClasses =
    size === "sm"
      ? "ui:h-8 ui:px-3 ui:text-xs"
      : size === "lg"
        ? "ui:h-11 ui:px-6 ui:text-base"
        : "ui:h-10 ui:px-4 ui:text-sm";

  if (disabled || loading) {
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
  asChild = false,
  children,
  className,
  disabled = false,
  leftIcon,
  loading = false,
  rightIcon,
  size = "md",
  type = "button",
  variant = "default",
  ...rest
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = Boolean(disabled || loading);
  const base = getButtonClasses(variant, size, Boolean(disabled), loading);

  if (asChild) {
    return (
      <Comp className={cn(base, className)} {...rest}>
        {children}
      </Comp>
    );
  }

  return (
    <button
      aria-busy={loading || undefined}
      className={cn(base, className)}
      disabled={isDisabled}
      type={type}
      {...rest}
    >
      {loading ? (
        <Spinner decorative size={size === "lg" ? "md" : "sm"} />
      ) : null}
      {!loading && leftIcon ? <span className="ui:inline-flex ui:shrink-0">{leftIcon}</span> : null}
      {children}
      {!loading && rightIcon ? <span className="ui:inline-flex ui:shrink-0">{rightIcon}</span> : null}
    </button>
  );
}
