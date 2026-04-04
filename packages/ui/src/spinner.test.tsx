import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("exposes status role and default label", () => {
    render(<Spinner />);
    const el = screen.getByRole("status", { name: "Loading" });
    expect(el).toHaveClass("ui:animate-spin");
  });

  it("allows custom aria-label", () => {
    render(<Spinner aria-label="Saving" />);
    expect(screen.getByRole("status", { name: "Saving" })).toBeInTheDocument();
  });

  it("decorative spinner is hidden from accessibility tree", () => {
    const { container } = render(<Spinner decorative />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
    expect(screen.queryByRole("status")).toBeNull();
  });
});
