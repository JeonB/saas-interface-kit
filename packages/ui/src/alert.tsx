import { type ReactNode } from "react";
import { cn } from "./cn";
import type { FeedbackVariant } from "./contracts";

function getAlertClasses(variant: FeedbackVariant): string {
  const base =
    "ui:rounded-ui-md ui:border ui:border-border-default/40 ui:px-4 ui:py-3 ui:text-sm ui:font-medium";

  switch (variant) {
    case "info":
      return `${base} ui:border-semantic-info/30 ui:bg-semantic-info/10 ui:text-semantic-info`;
    case "success":
      return `${base} ui:border-semantic-success/30 ui:bg-semantic-success/10 ui:text-semantic-success`;
    case "warning":
      return `${base} ui:border-semantic-warning/30 ui:bg-semantic-warning/10 ui:text-semantic-warning`;
    case "error":
      return `${base} ui:border-semantic-danger/30 ui:bg-semantic-danger/10 ui:text-semantic-danger`;
  }
}

export function Alert({
  children,
  title,
  variant = "info",
  className,
}: {
  children: ReactNode;
  title?: string;
  variant?: FeedbackVariant;
  className?: string;
}) {
  const base = getAlertClasses(variant);
  return (
    <div className={cn(base, className)} role="alert">
      {title ? <p className="ui:mb-1 ui:font-semibold">{title}</p> : null}
      <div>{children}</div>
    </div>
  );
}
