import type { AxeResults } from "axe-core";

/**
 * vitest-axe@0.1.0 augments the old `namespace Vi` API (vitest <=2.x).
 * vitest v4 uses `declare module "@vitest/expect"` instead.
 * This file bridges the gap so `expect(results).toHaveNoViolations()` types correctly.
 */
declare module "@vitest/expect" {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}

export type { AxeResults };
