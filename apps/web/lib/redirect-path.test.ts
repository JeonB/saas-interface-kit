import { describe, expect, it } from "vitest";
import { buildLoginRedirectUrl, resolveConsoleRequestPathname, sanitizeRedirectPath } from "./redirect-path";

describe("sanitizeRedirectPath", () => {
  it("returns valid internal paths", () => {
    expect(sanitizeRedirectPath("/console")).toBe("/console");
    expect(sanitizeRedirectPath("/console/runs")).toBe("/console/runs");
    expect(sanitizeRedirectPath(" /console/runs ")).toBe("/console/runs");
  });

  it("falls back for unsafe or invalid values", () => {
    expect(sanitizeRedirectPath(undefined)).toBe("/console");
    expect(sanitizeRedirectPath("")).toBe("/console");
    expect(sanitizeRedirectPath("//evil.com")).toBe("/console");
    expect(sanitizeRedirectPath("https://evil.com")).toBe("/console");
    expect(sanitizeRedirectPath("console")).toBe("/console");
  });

  it("uses custom fallback when provided", () => {
    expect(sanitizeRedirectPath(undefined, "/login")).toBe("/login");
    expect(sanitizeRedirectPath("//evil.com", "/login")).toBe("/login");
  });
});

describe("buildLoginRedirectUrl", () => {
  it("encodes sanitized redirect path in login query", () => {
    expect(buildLoginRedirectUrl("/console/runs")).toBe("/login?from=%2Fconsole%2Fruns");
  });

  it("falls back to /console for unsafe paths", () => {
    expect(buildLoginRedirectUrl("//evil.com")).toBe("/login?from=%2Fconsole");
  });
});

describe("resolveConsoleRequestPathname", () => {
  it("prefers x-pathname header", () => {
    const headers = { get: (name: string) => (name === "x-pathname" ? "/console/runs" : null) };
    expect(resolveConsoleRequestPathname(headers)).toBe("/console/runs");
  });

  it("parses next-url when x-pathname is missing", () => {
    const headers = {
      get: (name: string) => (name === "next-url" ? "https://app.example.com/console/workflows" : null),
    };
    expect(resolveConsoleRequestPathname(headers)).toBe("/console/workflows");
  });

  it("falls back for unsafe resolved paths", () => {
    const headers = { get: (name: string) => (name === "x-pathname" ? "//evil.com" : null) };
    expect(resolveConsoleRequestPathname(headers)).toBe("/console");
  });
});
