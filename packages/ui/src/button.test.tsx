import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders label and applies a semantic default type", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("supports disabled state for accessibility", () => {
    render(<Button disabled>Disabled action</Button>);

    const button = screen.getByRole("button", { name: "Disabled action" });
    expect(button).toBeDisabled();
  });

  it("applies primary variant semantic background class", () => {
    const { container } = render(<Button variant="primary">Go</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("ui:bg-semantic-brand");
  });

  it("fires click for enabled actions", () => {
    let count = 0;
    render(
      <Button
        onClick={() => {
          count += 1;
        }}
      >
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(count).toBe(1);
  });
});
