import type { AxeResults } from "axe-core";

/**
 * vitest-axe@0.1.0's matchers.d.ts uses `export type *` instead of `export *`,
 * which breaks value imports under moduleResolution:"NodeNext".
 * Override the module declaration so `toHaveNoViolations` is importable as a value.
 */
declare module "vitest-axe/matchers" {
  import type AxeCore from "axe-core";

  interface NoViolationsMatcherResult {
    message(): string;
    pass: boolean;
    actual: AxeCore.Result[];
  }

  function toHaveNoViolations(
    results: AxeCore.AxeResults
  ): NoViolationsMatcherResult;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}

export type { AxeResults };
