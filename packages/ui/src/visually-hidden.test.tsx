import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VisuallyHidden } from "./visually-hidden";

describe("시각적 숨김", () => {
  it("스크린 리더용 텍스트 렌더", () => {
    render(
      <span>
        <VisuallyHidden>Secret context</VisuallyHidden>
        Visible
      </span>,
    );
    expect(screen.getByText("Secret context")).toBeInTheDocument();
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });
});
