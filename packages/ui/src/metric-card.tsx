import type { ReactNode } from "react";
import { cn } from "./cn";
import { trendClass } from "./internal/trend-class";
import type { StatCardTrend } from "./stat-card";

export type MetricCardProps = {
  chart?: ReactNode;
  className?: string;
  comparisonLabel?: string;
  delta?: string;
  label: string;
  trend?: StatCardTrend;
  value: string;
};

export function MetricCard({
  chart,
  className,
  comparisonLabel,
  delta,
  label,
  trend = "neutral",
  value,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "ui:rounded-ui-md ui:border ui:border-border-subtle ui:bg-surface-raised ui:p-4 ui:shadow-ui-sm",
        className,
      )}
    >
      <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-wide ui:text-text-secondary">{label}</p>
      <p className="ui:mt-2 ui:text-2xl ui:font-semibold ui:tabular-nums ui:text-text-primary">{value}</p>
      {delta ? <p className={cn("ui:mt-1 ui:text-sm", trendClass(trend))}>{delta}</p> : null}
      {comparisonLabel ? (
        <p className="ui:mt-1 ui:text-xs ui:text-text-muted">{comparisonLabel}</p>
      ) : null}
      {chart ? <div className="ui:mt-3 ui:min-h-12 ui:w-full">{chart}</div> : null}
    </div>
  );
}
