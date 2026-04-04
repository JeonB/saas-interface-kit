import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { RadioGroup, RadioItem } from "./radio-group";

function ControlledRadio() {
  const [value, setValue] = useState("a");
  return (
    <RadioGroup onValueChange={setValue} value={value}>
      <RadioItem id="ra" label="A" value="a" />
      <RadioItem id="rb" label="B" value="b" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("selects item and updates group value", async () => {
    const user = userEvent.setup();
    render(<ControlledRadio />);
    expect(screen.getByRole("radio", { name: "A" })).toBeChecked();
    await user.click(screen.getByRole("radio", { name: "B" }));
    expect(screen.getByRole("radio", { name: "B" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "A" })).not.toBeChecked();
  });
});
