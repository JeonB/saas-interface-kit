import { cn } from "./cn";

export type StatCardTrend = "up" | "down" | "neutral";

export type StatCardProps = {
  label: string;
  value: string;
  delta?: string;
  trend?: StatCardTrend;
  className?: string;
};

function trendClass(trend: StatCardTrend | undefined): string {
  switch (trend) {
    case "up":
      return "ui:text-semantic-success";
    case "down":
      return "ui:text-semantic-danger";
    case "neutral":
    default:
      return "ui:text-text-secondary";
  }
}

export function StatCard({ label, value, delta, trend = "neutral", className }: StatCardProps) {
  return (
    <div
      className={cn(
        "ui:rounded-ui-md ui:border ui:border-border-subtle ui:bg-surface-raised ui:p-4 ui:shadow-ui-sm",
        className,
      )}
    >
      <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-wide ui:text-text-secondary">
        {label}
      </p>
      <p className="ui:mt-2 ui:text-2xl ui:font-semibold ui:tabular-nums ui:text-text-primary">
        {value}
      </p>
      {delta ? <p className={cn("ui:mt-1 ui:text-sm", trendClass(trend))}>{delta}</p> : null}
    </div>
  );
}
