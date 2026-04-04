import { cn } from "./cn";
import type { ComponentSize } from "./contracts";

export type SpinnerProps = {
  className?: string;
  /** When true, hides from assistive tech (e.g. inside a busy button). */
  decorative?: boolean;
  size?: ComponentSize;
  "aria-label"?: string;
};

function sizeClasses(size: ComponentSize): string {
  switch (size) {
    case "sm":
      return "ui:h-3 ui:w-3 ui:border";
    case "lg":
      return "ui:h-6 ui:w-6 ui:border-[3px]";
    case "md":
    default:
      return "ui:h-4 ui:w-4 ui:border-2";
  }
}

export function Spinner({
  className,
  decorative = false,
  size = "md",
  "aria-label": ariaLabel = "Loading",
}: SpinnerProps) {
  const cls = cn(
    "ui:inline-block ui:shrink-0 ui:animate-spin ui:rounded-full ui:border-current ui:border-t-transparent",
    sizeClasses(size),
    className,
  );
  if (decorative) {
    return <span aria-hidden className={cls} />;
  }
  return (
    <span aria-label={ariaLabel} className={cls} role="status" />
  );
}
