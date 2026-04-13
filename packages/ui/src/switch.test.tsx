import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
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

  it.each(["sm", "lg"] as const)("size %s 트랙·thumb 분기", (size) => {
    render(
      <Switch aria-label={`Size ${size}`} checked={false} onCheckedChange={() => {}} size={size} />,
    );
    const sw = screen.getByRole("switch", { name: `Size ${size}` });
    expect(sw).toBeInTheDocument();
  });

  it("체크된 md thumb translate 분기", () => {
    render(<Switch aria-label="On" checked onCheckedChange={() => {}} />);
    expect(screen.getByRole("switch", { name: "On" })).toHaveAttribute("aria-checked", "true");
  });

  it("체크된 lg thumb translate 분기", () => {
    render(
      <Switch aria-label="Large on" checked onCheckedChange={() => {}} size="lg" />,
    );
    expect(screen.getByRole("switch", { name: "Large on" })).toHaveAttribute("aria-checked", "true");
  });

  it("체크된 sm thumb translate 분기", () => {
    render(
      <Switch aria-label="Small on" checked onCheckedChange={() => {}} size="sm" />,
    );
    expect(screen.getByRole("switch", { name: "Small on" })).toHaveAttribute("aria-checked", "true");
  });

  it("disabled일 때 클릭해도 onCheckedChange 미호출", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Switch aria-label="Locked" checked={false} disabled onCheckedChange={onCheckedChange} />,
    );
    await user.click(screen.getByRole("switch", { name: "Locked" }));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
