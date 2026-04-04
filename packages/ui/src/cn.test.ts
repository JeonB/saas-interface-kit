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

  it("resolves conflicting Tailwind-like utility classes", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-sm", "text-base")).toBe("text-base");
  });

  it("resolves conflicting ui-prefixed utilities", () => {
    expect(cn("ui:p-4", "ui:p-2")).toBe("ui:p-2");
    expect(cn("ui:text-sm", "ui:text-base")).toBe("ui:text-base");
  });
});
