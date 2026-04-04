import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("associates label with control", () => {
    render(<Checkbox defaultChecked id="agree" label="Accept terms" name="terms" />);
    const box = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(box).toBeChecked();
    expect(box).toHaveAttribute("id", "agree");
  });

  it("calls onChange when toggled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox id="x" label="Opt in" name="opt" onChange={onChange} />);
    await user.click(screen.getByRole("checkbox", { name: "Opt in" }));
    expect(onChange).toHaveBeenCalled();
  });
});
