import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("버튼", () => {
  it("레이블 렌더 및 시맨틱 기본 type 적용", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("접근성을 위해 비활성 상태 지원", () => {
    render(<Button disabled>Disabled action</Button>);

    const button = screen.getByRole("button", { name: "Disabled action" });
    expect(button).toBeDisabled();
  });

  it("primary variant 시맨틱 배경 클래스 적용", () => {
    const { container } = render(<Button variant="primary">Go</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("ui:bg-semantic-brand");
  });

  it("활성 동작에서 클릭 발생", () => {
    let count = 0;
    render(
      <Button
        onClick={() => {
          count += 1;
        }}
      >
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(count).toBe(1);
  });
});
