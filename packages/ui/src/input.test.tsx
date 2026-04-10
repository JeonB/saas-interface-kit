import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("입력", () => {
  it("접근 가능한 이름과 name 속성으로 렌더", () => {
    render(<Input aria-label="Search" name="search" placeholder="Query" />);

    const field = screen.getByRole("textbox", { name: "Search" });
    expect(field).toHaveAttribute("name", "search");
  });

  it("disabled일 때 비활성", () => {
    render(<Input aria-label="Code" disabled name="code" />);

    expect(screen.getByRole("textbox", { name: "Code" })).toBeDisabled();
  });
});
