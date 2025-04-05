import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Switch } from "./switch";

function ControlledSwitch() {
  const [on, setOn] = useState(false);
  return <Switch aria-label="Alerts" checked={on} onCheckedChange={setOn} />;
}

describe("Switch", () => {
  it("toggles aria-checked when clicked", async () => {
    const user = userEvent.setup();
    render(<ControlledSwitch />);
    const sw = screen.getByRole("switch", { name: "Alerts" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    await user.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("toggles with Space key", async () => {
    const user = userEvent.setup();
    render(<ControlledSwitch />);
    const sw = screen.getByRole("switch", { name: "Alerts" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    sw.focus();
    await user.keyboard(" ");
    expect(sw).toHaveAttribute("aria-checked", "true");
  });
});
