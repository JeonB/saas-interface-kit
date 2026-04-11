import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("텍스트 영역", () => {
  it("접근 가능한 이름으로 렌더", () => {
    render(<Textarea aria-label="Notes" name="notes" />);

    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveAttribute("name", "notes");
  });

  it.each(["sm", "lg"] as const)("size %s 분기", (size) => {
    render(<Textarea aria-label={`Area ${size}`} name="a" size={size} />);
    expect(screen.getByRole("textbox", { name: `Area ${size}` })).toBeInTheDocument();
  });
});
