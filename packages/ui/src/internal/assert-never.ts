/**
 * Exhaustiveness helper for discriminated unions. Internal to @repo/ui;
 * intentionally not re-exported from the package barrel.
 */
export function assertNever(value: never, context?: string): never {
  const prefix = context ? `${context}: ` : "";
  throw new Error(`${prefix}unexpected value ${String(value)}`);
}
