import "@testing-library/jest-dom/vitest";
// vitest-axe@0.1.0: extend-expect.js is empty at runtime, so we register the matcher manually.
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import { toHaveNoViolations } from "vitest-axe/matchers";
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
