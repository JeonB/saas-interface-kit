import { describe, expect, it } from "vitest";
import { iconSizeFromComponentSize } from "./icon-size";

describe("iconSizeFromComponentSize 유틸", () => {
  it("크기를 픽셀 값으로 매핑", () => {
    expect(iconSizeFromComponentSize("sm")).toBe(14);
    expect(iconSizeFromComponentSize("md")).toBe(16);
    expect(iconSizeFromComponentSize("lg")).toBe(20);
  });
});
