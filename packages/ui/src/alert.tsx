import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "./cn";
import type { FeedbackVariant } from "./contracts";
import { iconSizeFromComponentSize } from "./icon-size";

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

function FeedbackIcon({ variant }: { variant: FeedbackVariant }) {
  const px = iconSizeFromComponentSize("md");
  switch (variant) {
    case "info":
      return <Info aria-hidden size={px} />;
    case "success":
      return <CheckCircle2 aria-hidden size={px} />;
    case "warning":
      return <AlertTriangle aria-hidden size={px} />;
    case "error":
      return <AlertCircle aria-hidden size={px} />;
  }
}

export type AlertProps = {
  children: ReactNode;
  className?: string;
  onDismiss?: () => void;
  title?: string;
  variant?: FeedbackVariant;
};

export function Alert({ children, title, variant = "info", className, onDismiss }: AlertProps) {
  const base = getAlertClasses(variant);
  return (
    <div className={cn(base, className)} role="alert">
      <div className="ui:flex ui:gap-3">
        <span className="ui:mt-0.5 ui:shrink-0">
          <FeedbackIcon variant={variant} />
        </span>
        <div className="ui:min-w-0 ui:flex-1">
          {title ? <p className="ui:mb-1 ui:font-semibold">{title}</p> : null}
          <div>{children}</div>
        </div>
        {onDismiss ? (
          <button
            aria-label="Dismiss alert"
            className="ui:-m-1 ui:shrink-0 ui:rounded-ui-sm ui:p-1 ui:text-current hover:ui:bg-black/10 focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40"
            name="dismissAlert"
            onClick={onDismiss}
            type="button"
          >
            <X aria-hidden size={iconSizeFromComponentSize("sm")} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
