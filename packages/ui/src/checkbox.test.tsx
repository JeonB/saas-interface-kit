import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
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

  it("indeterminate 시 DOM 속성 반영", () => {
    const { rerender } = render(
      <Checkbox id="mix" indeterminate label="Mixed" name="m" />,
    );
    const box = screen.getByRole("checkbox", { name: "Mixed" }) as HTMLInputElement;
    expect(box.indeterminate).toBe(true);
    rerender(<Checkbox id="mix" indeterminate={false} label="Mixed" name="m" />);
    expect(box.indeterminate).toBe(false);
  });

  it("ref 객체로 input 노출", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} id="r" label="R" name="r" />);
    expect(ref.current).toBe(screen.getByRole("checkbox", { name: "R" }));
  });

  it("ref 콜백으로 input 노출", () => {
    let el: HTMLInputElement | null = null;
    render(
      <Checkbox
        ref={(node) => {
          el = node;
        }}
        id="cb"
        label="C"
        name="c"
      />,
    );
    expect(el).toBe(screen.getByRole("checkbox", { name: "C" }));
  });
});
