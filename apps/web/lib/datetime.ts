/**
 * Formats an ISO-8601 timestamp using ko-KR locale, used across console
 * tables (runs, audit, notifications). Two variants cover the existing
 * usages so callers don't re-implement Intl options.
 */
export type DateTimeVariant = "full" | "short";

export function formatConsoleDateTime(iso: string, variant: DateTimeVariant = "full"): string {
  const options: Intl.DateTimeFormatOptions =
    variant === "short"
      ? { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }
      : {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
  return new Date(iso).toLocaleString("ko-KR", options);
}
