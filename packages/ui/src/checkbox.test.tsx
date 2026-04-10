import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";

describe("체크박스", () => {
  it("레이블을 컨트롤에 연결", () => {
    render(<Checkbox defaultChecked id="agree" label="Accept terms" name="terms" />);
    const box = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(box).toBeChecked();
    expect(box).toHaveAttribute("id", "agree");
  });

  it("토글 시 onChange 호출", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox id="x" label="Opt in" name="opt" onChange={onChange} />);
    await user.click(screen.getByRole("checkbox", { name: "Opt in" }));
    expect(onChange).toHaveBeenCalled();
  });
});
