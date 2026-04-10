import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Switch } from "./switch";

function ControlledSwitch() {
  const [on, setOn] = useState(false);
  return <Switch aria-label="Alerts" checked={on} onCheckedChange={setOn} />;
}

describe("스위치", () => {
  it("클릭 시 aria-checked 토글", async () => {
    const user = userEvent.setup();
    render(<ControlledSwitch />);
    const sw = screen.getByRole("switch", { name: "Alerts" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    await user.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("Space 키로 토글", async () => {
    const user = userEvent.setup();
    render(<ControlledSwitch />);
    const sw = screen.getByRole("switch", { name: "Alerts" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    sw.focus();
    await user.keyboard(" ");
    expect(sw).toHaveAttribute("aria-checked", "true");
  });
});
