import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("exposes status role and default label", () => {
    render(<Spinner />);
    const el = screen.getByRole("status", { name: "로딩 중" });
    expect(el).toHaveClass("ui:animate-spin");
  });

  it("allows custom aria-label", () => {
    render(<Spinner aria-label="저장 중" />);
    expect(screen.getByRole("status", { name: "저장 중" })).toBeInTheDocument();
  });

  it("decorative spinner is hidden from accessibility tree", () => {
    const { container } = render(<Spinner decorative />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
    expect(screen.queryByRole("status")).toBeNull();
  });
});
