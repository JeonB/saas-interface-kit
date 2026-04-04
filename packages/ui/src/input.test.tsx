import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("renders with accessible name and name attribute", () => {
    render(<Input aria-label="Search" name="search" placeholder="Query" />);

    const field = screen.getByRole("textbox", { name: "Search" });
    expect(field).toHaveAttribute("name", "search");
  });

  it("is disabled when disabled", () => {
    render(<Input aria-label="Code" disabled name="code" />);

    expect(screen.getByRole("textbox", { name: "Code" })).toBeDisabled();
  });
});
