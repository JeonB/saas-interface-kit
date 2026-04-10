import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("스켈레톤", () => {
  it("너비·높이 스타일 적용", () => {
    const { container } = render(<Skeleton height="24px" width="120px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("120px");
    expect(el.style.height).toBe("24px");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });
});
