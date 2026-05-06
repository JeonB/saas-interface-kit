/**
 * Shared helpers for parsing Next.js `searchParams` records and mutating
 * `URLSearchParams` consistently across console pages and filter components.
 */

export type RawSearchParam = string | string[] | undefined;

export function parseString(raw: RawSearchParam): string | undefined {
  if (typeof raw !== "string") {
    return undefined;
  }
  const normalized = raw.trim();
  return normalized.length > 0 ? normalized : undefined;
}

export function parseStringOneOf<T extends string>(
  raw: RawSearchParam,
  allowed: readonly T[],
): T | undefined {
  const value = parseString(raw);
  if (!value) return undefined;
  return (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

export function parsePositiveInt(raw: RawSearchParam, fallback: number): number {
  const value = parseString(raw);
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function parseBooleanFlag(raw: RawSearchParam): boolean {
  const value = parseString(raw);
  return value === "1" || value === "true";
}

export function setOrDelete(
  params: URLSearchParams,
  key: string,
  value: string | undefined,
): void {
  const next = (value ?? "").trim();
  if (next.length > 0) {
    params.set(key, next);
    return;
  }
  params.delete(key);
}
