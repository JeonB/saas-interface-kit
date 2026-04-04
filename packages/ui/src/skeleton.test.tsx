import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("applies width and height styles", () => {
    const { container } = render(<Skeleton height="24px" width="120px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("120px");
    expect(el.style.height).toBe("24px");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });
});
