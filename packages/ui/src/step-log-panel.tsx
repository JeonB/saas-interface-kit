import { assertNever } from "./internal/assert-never";
import { Timeline, TimelineItem } from "./timeline";

export type RunStepLogLevel = "info" | "warning" | "error";

export type RunStep = {
  id: string;
  level: RunStepLogLevel;
  message: string;
  startedAt: string;
  title: string;
};

export type StepLogPanelProps = {
  emptyMessage?: string;
  steps: RunStep[];
  title?: string;
};

function levelLabel(level: RunStepLogLevel): string {
  switch (level) {
    case "info":
      return "INFO";
    case "warning":
      return "WARN";
    case "error":
      return "ERROR";
    default:
      return assertNever(level, "run step log level");
  }
}

function levelClass(level: RunStepLogLevel): string {
  switch (level) {
    case "info":
      return "ui:text-text-muted";
    case "warning":
      return "ui:text-semantic-warning";
    case "error":
      return "ui:text-semantic-danger";
    default:
      return assertNever(level, "run step log level");
  }
}

export function StepLogPanel({
  emptyMessage = "로그가 없습니다.",
  steps,
  title = "실행 로그",
}: StepLogPanelProps) {
  return (
    <section aria-label={title} className="ui:rounded-ui-lg ui:border ui:border-border-subtle ui:bg-surface-default ui:p-4">
      <h2 className="ui:text-sm ui:font-semibold ui:text-text-primary">{title}</h2>
      {steps.length === 0 ? (
        <p className="ui:mt-3 ui:text-sm ui:text-text-muted">{emptyMessage}</p>
      ) : (
        <Timeline className="ui:mt-4">
          {steps.map((step) => (
            <TimelineItem key={step.id} time={step.startedAt}>
              <div className="ui:flex ui:flex-col ui:gap-1">
                <p className="ui:text-sm ui:font-medium ui:text-text-primary">{step.title}</p>
                <p className="ui:text-sm ui:text-text-secondary">{step.message}</p>
                <p className={levelClass(step.level)}>
                  [{levelLabel(step.level)}]
                </p>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </section>
  );
}
