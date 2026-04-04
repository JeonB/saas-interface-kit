import { cn } from "./cn";

export type StatusIndicatorState = "online" | "degraded" | "offline" | "maintenance";

export type StatusIndicatorProps = {
  className?: string;
  label: string;
  state: StatusIndicatorState;
};

function dotClass(state: StatusIndicatorState): string {
  switch (state) {
    case "online":
      return "ui:bg-semantic-success";
    case "degraded":
      return "ui:bg-semantic-warning";
    case "offline":
      return "ui:bg-semantic-danger";
    case "maintenance":
      return "ui:bg-text-muted";
  }
}

export function StatusIndicator({ className, label, state }: StatusIndicatorProps) {
  return (
    <span className={cn("ui:inline-flex ui:items-center ui:gap-2", className)}>
      <span
        aria-hidden
        className={cn("ui:h-2 ui:w-2 ui:rounded-full", dotClass(state))}
      />
      <span className="ui:text-sm ui:font-medium ui:text-text-primary">{label}</span>
    </span>
  );
}
