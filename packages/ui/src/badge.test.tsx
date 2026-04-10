import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("배지", () => {
  it("자식 렌더", () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("기본 variant 스타일 컨테이너 사용", () => {
    const { container } = render(<Badge>Default</Badge>);
    const span = container.querySelector("span");
    expect(span).toBeTruthy();
    expect(span).toHaveClass("ui:inline-flex");
  });

  it("success variant 렌더", () => {
    const { container } = render(<Badge variant="success">OK</Badge>);
    const span = container.querySelector("span");
    expect(span).toHaveClass("ui:bg-semantic-success");
  });

  it("레이아웃 덮어쓰기용 className 병합", () => {
    const { container } = render(
      <Badge className="ui:ml-2" variant="warning">
        Warn
      </Badge>,
    );
    const span = container.querySelector("span");
    expect(span).toHaveClass("ui:ml-2");
    expect(span).toHaveClass("ui:bg-semantic-warning");
  });
});
