import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VisuallyHidden } from "./visually-hidden";

describe("VisuallyHidden", () => {
  it("renders text for screen readers", () => {
    render(
      <span>
        <VisuallyHidden>Secret context</VisuallyHidden>
        Visible
      </span>,
    );
    expect(screen.getByText("Secret context")).toBeInTheDocument();
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });
});
