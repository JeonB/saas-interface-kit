import { describe, expect, it } from "vitest";
import { iconSizeFromComponentSize } from "./icon-size";

describe("iconSizeFromComponentSize", () => {
  it("maps sizes to pixel values", () => {
    expect(iconSizeFromComponentSize("sm")).toBe(14);
    expect(iconSizeFromComponentSize("md")).toBe(16);
    expect(iconSizeFromComponentSize("lg")).toBe(20);
  });
});
