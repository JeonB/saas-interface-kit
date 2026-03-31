import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert } from "./alert";

describe("Alert", () => {
  it("renders with role alert", () => {
    render(<Alert>Notice</Alert>);

    expect(screen.getByRole("alert")).toHaveTextContent("Notice");
  });

  it("renders optional title", () => {
    render(<Alert title="Warning">Take care</Alert>);

    expect(screen.getByText("Warning")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Take care");
  });
});
