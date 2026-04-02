import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class strings with a single space", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("omits undefined and empty strings", () => {
    expect(cn("a", undefined, "", "b")).toBe("a b");
  });

  it("returns empty string when no classes", () => {
    expect(cn()).toBe("");
    expect(cn(undefined, undefined)).toBe("");
  });
});
