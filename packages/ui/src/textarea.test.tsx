import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders with accessible name", () => {
    render(<Textarea aria-label="Notes" name="notes" />);

    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveAttribute("name", "notes");
  });
});
