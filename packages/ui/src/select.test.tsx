import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

describe("선택", () => {
  it("접근 가능한 이름으로 옵션 렌더", () => {
    render(
      <Select aria-label="Region" name="region">
        <option value="us">US</option>
        <option value="eu">EU</option>
      </Select>,
    );
    expect(screen.getByRole("combobox", { name: "Region" })).toHaveAttribute("name", "region");
  });
});
