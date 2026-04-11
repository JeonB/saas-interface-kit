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

describe("라디오 그룹", () => {
  it("항목 선택 및 그룹 값 갱신", async () => {
    const user = userEvent.setup();
    render(<ControlledRadio />);
    expect(screen.getByRole("radio", { name: "A" })).toBeChecked();
    await user.click(screen.getByRole("radio", { name: "B" }));
    expect(screen.getByRole("radio", { name: "B" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "A" })).not.toBeChecked();
  });

  it("명시적 name 속성 전달", () => {
    render(
      <RadioGroup name="plan" onValueChange={() => {}} value="a">
        <RadioItem id="p1" label="A" value="a" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "A" })).toHaveAttribute("name", "plan");
  });
});
