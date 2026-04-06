import "@testing-library/jest-dom/vitest";
// vitest-axe@0.1.0 bug: matchers.d.ts uses `export type *` (value import blocked by TypeScript)
// and extend-expect.js is empty at runtime, so we register the matcher manually here.
// The JS module exports the value correctly — only the type declaration is wrong.
// @ts-expect-error — TS1362: vitest-axe@0.1.0 matchers.d.ts incorrectly uses export type *
import { toHaveNoViolations } from "vitest-axe/matchers";
// @ts-expect-error — same as above
expect.extend({ toHaveNoViolations });

if (typeof HTMLDialogElement !== "undefined") {
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function showModalPolyfill(this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function closePolyfill(this: HTMLDialogElement) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  }
}
