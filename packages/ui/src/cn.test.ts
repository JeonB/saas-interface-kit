import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn 유틸", () => {
  it("참인 클래스 문자열을 공백 하나로 연결", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("undefined와 빈 문자열 제외", () => {
    expect(cn("a", undefined, "", "b")).toBe("a b");
  });

  it("클래스가 없으면 빈 문자열 반환", () => {
    expect(cn()).toBe("");
    expect(cn(undefined, undefined)).toBe("");
  });

  it("Tailwind 유틸 충돌 해소", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-sm", "text-base")).toBe("text-base");
  });

  it("ui- 접두 유틸 충돌 해소", () => {
    expect(cn("ui:p-4", "ui:p-2")).toBe("ui:p-2");
    expect(cn("ui:text-sm", "ui:text-base")).toBe("ui:text-base");
  });
});
