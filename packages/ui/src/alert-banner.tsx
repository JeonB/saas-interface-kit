import type { ReactNode } from "react";
import { cn } from "./cn";
import type { FeedbackVariant } from "./contracts";

export type AlertBannerProps = {
  children: ReactNode;
  className?: string;
  onDismiss?: () => void;
  title?: string;
  variant?: FeedbackVariant;
};

function bannerTone(variant: FeedbackVariant): string {
  switch (variant) {
    case "success":
      return "ui:border-semantic-success/40 ui:bg-semantic-success/10 ui:text-semantic-success";
    case "warning":
      return "ui:border-semantic-warning/40 ui:bg-semantic-warning/10 ui:text-semantic-warning";
    case "error":
      return "ui:border-semantic-danger/40 ui:bg-semantic-danger/10 ui:text-semantic-danger";
    case "info":
    default:
      return "ui:border-semantic-info/40 ui:bg-semantic-info/10 ui:text-semantic-info";
  }
}

export function AlertBanner({
  children,
  className,
  onDismiss,
  title,
  variant = "warning",
}: AlertBannerProps) {
  return (
    <div
      className={cn(
        "ui:flex ui:w-full ui:items-start ui:gap-3 ui:border-b ui:px-4 ui:py-3",
        bannerTone(variant),
        className,
      )}
      role="alert"
    >
      <div className="ui:min-w-0 ui:flex-1">
        {title ? <p className="ui:text-sm ui:font-semibold">{title}</p> : null}
        <div className={cn("ui:text-sm", title ? "ui:mt-0.5" : "")}>{children}</div>
      </div>
      {onDismiss ? (
        <button
          aria-label="배너 닫기"
          className="ui:shrink-0 ui:rounded-ui-sm ui:px-2 ui:py-1 ui:text-sm ui:font-medium hover:ui:bg-black/10 focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40"
          name="dismissBanner"
          onClick={onDismiss}
          type="button"
        >
          닫기
        </button>
      ) : null}
    </div>
  );
}
