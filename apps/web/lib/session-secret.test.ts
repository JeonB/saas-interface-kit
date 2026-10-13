import { describe, expect, it } from "vitest";
import {
  FALLBACK_DEV_SESSION_SECRET,
  getProductionSessionSecretProblem,
  MIN_SESSION_SECRET_LENGTH,
  resolveSessionSecret,
} from "./session-secret";

const STRONG_SECRET = "a".repeat(MIN_SESSION_SECRET_LENGTH);

describe("resolveSessionSecret", () => {
  it("falls back to the dev placeholder when unset or blank", () => {
    expect(resolveSessionSecret(undefined)).toBe(FALLBACK_DEV_SESSION_SECRET);
    expect(resolveSessionSecret("")).toBe(FALLBACK_DEV_SESSION_SECRET);
    expect(resolveSessionSecret("   ")).toBe(FALLBACK_DEV_SESSION_SECRET);
  });

  it("uses the trimmed value so signing matches startup validation", () => {
    expect(resolveSessionSecret(`  ${STRONG_SECRET}\n`)).toBe(STRONG_SECRET);
  });
});

describe("getProductionSessionSecretProblem", () => {
  it("rejects missing values", () => {
    expect(getProductionSessionSecretProblem(undefined)).toMatch(/not set/);
    expect(getProductionSessionSecretProblem("  ")).toMatch(/not set/);
  });

  it("rejects the development placeholder", () => {
    expect(getProductionSessionSecretProblem(FALLBACK_DEV_SESSION_SECRET)).toMatch(/placeholder/);
  });

  it("rejects values shorter than the minimum length", () => {
    expect(getProductionSessionSecretProblem("short-secret")).toMatch(
      new RegExp(`at least ${MIN_SESSION_SECRET_LENGTH}`),
    );
  });

  it("accepts a sufficiently long secret", () => {
    expect(getProductionSessionSecretProblem(STRONG_SECRET)).toBeNull();
  });
});
