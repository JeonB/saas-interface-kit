import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

describe("Select", () => {
  it("renders options with accessible name", () => {
    render(
      <Select aria-label="Region" name="region">
        <option value="us">US</option>
        <option value="eu">EU</option>
      </Select>,
    );
    expect(screen.getByRole("combobox", { name: "Region" })).toHaveAttribute("name", "region");
  });
});
