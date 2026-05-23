import { describe, expect, it } from "vitest";
import {
  resolveAuthenticatedLoginRedirect,
  resolveUnauthenticatedRedirect,
} from "./proxy-auth";

describe("proxy-auth", () => {
  describe("resolveUnauthenticatedRedirect", () => {
    it("builds login redirect URL with encoded from path", () => {
      expect(resolveUnauthenticatedRedirect("/console/runs")).toBe(
        "/login?from=%2Fconsole%2Fruns",
      );
    });
  });

  describe("resolveAuthenticatedLoginRedirect", () => {
    it("returns sanitized internal redirect target", () => {
      expect(resolveAuthenticatedLoginRedirect("/console/workflows")).toBe("/console/workflows");
    });

    it("falls back for unsafe or missing from values", () => {
      expect(resolveAuthenticatedLoginRedirect("//evil.com")).toBe("/console");
      expect(resolveAuthenticatedLoginRedirect(null)).toBe("/console");
    });
  });
});
