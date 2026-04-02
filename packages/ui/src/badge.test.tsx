import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("uses default variant styling container", () => {
    const { container } = render(<Badge>Default</Badge>);
    const span = container.querySelector("span");
    expect(span).toBeTruthy();
    expect(span).toHaveClass("ui:inline-flex");
  });

  it("renders success variant", () => {
    const { container } = render(<Badge variant="success">OK</Badge>);
    const span = container.querySelector("span");
    expect(span).toHaveClass("ui:bg-blue-1000");
  });

  it("merges className for layout overrides", () => {
    const { container } = render(
      <Badge className="ui:ml-2" variant="warning">
        Warn
      </Badge>,
    );
    const span = container.querySelector("span");
    expect(span).toHaveClass("ui:ml-2");
    expect(span).toHaveClass("ui:bg-purple-1000");
  });
});
