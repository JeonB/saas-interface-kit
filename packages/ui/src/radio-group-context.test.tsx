import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RadioItem } from "./radio-group";

describe("라디오 그룹 컨텍스트", () => {
  it("RadioGroup 밖에서 RadioItem 사용 시 오류", () => {
    expect(() =>
      render(<RadioItem id="i" label="L" value="v" />),
    ).toThrow(/must be used within RadioGroup/);
  });
});
