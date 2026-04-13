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

  it("danger variant 스타일", () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    expect(container.querySelector("button")).toHaveClass("ui:bg-semantic-danger");
  });

  it("loading 시 aria-busy·비활성", () => {
    render(<Button loading>Submit</Button>);
    const btn = screen.getByRole("button", { name: "Submit" });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("asChild일 때 Slot으로 자식에 클래스 전달", () => {
    render(
      <Button asChild variant="primary">
        <a href="https://example.com">Link</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveClass("ui:inline-flex");
  });

  it("leftIcon 렌더", () => {
    render(
      <Button leftIcon={<span data-testid="ico">+</span>} variant="default">
        Add
      </Button>,
    );
    expect(screen.getByTestId("ico")).toBeInTheDocument();
  });

  it("rightIcon 및 size lg 분기", () => {
    render(
      <Button rightIcon={<span data-testid="ri">→</span>} size="lg" variant="primary">
        Next
      </Button>,
    );
    expect(screen.getByTestId("ri")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next→" })).toHaveClass("ui:h-11");
  });

  it("loading일 때 lg 스피너 크기", () => {
    render(
      <Button loading size="lg" variant="primary">
        Wait
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Wait" })).toBeDisabled();
  });
});
