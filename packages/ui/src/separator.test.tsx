import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./separator";

describe("구분선", () => {
  it("역할이 있는 가로 구분선 렌더", () => {
    render(<Separator />);
    const el = screen.getByRole("separator");
    expect(el).toHaveAttribute("aria-orientation", "horizontal");
    expect(el).toHaveClass("ui:h-px");
  });

  it("세로 구분선 렌더", () => {
    render(<Separator orientation="vertical" />);
    const el = screen.getByRole("separator");
    expect(el).toHaveAttribute("aria-orientation", "vertical");
    expect(el).toHaveClass("ui:w-px");
  });
});
