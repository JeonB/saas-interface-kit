import type { StatCardTrend } from "../stat-card";

/**
 * Maps a trend direction to the semantic colour token used by
 * StatCard / MetricCard delta labels. Internal to @repo/ui.
 */
export function trendClass(trend: StatCardTrend | undefined): string {
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
