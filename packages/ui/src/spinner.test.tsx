import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./spinner";

describe("스피너", () => {
  it("status 역할과 기본 레이블 노출", () => {
    render(<Spinner />);
    const el = screen.getByRole("status", { name: "로딩 중" });
    expect(el).toHaveClass("ui:animate-spin");
  });

  it("사용자 지정 aria-label 허용", () => {
    render(<Spinner aria-label="저장 중" />);
    expect(screen.getByRole("status", { name: "저장 중" })).toBeInTheDocument();
  });

  it("장식용 스피너는 접근성 트리에서 숨김", () => {
    const { container } = render(<Spinner decorative />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("size lg 분기", () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.firstChild).toHaveClass("ui:h-6");
  });
});
